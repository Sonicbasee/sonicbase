export type StatusType = 
  | "Draft"
  | "Pending"
  | "Published"
  | "Processing"
  | "Distributed"
  | "Failed"
  | "Active"
  | "Scheduled"
  | "Archived"
  | "Requires action"
  | "Open"
  | "Resolved"
  | "Pending signature"
  | "Expiring"
  | "In review"
  | "Awaiting document";

export type DashboardArtist = {
  id: string;
  name: string;
  email: string;
  city: string;
  genre: string;
  image: string;
  bio: string;
  statement: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  instagramUrl?: string;
  status: StatusType;
};

export type DashboardRelease = {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  artistSlug?: string;
  type: "Album" | "EP" | "Single";
  status: StatusType;
  streams: number;
  revenue: number;
  date: string;
  cover: string;
  listenUrl?: string;
  watchUrl?: string;
  platformBreakdown: { platform: string; value: number }[];
};

export type DashboardMerch = {
  id: string;
  title: string;
  artist: string;
  price: number;
  status: StatusType;
  image: string;
};

export type DashboardNews = {
  id: string;
  title: string;
  category: string;
  status: StatusType;
  author: string;
  excerpt: string;
  content?: string;
  image: string;
};

export const dashboardArtists: DashboardArtist[] = [
  {
    id: "amara",
    name: "Amara Vale",
    email: "amara@sonicbase.com",
    city: "Lagos",
    genre: "Alt-R&B",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    status: "Active",
  },
  {
    id: "kairo",
    name: "Kairo North",
    email: "kairo@sonicbase.com",
    city: "Lagos",
    genre: "Afrofusion",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    status: "Active",
  },
  {
    id: "nova",
    name: "Nova Eze",
    email: "nova@sonicbase.com",
    city: "Accra",
    genre: "Electronic",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    status: "Pending",
  },
  {
    id: "zoe",
    name: "Zoe Hart",
    email: "zoe@sonicbase.com",
    city: "Abuja",
    genre: "Soul",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    status: "Active",
  },
];

export const dashboardReleases: DashboardRelease[] = [
  {
    id: "afterlight",
    title: "Afterlight",
    artist: "Amara Vale",
    artistId: "amara",
    type: "EP",
    status: "Published",
    streams: 2400000,
    revenue: 1250000,
    date: "2026-09-18",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    platformBreakdown: [
      { platform: "Spotify", value: 890000 },
      { platform: "Apple Music", value: 540000 },
      { platform: "YouTube Music", value: 310000 },
      { platform: "Audiomack", value: 210000 },
      { platform: "Boomplay", value: 200000 },
    ],
  },
  {
    id: "open-water",
    title: "Open Water",
    artist: "Kairo North",
    artistId: "kairo",
    type: "Album",
    status: "Published",
    streams: 4100000,
    revenue: 2690000,
    date: "2026-08-29",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    platformBreakdown: [
      { platform: "Spotify", value: 1570000 },
      { platform: "Apple Music", value: 930000 },
      { platform: "YouTube Music", value: 560000 },
      { platform: "Audiomack", value: 320000 },
      { platform: "Boomplay", value: 730000 },
    ],
  },
  {
    id: "static-bloom",
    title: "Static Bloom",
    artist: "Nova Eze",
    artistId: "nova",
    type: "Single",
    status: "Processing",
    streams: 980000,
    revenue: 420000,
    date: "2026-08-01",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    platformBreakdown: [
      { platform: "Spotify", value: 320000 },
      { platform: "Apple Music", value: 190000 },
      { platform: "YouTube Music", value: 210000 },
      { platform: "Audiomack", value: 160000 },
      { platform: "Boomplay", value: 100000 },
    ],
  },
];

export const artistRevenueSeries = [
  { month: "Jan", revenue: 820000 },
  { month: "Feb", revenue: 930000 },
  { month: "Mar", revenue: 1100000 },
  { month: "Apr", revenue: 1040000 },
  { month: "May", revenue: 1260000 },
  { month: "Jun", revenue: 1380000 },
  { month: "Jul", revenue: 1420000 },
  { month: "Aug", revenue: 1640000 },
  { month: "Sep", revenue: 1750000 },
];

export const artistStreamSeries = [
  { date: "Mon", value: 72000 },
  { date: "Tue", value: 81000 },
  { date: "Wed", value: 76000 },
  { date: "Thu", value: 90000 },
  { date: "Fri", value: 124000 },
  { date: "Sat", value: 138000 },
  { date: "Sun", value: 118000 },
];

export const adminOverviewStats = {
  artists: { total: 34, active: 28, new: 6 },
  releases: { total: 81, recent: 9, awaiting: 12 },
  streams: { total: 382000000, period: 34500000, growth: 14.8 },
  revenue: { total: 148000000, period: 18500000, pending: 3600000 },
  distribution: { active: 18, pending: 7, failed: 2 },
  contracts: { active: 22, expiring: 4, pending: 6 },
  legal: { open: 3, pending: 5, attention: 2 },
  merchandise: { total: 26, published: 19, draft: 7 },
};

export const merchandise: DashboardMerch[] = [
  {
    id: "M-010",
    title: "Afterlight Tee",
    artist: "Amara Vale",
    price: 42000,
    status: "Published",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "M-016",
    title: "Open Water Poster",
    artist: "Kairo North",
    price: 28000,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
];

export const newsItems: DashboardNews[] = [
  {
    id: "N-105",
    title: "Amara Vale unveils a new visual chapter",
    category: "Feature",
    status: "Published",
    author: "Sonicbase Studio",
    excerpt: "The new visual essay traces how Afterlight came together in Lagos and London.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "N-112",
    title: "Kairo North in conversation",
    category: "Interview",
    status: "Draft",
    author: "Maya Eze",
    excerpt: "The artist speaks on movement, memory and making records in motion.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  },
];

export const adminRevenueData = [
  { month: "Jan", revenue: 5200000 },
  { month: "Feb", revenue: 6100000 },
  { month: "Mar", revenue: 7100000 },
  { month: "Apr", revenue: 7600000 },
  { month: "May", revenue: 8900000 },
  { month: "Jun", revenue: 9500000 },
  { month: "Jul", revenue: 10800000 },
  { month: "Aug", revenue: 11600000 },
  { month: "Sep", revenue: 12900000 },
];

export const adminStreamData = [
  { name: "Spotify", value: 49 },
  { name: "Apple", value: 24 },
  { name: "YouTube", value: 12 },
  { name: "Audiomack", value: 9 },
  { name: "Boomplay", value: 6 },
];