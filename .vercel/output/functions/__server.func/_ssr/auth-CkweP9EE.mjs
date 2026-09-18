import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CkweP9EE.js
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
var supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabasePublishableKey || "placeholder-key");
var SESSION_KEY = "sonicbase-session";
function getStoredSession() {
	if (typeof window === "undefined") return null;
	const raw = window.localStorage.getItem(SESSION_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function setStoredSession(user) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
function clearStoredSession() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(SESSION_KEY);
}
async function loginUser(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	if (error || !data.user) return null;
	const { user } = data;
	const role = user.user_metadata?.["role"] === "admin" ? "admin" : "artist";
	const fullName = user.user_metadata?.["full_name"];
	const userEmail = user.email || "user@sonicbase.com";
	const session = {
		id: user.id,
		name: fullName || "User",
		email: userEmail,
		role
	};
	setStoredSession(session);
	return session;
}
async function logoutUser() {
	await supabase.auth.signOut();
	clearStoredSession();
}
async function getCurrentSession() {
	const stored = getStoredSession();
	if (stored) try {
		const { data, error } = await supabase.auth.getSession();
		if (error || !data.session) {
			clearStoredSession();
			return null;
		}
		return stored;
	} catch {
		clearStoredSession();
		return null;
	}
	try {
		const { data, error } = await supabase.auth.getSession();
		if (error || !data.session) return null;
		const { user } = data.session;
		const role = user.user_metadata?.["role"] === "admin" ? "admin" : "artist";
		const rawFullName = user.user_metadata?.["full_name"];
		const userEmail = user.email || "user@sonicbase.com";
		const session = {
			id: user.id,
			name: rawFullName || "User",
			email: userEmail,
			role
		};
		setStoredSession(session);
		return session;
	} catch (e) {
		return getStoredSession();
	}
}
//#endregion
export { logoutUser as i, getStoredSession as n, loginUser as r, getCurrentSession as t };
