import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardPage, EmptyState, SectionCard, StatusBadge } from "@/components/dashboard";
import { dashboardReleases } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/artist/releases")({
  beforeLoad: () => requireAuth("artist"),
  component: ArtistReleasesPage,
});

function ArtistReleasesPage() {
  return (
    <DashboardPage title="Releases" subtitle="Your current catalogue and performance history.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardReleases.map((release) => (
          <Link key={release.id} to="/artist/releases/$release" params={{ release: release.id }} className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5">
            <img src={release.cover} alt={release.title} className="h-56 w-full rounded-xl object-cover" />
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{release.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{release.type} · 2026</p>
              </div>
              <StatusBadge status={release.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Streams</p>
                <p className="mt-1 font-medium">{release.streams.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Revenue</p>
                <p className="mt-1 font-medium">₦{release.revenue.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {dashboardReleases.length === 0 && (
        <div className="mt-6">
          <EmptyState title="No releases yet" description="Your public catalogue will appear here once a release is published." />
        </div>
      )}
    </DashboardPage>
  );
}
