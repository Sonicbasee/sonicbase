import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminReleasesPage,
});

function AdminReleasesPage() {
  return (
    <DashboardPage
      title="Releases"
      subtitle="Manage release planning, metadata and publishing status."
      actions={<Link to="/admin/releases/new"><Button size="sm">New release</Button></Link>}
    >
      <SectionCard title="Release pipeline" eyebrow="Catalogue">
        <TableCard
          columns={[{ key: "release", label: "Release" }, { key: "artist", label: "Artist" }, { key: "type", label: "Type" }, { key: "status", label: "Status" }, { key: "streams", label: "Streams", align: "right" }]}
          rows={dashboardReleases.map((release) => ({
            release: <div className="flex items-center gap-3"><img src={release.cover} alt={release.title} className="h-10 w-10 rounded-md object-cover" /><span>{release.title}</span></div>,
            artist: release.artist,
            type: release.type,
            status: <StatusBadge status={release.status} />,
            streams: release.streams.toLocaleString(),
          }))}
        />
      </SectionCard>
    </DashboardPage>
  );
}
