import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ReleaseCard, Tag } from "@/components/sonicbase";
import { fetchPublicReleases } from "@/lib/public-data";

export const Route = createFileRoute("/music/$release")({
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Release"} — Sonicbase` }, { name: "description", content: loaderData?.description ?? "A Sonicbase release." },
    { property: "og:title", content: `${loaderData?.title ?? "Release"} — Sonicbase` }, { property: "og:description", content: loaderData?.description ?? "A Sonicbase release." },
    { property: "og:type", content: "music.album" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReleasePage,
  loader: async ({ params }) => {
    const releases = await fetchPublicReleases();
    const release = releases.find((r) => r.slug === params.release);
    if (!release) throw notFound();
    return release;
  },
});

function ReleasePage() {
  const release = Route.useLoaderData();
  const { data: allReleases = [] } = useQuery({ queryKey: ["public-releases"], queryFn: fetchPublicReleases, staleTime: 60_000 });
  const related = allReleases.filter((r) => r.id !== release.id).slice(0, 2);

  return (
    <>
      <section className="page-shell grid gap-10 pb-20 pt-10 lg:grid-cols-2 lg:items-end">
        {release.image ? (
          <img src={release.image} alt={`${release.title} artwork`} width={1536} height={1536} className="aspect-square w-full rounded-[7px] object-cover" />
        ) : (
          <div className="aspect-square w-full rounded-[7px] bg-muted flex items-center justify-center text-muted-foreground">No cover art</div>
        )}
        <div className="pb-3">
          <Tag>{release.type}</Tag>
          <h1 className="display-title mt-5 text-5xl sm:text-7xl">{release.title}</h1>
          <Link to="/artists/$artist" params={{ artist: release.artistSlug }} className="mt-3 block text-xl font-bold">{release.artist}</Link>
          <p className="mt-6 max-w-lg text-base text-muted-foreground">{release.description}</p>
          <p className="mt-5 text-xs">{release.date}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Button onClick={() => alert("Streaming links coming soon!")}>Listen now</Button>
            <Button variant="outline" onClick={() => alert("Purchase options coming soon!")}>Buy</Button>
          </div>
        </div>
      </section>
      {release.tracks.length > 0 && (
        <section className="bg-primary text-primary-foreground">
          <div className="page-shell grid gap-10 py-20 lg:grid-cols-2">
            <h2 className="display-title text-4xl">Track listing</h2>
            <ol>{release.tracks.map((track, i) => <li key={track} className="grid grid-cols-[2rem_1fr_auto] border-b border-primary-foreground/25 py-4 text-sm"><span className="text-primary-foreground/50">{String(i + 1).padStart(2, "0")}</span><span>{track}</span><span className="text-primary-foreground/50">•••</span></li>)}</ol>
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section className="page-shell py-20">
          <h2 className="display-title text-4xl">More music</h2>
          <div className="mt-8 grid grid-cols-2 gap-3">{related.map((r) => <ReleaseCard key={r.id} release={r} />)}</div>
        </section>
      )}
    </>
  );
}
