import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NewsGrid, PageTitle, PillLink, Socials } from "@/components/sonicbase";
import { fetchPublishedNews, fetchPublicArtists } from "@/lib/public-data";

export const Route = createFileRoute("/news")({ head: () => ({ meta: [
  { title: "News — Sonicbase" }, { name: "description", content: "News, interviews and studio stories from Sonicbase." },
  { property: "og:title", content: "News — Sonicbase" }, { property: "og:description", content: "New music, conversations and culture from inside Sonicbase." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: NewsPage });

function NewsPage() {
  const { data: newsItems = [], isLoading } = useQuery({ queryKey: ["public-news"], queryFn: fetchPublishedNews, staleTime: 60_000 });
  const { data: artists = [] } = useQuery({ queryKey: ["public-artists"], queryFn: fetchPublicArtists, staleTime: 60_000 });
  const socialImages = artists.filter((a) => a.image).map((a) => ({ image: a.image, alt: a.name }));

  return (
    <>
      <PageTitle action={<PillLink to="/news">All News</PillLink>}>News</PageTitle>
      <section className="page-shell pb-8">
        {isLoading ? <p className="text-muted-foreground py-8 text-center">Loading news...</p> : <NewsGrid items={newsItems} />}
      </section>
      <Socials images={socialImages} />
    </>
  );
}
