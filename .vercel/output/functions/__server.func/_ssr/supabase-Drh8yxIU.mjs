import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-Drh8yxIU.js
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Z2puZ215cG1mbm1teWRsd3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3MzMwNjEsImV4cCI6MjEwNTMwOTA2MX0.QpP8059TCXlVrcmAdznfNtgiZ7bW5LUUrajAc1696ZU",
	"VITE_SUPABASE_URL": "https://rwgjngmypmfnmmydlwve.supabase.co"
}["VITE_SUPABASE_URL"];
var supabasePublishableKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Z2puZ215cG1mbm1teWRsd3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3MzMwNjEsImV4cCI6MjEwNTMwOTA2MX0.QpP8059TCXlVrcmAdznfNtgiZ7bW5LUUrajAc1696ZU",
	"VITE_SUPABASE_URL": "https://rwgjngmypmfnmmydlwve.supabase.co"
}["VITE_SUPABASE_PUBLISHABLE_KEY"];
if (!supabaseUrl || !supabasePublishableKey) console.warn("Supabase environment variables not set. Running in mock mode.");
var supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabasePublishableKey || "placeholder-key");
//#endregion
export { supabase as t };
