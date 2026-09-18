import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard } from "@/components/dashboard";
import { adminRevenueData, dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/reports")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminReportsPage,
});

function AdminReportsPage() {
  return (
    <DashboardPage title="Reports" subtitle="Revenue, streams and operational reports across the catalog.">
      <PanelGrid>
        <StatCard label="Revenue" value="₦148.0M" change="+12.6%" detail="YTD" accent="success" />
        <StatCard label="Streams" value="382.4M" change="+14.8%" detail="Total" accent="success" />
        <StatCard label="Artists" value="34" change="+6" detail="New this quarter" accent="neutral" />
        <StatCard label="Distribution" value="18" change="Active" detail="Live networks" accent="neutral" />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Monthly revenue" eyebrow="Reports">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {adminRevenueData.map((point) => (
              <div key={point.month} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((point.revenue / 15000000) * 110, 16)}px` }} />
                <span className="text-[10px] text-muted-foreground">{point.month}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Release filters" eyebrow="Report controls">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Artist: All artists</p>
            <p>Platform: All platforms</p>
            <p>Range: Last 12 months</p>
            <p>Export: CSV available</p>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Top performers" eyebrow="Performance">
          <TableCard
            columns={[{ key: "artist", label: "Artist" }, { key: "releases", label: "Releases" }, { key: "revenue", label: "Revenue", align: "right" }]}
            rows={dashboardReleases.map((release) => ({
              artist: release.artist,
              releases: release.title,
              revenue: `₦${release.revenue.toLocaleString()}`,
            }))}
          />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
