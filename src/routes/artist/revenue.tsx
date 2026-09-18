import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard, formatMoney } from "@/components/dashboard";
import { fetchReleases, fetchArtists } from "@/lib/api";
import { getStoredSession } from "@/lib/auth";

export const Route = createFileRoute("/artist/revenue")({
  beforeLoad: async () => { const { requireAuth } = await import("@/lib/route-access"); await requireAuth("artist"); },
  component: ArtistRevenuePage,
});

const monthlyData = [
  { month: "Jan", revenue: 820000 }, { month: "Feb", revenue: 930000 }, { month: "Mar", revenue: 1100000 },
  { month: "Apr", revenue: 1040000 }, { month: "May", revenue: 1260000 }, { month: "Jun", revenue: 1380000 },
  { month: "Jul", revenue: 1420000 }, { month: "Aug", revenue: 1640000 }, { month: "Sep", revenue: 1750000 },
];

function ArtistRevenuePage() {
  const session = getStoredSession();
  const { data: releases = [], isLoading } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const myArtist = artists.find((a) => a.name === session?.name || a.email === session?.email);
  const myReleases = releases.filter((r) => r.artist === session?.name || r.artistId === myArtist?.id);
  const totalRevenue = myReleases.reduce((sum, r) => sum + r.revenue, 0);

  if (isLoading) return <DashboardPage title="Revenue" subtitle="Loading..."><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;

  return (
    <DashboardPage title="Revenue" subtitle="Track earnings, payments and trendlines across platforms.">
      <PanelGrid>
        <StatCard label="Total earnings" value={formatMoney(totalRevenue)} detail="YTD" accent="success" />
        <StatCard label="Releases" value={String(myReleases.length)} detail="Catalogue" accent="neutral" />
        <StatCard label="Avg per release" value={myReleases.length ? formatMoney(Math.round(totalRevenue / myReleases.length)) : "₦0"} detail="Average" accent="neutral" />
      </PanelGrid>
      <div className="mt-6">
        <SectionCard title="Revenue over time" eyebrow="Payouts">
          <div className="mt-4 grid grid-cols-9 items-end gap-2">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-foreground/80" style={{ height: `${Math.max((item.revenue / 1800000) * 120, 24)}px` }} />
                <span className="text-[10px] text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="mt-6">
        <SectionCard title="Revenue by release" eyebrow="Catalogue">
          <TableCard columns={[{ key: "release", label: "Release" }, { key: "revenue", label: "Revenue", align: "right" }, { key: "streams", label: "Streams", align: "right" }]} rows={myReleases.map((r) => ({ release: <div className="flex items-center gap-3"><img src={r.cover || "/placeholder.png"} alt={r.title} className="h-10 w-10 rounded-md object-cover" /><span>{r.title}</span></div>, revenue: formatMoney(r.revenue), streams: r.streams.toLocaleString() }))} />
        </SectionCard>
      </div>
    </DashboardPage>
  );
}