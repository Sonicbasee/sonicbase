import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchMerch, deleteMerch } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/merchandise")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminMerchPage,
});

function AdminMerchPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const queryClient = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: ["merch"], queryFn: fetchMerch });
  const deleteMutation = useMutation({
    mutationFn: deleteMerch,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["merch"] }),
  });

  if (pathname !== "/admin/merchandise") return <Outlet />;

  return (
    <DashboardPage title="Merchandise" subtitle="Manage artist merchandise and published drops." actions={<Link to="/admin/merchandise/new"><Button size="sm">Add item</Button></Link>}>
      {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <SectionCard key={item.id} title={item.title} eyebrow={item.artist}>
            <img src={item.image || "/placeholder.png"} alt={item.title} className="h-48 w-full rounded-xl object-cover" />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold">₦{item.price.toLocaleString()}</span>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-3 flex gap-2">
              <Link to="/admin/merchandise/$id/edit" params={{ id: item.id }} className="text-sm text-primary hover:underline">Edit</Link>
              <Button variant="destructive" size="sm" className="ml-auto" onClick={() => { if (confirm("Delete this item?")) deleteMutation.mutate(item.id); }}>Delete</Button>
            </div>
          </SectionCard>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center col-span-full">No merchandise yet. Add your first item.</p>}
      </div>
      )}
    </DashboardPage>
  );
}
