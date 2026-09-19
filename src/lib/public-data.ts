import { supabase } from "@/lib/supabase";

export type PublicArtist = {
  id: string;
  slug: string;
  name: string;
  genre: string;
  city: string;
  image: string;
  bio: string;
  statement: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  instagramUrl: string;
};

export type PublicRelease = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  artistId: string;
  artistSlug: string;
  artists: { id: string; name: string; slug: string; role: string }[];
  image: string;
  type: string;
  date: string;
  description: string;
  tracks: string[];
  listenUrl: string;
  watchUrl: string;
};

export type PublicNews = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt: string;
  image: string;
  author: string;
};

function newsSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export type PublicMerch = {
  id: string;
  title: string;
  artist: string;
  price: number;
  description: string;
  image: string;
  tag: string;
};

export async function fetchPublicArtists(): Promise<PublicArtist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("status", "Active")
    .order("name");
  if (error) throw error;
  return (data || []).map((a: any) => ({
    id: a.id,
    slug: a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name: a.name,
    genre: a.genre || "",
    city: a.city || "",
    image: a.image || "",
    bio: a.bio || "",
    statement: a.statement || "",
    spotifyUrl: a.spotify_url || "",
    appleMusicUrl: a.apple_music_url || "",
    instagramUrl: a.instagram_url || "",
  }));
}

export async function fetchPublicArtist(slug: string): Promise<PublicArtist | null> {
  const artists = await fetchPublicArtists();
  return artists.find((a) => a.slug === slug) || null;
}

export async function fetchPublicReleases(): Promise<PublicRelease[]> {
  let data: any[] | null = null;
  let error: any = null;
  const attempt = await supabase
    .from("releases")
    .select("*, artists(name, id), release_artists(artist_id, role, artists(name, id))")
    .eq("status", "Published")
    .order("release_date", { ascending: false });
  if (attempt.error && String(attempt.error.message).includes("release_artists")) {
    const fallback = await supabase.from("releases").select("*, artists(name, id)").eq("status", "Published").order("release_date", { ascending: false });
    data = fallback.data as any[];
    error = fallback.error;
  } else {
    data = attempt.data as any[];
    error = attempt.error;
  }
  if (error) throw error;
  return (data || []).map((r: any) => {
    const artistName = r.artists?.name || "Unknown";
    const artistSlug = artistName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    // Prefer junction table, fallback to legacy artist_id
    const junction: any[] = r.release_artists || [];
    const artists = junction.length
      ? junction.map((j: any) => ({
          id: j.artist_id,
          name: j.artists?.name || "Unknown",
          slug: (j.artists?.name || "Unknown").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          role: j.role || "Main Artist",
        }))
      : artistName !== "Unknown"
        ? [{ id: r.artist_id, name: artistName, slug: artistSlug, role: "Main Artist" }]
        : [];
    const displayArtist = artists.map((a) => a.name).join(", ") || artistName;
    return {
      id: r.id,
      slug: r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: r.title,
      artist: displayArtist,
      artistId: r.artist_id || artists[0]?.id || "",
      artistSlug,
      artists,
      image: r.cover || "",
      type: r.type || "Single",
      date: r.release_date || "",
      description: r.description || "",
      tracks: Array.isArray(r.tracks) ? r.tracks : [],
      listenUrl: r.listen_url || "",
      watchUrl: r.watch_url || "",
    };
  });
}

export async function fetchPublicRelease(slug: string): Promise<PublicRelease | null> {
  const releases = await fetchPublicReleases();
  return releases.find((r) => r.slug === slug) || null;
}

export async function fetchPublishedNews(): Promise<PublicNews[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((n: any) => ({
    id: n.id,
    slug: newsSlug(n.title),
    title: n.title,
    category: n.category || "",
    excerpt: n.excerpt || "",
    content: n.content || "",
    createdAt: n.created_at || "",
    image: n.image || "",
    author: n.author || "",
  }));
}

export async function fetchPublishedNewsItem(slug: string): Promise<PublicNews | null> {
  const news = await fetchPublishedNews();
  return news.find((item) => item.slug === slug) || null;
}

export async function fetchPublishedMerch(): Promise<PublicMerch[]> {
  const { data, error } = await supabase
    .from("merchandise")
    .select("*, artists(name)")
    .eq("status", "Published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((m: any) => ({
    id: m.id,
    title: m.title,
    artist: m.artists?.name || "Unknown",
    price: m.price || 0,
    description: m.description || "",
    image: m.image || "",
    tag: "MERCH",
  }));
}
