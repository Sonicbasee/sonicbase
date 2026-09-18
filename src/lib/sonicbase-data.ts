import hero from "@/assets/sonicbase-hero.jpg";
import amara from "@/assets/artist-amara.jpg";
import kairo from "@/assets/artist-kairo.jpg";
import nova from "@/assets/artist-nova.jpg";
import afterlight from "@/assets/release-afterlight.jpg";
import openWater from "@/assets/release-open-water.jpg";
import staticBloom from "@/assets/release-static-bloom.jpg";
import studio from "@/assets/studio-story.jpg";

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  city: string;
  image: string;
  bio: string;
  statement: string;
};

export type Release = {
  slug: string;
  title: string;
  artist: string;
  artistSlug: string;
  image: string;
  type: string;
  date: string;
  description: string;
  tracks: string[];
};

export const images = { hero, studio };

export const artists: Artist[] = [
  {
    slug: "amara-vale",
    name: "Amara Vale",
    genre: "ALT-R&B · SOUL",
    city: "Lagos, NG",
    image: amara,
    bio: "Amara Vale writes nocturnal songs with a bright edge. Raised between Lagos and London, she moves through R&B, soul and sparse electronic production with a voice built for close listening.",
    statement: "Every record should leave a little light on after it ends.",
  },
  {
    slug: "kairo-north",
    name: "Kairo North",
    genre: "AFRO-FUSION · RAP",
    city: "Lagos, NG",
    image: kairo,
    bio: "Kairo North turns city observations into lucid, rhythm-led songs. His work connects Afrobeats percussion, melodic rap and the restless energy of Lagos after dark.",
    statement: "I make music for the distance between where you are and where you are going.",
  },
  {
    slug: "nova-eze",
    name: "Nova Eze",
    genre: "ELECTRONIC · CLUB",
    city: "Accra, GH",
    image: nova,
    bio: "Producer, DJ and multidisciplinary artist Nova Eze builds immersive club music from fractured vocals, live percussion and sculptural low end.",
    statement: "The dance floor is an archive. I want every set to add something to it.",
  },
];

export const releases: Release[] = [
  {
    slug: "afterlight",
    title: "Afterlight",
    artist: "Amara Vale",
    artistSlug: "amara-vale",
    image: afterlight,
    type: "EP",
    date: "18 SEPTEMBER 2026",
    description: "A five-song study of intimacy, distance and the warm glow that remains when a room goes quiet.",
    tracks: ["Red Room", "Say Less", "Afterlight", "Half Awake", "Home Before Morning"],
  },
  {
    slug: "open-water",
    title: "Open Water",
    artist: "Kairo North",
    artistSlug: "kairo-north",
    image: openWater,
    type: "ALBUM",
    date: "29 AUGUST 2026",
    description: "Wide-screen Afrofusion shaped by Lagos mornings, late-night drives and the pull of somewhere new.",
    tracks: ["First Light", "Mainland", "No Signal", "Open Water", "Palmwine", "North Star"],
  },
  {
    slug: "static-bloom",
    title: "Static Bloom",
    artist: "Nova Eze",
    artistSlug: "nova-eze",
    image: staticBloom,
    type: "SINGLE",
    date: "01 AUGUST 2026",
    description: "A chrome-edged club track where industrial rhythm opens into something unexpectedly tender.",
    tracks: ["Static Bloom", "Static Bloom (After Hours Mix)"],
  },
];

export const news = [
  { tag: "NEW MUSIC", title: "Amara Vale finds the glow on Afterlight", excerpt: "Inside the intimate sessions behind Sonicbase’s newest release.", image: afterlight },
  { tag: "INTERVIEW", title: "Kairo North on making a city feel infinite", excerpt: "The Lagos artist talks movement, memory and Open Water.", image: kairo },
  { tag: "STUDIO", title: "Building records together, from the room outward", excerpt: "A look inside the collaborative process at Sonicbase Studios.", image: studio },
];

export const products = [
  { name: "Afterlight Limited Vinyl", price: "$32.00", tag: "VINYL", image: afterlight },
  { name: "Open Water Gatefold LP", price: "$36.00", tag: "VINYL", image: openWater },
  { name: "Static Bloom Art Print", price: "$28.00", tag: "PRINT", image: staticBloom },
  { name: "Sonicbase Studio Tee", price: "$40.00", tag: "T-SHIRT", image: studio },
  { name: "Amara Vale Photo Zine", price: "$18.00", tag: "ZINE", image: amara },
  { name: "Kairo North Tour Poster", price: "$24.00", tag: "POSTER", image: kairo },
];
export type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  primaryTo: string;
  secondaryTo: string;
};

export const heroSlides: HeroSlide[] = [
  { title: "Amara Vale", subtitle: "'AFTERLIGHT' OUT NOW", image: hero, alt: "Amara Vale on a Lagos street", primaryTo: "/music", secondaryTo: "/artists" },
  { title: "Kairo North", subtitle: "'OPEN WATER' OUT NOW", image: kairo, alt: "Kairo North portrait", primaryTo: "/music", secondaryTo: "/artists" },
  { title: "Nova Eze", subtitle: "'STATIC BLOOM' OUT NOW", image: nova, alt: "Nova Eze portrait", primaryTo: "/music", secondaryTo: "/artists" },
];

export const socials = [
  { image: amara, alt: "Amara Vale backstage" },
  { image: studio, alt: "Inside Sonicbase Studios" },
  { image: kairo, alt: "Kairo North on tour" },
  { image: staticBloom, alt: "Static Bloom artwork" },
  { image: nova, alt: "Nova Eze live set" },
  { image: openWater, alt: "Open Water artwork" },
];
