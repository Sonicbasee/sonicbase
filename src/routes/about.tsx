import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/sonicbase";
import { images } from "@/lib/sonicbase-data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Sonicbase" }, { name: "description", content: "Meet the independent music company behind Sonicbase." },
    { property: "og:title", content: "About Sonicbase" }, { property: "og:description", content: "An artist-led music company connecting bold ideas to global audiences." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: AboutPage,
});

function AboutPage() {
  return <><PageTitle intro="An independent music company connecting bold artists, patient development and global audiences.">We move music forward.</PageTitle><img src={images.studio} alt="A collaborative session at Sonicbase Studios" width={1920} height={1088} className="h-[55vw] max-h-[760px] min-h-[380px] w-full object-cover" /><section className="page-shell grid gap-10 py-24 md:grid-cols-2 md:py-32"><h2 className="display-title text-5xl md:text-7xl">Artist first.<br />Always.</h2><div className="max-w-xl space-y-6 text-lg leading-relaxed"><p>Sonicbase began with a simple belief: artists do their best work when creative independence and practical support move together.</p><p>We partner across recording, distribution, publishing, strategy and live culture. Every relationship is designed around the artist—not a template.</p><Button asChild><Link to="/contact">Work with us</Link></Button></div></section><section className="bg-muted"><div className="page-shell grid gap-px py-24 md:grid-cols-3">{[["01","Development","Patient, hands-on support from first demo to lasting catalogue."],["02","Distribution","Global release strategy with local cultural intelligence."],["03","Ownership","Transparent partnerships that protect creative control."]].map(([n,t,d]) => <article key={n} className="border-t border-foreground py-7 md:px-7"><p className="text-sm">{n}</p><h3 className="mt-14 text-2xl font-bold">{t}</h3><p className="mt-3 text-muted-foreground">{d}</p></article>)}</div></section></>;
}