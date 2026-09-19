import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroCarousel, NewsGrid, PillLink, ProductCard, ReleaseCard, SectionHeading, Socials } from "@/components/sonicbase";
import { fetchPublicArtists, fetchPublicReleases, fetchPublishedNews, fetchPublishedMerch } from "@/lib/public-data";

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
  const { data: artists = [] } = useQuery({ queryKey: ["public-artists"], queryFn: fetchPublicArtists, staleTime: 60_000 });
  const { data: releases = [] } = useQuery({ queryKey: ["public-releases"], queryFn: fetchPublicReleases, staleTime: 60_000 });
  const { data: newsItems = [] } = useQuery({ queryKey: ["public-news"], queryFn: fetchPublishedNews, staleTime: 60_000 });
  const { data: merchItems = [] } = useQuery({ queryKey: ["public-merch"], queryFn: fetchPublishedMerch, staleTime: 60_000 });

  const [shopCategory, setShopCategory] = useState("Trending");
  const shopCategories = ["Trending", "Bestsellers", "Box Sets", "Merch"];
  const shopProducts = useMemo(() => {
    if (shopCategory === "Bestsellers") return merchItems.filter((p) => p.tag === "VINYL");
    if (shopCategory === "Box Sets") return merchItems.filter((p) => ["VINYL", "PRINT"].includes(p.tag));
    if (shopCategory === "Merch") return merchItems.filter((p) => ["T-SHIRT", "POSTER", "ZINE"].includes(p.tag));
    return merchItems.slice(0, 5);
  }, [shopCategory, merchItems]);

  const heroSlides = releases.slice(0, 3).map((release) => ({
    title: release.title,
    subtitle: `${release.artist} · ${release.type}`,
    image: release.image || "",
    alt: `${release.title} artwork`,
    primaryTo: "/music/$release",
    primaryParams: { release: release.slug },
    primaryHref: release.listenUrl,
    primaryLabel: release.listenUrl ? "Listen" : "View release",
    secondaryHref: release.watchUrl,
    secondaryTo: "/music/$release",
    secondaryParams: { release: release.slug },
    secondaryLabel: "Watch",
  }));

  // WORKAROUND: Instagram blocks direct mp4 scraping, so for inline autoplay we host the mp4.
  // Provide videoUrl (hosted mp4) for each reel to play video-only inside the card (no chrome, no play button).
  // If videoUrl is absent, it falls back to cover image via og:image.
  const instagramReels: { url: string; videoUrl?: string }[] = [
    { url: "https://www.instagram.com/reel/DG5SHA2NOnH/" },
    { url: "https://www.instagram.com/reel/DITK_YRtuC5/" },
    { url: "https://www.instagram.com/reel/Dck_1SZNDfK/" },
    { url: "https://www.instagram.com/reel/DcVexTaN79i/" },
    { url: "https://www.instagram.com/reel/DTIg5XXjZrX/" },
    { url: "https://www.instagram.com/reel/DVsmRnojSlG/" },
    // Example with hosted video: { url: "https://www.instagram.com/reel/DG5SHA2NOnH/", videoUrl: "https://xxx.supabase.co/storage/v1/object/public/videos/reel1.mp4" },
  ];

  const socialImages = instagramReels.map((r, i) => ({
    image: "",
    alt: `Instagram reel ${i + 1}`,
    instagramUrl: r.url,
    videoUrl: r.videoUrl,
  }));

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className="page-shell py-16 md:py-20">
        <SectionHeading action={<div className="flex max-w-full gap-2 overflow-x-auto pb-1">{shopCategories.map((category) => <Button key={category} variant={shopCategory === category ? "default" : "outline"} onClick={() => setShopCategory(category)}>{category}</Button>)}</div>}>Shop</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
          {shopProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="page-shell pb-20 md:pb-28">
        <SectionHeading action={<PillLink to="/music">All Music</PillLink>}>Music</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-3">
          {releases.slice(0, 6).map((release) => <ReleaseCard key={release.id} release={release} />)}
        </div>
      </section>

      <section className="page-shell pb-20 md:pb-28">
        <SectionHeading action={<PillLink to="/news">All News</PillLink>}>News</SectionHeading>
        <div className="mt-12"><NewsGrid items={newsItems} /></div>
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

      <Socials images={socialImages} />
    </>
  );
}
