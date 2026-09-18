import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PageTitle, ProductCard } from "@/components/sonicbase";
import { fetchPublishedMerch } from "@/lib/public-data";

export const Route = createFileRoute("/shop")({ head: () => ({ meta: [
  { title: "Shop — Sonicbase" }, { name: "description", content: "Limited music, prints and artist merchandise from Sonicbase." },
  { property: "og:title", content: "Shop Sonicbase" }, { property: "og:description", content: "Official releases and artist merchandise." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: ShopPage });

const filters = ["All", "Vinyl", "Prints", "Merch"] as const;

function ShopPage() {
  const { data: products = [], isLoading } = useQuery({ queryKey: ["public-merch"], queryFn: fetchPublishedMerch, staleTime: 60_000 });
  const [filter, setFilter] = useState<string>("All");
  const shown = useMemo(() => {
    if (filter === "All") return products;
    return products.filter((p) => p.tag.toUpperCase() === filter.toUpperCase() || p.description?.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, products]);

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
        {isLoading ? <p className="text-muted-foreground py-8 text-center">Loading shop...</p> : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5">
            {shown.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
