import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/artist/releases/$release")({
  beforeLoad: () => requireAuth("artist"),
  component: ArtistReleaseDetailPage,
});

function ArtistReleaseDetailPage() {
  const { release } = Route.useParams();
  const item = dashboardReleases.find((entry) => entry.id === release) ?? dashboardReleases[0];

  return (
    <DashboardPage title={item.title} subtitle="Release overview and performance details.">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Artwork" eyebrow="Release">
          <img src={item.cover} alt={item.title} className="h-72 w-full rounded-2xl object-cover" />
        </SectionCard>

        <SectionCard title="Overview" eyebrow="Metadata">
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Artist</p><p className="mt-2">{item.artist}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Release date</p><p className="mt-2">{item.date}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Type</p><p className="mt-2">{item.type}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</p><div className="mt-2"><StatusBadge status={item.status} /></div></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Streams</p><p className="mt-2">{item.streams.toLocaleString()}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Revenue</p><p className="mt-2">₦{item.revenue.toLocaleString()}</p></div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="Platform breakdown" eyebrow="Performance">
          <div className="space-y-4">
            {item.platformBreakdown.map((platform) => (
              <div key={platform.platform}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{platform.platform}</span>
                  <span className="text-muted-foreground">{platform.value.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${Math.min((platform.value / item.streams) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
