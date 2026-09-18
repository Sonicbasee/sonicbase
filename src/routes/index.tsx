import { createFileRoute, Link } from "@tanstack/react-router";
import { ArtistCard, HeroCarousel, NewsGrid, PillLink, ProductCard, ReleaseCard, SectionHeading, Socials } from "@/components/sonicbase";
import { artists, products, releases } from "@/lib/sonicbase-data";

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

function Index() {
  return (
    <>
      <HeroCarousel />

      <section className="page-shell py-20 md:py-28">
        <SectionHeading action={<PillLink to="/shop">Shop All</PillLink>}>Shop</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
          {products.slice(0, 5).map((p) => <ProductCard key={p.name} product={p} />)}
        </div>
      </section>

      <section className="page-shell pb-20 md:pb-28">
        <SectionHeading action={<PillLink to="/music">All Music</PillLink>}>Music</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-3">
          {releases.map((release) => <ReleaseCard key={release.slug} release={release} />)}
        </div>
      </section>

      <section className="page-shell pb-20 md:pb-28">
        <SectionHeading action={<PillLink to="/news">All News</PillLink>}>News</SectionHeading>
        <div className="mt-12"><NewsGrid /></div>
      </section>

      <section className="page-shell pb-20 md:pb-28">
        <SectionHeading action={<PillLink to="/artists">All Artists</PillLink>}>Artists</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-3">
          {artists.map((artist) => <ArtistCard key={artist.slug} artist={artist} />)}
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="page-shell grid gap-12 lg:grid-cols-2 lg:items-end">
          <h2 className="display-title text-5xl sm:text-7xl">Built around the artist.</h2>
          <div>
            <p className="max-w-xl text-xl leading-snug text-primary-foreground/75">Sonicbase is an independent music company built for long careers, lasting records and creative ownership.</p>
            <Link to="/about" className="mt-8 inline-flex items-center rounded-full bg-background px-9 py-4 text-xl text-foreground transition-opacity hover:opacity-85">Our Story</Link>
          </div>
        </div>
      </section>

      <Socials />
    </>
  );
}
