import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { fetchContracts, deleteContract } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/contracts")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminContractsPage,
});

function AdminContractsPage() {
  const queryClient = useQueryClient();
  const { data: contractList = [], isLoading } = useQuery({ queryKey: ["contracts"], queryFn: fetchContracts });
  const deleteMutation = useMutation({
    mutationFn: deleteContract,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });

  return (
    <DashboardPage title="Contracts" subtitle="Review active, pending and expiring agreements.">
      <SectionCard title="Contract ledger" eyebrow="Business">
        {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
        <TableCard
          columns={[{ key: "artist", label: "Artist" }, { key: "type", label: "Type" }, { key: "status", label: "Status" }, { key: "endDate", label: "End date" }, { key: "admin", label: "Admin" }, { key: "actions", label: "Actions" }]}
          rows={contractList.map((contract) => ({
            artist: <Link to="/admin/contracts/$id" params={{ id: contract.id }} className="hover:underline">{contract.artist}</Link>,
            type: contract.type,
            status: <StatusBadge status={contract.status} />,
            endDate: contract.endDate,
            admin: contract.admin,
            actions: <Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this contract?")) deleteMutation.mutate(contract.id); }}>Delete</Button>,
          }))}
        />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
