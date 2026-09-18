import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-Eeax_ugD.js
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
async function fetchArtists() {
	const { data, error } = await supabase.from("artists").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((a) => ({
		id: a.id,
		name: a.name,
		email: a.email,
		city: a.city,
		genre: a.genre,
		image: a.image,
		status: a.status
	}));
}
async function fetchArtist(id) {
	const { data, error } = await supabase.from("artists").select("*").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		city: data.city,
		genre: data.genre,
		image: data.image,
		status: data.status
	};
}
async function deleteArtist(id) {
	const { error } = await supabase.from("artists").delete().eq("id", id);
	if (error) throw error;
}
async function fetchReleases() {
	const { data, error } = await supabase.from("releases").select("*, artists(name, id)").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((r) => ({
		id: r.id,
		title: r.title,
		artist: r.artists?.name || "Unknown",
		artistId: r.artist_id || void 0,
		artistSlug: void 0,
		type: r.type,
		status: r.status,
		streams: r.streams,
		revenue: r.revenue,
		date: r.release_date,
		cover: r.cover,
		platformBreakdown: Array.isArray(r.platform_breakdown) ? r.platform_breakdown : JSON.parse(r.platform_breakdown || "[]")
	}));
}
async function fetchRelease(id) {
	const { data, error } = await supabase.from("releases").select("*, artists(name, id)").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		title: data.title,
		artist: data.artists?.name || "Unknown",
		artistId: data.artist_id || void 0,
		artistSlug: void 0,
		type: data.type,
		status: data.status,
		streams: data.streams,
		revenue: data.revenue,
		date: data.release_date,
		cover: data.cover,
		platformBreakdown: Array.isArray(data.platform_breakdown) ? data.platform_breakdown : JSON.parse(data.platform_breakdown || "[]")
	};
}
async function createRelease(release) {
	const { data, error } = await supabase.from("releases").insert(release).select("*, artists(name, id)").single();
	if (error) throw error;
	return {
		id: data.id,
		title: data.title,
		artist: data.artists?.name || "Unknown",
		artistId: data.artist_id,
		artistSlug: void 0,
		type: data.type,
		status: data.status,
		streams: 0,
		revenue: 0,
		date: data.release_date,
		cover: data.cover,
		platformBreakdown: []
	};
}
async function updateRelease(id, updates) {
	const { error } = await supabase.from("releases").update({
		...updates,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id);
	if (error) throw error;
}
async function deleteRelease(id) {
	const { error } = await supabase.from("releases").delete().eq("id", id);
	if (error) throw error;
}
async function fetchDistributions() {
	const { data, error } = await supabase.from("distributions").select("*, artists(name), releases(title)").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((d) => ({
		id: d.id,
		artist: d.artists?.name || "Unknown",
		release: d.releases?.title || "Unknown",
		status: d.status,
		platforms: d.platforms || [],
		submitted: d.submitted || "",
		released: d.released || ""
	}));
}
async function fetchDistribution(id) {
	const { data, error } = await supabase.from("distributions").select("*, artists(name), releases(title)").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		artist: data.artists?.name || "Unknown",
		release: data.releases?.title || "Unknown",
		status: data.status,
		platforms: data.platforms || [],
		submitted: data.submitted || "",
		released: data.released || ""
	};
}
async function deleteDistribution(id) {
	const { error } = await supabase.from("distributions").delete().eq("id", id);
	if (error) throw error;
}
async function fetchContracts() {
	const { data, error } = await supabase.from("contracts").select("*, artists(name)").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((c) => ({
		id: c.id,
		artist: c.artists?.name || "Unknown",
		type: c.type,
		status: c.status,
		startDate: c.start_date,
		endDate: c.end_date,
		lastUpdated: c.last_updated,
		admin: c.admin
	}));
}
async function fetchContract(id) {
	const { data, error } = await supabase.from("contracts").select("*, artists(name)").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		artist: data.artists?.name || "Unknown",
		type: data.type,
		status: data.status,
		startDate: data.start_date,
		endDate: data.end_date,
		lastUpdated: data.last_updated,
		admin: data.admin
	};
}
async function deleteContract(id) {
	const { error } = await supabase.from("contracts").delete().eq("id", id);
	if (error) throw error;
}
async function fetchLegalMatters() {
	const { data, error } = await supabase.from("legal_matters").select("*, artists(name)").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((l) => ({
		id: l.id,
		matter: l.matter,
		artist: l.artists?.name || "Unknown",
		status: l.status,
		deadline: l.deadline,
		assigned: l.assigned
	}));
}
async function fetchLegalMatter(id) {
	const { data, error } = await supabase.from("legal_matters").select("*, artists(name)").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		matter: data.matter,
		artist: data.artists?.name || "Unknown",
		status: data.status,
		deadline: data.deadline,
		assigned: data.assigned
	};
}
async function deleteLegalMatter(id) {
	const { error } = await supabase.from("legal_matters").delete().eq("id", id);
	if (error) throw error;
}
async function fetchMerch() {
	const { data, error } = await supabase.from("merchandise").select("*, artists(name)").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((m) => ({
		id: m.id,
		title: m.title,
		artist: m.artists?.name || "Unknown",
		price: m.price,
		status: m.status,
		image: m.image
	}));
}
async function fetchMerchItem(id) {
	const { data, error } = await supabase.from("merchandise").select("*, artists(name)").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		title: data.title,
		artist: data.artists?.name || "Unknown",
		price: data.price,
		status: data.status,
		image: data.image
	};
}
async function createMerch(item) {
	const { error } = await supabase.from("merchandise").insert(item);
	if (error) throw error;
}
async function updateMerch(id, updates) {
	const { error } = await supabase.from("merchandise").update({
		...updates,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id);
	if (error) throw error;
}
async function deleteMerch(id) {
	const { error } = await supabase.from("merchandise").delete().eq("id", id);
	if (error) throw error;
}
async function fetchNews() {
	const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((n) => ({
		id: n.id,
		title: n.title,
		category: n.category,
		status: n.status,
		author: n.author,
		excerpt: n.excerpt,
		image: n.image
	}));
}
async function fetchNewsItem(id) {
	const { data, error } = await supabase.from("news").select("*").eq("id", id).single();
	if (error || !data) return null;
	return {
		id: data.id,
		title: data.title,
		category: data.category,
		status: data.status,
		author: data.author,
		excerpt: data.excerpt,
		image: data.image
	};
}
async function createNews(item) {
	const { error } = await supabase.from("news").insert(item);
	if (error) throw error;
}
async function updateNews(id, updates) {
	const { error } = await supabase.from("news").update({
		...updates,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id);
	if (error) throw error;
}
async function deleteNews(id) {
	const { error } = await supabase.from("news").delete().eq("id", id);
	if (error) throw error;
}
//#endregion
export { fetchRelease as C, updateRelease as D, updateNews as E, fetchNewsItem as S, updateMerch as T, fetchLegalMatter as _, deleteContract as a, fetchMerchItem as b, deleteMerch as c, fetchArtist as d, fetchArtists as f, fetchDistributions as g, fetchDistribution as h, deleteArtist as i, deleteNews as l, fetchContracts as m, createNews as n, deleteDistribution as o, fetchContract as p, createRelease as r, deleteLegalMatter as s, createMerch as t, deleteRelease as u, fetchLegalMatters as v, fetchReleases as w, fetchNews as x, fetchMerch as y };
