import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { fetchDistributions, deleteDistribution } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/distribution")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminDistributionPage,
});

function AdminDistributionPage() {
  const queryClient = useQueryClient();
  const { data: records = [], isLoading } = useQuery({ queryKey: ["distributions"], queryFn: fetchDistributions });
  const deleteMutation = useMutation({
    mutationFn: deleteDistribution,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["distributions"] }),
  });

  return (
    <DashboardPage title="Distribution" subtitle="Track submissions, platform availability and release status.">
      <SectionCard title="Distribution queue" eyebrow="Operations">
        {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
        <TableCard
          columns={[{ key: "id", label: "ID" }, { key: "artist", label: "Artist" }, { key: "release", label: "Release" }, { key: "platforms", label: "Platforms" }, { key: "status", label: "Status" }, { key: "actions", label: "Actions" }]}
          rows={records.map((item) => ({
            id: <Link to="/admin/distribution/$id" params={{ id: item.id }} className="hover:underline">{item.id}</Link>,
            artist: item.artist,
            release: item.release,
            platforms: item.platforms.join(", "),
            status: <StatusBadge status={item.status} />,
            actions: <Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this record?")) deleteMutation.mutate(item.id); }}>Delete</Button>,
          }))}
        />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
