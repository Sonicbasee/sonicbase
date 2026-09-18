import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  DashboardPage,
  PanelGrid,
  SectionCard,
  StatCard,
  formatMoney,
} from "@/components/dashboard";
import { fetchArtists, fetchReleases } from "@/lib/api";

export const Route = createFileRoute("/admin/")({
  component: AdminOverviewPage,
});

const monthlyData = [
  { month: "Jan", revenue: 5200000 },
  { month: "Feb", revenue: 6100000 },
  { month: "Mar", revenue: 7100000 },
  { month: "Apr", revenue: 7600000 },
  { month: "May", revenue: 8900000 },
  { month: "Jun", revenue: 9500000 },
  { month: "Jul", revenue: 10800000 },
  { month: "Aug", revenue: 11600000 },
  { month: "Sep", revenue: 12900000 },
];

const platformData = [
  { name: "Spotify", value: 49 },
  { name: "Apple", value: 24 },
  { name: "YouTube", value: 12 },
  { name: "Audiomack", value: 9 },
  { name: "Boomplay", value: 6 },
];

function AdminOverviewPage() {
  const { data: artists = [] } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });
  const { data: releases = [] } = useQuery({
    queryKey: ["releases"],
    queryFn: fetchReleases,
  });

  
  const totalRevenue = releases.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <DashboardPage
      title="Admin overview"
      subtitle="Commercial and operational performance across the Sonicbase network."
      actions={
        <div className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">
          Live data
        </div>
      }
    >
      <PanelGrid>
        <StatCard
          label="Total artists"
          value={String(artists.length)}
          detail="Active roster"
          accent="success"
        />
        <StatCard
          label="Total releases"
          value={String(releases.length)}
          detail="Catalogue"
          accent="neutral"
        />
        <StatCard
          
          
          detail="Overall"
          accent="success"
        />
        <StatCard
          label="Revenue"
          value={formatMoney(totalRevenue)}
          detail="YTD"
          accent="neutral"
        />
      </PanelGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Revenue trajectory" eyebrow="Business">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-xl bg-foreground/80"
                  style={{
                    height: `${Math.max((item.revenue / 15000000) * 120, 18)}px`,
                  }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Platform mix" eyebrow="Streams">
          <div className="space-y-4">
            {platformData.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-foreground"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

    </DashboardPage>
  );
}
