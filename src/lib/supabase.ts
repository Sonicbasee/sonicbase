import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] || "https://rwgjngmypmfnmmydlwve.supabase.co";
const supabasePublishableKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || "sb_publishable_71X4hLuGZL_8pi9WbJvhvA_HqSfVCci";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
  });

export const isSupabaseConfigured = !!supabaseUrl && !!supabasePublishableKey;
