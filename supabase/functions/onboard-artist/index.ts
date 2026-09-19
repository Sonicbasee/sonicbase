import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function generatePassword(length = 12) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#";
  let pw = "";
  for (let i = 0; i < length; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return new Response(JSON.stringify({ error: "Missing auth" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller is admin
    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user || user?.user_metadata?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Admin only" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const { name, email, city, genre, image, bio, statement, spotify_url, apple_music_url, instagram_url } = body;
    if (!name || !email) return new Response(JSON.stringify({ error: "name and email required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const adminClient = createClient(supabaseUrl, serviceKey);

    // Create artist row
    const { data: artist, error: artistErr } = await adminClient.from("artists").insert({
      name, email, city: city || "", genre: genre || "", image: image || "", bio: bio || "", statement: statement || "",
      spotify_url: spotify_url || "", apple_music_url: apple_music_url || "", instagram_url: instagram_url || "", status: "Active",
    }).select().single();

    if (artistErr) {
      if (artistErr.message.includes("duplicate") || artistErr.code === "23505") {
        return new Response(JSON.stringify({ error: "Artist email already exists" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error(artistErr.message);
    }

    // Create auth user
    const password = generatePassword(12);
    const { data: authUser, error: authErr } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name, role: "artist" },
    });

    if (authErr) {
      // Rollback artist if auth failed
      await adminClient.from("artists").delete().eq("id", artist.id);
      throw new Error(authErr.message);
    }

    // Send email via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const contactFrom = Deno.env.get("CONTACT_FROM_EMAIL") || "Sonicbase <support@sonicbase.ink>";
    if (resendKey) {
      const html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2>Welcome to Sonicbase, ${name}!</h2>
          <p>Your artist profile has been created. You can now access your dashboard at <a href="https://artist.sonicbase.ink">artist.sonicbase.ink</a></p>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:16px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p>Please login and change your password after first login.</p>
          <p><a href="https://artist.sonicbase.ink/login" style="display:inline-block;background:#111;color:#fff;padding:12px 24px;border-radius:9999px;text-decoration:none;">Go to Dashboard</a></p>
          <p style="color:#666;font-size:12px;margin-top:24px;">If you did not expect this, please contact support@sonicbase.ink</p>
        </div>
      `;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: contactFrom, to: [email], subject: "Your Sonicbase artist dashboard is ready", html }),
      }).catch(() => {});
    }

    return new Response(JSON.stringify({ success: true, artist, email, password, userId: authUser.user?.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("onboard-artist error:", e);
    return new Response(JSON.stringify({ error: e.message || "Internal error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
