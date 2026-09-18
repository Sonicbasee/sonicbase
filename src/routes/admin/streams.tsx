import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard } from "@/components/dashboard";
import { adminStreamData, dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/streams")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminStreamsPage,
});

function AdminStreamsPage() {
  return (
    <DashboardPage title="Streams" subtitle="Performance analytics for all artists and territories.">
      <PanelGrid>
        <StatCard label="Total streams" value="382.4M" change="+14.8%" detail="Overall" accent="success" />
        <StatCard label="This period" value="34.5M" change="+11.2%" detail="Monthly" accent="success" />
        <StatCard label="Top artist" value="Kairo North" change="+18.1%" detail="Strongest growth" accent="neutral" />
        <StatCard label="Top platform" value="Spotify" change="49%" detail="Share" accent="neutral" />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <SectionCard title="Platform share" eyebrow="Analytics">
          <div className="space-y-4">
            {adminStreamData.map((platform) => (
              <div key={platform.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{platform.name}</span>
                  <span className="text-muted-foreground">{platform.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${platform.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Release stream leaders" eyebrow="Catalogue">
          <TableCard
            columns={[{ key: "title", label: "Release" }, { key: "streams", label: "Streams", align: "right" }]}
            rows={dashboardReleases.map((release) => ({
              title: release.title,
              streams: release.streams.toLocaleString(),
            }))}
          />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
