import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchContract, deleteContract } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/contracts/id")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: ContractDetailPage,
});

function ContractDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["contract", id], queryFn: () => fetchContract(id) });
  const deleteMutation = useMutation({
    mutationFn: deleteContract,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["contracts"] }); navigate({ to: "/admin/contracts" }); },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle=""><Link to="/admin/contracts"><Button>Back</Button></Link></DashboardPage>;

  return (
    <DashboardPage title={item.type} subtitle="Contract review and internal notes." actions={<Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this contract?")) deleteMutation.mutate(id); }}>Delete</Button>}>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title="Contract" eyebrow="Summary">
          <div className="space-y-3">
            <p className="text-lg font-semibold">{item.type}</p>
            <p className="text-sm text-muted-foreground">Artist: {item.artist}</p>
            <div className="mt-3"><StatusBadge status={item.status} /></div>
          </div>
        </SectionCard>
        <SectionCard title="Key dates" eyebrow="Management">
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Start date</p><p className="mt-2">{item.startDate}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">End date</p><p className="mt-2">{item.endDate}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Last updated</p><p className="mt-2">{item.lastUpdated}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Assigned admin</p><p className="mt-2">{item.admin}</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
