import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { contracts } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/contracts")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminContractsPage,
});

function AdminContractsPage() {
  return (
    <DashboardPage title="Contracts" subtitle="Review active, pending and expiring agreements.">
      <SectionCard title="Contract ledger" eyebrow="Business">
        <TableCard
          columns={[{ key: "artist", label: "Artist" }, { key: "type", label: "Type" }, { key: "status", label: "Status" }, { key: "endDate", label: "End date" }, { key: "admin", label: "Admin" }]}
          rows={contracts.map((contract) => ({
            artist: contract.artist,
            type: contract.type,
            status: <StatusBadge status={contract.status} />,
            endDate: contract.endDate,
            admin: contract.admin,
          }))}
        />
      </SectionCard>
    </DashboardPage>
  );
}
