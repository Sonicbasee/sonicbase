import { t as supabase } from "./supabase-Drh8yxIU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-data-SLjy_1a6.js
async function fetchPublicArtists() {
	const { data, error } = await supabase.from("artists").select("*").eq("status", "Active").order("name");
	if (error) throw error;
	return (data || []).map((a) => ({
		id: a.id,
		slug: a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
		name: a.name,
		genre: a.genre || "",
		city: a.city || "",
		image: a.image || "",
		bio: a.bio || "",
		statement: a.statement || ""
	}));
}
async function fetchPublicReleases() {
	const { data, error } = await supabase.from("releases").select("*, artists(name, id)").order("release_date", { ascending: false });
	if (error) throw error;
	return (data || []).map((r) => {
		const artistName = r.artists?.name || "Unknown";
		const artistSlug = artistName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
		return {
			id: r.id,
			slug: r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
			title: r.title,
			artist: artistName,
			artistId: r.artist_id || "",
			artistSlug,
			image: r.cover || "",
			type: r.type || "Single",
			date: r.release_date || "",
			description: r.description || "",
			tracks: Array.isArray(r.tracks) ? r.tracks : []
		};
	});
}
async function fetchPublishedNews() {
	const { data, error } = await supabase.from("news").select("*").eq("status", "Published").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((n) => ({
		id: n.id,
		title: n.title,
		category: n.category || "",
		excerpt: n.excerpt || "",
		image: n.image || "",
		author: n.author || ""
	}));
}
async function fetchPublishedMerch() {
	const { data, error } = await supabase.from("merchandise").select("*, artists(name)").eq("status", "Published").order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((m) => ({
		id: m.id,
		title: m.title,
		artist: m.artists?.name || "Unknown",
		price: m.price || 0,
		description: m.description || "",
		image: m.image || "",
		tag: "MERCH"
	}));
}
//#endregion
export { fetchPublishedNews as i, fetchPublicReleases as n, fetchPublishedMerch as r, fetchPublicArtists as t };
