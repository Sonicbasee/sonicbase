import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { fetchLegalMatters, deleteLegalMatter } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/legal")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminLegalPage,
});

function AdminLegalPage() {
  const queryClient = useQueryClient();
  const { data: matters = [], isLoading } = useQuery({ queryKey: ["legal"], queryFn: fetchLegalMatters });
  const deleteMutation = useMutation({
    mutationFn: deleteLegalMatter,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["legal"] }),
  });

  return (
    <DashboardPage title="Legal" subtitle="Track matters, agreements and deadlines.">
      <SectionCard title="Legal matters" eyebrow="Compliance">
        {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
        <TableCard
          columns={[{ key: "matter", label: "Matter" }, { key: "artist", label: "Artist" }, { key: "status", label: "Status" }, { key: "deadline", label: "Deadline" }, { key: "assigned", label: "Assigned" }, { key: "actions", label: "Actions" }]}
          rows={matters.map((matter) => ({
            matter: <Link to="/admin/legal/$id" params={{ id: matter.id }} className="hover:underline">{matter.matter}</Link>,
            artist: matter.artist,
            status: <StatusBadge status={matter.status} />,
            deadline: matter.deadline,
            assigned: matter.assigned,
            actions: <Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this matter?")) deleteMutation.mutate(matter.id); }}>Delete</Button>,
          }))}
        />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
