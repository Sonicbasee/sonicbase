import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ArtistCard, PageTitle } from "@/components/sonicbase";
import { artists } from "@/lib/sonicbase-data";

export const Route = createFileRoute("/artists")({ head: () => ({ meta: [
  { title: "Artists — Sonicbase" }, { name: "description", content: "Explore the artists shaping Sonicbase." },
  { property: "og:title", content: "Sonicbase Artists" }, { property: "og:description", content: "Independent voices across R&B, Afrofusion and electronic music." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: ArtistsPage });

function ArtistsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => artists.filter((a) => `${a.name} ${a.genre} ${a.city}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <><PageTitle intro="Distinct voices. Long-term vision. Meet the artists building what comes next.">Artists</PageTitle><section className="page-shell pb-28"><div className="mb-12 max-w-md"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artists" aria-label="Search artists" className="h-12 rounded-full px-5 shadow-none" /></div>{filtered.length ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3">{filtered.map((a) => <ArtistCard key={a.slug} artist={a} />)}</div> : <div className="border-y py-20 text-center"><p className="text-xl font-bold">No artists found</p><p className="mt-2 text-muted-foreground">Try a different name, city or genre.</p></div>}</section></>;
}