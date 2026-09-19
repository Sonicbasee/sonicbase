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

async function sendEmailViaResend(to: string, subject: string, html: string, from: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const, reason: "RESEND_API_KEY not set" };

  const fromEmail = process.env.CONTACT_FROM_EMAIL || from || "Sonicbase <onboarding@resend.dev>";
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
      reply_to: from,
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
    const subject = `New contact: ${topic} — ${name}`;
    const html = `
      <h2>New contact submission</h2>
      <p><strong>Topic:</strong> ${topic}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <hr/>
      <p style="color:#666;font-size:12px">Sent via Sonicbase contact form at ${new Date().toISOString()}</p>
    `;

    const emailResult = await sendEmailViaResend(contactEmail, subject, html, email);
    if ((emailResult as any).error) {
      console.error("contact email failed:", (emailResult as any).error);
      // Don't throw — message is saved, admin can see in DB
      return { success: true, emailSent: false, warning: "Message saved but email delivery failed. Please configure RESEND_API_KEY." };
    }

    return { success: true, emailSent: !(emailResult as any).skipped, skippedReason: (emailResult as any).reason };
  });
