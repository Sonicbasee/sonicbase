import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArtistCard, NewsGrid, ReleaseCard, SectionHeading } from "@/components/sonicbase";
import { artists, images, releases } from "@/lib/sonicbase-data";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sonicbase — Independent Music, Artist-Led" },
    { name: "description", content: "Sonicbase is a contemporary independent music company supporting artists and releases across Africa and beyond." },
    { property: "og:title", content: "Sonicbase — Independent Music, Artist-Led" },
    { property: "og:description", content: "Meet the artists, music and culture moving through Sonicbase." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-primary text-primary-foreground md:min-h-[760px]">
        <img src={images.hero} alt="Amara Vale on a Lagos street" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/25" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/90 to-transparent" />
        <div className="page-shell absolute inset-x-0 bottom-12 text-center md:bottom-10">
          <p className="mb-3 text-lg uppercase">Amara Vale</p>
          <h1 className="display-title text-5xl sm:text-7xl lg:text-8xl">Afterlight</h1>
          <p className="mt-4 text-xl md:text-3xl">New EP · Out now</p>
          <div className="mt-7 flex justify-center gap-2"><Button variant="secondary" size="lg" asChild><Link to="/music/$release" params={{ release: "afterlight" }}>Listen</Link></Button><Button variant="secondary" size="lg" asChild><Link to="/artists/$artist" params={{ artist: "amara-vale" }}>Meet Amara</Link></Button></div>
          <div className="mt-5 flex justify-center gap-2" aria-label="Slide 1 of 3"><span className="h-2 w-2 rounded-full bg-primary-foreground" /><span className="h-2 w-2 rounded-full bg-primary-foreground/45" /><span className="h-2 w-2 rounded-full bg-primary-foreground/45" /></div>
        </div>
      </section>
      <section className="page-shell py-24 md:py-32"><SectionHeading action={<Button variant="outline" asChild><Link to="/music">All music</Link></Button>}>Latest releases</SectionHeading><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">{releases.map((release) => <ReleaseCard key={release.slug} release={release} />)}</div></section>
      <section className="bg-primary py-24 text-primary-foreground md:py-32"><div className="page-shell"><div className="grid gap-12 lg:grid-cols-2 lg:items-end"><h2 className="display-title text-5xl sm:text-7xl">Built around the artist.</h2><div><p className="max-w-xl text-xl leading-snug text-primary-foreground/75">Sonicbase is an independent music company built for long careers, lasting records and creative ownership.</p><Button variant="secondary" className="mt-7" asChild><Link to="/about">Our story</Link></Button></div></div></div></section>
      <section className="page-shell py-24 md:py-32"><SectionHeading action={<Button variant="outline" asChild><Link to="/artists">All artists</Link></Button>}>Artists</SectionHeading><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">{artists.map((artist) => <ArtistCard key={artist.slug} artist={artist} />)}</div></section>
      <section className="page-shell pb-28"><SectionHeading action={<Button variant="outline" asChild><Link to="/news">All news</Link></Button>}>In the news</SectionHeading><div className="mt-12"><NewsGrid /></div></section>
      <section className="overflow-hidden pb-24"><img src={images.studio} alt="Artists working together in the Sonicbase studio" loading="lazy" width={1920} height={1088} className="h-[48vw] min-h-[360px] max-h-[680px] w-full object-cover" /></section>
    </>
  );
}
