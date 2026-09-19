import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { fetchReleases, deleteRelease } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminReleasesPage,
});

function AdminReleasesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const { data: releases = [], isLoading } = useQuery({ queryKey: ["releases"], queryFn: fetchReleases });
  const deleteMutation = useMutation({
    mutationFn: deleteRelease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
      setDeleteTarget(null);
    },
  });

  if (pathname !== "/admin/releases") return <Outlet />;

  return (
    <>
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
              
              actions: <div className="flex gap-2"><Button asChild variant="secondary" size="sm"><Link to="/admin/releases/$release/edit" params={{ release: release.id }}>Edit</Link></Button><Button variant="destructive" size="sm" onClick={() => setDeleteTarget(release.id)}>Delete</Button></div>,
            }))}
          />
          )}
        </SectionCard>
      </DashboardPage>
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete release?"
        description="This will permanently delete the release and its metadata. This action cannot be undone."
        confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete release"}
        variant="destructive"
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget)}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
