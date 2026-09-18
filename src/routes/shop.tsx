import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageTitle, Tag } from "@/components/sonicbase";
import { products } from "@/lib/sonicbase-data";

export const Route = createFileRoute("/shop")({ head: () => ({ meta: [
  { title: "Shop — Sonicbase" }, { name: "description", content: "Limited music, prints and artist merchandise from Sonicbase." },
  { property: "og:title", content: "Shop Sonicbase" }, { property: "og:description", content: "Official releases and artist merchandise." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: ShopPage });
function ShopPage() { const [filter,setFilter]=useState("ALL"); const shown=useMemo(()=>filter==="ALL"?products:products.filter((p)=>p.tag===filter),[filter]); return <><PageTitle intro="Official music and objects from the artists you love—limited runs, considered editions, nothing generic.">Shop Sonicbase</PageTitle><section className="page-shell pb-28"><div className="mb-12 grid gap-5 md:grid-cols-[1fr_auto] md:items-center"><div className="flex gap-2 overflow-x-auto pb-2">{["ALL","VINYL","T-SHIRT","PRINT","ZINE","POSTER"].map((x)=><Button key={x} variant={filter===x?"default":"outline"} onClick={()=>setFilter(x)}>{x==="ALL"?"Trending":x}</Button>)}</div><span className="text-sm text-muted-foreground">{shown.length} product(s)</span></div><div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">{shown.map((p)=><article key={p.name}><div className="relative aspect-square overflow-hidden rounded-[7px] bg-muted"><span className="absolute left-3 top-3 z-10"><Tag>{p.tag}</Tag></span><img src={p.image} alt={p.name} loading="lazy" width={1536} height={1536} className="h-full w-full object-cover" /></div><h2 className="mt-3 font-medium leading-tight">{p.name}</h2><p className="mt-1 text-sm text-muted-foreground">{p.price}</p></article>)}</div></section></>; }