import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchLegalMatter, deleteLegalMatter } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/legal/id")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: LegalDetailPage,
});

function LegalDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["legal", id], queryFn: () => fetchLegalMatter(id) });
  const deleteMutation = useMutation({
    mutationFn: deleteLegalMatter,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["legal"] }); navigate({ to: "/admin/legal" }); },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle=""><Link to="/admin/legal"><Button>Back</Button></Link></DashboardPage>;

  return (
    <DashboardPage title={item.matter} subtitle="Legal matter review and deadline tracking." actions={<Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(id); }}>Delete</Button>}>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Matter" eyebrow="Details">
          <div className="space-y-3">
            <p className="text-lg font-semibold">{item.matter}</p>
            <p className="text-sm text-muted-foreground">Artist: {item.artist}</p>
            <div className="mt-3"><StatusBadge status={item.status} /></div>
          </div>
        </SectionCard>
        <SectionCard title="Review" eyebrow="Controls">
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Deadline</p><p className="mt-2">{item.deadline}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Assigned</p><p className="mt-2">{item.assigned}</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
