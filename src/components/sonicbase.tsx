import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Menu, Search, ShoppingBag, X, ArrowRight, ArrowLeft, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { artists, heroSlides, news, releases, socials, type Artist, type Release } from "@/lib/sonicbase-data";

export function Logo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-0.5" aria-label="Sonicbase">
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
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

/* ---------------------------------------------- shared primitives */

export function PillLink({ to, children, dark = true }: { to: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center rounded-full px-7 py-3.5 text-lg font-medium transition-opacity hover:opacity-80 md:px-9 md:py-4 md:text-2xl ${dark ? "bg-primary text-primary-foreground" : "border border-input bg-background text-foreground"}`}
    >
      {children}
    </Link>
  );
}

export function Tag({ children, pale = false }: { children: ReactNode; pale?: boolean }) {
  return (
    <span className={`inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase leading-none tracking-wide ${pale ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}>
      {children}
    </span>
  );
}

export function PageTitle({ children, action, intro }: { children: ReactNode; action?: ReactNode; intro?: string }) {
  return (
    <section className="page-shell pb-10 pt-16 md:pb-14 md:pt-24">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h1 className="display-title text-5xl sm:text-7xl lg:text-8xl">{children}</h1>
        {action}
      </div>
      {intro && <p className="mt-7 max-w-2xl text-xl leading-tight text-muted-foreground md:text-2xl">{intro}</p>}
    </section>
  );
}

export function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <h2 className="display-title min-w-0 text-4xl sm:text-6xl lg:text-7xl">{children}</h2>
      {action}
    </div>
  );
}

/* ---------------------------------------------- header */

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
      <header className={`page-shell z-40 grid h-[104px] grid-cols-[1fr_auto_1fr] items-center ${overlay ? "absolute inset-x-0 top-0 text-primary-foreground" : "relative bg-background text-foreground"}`}>
        <nav className="hidden items-center gap-7 text-[17px] lg:flex" aria-label="Main navigation">
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
        <Link to="/" className="justify-self-center"><Logo /></Link>
        <div className="flex items-center justify-end gap-3 sm:gap-6">
          <button type="button" className="hidden text-[17px] sm:inline" onClick={() => setSearchOpen(true)}>Search</button>
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></Button>
          <Link to="/shop" className="flex items-center gap-2 text-[17px]" aria-label="Shopping bag, 0 items"><ShoppingBag className="h-6 w-6" strokeWidth={1.7} /><span>0</span></Link>
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

