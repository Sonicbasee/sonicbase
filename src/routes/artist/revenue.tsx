import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DashboardPage, PanelGrid, SectionCard, StatCard, TableCard, formatMoney } from "@/components/dashboard";
import { fetchReleases, fetchArtists } from "@/lib/api";
import { getStoredSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/artist/revenue")({
  beforeLoad: async () => { const { requireAuth } = await import("@/lib/route-access"); await requireAuth("artist"); },
  component: ArtistRevenuePage,
});

function ArtistRevenuePage() {
  const session = getStoredSession();
  const { data: releases = [], isLoading } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const myArtist = artists.find((a) => a.email === session?.email || a.name === session?.name);
  const myReleases = releases.filter((r) => r.artists?.some((a) => a.id === myArtist?.id) || r.artistId === myArtist?.id || r.artist === session?.name);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const { data: revenueEntries = [] } = useQuery({
    queryKey: ["revenue-entries", myArtist?.id],
    queryFn: async () => {
      if (!myArtist?.id) return [];
      const { data, error } = await supabase.from("revenue_entries").select("month, amount, streams, release_id").eq("artist_id", myArtist.id).order("month");
      if (error) throw error;
      return data as { month: string; amount: number; streams: number; release_id: string }[];
    },
    enabled: !!myArtist?.id,
  });

  const months = [...new Set(revenueEntries.map((e) => e.month.slice(0, 7)))].sort().reverse();
  const filteredEntries = selectedMonth === "all" ? revenueEntries : revenueEntries.filter((e) => e.month.slice(0, 7) === selectedMonth);
  const filteredRevenue = filteredEntries.reduce((sum, e) => sum + (e.amount || 0), 0);
  const displayTotal = filteredEntries.length ? filteredRevenue : myReleases.reduce((sum, r) => sum + r.revenue, 0);

  const monthlyData = revenueEntries.length
    ? (() => {
        const byMonth: Record<string, number> = {};
        revenueEntries.forEach((e) => {
          const key = new Date(e.month).toLocaleString("en-US", { month: "short" });
          byMonth[key] = (byMonth[key] || 0) + (e.amount || 0);
        });
        return Object.entries(byMonth).map(([month, revenue]) => ({ month, revenue }));
      })()
    : [
        { month: "Jan", revenue: 820000 },
        { month: "Feb", revenue: 930000 },
        { month: "Mar", revenue: 1100000 },
        { month: "Apr", revenue: 1040000 },
        { month: "May", revenue: 1260000 },
        { month: "Jun", revenue: 1380000 },
        { month: "Jul", revenue: 1420000 },
        { month: "Aug", revenue: 1640000 },
        { month: "Sep", revenue: 1750000 },
      ];

  if (isLoading) return <DashboardPage title="Revenue" subtitle="Loading..."><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;

  return (
    <DashboardPage title="Revenue" subtitle="Track earnings, payments and trendlines across platforms.">
      <div className="mb-6 flex items-center gap-3">
        <label className="text-sm font-medium">Filter by month</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="rounded-full border border-border bg-background px-4 py-2 text-sm">
          <option value="all">All time</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {new Date(m + "-01").toLocaleString("en-US", { month: "long", year: "numeric" })}
            </option>
          ))}
        </select>
        {selectedMonth !== "all" && <span className="text-xs text-muted-foreground">Showing {selectedMonth}</span>}
      </div>
      <PanelGrid>
        <StatCard label="Total earnings" value={formatMoney(displayTotal)} detail={selectedMonth === "all" ? "YTD" : selectedMonth} accent="success" />
        <StatCard label="Releases" value={String(myReleases.length)} detail="Catalogue" accent="neutral" />
        <StatCard label="Avg per release" value={myReleases.length ? formatMoney(Math.round(displayTotal / myReleases.length)) : "₦0"} detail="Average" accent="neutral" />
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