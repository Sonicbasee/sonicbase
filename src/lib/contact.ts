import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  // Prefer service role for insert bypassing RLS, fallback to anon (policy allows public insert)
  const key = serviceKey || anonKey;
  const supabaseUrl = url || "https://placeholder.supabase.co";
  const supabaseKey = key || "placeholder";
  return createClient(supabaseUrl, supabaseKey);
}

async function sendEmailViaResend(to: string, subject: string, html: string, replyTo: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const, reason: "RESEND_API_KEY not set" };

  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Sonicbase <support@sonicbase.ink>";
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
    return { skipped: false as const, error: `Resend ${res.status}: ${body}` };
  }
  return { skipped: false as const, success: true };
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: { topic: string; name: string; email: string; message: string }) => data)
  .handler(async ({ data }) => {
    const topic = data.topic?.trim();
    const name = data.name?.trim();
    const email = data.email?.trim();
    const message = data.message?.trim();

    if (!topic || !name || !email || !message) {
      throw new Error("Please complete every field and choose a topic.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    const allowedTopics = ["General", "Artist submissions", "Press & partnerships", "Licensing request"];
    if (!allowedTopics.includes(topic)) {
      throw new Error("Invalid topic.");
    }

    const supabase = getSupabaseAdmin();
    const { error: insertError } = await supabase.from("contact_messages").insert({ topic, name, email, message });
    if (insertError) {
      console.error("contact_messages insert failed:", insertError.message);
      throw new Error("Could not save your message. Please try again.");
    }

    const contactEmail = process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || "support@sonicbase.ink";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Sonicbase <onboarding@resend.dev>";

    // Email 1: to support@sonicbase.ink with original message
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

    // Email 2: automated confirmation to the user
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

    const adminResult = await sendEmailViaResend(contactEmail, adminSubject, adminHtml, email);
    const userResult = await sendEmailViaResend(email, userSubject, userHtml, contactEmail);

    const adminError = (adminResult as any).error;
    const userError = (userResult as any).error;

    if (adminError || userError) {
      console.error("contact email failed:", { adminError, userError });
      // Don't throw — message is saved, admin can see in DB
      if ((adminResult as any).skipped && (userResult as any).skipped) {
        return { success: true, emailSent: false, warning: "Message saved but email delivery skipped. Please configure RESEND_API_KEY." };
      }
      return { success: true, emailSent: false, warning: "Message saved but one or more emails failed to send.", details: { adminError, userError } };
    }

    const skipped = (adminResult as any).skipped || (userResult as any).skipped;
    return { success: true, emailSent: !skipped, skippedReason: (adminResult as any).reason || (userResult as any).reason };
  });