/* ---------------------------------------------- hero carousel */

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section className="relative h-[92vh] min-h-[620px] overflow-hidden bg-primary text-primary-foreground">
      {heroSlides.map((slide, i) => (
        <img
          key={slide.title}
          src={slide.image}
          alt={slide.alt}
          width={1920}
          height={1088}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-foreground/20" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />

      <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-2 transition-opacity hover:opacity-70 md:left-8"><ArrowLeft className="h-8 w-8" strokeWidth={1.6} /></button>
      <button type="button" onClick={() => go(1)} aria-label="Next slide" className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-2 transition-opacity hover:opacity-70 md:right-8"><ArrowRight className="h-8 w-8" strokeWidth={1.6} /></button>

      <div className="page-shell absolute inset-x-0 bottom-10 z-10 text-center">
        <h1 className="display-title text-[13vw] leading-[0.85] sm:text-[11vw] lg:text-[8.5rem]">{heroSlides[index].title}</h1>
        <p className="mt-4 text-2xl font-medium uppercase tracking-tight md:text-[2.6rem]">{heroSlides[index].subtitle}</p>
        <div className="mt-7 flex justify-center gap-4">
          <Link to={heroSlides[index].primaryTo} className="inline-flex items-center rounded-full bg-background px-12 py-3.5 text-xl font-medium text-foreground transition-opacity hover:opacity-85 md:text-2xl">Listen</Link>
          <Link to={heroSlides[index].secondaryTo} className="inline-flex items-center rounded-full bg-background px-12 py-3.5 text-xl font-medium text-foreground transition-opacity hover:opacity-85 md:text-2xl">Watch</Link>
        </div>
        <div className="mt-7 flex justify-center gap-2.5" role="tablist" aria-label="Hero slides">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-opacity ${i === index ? "bg-primary-foreground" : "bg-primary-foreground/45"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- cards */

function MediaCard({ to, params, image, alt, tag, title, meta, ratio = "aspect-square" }: { to: string; params?: Record<string, string>; image: string; alt: string; tag?: string; title: string; meta?: string; ratio?: string }) {
  const inner = (
    <>
      <div className={`relative ${ratio} overflow-hidden rounded-[10px] bg-muted`}>
        {tag && <span className="absolute left-4 top-4 z-10"><Tag>{tag}</Tag></span>}
        <img src={image} alt={alt} loading="lazy" width={1536} height={1536} className="image-reveal h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <h3 className="mt-4 text-[17px] font-medium leading-snug">{title}</h3>
      {meta && <p className="mt-1 text-[17px] text-muted-foreground">{meta}</p>}
    </>
  );
  return <Link to={to} params={params as never} className="group block">{inner}</Link>;
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return <MediaCard to="/artists/$artist" params={{ artist: artist.slug }} image={artist.image} alt={artist.name} tag={artist.genre.split(" · ")[0]} title={artist.name} meta={artist.city} ratio="aspect-square" />;
}

export function ReleaseCard({ release }: { release: Release }) {
  return <MediaCard to="/music/$release" params={{ release: release.slug }} image={release.image} alt={`${release.title} artwork`} tag={release.type} title={`${release.artist} — ${release.title}`} meta={release.date} />;
}

export function ProductCard({ product }: { product: { name: string; price: string; tag: string; image: string } }) {
  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-[10px] bg-muted">
        <span className="absolute left-4 top-4 z-10"><Tag>{product.tag}</Tag></span>
        <img src={product.image} alt={product.name} loading="lazy" width={1536} height={1536} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <h2 className="mt-4 text-[17px] font-medium leading-snug">{product.name}</h2>
      <p className="mt-1 text-[17px] text-muted-foreground">{product.price}</p>
    </article>
  );
}

/* ---------------------------------------------- news */

export function NewsFeature({ item }: { item: (typeof news)[number] }) {
  return (
    <article className="grid gap-5 rounded-[10px] bg-muted p-4 sm:grid-cols-2 sm:items-center sm:gap-8">
      <div className="aspect-[4/3] overflow-hidden rounded-[8px]">
        <img src={item.image} alt="" loading="lazy" width={1536} height={1536} className="h-full w-full object-cover" />
      </div>
      <div className="pb-2 pr-2 sm:pt-6">
        <Tag>{item.tag}</Tag>
        <h3 className="mt-16 text-2xl font-bold leading-tight sm:mt-24">{item.title}</h3>
        <p className="mt-2 text-[17px] leading-snug text-muted-foreground">{item.excerpt}</p>
      </div>
    </article>
  );
}

export function NewsGrid() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
      <div className="grid gap-3">{news.slice(0, 2).map((item) => <NewsFeature key={item.title} item={item} />)}</div>
      <div className="grid grid-cols-2 gap-3">
        {news.slice(2).concat(news.slice(0, 2)).slice(0, 4).map((item, i) => (
          <div key={`${item.title}-${i}`} className="aspect-square overflow-hidden rounded-[10px] bg-muted">
            <img src={item.image} alt="" loading="lazy" width={1536} height={1536} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------- socials */

export function Socials() {
  return (
    <section className="py-20 md:py-28">
      <div className="page-shell">
        <SectionHeading action={<a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center rounded-full bg-primary px-9 py-4 text-xl text-primary-foreground transition-opacity hover:opacity-85 md:text-2xl">Follow Us</a>}>Socials</SectionHeading>
      </div>
      <div className="mt-12 flex gap-8 overflow-x-auto px-[clamp(1rem,2.7vw,3.25rem)] pb-4 md:gap-14">
        {socials.map((item, i) => (
          <div key={`${item.alt}-${i}`} className={`shrink-0 overflow-hidden rounded-[10px] bg-muted ${i % 3 === 1 ? "h-[330px] w-[330px]" : "h-[330px] w-[240px]"}`}>
            <img src={item.image} alt={item.alt} loading="lazy" width={1536} height={1536} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------- marquee + footer */

export function Marquee() {
  const unit = <><span>DEFINING INDEPENDENCE</span><Logo className="h-9 w-9" /></>;
  return <div className="overflow-hidden bg-primary py-6 text-primary-foreground"><div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap font-display text-3xl uppercase md:text-5xl">{unit}{unit}{unit}{unit}{unit}{unit}{unit}{unit}</div></div>;
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Marquee />
      <div className="page-shell grid gap-14 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:py-24">
        <div><Logo /><p className="mt-6 max-w-xs text-lg">Independent music. Artist-led. Built to travel.</p><div className="mt-7 flex gap-5"><Instagram /><Youtube /><span className="font-bold">X</span></div></div>
        <FooterGroup title="Company" links={[["About", "/about"], ["Artists", "/artists"], ["Contact", "/contact"]]} />
        <FooterGroup title="Shop" links={[["Music", "/music"], ["News", "/news"], ["Shop", "/shop"]]} />
        <div><p className="mb-4 text-xs uppercase text-primary-foreground/60">Legal</p><p className="text-sm leading-7">hello@sonicbase.music<br />Lagos · London · Accra<br />© 2026 Sonicbase</p></div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return <div><p className="mb-4 text-xs uppercase text-primary-foreground/60">{title}</p><div className="flex flex-col gap-4">{links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div></div>;
}
