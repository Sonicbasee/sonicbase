import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabasePublishableKey || "placeholder-publishable-key",
  {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    // Share session across sonicbase.ink subdomains (artist.sonicbase.ink)
    ...(typeof window !== "undefined" && window.location.hostname.endsWith("sonicbase.ink")
      ? { cookieOptions: { domain: ".sonicbase.ink", sameSite: "lax" as const } }
      : {}),
  },
  },
);
