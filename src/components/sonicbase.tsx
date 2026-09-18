import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Menu, Search, ShoppingBag, X, ArrowRight, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { artists, news, releases, type Artist, type Release } from "@/lib/sonicbase-data";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex flex-col items-center gap-1" aria-label="Sonicbase">
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 7v34M7 24h34M15 15h9v9h-9v9h9v9M33 7v17h8M33 41V32h8" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="text-[8px] font-bold uppercase tracking-[0.24em]">Sonicbase</span>
    </span>
  );
}

const nav = [
  ["Home", "/"], ["Artists", "/artists"], ["Music", "/music"], ["Shop", "/shop"], ["News", "/news"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return [
      ...artists.filter((x) => x.name.toLowerCase().includes(q)).map((x) => ({ title: x.name, label: "Artist", to: "/artists/$artist" as const, params: { artist: x.slug } })),
      ...releases.filter((x) => `${x.title} ${x.artist}`.toLowerCase().includes(q)).map((x) => ({ title: x.title, label: x.artist, to: "/music/$release" as const, params: { release: x.slug } })),
    ];
  }, [query]);

  return (
    <>
      <header className={`page-shell z-40 grid h-24 grid-cols-[1fr_auto_1fr] items-center ${overlay ? "absolute inset-x-0 top-0 text-primary-foreground" : "relative bg-background text-foreground"}`}>
        <nav className="hidden items-center gap-5 text-sm lg:flex" aria-label="Main navigation">
          {nav.slice(0, 5).map(([label, to]) => <Link key={to} to={to} activeProps={{ className: "font-bold" }}>{label}</Link>)}
        </nav>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="left" className="w-full border-none p-6 sm:max-w-md">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-16 flex flex-col gap-5">
                {nav.map(([label, to]) => <Link key={to} to={to} className="display-title text-4xl">{label}</Link>)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="justify-self-center"><Logo light={overlay} /></Link>
        <div className="flex items-center justify-end gap-2 sm:gap-5">
          <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => setSearchOpen(true)}>Search</Button>
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></Button>
          <Link to="/shop" className="flex items-center gap-2" aria-label="Shopping bag, 0 items"><ShoppingBag className="h-6 w-6" strokeWidth={1.7} /><span>0</span></Link>
        </div>
      </header>
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background p-5 sm:p-12" role="dialog" aria-modal="true" aria-label="Site search">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-4 border-b border-foreground pb-3">
              <Search className="h-6 w-6 shrink-0" />
              <Input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artists and releases" className="h-14 border-0 text-2xl shadow-none focus-visible:ring-0" />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></Button>
            </div>
            <div className="mt-8 grid gap-2">
              {query && results.length === 0 && <p className="text-muted-foreground">No results found. Try an artist or release title.</p>}
              {results.map((item) => <Link key={`${item.label}-${item.title}`} to={item.to} params={item.params} onClick={() => setSearchOpen(false)} className="grid grid-cols-[1fr_auto] items-center border-b py-5 text-xl"><span>{item.title}<small className="ml-3 text-sm text-muted-foreground">{item.label}</small></span><ArrowRight /></Link>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Marquee() {
  const unit = <><span>AMPLIFY THE INDEPENDENT</span><Logo light /></>;
  return <div className="overflow-hidden border-b border-primary-foreground/20 bg-primary py-5 text-primary-foreground"><div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-display text-2xl md:text-4xl">{unit}{unit}{unit}{unit}{unit}{unit}{unit}{unit}</div></div>;
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Marquee />
      <div className="page-shell grid gap-14 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:py-24">
        <div><Logo light /><p className="mt-6 max-w-xs text-lg">Independent music. Artist-led. Built to travel.</p><div className="mt-7 flex gap-5"><Instagram /><Youtube /><span className="font-bold">X</span></div></div>
        <FooterGroup title="Company" links={[["About", "/about"], ["Artists", "/artists"], ["Contact", "/contact"]]} />
        <FooterGroup title="Explore" links={[["Music", "/music"], ["News", "/news"], ["Shop", "/shop"]]} />
        <div><p className="mb-4 text-xs uppercase text-primary-foreground/60">Lagos · London · Accra</p><p className="text-sm leading-7">hello@sonicbase.music<br />© 2026 Sonicbase</p></div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return <div><p className="mb-4 text-xs uppercase text-primary-foreground/60">{title}</p><div className="flex flex-col gap-4">{links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div></div>;
}

export function PageTitle({ children, intro }: { children: ReactNode; intro?: string }) {
  return <section className="page-shell pb-16 pt-16 md:pb-24 md:pt-24"><h1 className="display-title text-5xl sm:text-7xl lg:text-8xl">{children}</h1>{intro && <p className="mt-7 max-w-2xl text-xl leading-tight text-muted-foreground md:text-2xl">{intro}</p>}</section>;
}

export function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><h2 className="display-title min-w-0 text-4xl sm:text-6xl lg:text-7xl">{children}</h2>{action}</div>;
}

export function Tag({ children, pale = false }: { children: ReactNode; pale?: boolean }) {
  return <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium uppercase ${pale ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}>{children}</span>;
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return <Link to="/artists/$artist" params={{ artist: artist.slug }} className="group block"><div className="aspect-[4/5] overflow-hidden rounded-[7px] bg-muted"><img src={artist.image} alt={artist.name} loading="lazy" width={1536} height={1536} className="image-reveal h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div><h3 className="mt-3 text-xl font-bold">{artist.name}</h3><p className="mt-1 text-sm text-muted-foreground">{artist.genre}</p></Link>;
}

export function ReleaseCard({ release }: { release: Release }) {
  return <Link to="/music/$release" params={{ release: release.slug }} className="group block"><div className="relative aspect-square overflow-hidden rounded-[7px] bg-muted"><div className="absolute left-3 top-3 z-10"><Tag>{release.type}</Tag></div><img src={release.image} alt={`${release.title} artwork`} loading="lazy" width={1536} height={1536} className="image-reveal h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div><h3 className="mt-3 text-lg font-bold leading-tight">{release.title}</h3><p className="mt-1 text-sm text-muted-foreground">{release.artist}</p></Link>;
}

export function NewsGrid() {
  return <div className="grid gap-3 lg:grid-cols-3">{news.map((item, i) => <article key={item.title} className={`rounded-[7px] bg-muted p-3 ${i === 0 ? "lg:col-span-1" : ""}`}><div className="relative aspect-[4/3] overflow-hidden rounded-[6px]"><div className="absolute left-3 top-3 z-10"><Tag>{item.tag}</Tag></div><img src={item.image} alt="" loading="lazy" width={i === 2 ? 1920 : 1536} height={i === 2 ? 1088 : 1536} className="h-full w-full object-cover" /></div><h3 className="mt-4 text-xl font-bold leading-tight md:text-2xl">{item.title}</h3><p className="mt-2 text-sm leading-snug text-muted-foreground">{item.excerpt}</p></article>)}</div>;
}