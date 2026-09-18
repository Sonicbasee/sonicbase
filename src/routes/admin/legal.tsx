import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { legalMatters } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/legal")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminLegalPage,
});

function AdminLegalPage() {
  return (
    <DashboardPage title="Legal" subtitle="Track matters, agreements and deadlines.">
      <SectionCard title="Legal matters" eyebrow="Compliance">
        <TableCard
          columns={[{ key: "matter", label: "Matter" }, { key: "artist", label: "Artist" }, { key: "status", label: "Status" }, { key: "deadline", label: "Deadline" }, { key: "assigned", label: "Assigned" }]}
          rows={legalMatters.map((matter) => ({
            matter: matter.matter,
            artist: matter.artist,
            status: <StatusBadge status={matter.status} />,
            deadline: matter.deadline,
            assigned: matter.assigned,
          }))}
        />
      </SectionCard>
    </DashboardPage>
  );
}
