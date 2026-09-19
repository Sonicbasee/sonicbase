import { supabase } from "@/lib/supabase";
import type {
  DashboardArtist,
  DashboardRelease,
  DashboardMerch,
  DashboardNews,
  StatusType,
} from "@/lib/dashboard-data";

// ============================================
// Artists
// ============================================

export async function fetchArtists(): Promise<DashboardArtist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((a: any) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    city: a.city,
    genre: a.genre,
    image: a.image,
    bio: a.bio || "",
    statement: a.statement || "",
    spotifyUrl: a.spotify_url || "",
    appleMusicUrl: a.apple_music_url || "",
    instagramUrl: a.instagram_url || "",
    status: a.status as StatusType,
  }));
}

export async function fetchArtist(id: string): Promise<DashboardArtist | null> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    city: data.city,
    genre: data.genre,
    image: data.image,
    bio: data.bio || "",
    statement: data.statement || "",
    spotifyUrl: data.spotify_url || "",
    appleMusicUrl: data.apple_music_url || "",
    instagramUrl: data.instagram_url || "",
    status: data.status as StatusType,
  };
}

export async function createArtist(artist: Omit<DashboardArtist, "id">): Promise<DashboardArtist> {
  const { data, error } = await supabase
    .from("artists")
    .insert({
      name: artist.name,
      email: artist.email,
      city: artist.city,
      genre: artist.genre,
      image: artist.image,
      bio: artist.bio || "",
      statement: artist.statement || "",
      spotify_url: artist.spotifyUrl || "",
      apple_music_url: artist.appleMusicUrl || "",
      instagram_url: artist.instagramUrl || "",
      status: artist.status,
    })
    .select()
    .single();
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
    status: data.status,
  };
}

