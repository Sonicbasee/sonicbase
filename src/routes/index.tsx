import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [shopCategory, setShopCategory] = useState("Trending");
  const shopCategories = ["Trending", "Bestsellers", "Box Sets", "Merch"];
  const shopProducts = useMemo(() => {
    if (shopCategory === "Bestsellers") return products.filter((product) => product.tag === "VINYL");
    if (shopCategory === "Box Sets") return products.filter((product) => ["VINYL", "PRINT"].includes(product.tag));
    if (shopCategory === "Merch") return products.filter((product) => ["T-SHIRT", "POSTER", "ZINE"].includes(product.tag));
    return products.slice(0, 5);
  }, [shopCategory]);

  return (
    <>
      <HeroCarousel />

      <section className="page-shell py-16 md:py-20">
        <SectionHeading action={<div className="flex max-w-full gap-2 overflow-x-auto pb-1">{shopCategories.map((category) => <Button key={category} variant={shopCategory === category ? "default" : "outline"} onClick={() => setShopCategory(category)}>{category}</Button>)}</div>}>Shop</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
          {shopProducts.map((p) => <ProductCard key={p.name} product={p} />)}
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
          <h2 className="display-title text-4xl sm:text-6xl">Built around the artist.</h2>
          <div>
            <p className="max-w-xl text-lg leading-snug text-primary-foreground/75">Sonicbase is an independent music company built for long careers, lasting records and creative ownership.</p>
            <Link to="/about" className="mt-7 inline-flex items-center rounded-full bg-background px-6 py-3 text-base text-foreground transition-opacity hover:opacity-85">Our Story</Link>
          </div>
        </div>
      </section>

      <Socials />
    </>
  );
}
