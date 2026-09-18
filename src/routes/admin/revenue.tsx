import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard, formatMoney } from "@/components/dashboard";
import { fetchReleases } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/revenue")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminRevenuePage,
});

const monthlyData = [
  { month: "Jan", revenue: 5200000 }, { month: "Feb", revenue: 6100000 }, { month: "Mar", revenue: 7100000 },
  { month: "Apr", revenue: 7600000 }, { month: "May", revenue: 8900000 }, { month: "Jun", revenue: 9500000 },
  { month: "Jul", revenue: 10800000 }, { month: "Aug", revenue: 11600000 }, { month: "Sep", revenue: 12900000 },
];

function AdminRevenuePage() {
  const { data: releases = [] } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const totalRevenue = releases.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <DashboardPage title="Revenue" subtitle="Portfolio-wide performance across all artists and releases.">
      <PanelGrid>
        <StatCard label="Total revenue" value={formatMoney(totalRevenue)} change="+12.6%" detail="YTD" />
        <StatCard label="Total releases" value={String(releases.length)} detail="Catalogue" accent="neutral" />
        <StatCard label="Avg revenue" value={releases.length ? formatMoney(Math.round(totalRevenue / releases.length)) : "₦0"} detail="Per release" accent="neutral" />
      </PanelGrid>
      <div className="mt-6">
        <SectionCard title="Revenue trend" eyebrow="Performance">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {monthlyData.map((p) => (
              <div key={p.month} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((p.revenue / 15000000) * 120, 18)}px` }} />
                <span className="text-[10px] text-muted-foreground">{p.month}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="mt-6">
        <SectionCard title="Top revenue releases" eyebrow="Catalog">
          <TableCard columns={[{ key: "release", label: "Release" }, { key: "artist", label: "Artist" }, { key: "revenue", label: "Revenue", align: "right" }]} rows={releases.map((r) => ({ release: r.title, artist: r.artist, revenue: formatMoney(r.revenue) }))} />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
