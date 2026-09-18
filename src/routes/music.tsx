import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageTitle, ReleaseCard } from "@/components/sonicbase";
import { releases } from "@/lib/sonicbase-data";

export const Route = createFileRoute("/music")({ head: () => ({ meta: [
  { title: "Music — Sonicbase" }, { name: "description", content: "Browse new music and the Sonicbase catalogue." },
  { property: "og:title", content: "Music — Sonicbase" }, { property: "og:description", content: "New albums, EPs and singles from Sonicbase artists." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: MusicPage });

function MusicPage() { const [filter, setFilter] = useState("ALL"); const shown = useMemo(() => filter === "ALL" ? releases : releases.filter((r) => r.type === filter), [filter]); return <><PageTitle intro="Albums, EPs and singles from artists moving on their own frequency.">Music</PageTitle><section className="page-shell pb-28"><div className="mb-12 flex gap-2 overflow-x-auto pb-2">{["ALL","ALBUM","EP","SINGLE"].map((x) => <Button key={x} variant={filter === x ? "default" : "outline"} onClick={() => setFilter(x)}>{x === "ALL" ? "All releases" : x}</Button>)}</div><div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3">{shown.map((r) => <ReleaseCard key={r.slug} release={r} />)}</div></section></>; }