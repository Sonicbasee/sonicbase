import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, StatusBadge, TableCard, formatMoney } from "@/components/dashboard";
import { adminOverviewStats, adminRevenueData, adminStreamData, distributionRecords } from "@/lib/dashboard-data";

export const Route = createFileRoute("/admin/")({
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  return (
    <DashboardPage title="Admin overview" subtitle="Commercial and operational performance across the Sonicbase network." actions={<div className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">Updated 8 mins ago</div>}>
      <PanelGrid>
        <StatCard label="Total artists" value={String(adminOverviewStats.artists.total)} change="+6 new" detail="Active roster" accent="success" />
        <StatCard label="Total releases" value={String(adminOverviewStats.releases.total)} change="+9" detail="This quarter" accent="neutral" />
        <StatCard label="Total streams" value={new Intl.NumberFormat("en-US").format(adminOverviewStats.streams.total)} change="+14.8%" detail="Growth" accent="success" />
        <StatCard label="Revenue" value={formatMoney(adminOverviewStats.revenue.total)} change="+12.6%" detail="YTD" accent="neutral" />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Revenue trajectory" eyebrow="Business">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {adminRevenueData.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((item.revenue / 15000000) * 120, 18)}px` }} />
                <span className="text-[10px] text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Platform mix" eyebrow="Streams">
          <div className="space-y-4">
            {adminStreamData.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Recent distribution activity" eyebrow="Operations">
          <TableCard
            columns={[{ key: "artist", label: "Artist" }, { key: "release", label: "Release" }, { key: "status", label: "Status" }, { key: "platforms", label: "Platforms" }, { key: "submitted", label: "Submitted" }]}
            rows={distributionRecords.map((record) => ({
              artist: record.artist,
              release: record.release,
              status: <StatusBadge status={record.status} />,
              platforms: record.platforms.join(", "),
              submitted: record.submitted,
            }))}
          />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
