import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageTitle, ProductCard } from "@/components/sonicbase";
import { products } from "@/lib/sonicbase-data";

export const Route = createFileRoute("/shop")({ head: () => ({ meta: [
  { title: "Shop — Sonicbase" }, { name: "description", content: "Limited music, prints and artist merchandise from Sonicbase." },
  { property: "og:title", content: "Shop Sonicbase" }, { property: "og:description", content: "Official releases and artist merchandise." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: ShopPage });

const filters = ["Trending", "Bestsellers", "Box Sets", "Merch"] as const;
const filterTags: Record<string, string[]> = {
  Trending: [],
  Bestsellers: ["VINYL"],
  "Box Sets": ["VINYL", "PRINT"],
  Merch: ["T-SHIRT", "POSTER", "ZINE"],
};

function ShopPage() {
  const [filter, setFilter] = useState<string>("Trending");
  const shown = useMemo(() => {
    const tags = filterTags[filter] ?? [];
    return tags.length === 0 ? products : products.filter((p) => tags.includes(p.tag));
  }, [filter]);

  return (
    <>
      <PageTitle
        action={
          <div className="flex gap-3 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors md:text-base ${filter === f ? "border-foreground text-foreground" : "border-input text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      >
        Shop
      </PageTitle>
      <section className="page-shell pb-28">
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
          {shown.map((p) => <ProductCard key={p.name} product={p} />)}
        </div>
      </section>
    </>
  );
}
