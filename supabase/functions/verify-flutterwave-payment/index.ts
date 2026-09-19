import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function sendEmail(to: string, subject: string, html: string, replyTo: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return;
  const from = Deno.env.get("CONTACT_FROM_EMAIL") || "Sonicbase <support@sonicbase.ink>";
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, reply_to: replyTo }),
  }).catch(() => {});
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { orderId, transaction_id, tx_ref } = await req.json();
    if (!orderId) return new Response(JSON.stringify({ error: "orderId required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const secretKey = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
    if (!secretKey) return new Response(JSON.stringify({ error: "FLUTTERWAVE_SECRET_KEY not set" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    let verified = false;
    let txId = transaction_id ? String(transaction_id) : "";

    // If transaction_id provided, verify via Flutterwave
    if (txId) {
      const verifyRes = await fetch(`https://api.flutterwave.com/v3/transactions/${txId}/verify`, {
        headers: { Authorization: `Bearer ${secretKey}` },
      });
      const verifyData = await verifyRes.json();
      if (verifyData.status === "success" && verifyData.data?.status === "successful" && Number(verifyData.data?.amount) > 0) {
        verified = true;
        txId = String(verifyData.data.id || txId);
      }
    } else if (tx_ref) {
      // Fallback: verify by tx_ref
      const verifyRes = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`, {
        headers: { Authorization: `Bearer ${secretKey}` },
      });
      const verifyData = await verifyRes.json();
      if (verifyData.status === "success" && verifyData.data?.status === "successful") {
        verified = true;
        txId = String(verifyData.data.id || "");
      }
    }

    if (!verified) {
      return new Response(JSON.stringify({ success: false, verified: false, message: "Payment not verified" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: order, error: fetchErr } = await supabase.from("orders").select("*").eq("id", orderId).single();
    if (fetchErr || !order) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    if (order.status === "paid") {
      return new Response(JSON.stringify({ success: true, alreadyPaid: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    await supabase.from("orders").update({ status: "paid", flutterwave_tx_id: txId, updated_at: new Date().toISOString() }).eq("id", orderId);

    // Send confirmation emails
    const contactEmail = Deno.env.get("CONTACT_EMAIL") || "support@sonicbase.ink";
    const items = Array.isArray(order.items) ? order.items : JSON.parse(order.items || "[]");
    const itemsHtml = items.map((i: any) => `<li>${i.title} x${i.quantity} — ₦${(i.price * i.quantity).toLocaleString()}</li>`).join("");
    await sendEmail(
      contactEmail,
      `New paid order #${order.id.slice(0, 8)} — ${order.name}`,
      `<h2>New paid order</h2><p>${order.name} (${order.email}) — ${order.phone}</p><p>${order.address}, ${order.city}</p><ul>${itemsHtml}</ul><p>Total: ₦${Number(order.total).toLocaleString()}</p><p>Tx: ${txId} / ${tx_ref || order.flutterwave_ref}</p>`,
      order.email,
    );
    await sendEmail(
      order.email,
      `Your Sonicbase order #${order.id.slice(0, 8)} is confirmed`,
      `<h2>Thank you, ${order.name}!</h2><p>Your payment was successful. We’ll ship to ${order.address}, ${order.city} shortly.</p><ul>${itemsHtml}</ul><p>Total: ₦${Number(order.total).toLocaleString()}</p><p>Order: ${order.id}</p>`,
      contactEmail,
    );

    return new Response(JSON.stringify({ success: true, verified: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("verify error", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
