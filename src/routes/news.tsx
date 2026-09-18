import { createFileRoute } from "@tanstack/react-router";
import { NewsGrid, PageTitle, PillLink, Socials } from "@/components/sonicbase";

export const Route = createFileRoute("/news")({ head: () => ({ meta: [
  { title: "News — Sonicbase" }, { name: "description", content: "News, interviews and studio stories from Sonicbase." },
  { property: "og:title", content: "News — Sonicbase" }, { property: "og:description", content: "New music, conversations and culture from inside Sonicbase." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: NewsPage });

function NewsPage() {
  return (
    <>
      <PageTitle action={<PillLink to="/news">All News</PillLink>}>News</PageTitle>
      <section className="page-shell pb-8"><NewsGrid /></section>
      <Socials />
    </>
  );
}
