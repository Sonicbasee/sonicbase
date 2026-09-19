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
    const { name, email, phone, address, city, state, country, items, subtotal, shipping, total } = await req.json();

    if (!name || !email || !phone || !address || !city || !items?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const tx_ref = `sonicbase_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert({
        email,
        name,
        phone,
        address,
        city,
        state: state || "",
        country: country || "Nigeria",
        items,
        subtotal,
        shipping,
        total,
        status: "pending",
        flutterwave_ref: tx_ref,
      })
      .select("id")
      .single();

    if (insertError) throw new Error(insertError.message);

    const secretKey = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
    if (!secretKey) {
      return new Response(JSON.stringify({ error: "FLUTTERWAVE_SECRET_KEY not set" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://sonicbase-six.vercel.app";
    const redirectUrl = `${siteUrl}/order/${order.id}?tx_ref=${tx_ref}`;

    const fwRes = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref,
        amount: total,
        currency: "NGN",
        redirect_url: redirectUrl,
        customer: { email, name, phonenumber: phone },
        customizations: { title: "Sonicbase Order", description: `Order ${order.id.slice(0, 8)} — ${items.length} items`, logo: `${siteUrl}/favicon.png` },
        meta: { order_id: order.id },
      }),
    });

    const fwData = await fwRes.json();
    if (!fwRes.ok || fwData.status !== "success") {
      console.error("Flutterwave create failed:", fwData);
      await supabase.from("orders").delete().eq("id", order.id);
      return new Response(JSON.stringify({ error: fwData.message || "Flutterwave error", details: fwData }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ orderId: order.id, tx_ref, link: fwData.data.link }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("create-flutterwave-payment error:", e);
    return new Response(JSON.stringify({ error: e.message || "Internal error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
