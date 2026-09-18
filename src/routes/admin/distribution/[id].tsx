import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { distributionRecords, type DashboardDistribution } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/distribution/id")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: DistributionDetailPage,
});

function DistributionDetailPage() {
  const { id } = Route.useParams();
  const item: DashboardDistribution = distributionRecords.find((entry) => entry.id === id) || distributionRecords[0] || { id: "D-1042", artist: "Amara Vale", release: "Afterlight", status: "Distributed", platforms: ["Spotify", "Apple Music", "YouTube Music"], submitted: "2026-09-10", released: "2026-09-18" };

  return (
    <DashboardPage title={item.release} subtitle="Distribution status and platform details.">
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
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Notes</p><p className="mt-2">Metadata check required.</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}