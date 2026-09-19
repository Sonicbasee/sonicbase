import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sonicbase" },
      { name: "description", content: "Sonicbase — Amplifying Youth Pop Culture Beyond Boundaries." },
      { property: "og:title", content: "About Sonicbase" },
      { property: "og:description", content: "This isn’t just music. This is youth culture with direction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="page-shell pb-16 pt-16 md:pb-24 md:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/60">About Sonicbase</p>
          <h1 className="display-title mt-6 max-w-4xl text-5xl leading-[0.9] sm:text-7xl lg:text-8xl">
            Amplifying Youth
            <br />
            Pop Culture
            <br />
            <span className="text-primary-foreground/70">Beyond Boundaries.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
            This isn’t just distribution. This isn’t just music. This is youth culture with direction.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="page-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Who we are</p>
            <h2 className="display-title mt-4 text-3xl leading-tight sm:text-5xl">
              Sonicbase is a music company.
              <br />
              <span className="text-muted-foreground">But calling us just a music company feels small.</span>
            </h2>
          </div>
          <div className="space-y-6 pt-2 text-base leading-relaxed text-muted-foreground">
            <p>
              Founded by <span className="font-semibold text-foreground">Oladayo Feranmi Taiwo</span>, Sonicbase was built for the kids with ideas too loud
              to stay local. The artists making music in bedrooms. The creatives building worlds from cracked phones, late nights, and pure
              obsession.
            </p>
            <p className="text-foreground font-medium">Yeah, we do distribution. But distribution is the minimum. Anybody can upload a song.</p>
            <p className="text-xl font-semibold leading-snug text-foreground">We help artists build universe.</p>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="border-y border-border bg-muted/30">
        <div className="page-shell grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              We help young creatives grow into something bigger than algorithms and temporary hype. Music marketing, publishing, rollout
              strategy, artist development — all of it connected under one roof designed for people who actually care about culture.
            </p>
            <p className="font-medium text-foreground">Because culture is not a costume. It’s lived in.</p>
          </div>
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              Sonicbase moves like a community because that’s exactly what it is. We carry everybody along. Artists. Designers. Producers.
              Editors. Fans. Weird kids with vision. The goal was never to build a gatekeeping company.
            </p>
            <p className="display-title text-2xl leading-tight">The goal was to build a home for the next wave.</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="page-shell py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[16px] bg-primary p-8 text-primary-foreground md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/60">Our Mission</p>
            <p className="mt-6 text-2xl font-semibold leading-tight">
              To empower emerging talent by providing the tools, exposure, and ecosystem needed to transform creativity into global impact.
            </p>
          </div>
          <div className="rounded-[16px] border border-border bg-card p-8 md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Our Vision</p>
            <p className="mt-6 text-2xl font-semibold leading-tight">
              To become a leading cultural engine bridging underground sounds with mainstream influence across music, fashion, and digital
              culture.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="page-shell pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display-title text-4xl sm:text-5xl">What We Do</h2>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">Everything connected under one roof — for artists who care about culture.</p>
        </div>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
          {[
            {
              n: "01",
              t: "Distribution",
              d: "Not “upload and disappear” distribution. We help artists position records properly, build momentum around releases, and push music beyond playlists into real cultural conversations.",
            },
            {
              n: "02",
              t: "Marketing",
              d: "Rollouts with personality. Campaigns with intention. Growth that feels human, not manufactured.",
            },
            {
              n: "03",
              t: "Publishing",
              d: "Protecting creative work while making sure artists actually benefit from what they create.",
            },
            {
              n: "04",
              t: "Artist Growth",
              d: "We help artists evolve — creatively, visually, strategically, culturally. Not just dropping songs. Building identity.",
            },
          ].map(({ n, t, d }) => (
            <div key={n} className="bg-card p-8 md:p-10">
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">{n}</p>
              <h3 className="mt-6 text-xl font-bold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="page-shell">
          <h2 className="display-title text-4xl sm:text-5xl">How we move</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Culture First", "We don’t chase trends. We pay attention to the kids creating the next ones."],
              ["Global Mindset", "We build with a vision that transcends borders and local limitations."],
              ["Creative Freedom", "Experiment. Reinvent yourself. Break rules beautifully."],
              ["Impact Driven", "Virality fades. Influence stays."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-[16px] border border-primary-foreground/15 p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.12em]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="page-shell py-16 text-center md:py-24">
        <p className="mx-auto max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl">
          Sonicbase exists for the creators who were never meant to fit inside one box.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          This isn’t just distribution. This isn’t just music. This is youth culture with direction.
        </p>
        <Button asChild className="mt-8 rounded-full px-8 py-6 text-base">
          <Link to="/contact">Work with us</Link>
        </Button>
      </section>
    </>
  );
}
