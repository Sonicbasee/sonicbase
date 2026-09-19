import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchRelease, deleteRelease } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/$release")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminReleaseDetailPage,
});

function AdminReleaseDetailPage() {
  const { release: releaseId } = Route.useParams();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: item, isLoading } = useQuery({ queryKey: ["release", releaseId], queryFn: () => fetchRelease(releaseId) });
  const deleteMutation = useMutation({
    mutationFn: deleteRelease,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["releases"] }); navigate({ to: "/admin/releases" }); },
  });

  if (pathname !== `/admin/releases/${releaseId}`) return <Outlet />;

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading release...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle="Release not found"><Link to="/admin/releases"><Button>Back to releases</Button></Link></DashboardPage>;

  return (
    <>
      <DashboardPage title={item.title} subtitle="Release management and metadata overview." actions={<div className="flex gap-2"><Button asChild variant="secondary" size="sm"><Link to="/admin/releases/$release/edit" params={{ release: releaseId }}>Edit</Link></Button><Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>Delete</Button></div>}>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Cover artwork" eyebrow="Release"><img src={item.cover || "/placeholder.png"} alt={item.title} className="h-72 w-full rounded-2xl object-cover" /></SectionCard>
        <SectionCard title="Release information" eyebrow="Metadata"><div className="grid gap-4 md:grid-cols-2"><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Artists</p><div className="mt-2 flex flex-wrap gap-2">{(item.artists?.length ? item.artists : [{ name: item.artist, role: "Main Artist" as const }]).map((a: any) => <span key={a.id || a.name} className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">{a.name} <span className="ml-1 text-[10px] uppercase tracking-wide text-muted-foreground">· {a.role}</span></span>)}</div></div><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Type</p><p className="mt-2">{item.type}</p></div><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Release date</p><p className="mt-2">{item.date}</p></div><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</p><div className="mt-2"><StatusBadge status={item.status} /></div></div><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Streams</p><p className="mt-2">{item.streams.toLocaleString()}</p></div><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Revenue</p><p className="mt-2">₦{item.revenue.toLocaleString()}</p></div></div></SectionCard>
      </div>
    </DashboardPage>
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete release?"
        description={`This will permanently delete "${item.title}". This action cannot be undone.`}
        confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete"}
        variant="destructive"
        onConfirm={() => deleteMutation.mutate(releaseId)}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
