import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { contracts } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/contracts/id")({
  beforeLoad: () => requireAuth("admin"),
  component: ContractDetailPage,
});

function ContractDetailPage() {
  const { id } = Route.useParams();
  const item = contracts.find((contract) => contract.id === id) ?? contracts[0];

  return (
    <DashboardPage title={item.id} subtitle="Contract review and internal notes.">
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
