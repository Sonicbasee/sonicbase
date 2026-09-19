import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/sonicbase";
import { fetchPublishedMerch } from "@/lib/public-data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$productId")({
  loader: async ({ params }) => {
    const products = await fetchPublishedMerch();
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Product"} — Sonicbase Shop` },
      { name: "description", content: loaderData?.description ?? "Shop Sonicbase merchandise." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="page-shell grid gap-10 py-10 lg:grid-cols-2 lg:py-20">
      <div className="aspect-square overflow-hidden rounded-[16px] bg-muted">
        {product.image ? (
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>
      <div className="flex flex-col">
        <Tag>{product.tag}</Tag>
        <h1 className="display-title mt-4 text-4xl sm:text-5xl">{product.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{product.artist}</p>
        <p className="mt-4 text-2xl font-bold">₦{product.price.toLocaleString()}</p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description || "Official Sonicbase merchandise. Limited stock."}</p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-border p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              -
            </Button>
            <span className="w-8 text-center text-sm font-medium">{qty}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQty((q) => q + 1)}>
              +
            </Button>
          </div>
          <Button onClick={handleAdd} className="flex-1 rounded-full py-6 text-base">
            {added ? "Added!" : "Add to cart"}
          </Button>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" asChild className="flex-1 rounded-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
          <Button asChild className="flex-1 rounded-full">
            <Link to="/checkout">Go to checkout</Link>
          </Button>
        </div>

        <div className="mt-8 rounded-xl bg-muted p-4 text-sm">
          <p className="font-medium">Delivery</p>
          <p className="mt-1 text-muted-foreground">Nationwide delivery · 2-5 days · ₦3,500 flat shipping. Pay on delivery.</p>
        </div>
      </div>
    </section>
  );
}
