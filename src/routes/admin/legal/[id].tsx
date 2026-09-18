import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { legalMatters } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/legal/id")({
  beforeLoad: () => requireAuth("admin"),
  component: LegalDetailPage,
});

function LegalDetailPage() {
  const { id } = Route.useParams();
  const item = legalMatters.find((matter) => matter.id === id) ?? legalMatters[0];

  return (
    <DashboardPage title={item.matter} subtitle="Legal matter review and deadline tracking.">
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
            <div className="md:col-span-2"><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Notes</p><p className="mt-2 text-sm text-muted-foreground">Review access requests, document packet and any disputed metadata before sign-off.</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
