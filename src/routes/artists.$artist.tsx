import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ReleaseCard, Tag } from "@/components/sonicbase";
import { fetchPublicArtists, fetchPublicReleases } from "@/lib/public-data";

export const Route = createFileRoute("/artists/$artist")({
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Artist"} — Sonicbase` }, { name: "description", content: loaderData?.bio ?? "Sonicbase artist." },
    { property: "og:title", content: `${loaderData?.name ?? "Artist"} — Sonicbase` }, { property: "og:description", content: loaderData?.bio ?? "Sonicbase artist." },
    { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ArtistPage,
  loader: async ({ params }) => {
    const artists = await fetchPublicArtists();
    const artist = artists.find((a) => a.slug === params.artist);
    if (!artist) throw notFound();
    return artist;
  },
});

function ArtistPage() {
  const artist = Route.useLoaderData();
  const { data: releases = [] } = useQuery({ queryKey: ["public-releases"], queryFn: fetchPublicReleases, staleTime: 60_000 });
  const artistReleases = releases.filter((r) => r.artists?.some((a) => a.slug === artist.slug) || r.artistSlug === artist.slug);

  return (
    <>
      <section className="relative min-h-[660px] bg-primary text-primary-foreground">
        {artist.image ? (
          <img src={artist.image} alt={artist.name} width={1536} height={1536} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-primary/50" />
        )}
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="page-shell absolute inset-x-0 bottom-12">
          <Tag pale>{artist.genre}</Tag>
          <h1 className="display-title mt-5 text-5xl sm:text-7xl lg:text-8xl">{artist.name}</h1>
          <p className="mt-3 text-base">{artist.city}</p>
        </div>
      </section>
      <section className="page-shell grid gap-10 py-20 lg:grid-cols-2">
        <p className="display-title text-3xl leading-tight">"{artist.statement}"</p>
        <div>
          <p className="text-lg leading-relaxed">{artist.bio}</p>
          <div className="mt-7 flex gap-2">
            {artist.spotifyUrl ? <Button asChild><a href={artist.spotifyUrl} target="_blank" rel="noreferrer">Spotify</a></Button> : <Button disabled>Spotify</Button>}
            {artist.appleMusicUrl ? <Button variant="outline" asChild><a href={artist.appleMusicUrl} target="_blank" rel="noreferrer">Apple Music</a></Button> : <Button variant="outline" disabled>Apple Music</Button>}
            {artist.instagramUrl ? <Button variant="outline" asChild><a href={artist.instagramUrl} target="_blank" rel="noreferrer">Instagram</a></Button> : <Button variant="outline" disabled>Instagram</Button>}
          </div>
        </div>
      </section>
      <section className="page-shell pb-24">
        <h2 className="display-title text-4xl">Featured releases</h2>
        <div className="mt-8 grid max-w-md grid-cols-1">
          {artistReleases.length > 0 ? artistReleases.map((r) => <ReleaseCard key={r.id} release={r} />) : <p className="text-muted-foreground">No releases yet.</p>}
        </div>
        <Button variant="outline" className="mt-8" asChild><Link to="/artists">All artists</Link></Button>
      </section>
    </>
  );
}
