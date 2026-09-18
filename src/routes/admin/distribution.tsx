import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { distributionRecords } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/distribution")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminDistributionPage,
});

function AdminDistributionPage() {
  return (
    <DashboardPage title="Distribution" subtitle="Track submissions, platform availability and release status.">
      <SectionCard title="Distribution queue" eyebrow="Operations">
        <TableCard
          columns={[{ key: "id", label: "ID" }, { key: "artist", label: "Artist" }, { key: "release", label: "Release" }, { key: "platforms", label: "Platforms" }, { key: "status", label: "Status" }]}
          rows={distributionRecords.map((item) => ({
            id: item.id,
            artist: item.artist,
            release: item.release,
            platforms: item.platforms.join(", "),
            status: <StatusBadge status={item.status} />,
          }))}
        />
      </SectionCard>
    </DashboardPage>
  );
}
