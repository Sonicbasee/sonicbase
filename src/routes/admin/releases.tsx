import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { fetchReleases, deleteRelease } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminReleasesPage,
});

function AdminReleasesPage() {
  const queryClient = useQueryClient();
  const { data: releases = [], isLoading } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const deleteMutation = useMutation({
    mutationFn: deleteRelease,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["releases"] }),
  });

  return (
    <DashboardPage title="Releases" subtitle="Manage release planning, metadata and publishing status." actions={<Link to="/admin/releases/new"><Button size="sm">New release</Button></Link>}>
      <SectionCard title="Release pipeline" eyebrow="Catalogue">
        {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
        <TableCard
          columns={[{ key: "release", label: "Release" }, { key: "artist", label: "Artist" }, { key: "type", label: "Type" }, { key: "status", label: "Status" },  { key: "actions", label: "Actions" }]}
          rows={releases.map((release) => ({
            release: <Link to="/admin/releases/$release" params={{ release: release.id }} className="flex items-center gap-3"><img src={release.cover || "/placeholder.png"} alt={release.title} className="h-10 w-10 rounded-md object-cover" /><span className="hover:underline">{release.title}</span></Link>,
            artist: release.artist,
            type: release.type,
            status: <StatusBadge status={release.status} />,
            
            actions: <Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this release?")) deleteMutation.mutate(release.id); }}>Delete</Button>,
          }))}
        />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
