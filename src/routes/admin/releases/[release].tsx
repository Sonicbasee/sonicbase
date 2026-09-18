import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/release")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminReleaseDetailPage,
});

function AdminReleaseDetailPage() {
  const { release } = Route.useParams();
  const item = dashboardReleases.find((entry) => entry.id === release) ?? dashboardReleases[0];

  return (
    <DashboardPage title={item.title} subtitle="Release management and metadata overview.">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Cover artwork" eyebrow="Release">
          <img src={item.cover} alt={item.title} className="h-72 w-full rounded-2xl object-cover" />
        </SectionCard>

        <SectionCard title="Release information" eyebrow="Metadata">
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Artist</p><p className="mt-2">{item.artist}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Type</p><p className="mt-2">{item.type}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Release date</p><p className="mt-2">{item.date}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</p><div className="mt-2"><StatusBadge status={item.status} /></div></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Streams</p><p className="mt-2">{item.streams.toLocaleString()}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Revenue</p><p className="mt-2">₦{item.revenue.toLocaleString()}</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
