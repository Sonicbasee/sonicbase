import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { NewsGrid, Tag } from "@/components/sonicbase";
import { fetchPublishedNews, fetchPublishedNewsItem } from "@/lib/public-data";

export const Route = createFileRoute("/news/$news")({
  loader: async ({ params }) => {
    const item = await fetchPublishedNewsItem(params.news);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "News"} — Sonicbase` },
      { name: "description", content: loaderData?.excerpt ?? "News from Sonicbase." },
      { property: "og:title", content: `${loaderData?.title ?? "News"} — Sonicbase` },
      { property: "og:description", content: loaderData?.excerpt ?? "News from Sonicbase." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsDetailPage,
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Sonicbase editorial" : new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(date);
}

function NewsDetailPage() {
  const item = Route.useLoaderData();
  const { data: allNews = [] } = useQuery({ queryKey: ["public-news"], queryFn: fetchPublishedNews, staleTime: 60_000 });
  const related = allNews.filter((news) => news.id !== item.id).slice(0, 3);
  const paragraphs = item.content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return (
    <>
      <article>
        <header className="page-shell pb-10 pt-12 md:pb-14 md:pt-20">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to news
          </Link>
          <div className="mt-12 max-w-4xl">
            <Tag>{item.category}</Tag>
            <h1 className="display-title mt-6 text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">{item.title}</h1>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span>{item.author || "Sonicbase editorial"}</span>
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </header>

        <div className="page-shell">
          <div className="aspect-[16/8] overflow-hidden rounded-[10px] bg-muted">
            {item.image ? <img src={item.image} alt={item.title} width={1920} height={960} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>}
          </div>
        </div>

        <div className="page-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <p className="text-xl font-medium leading-relaxed md:text-2xl">{item.excerpt}</p>
          <div className="max-w-2xl text-base leading-[1.8] text-foreground/80">
            {paragraphs.length > 0 ? paragraphs.map((paragraph) => <p key={paragraph} className="mb-6 last:mb-0">{paragraph}</p>) : <p>{item.excerpt}</p>}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="page-shell">
            <h2 className="display-title text-4xl sm:text-5xl">More stories</h2>
            <div className="mt-8"><NewsGrid items={related} /></div>
          </div>
        </section>
      )}
    </>
  );
}
