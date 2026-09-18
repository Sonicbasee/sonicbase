import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Menu, Search, ShoppingBag, X, ArrowRight, ArrowLeft, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { artists, heroSlides, news, products, releases, socials, type Artist, type Release } from "@/lib/sonicbase-data";

export function Logo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-0.5" aria-label="Sonicbase">
      <span className={`sonicbase-logo-mark block ${className}`} aria-hidden="true" />
      <span className="text-[8px] font-bold uppercase tracking-[0.24em]">Sonicbase</span>
    </span>
  );
}

const nav = [
  ["Home", "/"], ["Artists", "/artists"], ["Music", "/music"], ["Shop", "/shop"], ["Contact", "/contact"], ["About", "/about"],
] as const;

/* ---------------------------------------------- shared primitives */

export function PillLink({ to, children, dark = true }: { to: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 md:px-6 md:py-3 md:text-base ${dark ? "bg-primary text-primary-foreground" : "border border-input bg-background text-foreground"}`}
    >
      {children}
    </Link>
  );
}

export function Tag({ children, pale = false }: { children: ReactNode; pale?: boolean }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-medium uppercase leading-none tracking-wide ${pale ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}>
      {children}
    </span>
  );
}

export function PageTitle({ children, action, intro }: { children: ReactNode; action?: ReactNode; intro?: string }) {
  return (
    <section className="page-shell pb-8 pt-12 md:pb-12 md:pt-20">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl">{children}</h1>
        {action}
      </div>
      {intro && <p className="mt-5 max-w-2xl text-base leading-snug text-muted-foreground md:text-lg">{intro}</p>}
    </section>
  );
}

export function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <h2 className="display-title min-w-0 text-3xl sm:text-5xl lg:text-6xl">{children}</h2>
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
        <nav className="hidden items-center gap-7 text-[15px] lg:flex" aria-label="Main navigation">
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
          <Button type="button" variant="ghost" className="hidden h-auto p-0 text-[15px] hover:bg-transparent sm:inline-flex" onClick={() => setSearchOpen(true)}>Search</Button>
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></Button>
          <CartPanel />
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

function CartPanel() {
  const popular = products.slice(0, 4);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-auto gap-2 p-0 text-[15px] hover:bg-transparent" aria-label="Open shopping bag, 0 items">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
          <span>0</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col gap-0 rounded-l-[18px] border-l bg-background p-0 sm:max-w-[460px] [&>button]:hidden">
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <SheetTitle className="text-base font-bold">Your cart is empty</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close shopping bag"><X className="h-5 w-5" /></Button>
          </SheetClose>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-5">
          <div className="flex items-center justify-between py-6 text-sm">
            <span className="text-muted-foreground">Popular items</span>
            <SheetClose asChild>
              <Link to="/shop" className="inline-flex items-center gap-2 font-medium">Go to Shop <ArrowRight className="h-4 w-4" /></Link>
            </SheetClose>
          </div>

          <div className="grid gap-4 overflow-y-auto">
            {popular.map((product) => (
              <article key={product.name} className="grid grid-cols-[90px_1fr] items-start gap-4">
                <div className="aspect-square overflow-hidden rounded-[8px] bg-muted">
                  <img src={product.image} alt="" width={180} height={180} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug">{product.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{product.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-auto flex justify-center gap-3 pt-8" aria-label="Accepted payment methods">
            {["VISA", "●●", "DISCOVER", "AMEX"].map((label) => <span key={label} className="inline-flex h-6 min-w-10 items-center justify-center rounded-[3px] border px-1.5 text-[9px] font-bold text-foreground">{label}</span>)}
          </div>
        </div>
      </SheetContent>
    </Sheet>
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

  const active = heroSlides[index] ?? heroSlides[0]!;

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
        <h1 className="display-title text-[11vw] leading-[0.85] sm:text-[9vw] lg:text-[7rem]">{active.title}</h1>
        <p className="mt-3 text-lg font-medium uppercase md:text-2xl">{active.subtitle}</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link to={active.primaryTo} className="inline-flex items-center rounded-full bg-background px-8 py-2.5 text-base font-medium text-foreground transition-opacity hover:opacity-85">Listen</Link>
          <Link to={active.secondaryTo} className="inline-flex items-center rounded-full bg-background px-8 py-2.5 text-base font-medium text-foreground transition-opacity hover:opacity-85">Watch</Link>
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
      <h3 className="mt-3 text-[15px] font-medium leading-snug">{title}</h3>
      {meta && <p className="mt-1 text-sm text-muted-foreground">{meta}</p>}
    </>
  );
  return <Link to={to} params={params as never} className="group block">{inner}</Link>;
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return <MediaCard to="/artists/$artist" params={{ artist: artist.slug }} image={artist.image} alt={artist.name} tag={artist.genre.split(" · ")[0] ?? "ARTIST"} title={artist.name} meta={artist.city} ratio="aspect-square" />;
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
      <h2 className="mt-3 text-[15px] font-medium leading-snug">{product.name}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{product.price}</p>
    </article>
  );
}

/* ---------------------------------------------- news */

export function NewsFeature({ item }: { item: (typeof news)[number] }) {
  return (
    <article className="grid gap-4 rounded-[10px] bg-muted p-3 sm:grid-cols-[1.15fr_1fr] sm:items-center sm:gap-6">
      <div className="aspect-[16/10] overflow-hidden rounded-[8px]">
        <img src={item.image} alt="" loading="lazy" width={1536} height={1536} className="h-full w-full object-cover" />
      </div>
      <div className="pb-2 pr-2">
        <Tag>{item.tag}</Tag>
        <h3 className="mt-8 text-xl font-bold leading-tight sm:mt-10">{item.title}</h3>
        <p className="mt-2 text-sm leading-snug text-muted-foreground">{item.excerpt}</p>
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
  const loop = [...socials, ...socials];
  return (
    <section className="overflow-hidden py-16 md:py-20">
      <div className="page-shell">
        <SectionHeading action={<a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center rounded-full bg-primary px-6 py-3 text-base text-primary-foreground transition-opacity hover:opacity-85">Follow Us</a>}>Socials</SectionHeading>
      </div>
      <div className="mt-9 w-max animate-social-loop motion-reduce:animate-none">
        <div className="flex gap-5 pr-5">
        {loop.map((item, i) => (
          <div key={`${item.alt}-${i}`} className={`shrink-0 overflow-hidden rounded-[10px] bg-muted ${i % 3 === 1 ? "h-[230px] w-[230px]" : "h-[230px] w-[170px]"}`}>
            <img src={item.image} alt={item.alt} loading="lazy" width={1536} height={1536} className="h-full w-full object-cover" />
          </div>
        ))}
        </div>
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
