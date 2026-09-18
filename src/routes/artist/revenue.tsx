import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard, formatMoney } from "@/components/dashboard";
import { artistRevenueSeries, dashboardReleases, type DashboardRelease } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/artist/revenue")({
  beforeLoad: async () => { await requireAuth("artist"); },
  component: ArtistRevenuePage,
});

function ArtistRevenuePage() {
  const totalEarnings = artistRevenueSeries.reduce((sum, item) => sum + item.revenue, 0);

  const releaseForPlatforms: DashboardRelease = dashboardReleases[0] || { id: "afterlight", title: "Afterlight", artist: "Amara Vale", artistSlug: "amara-vale", image: "", type: "EP", status: "Published", date: "2026-09-18", description: "", streams: 0, revenue: 0, cover: "", platformBreakdown: [] } as DashboardRelease;

  return (
    <DashboardPage title="Revenue" subtitle="Track earnings, payments and trendlines across platforms." actions={<div className="flex gap-2"><button className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">Last 30 days</button></div>}>
      <PanelGrid>
        <StatCard label="Total earnings" value={formatMoney(totalEarnings)} change="+18.4%" detail="YTD" accent="success" />
        <StatCard label="Available balance" value={formatMoney(1245000)} change="Ready" detail="Wallet available" accent="neutral" />
        <StatCard label="Pending earnings" value={formatMoney(420000)} change="Processing" detail="Next payout" accent="warning" />
        <StatCard label="Paid earnings" value={formatMoney(1460000)} change="+9.6%" detail="Settled" accent="neutral" />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard title="Revenue over time" eyebrow="Payouts">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {artistRevenueSeries.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((item.revenue / 1800000) * 120, 24)}px` }} />
                <span className="text-[10px] text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Platform revenue" eyebrow="Breakdown">
          <div className="space-y-4">
            {releaseForPlatforms.platformBreakdown.map((item) => (
              <div key={item.platform}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.platform}</span>
                  <span className="text-muted-foreground">{formatMoney(item.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${Math.min((item.value / 1750000) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Revenue by release" eyebrow="Catalogue">
          <TableCard
            columns={[{ key: "release", label: "Release" }, { key: "revenue", label: "Revenue", align: "right" }, { key: "streams", label: "Streams", align: "right" }]}
            rows={dashboardReleases.map((release) => ({
              release: <div className="flex items-center gap-3"><img src={release.cover} alt={release.title} className="h-10 w-10 rounded-md object-cover" /><span>{release.title}</span></div>,
              revenue: formatMoney(release.revenue),
              streams: release.streams.toLocaleString(),
            }))}
          />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}