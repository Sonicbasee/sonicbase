import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard } from "@/components/dashboard";
import { adminRevenueData, dashboardReleases } from "@/lib/dashboard-data";
import { formatMoney } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/revenue")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminRevenuePage,
});

function AdminRevenuePage() {
  return (
    <DashboardPage title="Revenue" subtitle="Portfolio-wide performance across all artists and releases.">
      <PanelGrid>
        <StatCard label="Total revenue" value={formatMoney(148000000)} change="+12.6%" detail="YTD" />
        <StatCard label="This period" value={formatMoney(18500000)} change="+8.4%" detail="Monthly" accent="success" />
        <StatCard label="Pending payments" value={formatMoney(3600000)} change="5 items" detail="Awaiting settlement" accent="warning" />
        <StatCard label="Paid out" value={formatMoney(109000000)} change="+11.1%" detail="Settled" accent="neutral" />
      </PanelGrid>

      <div className="mt-6">
        <SectionCard title="Revenue trend" eyebrow="Performance">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {adminRevenueData.map((point) => (
              <div key={point.month} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((point.revenue / 15000000) * 120, 18)}px` }} />
                <span className="text-[10px] text-muted-foreground">{point.month}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Top revenue releases" eyebrow="Catalog">
          <TableCard
            columns={[{ key: "release", label: "Release" }, { key: "artist", label: "Artist" }, { key: "revenue", label: "Revenue", align: "right" }]}
            rows={dashboardReleases.map((release) => ({
              release: release.title,
              artist: release.artist,
              revenue: formatMoney(release.revenue),
            }))}
          />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
