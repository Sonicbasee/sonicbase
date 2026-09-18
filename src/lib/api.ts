import { supabase } from "@/lib/supabase";
import type {
  DashboardArtist,
  DashboardRelease,
  DashboardDistribution,
  DashboardContract,
  DashboardLegalMatter,
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
    status: a.status as StatusType,
  }));
}

export async function fetchArtist(id: string): Promise<DashboardArtist | null> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    city: data.city,
    genre: data.genre,
    image: data.image,
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
  if (error || !data) return null;
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
}): Promise<DashboardRelease> {
  const { data, error } = await supabase
    .from("releases")
    .insert(release)
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
// Distributions
// ============================================

export async function fetchDistributions(): Promise<DashboardDistribution[]> {
  const { data, error } = await supabase
    .from("distributions")
    .select("*, artists(name), releases(title)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((d: any) => ({
    id: d.id,
    artist: d.artists?.name || "Unknown",
    release: d.releases?.title || "Unknown",
    status: d.status as StatusType,
    platforms: d.platforms || [],
    submitted: d.submitted || "",
    released: d.released || "",
  }));
}

export async function fetchDistribution(id: string): Promise<DashboardDistribution | null> {
  const { data, error } = await supabase
    .from("distributions")
    .select("*, artists(name), releases(title)")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    artist: data.artists?.name || "Unknown",
    release: data.releases?.title || "Unknown",
    status: data.status as StatusType,
    platforms: data.platforms || [],
    submitted: data.submitted || "",
    released: data.released || "",
  };
}

export async function createDistribution(dist: {
  artist_id: string;
  release_id: string;
  status: string;
  platforms: string[];
  submitted: string;
  released: string;
}): Promise<void> {
  const { error } = await supabase.from("distributions").insert(dist);
  if (error) throw error;
}

export async function updateDistribution(id: string, updates: {
  status?: string;
  platforms?: string[];
  submitted?: string;
  released?: string;
}): Promise<void> {
  const { error } = await supabase
    .from("distributions")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteDistribution(id: string): Promise<void> {
  const { error } = await supabase.from("distributions").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// Contracts
// ============================================

export async function fetchContracts(): Promise<DashboardContract[]> {
  const { data, error } = await supabase
    .from("contracts")
    .select("*, artists(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((c: any) => ({
    id: c.id,
    artist: c.artists?.name || "Unknown",
    type: c.type,
    status: c.status as StatusType,
    startDate: c.start_date,
    endDate: c.end_date,
    lastUpdated: c.last_updated,
    admin: c.admin,
  }));
}

export async function fetchContract(id: string): Promise<DashboardContract | null> {
  const { data, error } = await supabase
    .from("contracts")
    .select("*, artists(name)")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    artist: data.artists?.name || "Unknown",
    type: data.type,
    status: data.status as StatusType,
    startDate: data.start_date,
    endDate: data.end_date,
    lastUpdated: data.last_updated,
    admin: data.admin,
  };
}

export async function createContract(contract: {
  artist_id: string;
  type: string;
  status: string;
  start_date: string;
  end_date: string;
  admin: string;
}): Promise<void> {
  const { error } = await supabase.from("contracts").insert({
    ...contract,
    last_updated: new Date().toISOString().split("T")[0],
  });
  if (error) throw error;
}

export async function updateContract(id: string, updates: {
  type?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  admin?: string;
}): Promise<void> {
  const { error } = await supabase
    .from("contracts")
    .update({ ...updates, last_updated: new Date().toISOString().split("T")[0], updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteContract(id: string): Promise<void> {
  const { error } = await supabase.from("contracts").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// Legal Matters
// ============================================

export async function fetchLegalMatters(): Promise<DashboardLegalMatter[]> {
  const { data, error } = await supabase
    .from("legal_matters")
    .select("*, artists(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((l: any) => ({
    id: l.id,
    matter: l.matter,
    artist: l.artists?.name || "Unknown",
    status: l.status as StatusType,
    deadline: l.deadline,
    assigned: l.assigned,
  }));
}

export async function fetchLegalMatter(id: string): Promise<DashboardLegalMatter | null> {
  const { data, error } = await supabase
    .from("legal_matters")
    .select("*, artists(name)")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    matter: data.matter,
    artist: data.artists?.name || "Unknown",
    status: data.status as StatusType,
    deadline: data.deadline,
    assigned: data.assigned,
  };
}

export async function createLegalMatter(matter: {
  matter: string;
  artist_id: string;
  status: string;
  deadline: string;
  assigned: string;
}): Promise<void> {
  const { error } = await supabase.from("legal_matters").insert(matter);
  if (error) throw error;
}

export async function updateLegalMatter(id: string, updates: {
  matter?: string;
  status?: string;
  deadline?: string;
  assigned?: string;
}): Promise<void> {
  const { error } = await supabase
    .from("legal_matters")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteLegalMatter(id: string): Promise<void> {
  const { error } = await supabase.from("legal_matters").delete().eq("id", id);
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
