// Supabase Edge Function: contact
// Handles contact form submissions, stores in DB, sends emails via Resend
// Deploy: supabase functions deploy contact --no-verify-jwt

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function sendEmailViaResend(to: string, subject: string, html: string, replyTo: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return { skipped: true, reason: "RESEND_API_KEY not set" };

  const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL") || "Sonicbase <support@sonicbase.ink>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { error: `Resend ${res.status}: ${body}` };
  }
  return { success: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { topic, name, email, message } = await req.json();

    if (!topic || !name || !email || !message) {
      return new Response(JSON.stringify({ error: "Please complete every field and choose a topic." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Please enter a valid email address." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allowedTopics = ["General", "Artist submissions", "Press & partnerships", "Licensing request"];
    if (!allowedTopics.includes(topic)) {
      return new Response(JSON.stringify({ error: "Invalid topic." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: insertError } = await supabase.from("contact_messages").insert({ topic, name, email, message });
    if (insertError) {
      console.error("contact_messages insert failed:", insertError.message);
      return new Response(JSON.stringify({ error: "Could not save your message. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const contactEmail = Deno.env.get("CONTACT_EMAIL") || "support@sonicbase.ink";

    const adminSubject = `New contact: ${topic} — ${name}`;
    const adminHtml = `
      <h2>New contact submission</h2>
      <p><strong>Topic:</strong> ${topic}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <hr/>
      <p style="color:#666;font-size:12px">Sent via Sonicbase contact form at ${new Date().toISOString()}</p>
    `;

    const userSubject = `We received your message — Sonicbase`;
    const userHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #111;">Hi ${name},</h2>
        <p>Thank you for reaching out to <strong>Sonicbase</strong>.</p>
        <p>We have received your message about <strong>${topic}</strong> and our team will contact you shortly.</p>
        <div style="background:#f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin:0; color:#555; font-size:14px;"><strong>Your message:</strong></p>
          <p style="white-space:pre-wrap; margin:8px 0 0 0;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>
        <p style="color:#666; font-size:14px;">If you have any urgent enquiries, reply directly to this email or contact us at ${contactEmail}.</p>
        <p style="margin-top: 24px;">— The Sonicbase Team<br/><span style="color:#888; font-size:12px">Independent music, artist-led.</span></p>
      </div>
    `;

    const adminResult: any = await sendEmailViaResend(contactEmail, adminSubject, adminHtml, email);
    const userResult: any = await sendEmailViaResend(email, userSubject, userHtml, contactEmail);

    if (adminResult.error || userResult.error) {
      console.error("contact email failed:", { adminError: adminResult.error, userError: userResult.error });
      // Still success - message saved
      return new Response(
        JSON.stringify({
          success: true,
          emailSent: false,
          warning: "Message saved but one or more emails failed to send.",
          details: { adminError: adminResult.error, userError: userResult.error },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const skipped = adminResult.skipped || userResult.skipped;
    return new Response(JSON.stringify({ success: true, emailSent: !skipped, skippedReason: adminResult.reason || userResult.reason }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("contact edge function error:", e);
    return new Response(JSON.stringify({ error: e.message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
