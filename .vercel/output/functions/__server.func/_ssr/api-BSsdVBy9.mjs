import { t as supabase } from "./supabase-Drh8yxIU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BSsdVBy9.js
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
		bio: a.bio || "",
		statement: a.statement || "",
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
		bio: data.bio || "",
		statement: data.statement || "",
		status: data.status
	};
}
async function createArtist(artist) {
	const { data, error } = await supabase.from("artists").insert({
		name: artist.name,
		email: artist.email,
		city: artist.city,
		genre: artist.genre,
		image: artist.image,
		bio: artist.bio || "",
		statement: artist.statement || "",
		status: artist.status
	}).select().single();
	if (error) throw error;
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		city: data.city,
		genre: data.genre,
		image: data.image,
		bio: data.bio || "",
		statement: data.statement || "",
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
	const { data, error } = await supabase.from("releases").insert({
		title: release.title,
		artist_id: release.artist_id,
		type: release.type,
		status: release.status,
		release_date: release.release_date,
		cover: release.cover,
		description: release.description || "",
		tracks: release.tracks || []
	}).select("*, artists(name, id)").single();
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
export { updateMerch as _, deleteArtist as a, deleteRelease as c, fetchMerch as d, fetchMerchItem as f, fetchReleases as g, fetchRelease as h, createRelease as i, fetchArtist as l, fetchNewsItem as m, createMerch as n, deleteMerch as o, fetchNews as p, createNews as r, deleteNews as s, createArtist as t, fetchArtists as u, updateNews as v, updateRelease as y };
