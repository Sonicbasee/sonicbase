import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchDistribution, deleteDistribution } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/distribution/id")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: DistributionDetailPage,
});

function DistributionDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["distribution", id], queryFn: () => fetchDistribution(id) });
  const deleteMutation = useMutation({
    mutationFn: deleteDistribution,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["distributions"] }); navigate({ to: "/admin/distribution" }); },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle=""><Link to="/admin/distribution"><Button>Back</Button></Link></DashboardPage>;

  return (
    <DashboardPage title={item.release} subtitle="Distribution status and platform details." actions={<Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(id); }}>Delete</Button>}>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Release" eyebrow="Overview">
          <div className="space-y-3">
            <p className="text-lg font-semibold">{item.release}</p>
            <p className="text-sm text-muted-foreground">By {item.artist}</p>
            <div className="mt-3"><StatusBadge status={item.status} /></div>
          </div>
        </SectionCard>
        <SectionCard title="Distribution details" eyebrow="Timeline">
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Platforms</p><p className="mt-2">{item.platforms.join(", ")}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Submission</p><p className="mt-2">{item.submitted}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Release</p><p className="mt-2">{item.released}</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
