import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/artist/")({
  beforeLoad: () => {
    throw redirect({ to: "/artist/revenue" });
  },
  component: () => null,
});

function ArtistOverviewPage() {
  const session = getStoredSession();
  const { data: releases = [], isLoading } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });

  const myArtist = artists.find((a) => a.name === session?.name || a.email === session?.email);
  const myReleases = releases.filter((r) => r.artist === session?.name || r.artistId === myArtist?.id);
  const totalStreams = myReleases.reduce((sum, r) => sum + r.streams, 0);
  const totalRevenue = myReleases.reduce((sum, r) => sum + r.revenue, 0);

  if (isLoading) return <DashboardPage title="Artist overview" subtitle="Loading..."><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;

  return (
    <DashboardPage title="Artist overview" subtitle="Track performance, streams and revenue in one place." actions={<div className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Live snapshot</div>}>
      <PanelGrid>
        <StatCard label="Total revenue" value={formatMoney(totalRevenue)} detail="This year" />
        <StatCard label="Total streams" value={totalStreams.toLocaleString()} detail="All time" accent="success" />
        <StatCard label="Releases" value={String(myReleases.length)} detail="Catalogue" accent="neutral" />
        <StatCard label="Published" value={String(myReleases.filter((r) => r.status === "Published").length)} detail="Live" accent="neutral" />
      </PanelGrid>
      <div className="mt-6">
        <SectionCard title="Your releases" eyebrow="Catalogue">
          <TableCard
            columns={[{ key: "title", label: "Release" }, { key: "streams", label: "Streams" }, { key: "revenue", label: "Revenue" }, { key: "status", label: "Status" }]}
            rows={myReleases.map((r) => ({
              title: <div className="flex items-center gap-3"><img src={r.cover || "/placeholder.png"} alt={r.title} className="h-10 w-10 rounded-md object-cover" /><div><p className="font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.type}</p></div></div>,
              streams: r.streams.toLocaleString(),
              revenue: formatMoney(r.revenue),
              status: <StatusBadge status={r.status} />,
            }))}
          />
          {myReleases.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No releases found. Your catalogue will appear here once published.</p>}
        </SectionCard>
      </div>
    </DashboardPage>
  );
}