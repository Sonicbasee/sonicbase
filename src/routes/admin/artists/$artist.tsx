import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { dashboardArtists, type DashboardArtist } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/artists/$artist")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminArtistDetailPage,
});

function AdminArtistDetailPage() {
  const { artist } = Route.useParams();
  const entry = dashboardArtists.find((entry) => entry.id === artist);
  const item: DashboardArtist = entry || { id: "amara", name: "Amara Vale", email: "amara@sonicbase.com", city: "Lagos", genre: "Alt-R&B", image: "", status: "Active" };

  return (
    <DashboardPage title={item.name} subtitle="Artist management overview and profile details.">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Profile" eyebrow="Artist">
          <div className="flex flex-col items-center text-center">
            <img src={item.image} alt={item.name} className="h-28 w-28 rounded-full object-cover" />
            <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.genre}</p>
            <div className="mt-3"><StatusBadge status={item.status} /></div>
          </div>
        </SectionCard>

        <SectionCard title="Account details" eyebrow="Overview">
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p><p className="mt-2">{item.email}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">City</p><p className="mt-2">{item.city}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</p><p className="mt-2">{item.status}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Notes</p><p className="mt-2">Active roster member.</p></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}