export async function updateArtist(id: string, updates: Partial<DashboardArtist>): Promise<void> {
  const { error } = await supabase
    .from("artists")
    .update({
      name: updates.name,
      email: updates.email,
      city: updates.city,
      genre: updates.genre,
      image: updates.image,
      bio: updates.bio,
      statement: updates.statement,
      spotify_url: updates.spotifyUrl,
      apple_music_url: updates.appleMusicUrl,
      instagram_url: updates.instagramUrl,
      status: updates.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteArtist(id: string): Promise<void> {
  const { error } = await supabase.from("artists").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// Releases
// ============================================

export async function fetchReleases(): Promise<DashboardRelease[]> {
  const { data, error } = await supabase
    .from("releases")
    .select("*, artists(name, id)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((r: any) => ({
    id: r.id,
    title: r.title,
    artist: r.artists?.name || "Unknown",
    artistId: r.artist_id || undefined,
    artistSlug: undefined,
    type: r.type,
    status: r.status as StatusType,
    streams: r.streams,
    revenue: r.revenue,
    date: r.release_date,
    cover: r.cover,
    listenUrl: r.listen_url || "",
    watchUrl: r.watch_url || "",
    platformBreakdown: Array.isArray(r.platform_breakdown)
      ? r.platform_breakdown
      : JSON.parse(r.platform_breakdown || "[]"),
  }));
}

export async function fetchRelease(id: string): Promise<DashboardRelease | null> {
  const { data, error } = await supabase
    .from("releases")
    .select("*, artists(name, id)")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  if (!data) return null;
  return {
    id: data.id,
    title: data.title,
    artist: data.artists?.name || "Unknown",
    artistId: data.artist_id || undefined,
    artistSlug: undefined,
    type: data.type,
    status: data.status as StatusType,
    streams: data.streams,
    revenue: data.revenue,
    date: data.release_date,
    cover: data.cover,
    listenUrl: data.listen_url || "",
    watchUrl: data.watch_url || "",
    platformBreakdown: Array.isArray(data.platform_breakdown)
      ? data.platform_breakdown
      : JSON.parse(data.platform_breakdown || "[]"),
  };
}

export async function createRelease(release: {
  title: string;
  artist_id: string;
  type: string;
  status: string;
  release_date: string;
  cover: string;
  listen_url?: string;
  watch_url?: string;
  description?: string;
  tracks?: string[];
}): Promise<DashboardRelease> {
  const { data, error } = await supabase
    .from("releases")
    .insert({
      title: release.title,
      artist_id: release.artist_id,
      type: release.type,
      status: release.status,
      release_date: release.release_date,
      cover: release.cover,
      listen_url: release.listen_url || "",
      watch_url: release.watch_url || "",
      description: release.description || "",
      tracks: release.tracks || [],
    })
    .select("*, artists(name, id)")
    .single();
  if (error) throw error;
  return {
    id: data.id,
    title: data.title,
    artist: data.artists?.name || "Unknown",
    artistId: data.artist_id,
    artistSlug: undefined,
    type: data.type,
    status: data.status as StatusType,
    streams: 0,
    revenue: 0,
    date: data.release_date,
    cover: data.cover,
    listenUrl: data.listen_url || "",
    watchUrl: data.watch_url || "",
    platformBreakdown: [],
  };
}

export async function updateRelease(id: string, updates: {
  title?: string;
  artist_id?: string;
  type?: string;
  status?: string;
  release_date?: string;
  cover?: string;
  listen_url?: string;
  watch_url?: string;
}): Promise<void> {
  const { error } = await supabase
    .from("releases")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteRelease(id: string): Promise<void> {
  const { error } = await supabase.from("releases").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// Merchandise
// ============================================

export async function fetchMerch(): Promise<DashboardMerch[]> {
  const { data, error } = await supabase
    .from("merchandise")
    .select("*, artists(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((m: any) => ({
    id: m.id,
    title: m.title,
    artist: m.artists?.name || "Unknown",
    price: m.price,
    status: m.status as StatusType,
    image: m.image,
  }));
}

export async function fetchMerchItem(id: string): Promise<DashboardMerch | null> {
  const { data, error } = await supabase
    .from("merchandise")
    .select("*, artists(name)")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    title: data.title,
    artist: data.artists?.name || "Unknown",
    price: data.price,
    status: data.status as StatusType,
    image: data.image,
  };
}

export async function createMerch(item: {
  title: string;
  artist_id: string;
  price: number;
  description: string;
  status: string;
  image: string;
}): Promise<void> {
  const { error } = await supabase.from("merchandise").insert(item);
  if (error) throw error;
}

export async function updateMerch(id: string, updates: {
  title?: string;
  artist_id?: string;
  price?: number;
  description?: string;
  status?: string;
  image?: string;
}): Promise<void> {
  const { error } = await supabase
    .from("merchandise")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteMerch(id: string): Promise<void> {
  const { error } = await supabase.from("merchandise").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// News
// ============================================

export async function fetchNews(): Promise<DashboardNews[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((n: any) => ({
    id: n.id,
    title: n.title,
    category: n.category,
    status: n.status as StatusType,
    author: n.author,
    excerpt: n.excerpt,
    content: n.content || "",
    image: n.image,
  }));
}

export async function fetchNewsItem(id: string): Promise<DashboardNews | null> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    title: data.title,
    category: data.category,
    status: data.status as StatusType,
    author: data.author,
    excerpt: data.excerpt,
    content: data.content || "",
    image: data.image,
  };
}

export async function createNews(item: {
  title: string;
  category: string;
  status: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
}): Promise<void> {
  const { error } = await supabase.from("news").insert(item);
  if (error) throw error;
}

export async function updateNews(id: string, updates: {
  title?: string;
  category?: string;
  status?: string;
  author?: string;
  excerpt?: string;
  content?: string;
  image?: string;
}): Promise<void> {
  const { error } = await supabase
    .from("news")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// File Upload
// ============================================

export async function uploadImage(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

export async function uploadContentImage(folder: string, file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  return uploadImage("images", `${folder}/${crypto.randomUUID()}-${safeName}`, file);
}
