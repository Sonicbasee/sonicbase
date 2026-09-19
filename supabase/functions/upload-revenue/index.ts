import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user || user.user_metadata?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Admin only" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const monthStr = formData.get("month") as string; // YYYY-MM
    const artistIdParam = formData.get("artist_id") as string | null;
    if (!file || !monthStr) return new Response(JSON.stringify({ error: "file and month required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!artistIdParam) {
      // For backward compat, still allow sheet with artist_email column, but new flow requires artist selection
      // We will handle both, but prefer artist_id
    }

    const text = await file.text();
    const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    // Detect delimiter: tab or comma (support both, plus handle TSV from distributor)
    const firstLine = rawLines[0] || "";
    const delimiter = firstLine.includes("\t") ? "\t" : ",";
    const headerCols = firstLine.split(delimiter).map((c) => c.trim().toLowerCase().replace(/^"|"$/g, ""));
    const isDetailedReport = headerCols.includes("report_date") || headerCols.includes("sales_start_date") || headerCols.includes("royalty");
    const hasHeader = headerCols.includes("release_title") || headerCols.includes("release") || isDetailedReport;
    const rows = hasHeader ? rawLines.slice(1) : rawLines;

    const adminClient = createClient(supabaseUrl, serviceKey);
    const monthDate = monthStr.length === 7 ? `${monthStr}-01` : monthStr;

    let updated = 0;
    let errors: string[] = [];

    const isPerArtist = !!artistIdParam;
    let perArtistId = artistIdParam;
    if (isPerArtist) {
      const { data: artistCheck } = await adminClient.from("artists").select("id").eq("id", artistIdParam).single();
      if (!artistCheck) {
        return new Response(JSON.stringify({ error: "Selected artist not found" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // For detailed distributor report (per-artist), aggregate by release_title
    if (isPerArtist && isDetailedReport) {
      const releaseIdx = headerCols.indexOf("release_title");
      const unitsIdx = headerCols.indexOf("units");
      const royaltyIdx = headerCols.indexOf("royalty") !== -1 ? headerCols.indexOf("royalty") : headerCols.indexOf("revenue");
      // Fallback to last two columns if header not found
      const agg: Record<string, { units: number; royalty: number }> = {};
      for (const line of rows) {
        const cols = line.split(delimiter).map((c) => c.trim().replace(/^"|"$/g, ""));
        const releaseTitle = releaseIdx >= 0 ? cols[releaseIdx] : cols[3]; // 3 is release_title in detailed
        const unitsStr = unitsIdx >= 0 ? cols[unitsIdx] : cols[cols.length - 2];
        const royaltyStr = royaltyIdx >= 0 ? cols[royaltyIdx] : cols[cols.length - 1];
        if (!releaseTitle) continue;
        const units = parseInt(unitsStr?.replace(/[^0-9]/g, "") || "0", 10) || 0;
        const royalty = parseFloat(royaltyStr || "0") || 0;
        // Royalty is in USD, convert to NGN kobo? For now store as-is * 100 (kobo) or as float*100?
        // We'll store royalty*100000 as amount to preserve decimals, but display as NGN
        // Simpler: sum royalty and treat as amount (will be small, but we can sum)
        if (!agg[releaseTitle]) agg[releaseTitle] = { units: 0, royalty: 0 };
        agg[releaseTitle].units += units;
        agg[releaseTitle].royalty += royalty;
      }

      for (const [releaseTitle, vals] of Object.entries(agg)) {
        const artistId = perArtistId!;
        const amount = Math.round(vals.royalty * 1500); // USD royalty to NGN (~1500 NGN/USD)
        const streams = vals.units;

        const { data: release } = await adminClient.from("releases").select("id").ilike("title", releaseTitle).limit(1).single();
        if (!release) {
          errors.push(`Release not found: ${releaseTitle}`);
          continue;
        }

        const { error: upsertErr } = await adminClient.from("revenue_entries").upsert({
          artist_id: artistId,
          release_id: release.id,
          amount,
          streams,
          month: monthDate,
        }, { onConflict: "artist_id,release_id,month" });

        if (upsertErr) {
          errors.push(`DB error for ${releaseTitle}: ${upsertErr.message}`);
          continue;
        }

        const { data: sums } = await adminClient.from("revenue_entries").select("amount, streams").eq("release_id", release.id);
        const totalRevenue = (sums || []).reduce((a: number, r: any) => a + (r.amount || 0), 0);
        const totalStreams = (sums || []).reduce((a: number, r: any) => a + (r.streams || 0), 0);
        await adminClient.from("releases").update({ revenue: totalRevenue, streams: totalStreams, updated_at: new Date().toISOString() }).eq("id", release.id);
        updated++;
      }

      return new Response(JSON.stringify({ success: true, updated, errors, month: monthDate, note: "Detailed report aggregated by release" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Fallback simple per-artist or legacy handling
    for (const line of rows) {
      const cols = line.split(delimiter).map((c) => c.trim().replace(/^"|"$/g, ""));
      let artistId: string | null = null;
      let releaseTitle: string;
      let amountStr: string;
      let streamsStr: string;

      if (isPerArtist) {
        [releaseTitle, amountStr, streamsStr] = cols;
        artistId = perArtistId;
        if (!releaseTitle) {
          errors.push(`Skipped: ${line}`);
          continue;
        }
      } else {
        const [artistEmail, rTitle, aStr, sStr] = cols;
        releaseTitle = rTitle;
        amountStr = aStr;
        streamsStr = sStr;
        if (!artistEmail || !releaseTitle) {
          errors.push(`Skipped: ${line}`);
          continue;
        }
        const { data: artist } = await adminClient.from("artists").select("id").eq("email", artistEmail).single();
        if (!artist) {
          errors.push(`Artist not found: ${artistEmail}`);
          continue;
        }
        artistId = artist.id;
      }
      const amount = parseInt(amountStr?.replace(/[^0-9]/g, "") || "0", 10);
      const streams = parseInt(streamsStr?.replace(/[^0-9]/g, "") || "0", 10);

      const { data: release } = await adminClient.from("releases").select("id").ilike("title", releaseTitle).limit(1).single();
      if (!release) {
        errors.push(`Release not found: ${releaseTitle}`);
        continue;
      }

      // Upsert revenue_entries
      const { error: upsertErr } = await adminClient.from("revenue_entries").upsert({
        artist_id: artistId,
        release_id: release.id,
        amount,
        streams,
        month: monthDate,
      }, { onConflict: "artist_id,release_id,month" });

      if (upsertErr) {
        errors.push(`DB error for ${artistId}/${releaseTitle}: ${upsertErr.message}`);
        continue;
      }

      // Also update releases total revenue/streams (sum of all months)
      const { data: sums } = await adminClient.from("revenue_entries").select("amount, streams").eq("release_id", release.id);
      const totalRevenue = (sums || []).reduce((a: number, r: any) => a + (r.amount || 0), 0);
      const totalStreams = (sums || []).reduce((a: number, r: any) => a + (r.streams || 0), 0);
      await adminClient.from("releases").update({ revenue: totalRevenue, streams: totalStreams, updated_at: new Date().toISOString() }).eq("id", release.id);

      updated++;
    }

    return new Response(JSON.stringify({ success: true, updated, errors, month: monthDate }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("upload-revenue error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
