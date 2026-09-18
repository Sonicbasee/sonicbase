import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard } from "@/components/dashboard";
import { artistStreamSeries, dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/artist/streams")({
  beforeLoad: () => requireAuth("artist"),
  component: ArtistStreamsPage,
});

function ArtistStreamsPage() {
  return (
    <DashboardPage title="Streams" subtitle="Performance across your catalogue and audience growth.">
      <PanelGrid>
        <StatCard label="Total streams" value="4,058,723" change="+18.2%" detail="All time" accent="success" />
        <StatCard label="Streams this month" value="1,280,400" change="+22.1%" detail="vs last month" accent="success" />
        <StatCard label="Top release" value="Open Water" change="+14.3%" detail="Most streamed" accent="neutral" />
        <StatCard label="Platform mix" value="Spotify 49%" change="Leader" detail="Top platform" accent="neutral" />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Weekly trend" eyebrow="Performance">
          <div className="mt-4 flex items-end gap-3">
            {artistStreamSeries.map((point) => (
              <div key={point.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((point.value / 150000) * 120, 20)}px` }} />
                <span className="text-[10px] text-muted-foreground">{point.date}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Platform split" eyebrow="Listenership">
          <div className="space-y-4">
            {[
              ["Spotify", "1,989,000"],
              ["Apple Music", "1,254,000"],
              ["YouTube Music", "523,000"],
              ["Audiomack", "210,000"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{label}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${label === "Spotify" ? 52 : label === "Apple Music" ? 30 : label === "YouTube Music" ? 16 : 8}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Streams by release" eyebrow="Catalogue">
          <TableCard
            columns={[{ key: "release", label: "Release" }, { key: "streams", label: "Streams", align: "right" }, { key: "platform", label: "Top platform" }]}
            rows={dashboardReleases.map((release) => ({
              release: <div className="flex items-center gap-3"><img src={release.cover} alt={release.title} className="h-10 w-10 rounded-md object-cover" /><span>{release.title}</span></div>,
              streams: release.streams.toLocaleString(),
              platform: release.platformBreakdown[0]?.platform ?? "Spotify",
            }))}
          />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
