import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard } from "@/components/dashboard";
import { fetchReleases, fetchArtists } from "@/lib/api";
import { getStoredSession } from "@/lib/auth";

export const Route = createFileRoute("/artist/streams")({
  beforeLoad: async () => { const { requireAuth } = await import("@/lib/route-access"); await requireAuth("artist"); },
  component: ArtistStreamsPage,
});

const weeklyData = [
  { date: "Mon", value: 72000 }, { date: "Tue", value: 81000 }, { date: "Wed", value: 76000 },
  { date: "Thu", value: 90000 }, { date: "Fri", value: 124000 }, { date: "Sat", value: 138000 }, { date: "Sun", value: 118000 },
];

function ArtistStreamsPage() {
  const session = getStoredSession();
  const { data: releases = [], isLoading } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const myArtist = artists.find((a) => a.name === session?.name || a.email === session?.email);
  const myReleases = releases.filter((r) => r.artist === session?.name || r.artistId === myArtist?.id);
  const totalStreams = myReleases.reduce((sum, r) => sum + r.streams, 0);

  if (isLoading) return <DashboardPage title="Streams" subtitle="Loading..."><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;

  return (
    <DashboardPage title="Streams" subtitle="Performance across your catalogue and audience growth.">
      <PanelGrid>
        <StatCard label="Total streams" value={totalStreams.toLocaleString()} detail="All time" accent="success" />
        <StatCard label="Releases" value={String(myReleases.length)} detail="Catalogue" accent="neutral" />
        <StatCard label="Top release" value={myReleases[0]?.title || "N/A"} detail="Most streamed" accent="neutral" />
      </PanelGrid>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Weekly trend" eyebrow="Performance">
          <div className="mt-4 flex items-end gap-3">
            {weeklyData.map((point) => (
              <div key={point.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((point.value / 150000) * 120, 20)}px` }} />
                <span className="text-[10px] text-muted-foreground">{point.date}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Streams by release" eyebrow="Catalogue">
          <TableCard columns={[{ key: "release", label: "Release" }, { key: "streams", label: "Streams", align: "right" }]} rows={myReleases.map((r) => ({ release: r.title, streams: r.streams.toLocaleString() }))} />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}