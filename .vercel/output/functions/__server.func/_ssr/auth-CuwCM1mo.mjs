import { t as supabase } from "./supabase-Drh8yxIU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CuwCM1mo.js
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
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			console.error("Login error:", error.message);
			return null;
		}
		if (!data.user) {
			console.error("No user returned");
			return null;
		}
		const { user } = data;
		const role = user.user_metadata?.["role"] === "admin" ? "admin" : "artist";
		const fullName = user.user_metadata?.["full_name"];
		const userEmail = user.email || "user@sonicbase.com";
		console.log("Login success, role:", role, "user_metadata:", user.user_metadata);
		const session = {
			id: user.id,
			name: fullName || "User",
			email: userEmail,
			role
		};
		setStoredSession(session);
		return session;
	} catch (e) {
		console.error("Login exception:", e);
		return null;
	}
}
async function logoutUser() {
	await supabase.auth.signOut();
	clearStoredSession();
}
//#endregion
export { loginUser as n, logoutUser as r, getStoredSession as t };
