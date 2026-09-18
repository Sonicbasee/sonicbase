import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard } from "@/components/dashboard";
import { fetchReleases } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/streams")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminStreamsPage,
});

const platformData = [
  { name: "Spotify", value: 49 },
  { name: "Apple", value: 24 },
  { name: "YouTube", value: 12 },
  { name: "Audiomack", value: 9 },
  { name: "Boomplay", value: 6 },
];

function AdminStreamsPage() {
  const { data: releases = [] } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const totalStreams = releases.reduce((sum, r) => sum + r.streams, 0);

  return (
    <DashboardPage title="Streams" subtitle="Performance analytics for all artists and territories.">
      <PanelGrid>
        <StatCard label="Total streams" value={totalStreams.toLocaleString()} change="+14.8%" detail="Overall" accent="success" />
        <StatCard label="Total releases" value={String(releases.length)} detail="Catalogue" accent="neutral" />
        <StatCard label="Top platform" value="Spotify" change="49%" detail="Share" accent="neutral" />
        <StatCard label="Top release" value={releases[0]?.title || "N/A"} detail="Most streamed" accent="neutral" />
      </PanelGrid>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <SectionCard title="Platform share" eyebrow="Analytics">
          <div className="space-y-4">
            {platformData.map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-sm"><span>{p.name}</span><span className="text-muted-foreground">{p.value}%</span></div>
                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-foreground" style={{ width: `${p.value}%` }} /></div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Release stream leaders" eyebrow="Catalogue">
          <TableCard columns={[{ key: "title", label: "Release" }, { key: "streams", label: "Streams", align: "right" }]} rows={releases.map((r) => ({ title: r.title, streams: r.streams.toLocaleString() }))} />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
