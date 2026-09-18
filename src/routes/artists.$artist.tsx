import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ReleaseCard, Tag } from "@/components/sonicbase";
import { artists, releases } from "@/lib/sonicbase-data";

export const Route = createFileRoute("/artists/$artist")({
  loader: ({ params }) => { const artist = artists.find((a) => a.slug === params.artist); if (!artist) throw notFound(); return artist; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Artist"} — Sonicbase` }, { name: "description", content: loaderData?.bio ?? "Sonicbase artist." },
    { property: "og:title", content: `${loaderData?.name ?? "Artist"} — Sonicbase` }, { property: "og:description", content: loaderData?.bio ?? "Sonicbase artist." },
    { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ArtistPage,
});

function ArtistPage() { const artist = Route.useLoaderData(); const artistReleases = releases.filter((r) => r.artistSlug === artist.slug); return <><section className="relative min-h-[720px] bg-primary text-primary-foreground"><img src={artist.image} alt={artist.name} width={1536} height={1536} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-foreground/35" /><div className="page-shell absolute inset-x-0 bottom-12"><Tag pale>{artist.genre}</Tag><h1 className="display-title mt-5 text-6xl sm:text-8xl lg:text-9xl">{artist.name}</h1><p className="mt-4 text-lg">{artist.city}</p></div></section><section className="page-shell grid gap-12 py-24 lg:grid-cols-2"><p className="display-title text-4xl leading-tight">“{artist.statement}”</p><div><p className="text-xl leading-relaxed">{artist.bio}</p><div className="mt-8 flex gap-2"><Button>Spotify</Button><Button variant="outline">Apple Music</Button><Button variant="outline">Instagram</Button></div></div></section><section className="page-shell pb-28"><h2 className="display-title text-5xl">Featured releases</h2><div className="mt-10 grid max-w-md grid-cols-1">{artistReleases.map((r) => <ReleaseCard key={r.slug} release={r} />)}</div><Button variant="outline" className="mt-10" asChild><Link to="/artists">All artists</Link></Button></section></>; }