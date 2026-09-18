import { createFileRoute } from "@tanstack/react-router";
import { NewsGrid, PageTitle } from "@/components/sonicbase";

export const Route = createFileRoute("/news")({ head: () => ({ meta: [
  { title: "News — Sonicbase" }, { name: "description", content: "News, interviews and studio stories from Sonicbase." },
  { property: "og:title", content: "News — Sonicbase" }, { property: "og:description", content: "New music, conversations and culture from inside Sonicbase." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: NewsPage });
function NewsPage() { return <><PageTitle>In the news</PageTitle><section className="page-shell pb-28"><NewsGrid /><div className="mt-20 border-y py-16 text-center"><p className="text-sm uppercase text-muted-foreground">Sonicbase dispatch</p><h2 className="mt-3 text-3xl font-bold">More from the room, every month.</h2><p className="mt-3 text-muted-foreground">Follow @sonicbase for sessions, releases and live moments.</p></div></section></>; }