import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, StatusBadge, TableCard, formatMoney } from "@/components/dashboard";
import { artistRevenueSeries, artistStreamSeries, dashboardReleases, type DashboardRelease } from "@/lib/dashboard-data";
import { dashboardArtists, type DashboardArtist } from "@/lib/dashboard-data";

export const Route = createFileRoute("/artist/")({
  component: ArtistOverviewPage,
});

function ArtistOverviewPage() {
  const release: DashboardRelease = dashboardReleases[0] || { id: "afterlight", title: "Afterlight", artist: "Amara Vale", artistSlug: "amara-vale", image: "", type: "EP", status: "Published", date: "2026-09-18", description: "", streams: 0, revenue: 0, cover: "", platformBreakdown: [] } as DashboardRelease;
  const totalRevenue = artistRevenueSeries.reduce((sum, item) => sum + item.revenue, 0);
  const totalStreams = artistStreamSeries.reduce((sum, item) => sum + item.value, 0);

  const artist: DashboardArtist = dashboardArtists.find((a) => a.name === "Amara Vale") || { id: "amara", name: "Amara Vale", email: "amara@sonicbase.com", city: "Lagos", genre: "Alt-R&B", image: "", status: "Active" } as DashboardArtist;

  return (
    <DashboardPage title="Artist overview" subtitle="Track performance, streams and revenue in one place." actions={<div className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Live snapshot</div>}>
      <PanelGrid>
        <StatCard label="Total revenue" value={formatMoney(totalRevenue)} change="+18.4%" detail="This year" />
        <StatCard label="Current period" value={formatMoney(1750000)} change="+12.2%" detail="vs previous period" accent="success" />
        <StatCard label="Pending revenue" value={formatMoney(420000)} change="Processing" detail="Awaiting payout" accent="warning" />
        <StatCard label="Paid revenue" value={formatMoney(1460000)} change="+9.6%" detail="Settled this cycle" accent="neutral" />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard title="Performance overview" eyebrow="Streams">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Total streams</p>
              <p className="mt-2 text-2xl font-semibold">{totalStreams.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">This month</p>
              <p className="mt-2 text-2xl font-semibold">1,280,400</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">+22.1%</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Latest release" eyebrow="Releases">
          <div className="flex items-center gap-4">
            <img src={release.cover} alt={release.title} className="h-20 w-20 rounded-xl object-cover" />
            <div>
              <p className="font-semibold">{release.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{release.type}</p>
              <div className="mt-2"><StatusBadge status={release.status} /></div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Recent releases" eyebrow="Catalogue">
          <TableCard
            columns={[{ key: "title", label: "Release" }, { key: "streams", label: "Streams" }, { key: "revenue", label: "Revenue" }, { key: "status", label: "Status" }]}
            rows={dashboardReleases.map((releaseItem) => ({
              title: <div className="flex items-center gap-3"><img src={releaseItem.cover} alt={releaseItem.title} className="h-10 w-10 rounded-md object-cover" /><div><p className="font-medium">{releaseItem.title}</p><p className="text-xs text-muted-foreground">{releaseItem.type}</p></div></div>,
              streams: releaseItem.streams.toLocaleString(),
              revenue: formatMoney(releaseItem.revenue),
              status: <StatusBadge status={releaseItem.status} />,
            }))}
          />
        </SectionCard>

        <SectionCard title="Platform split" eyebrow="Streams">
          <div className="space-y-4">
            {release.platformBreakdown.slice(0, 4).map((platform) => (
              <div key={platform.platform}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{platform.platform}</span>
                  <span className="text-muted-foreground">{platform.value.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${Math.min((platform.value / release.streams) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}