import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { dashboardArtists } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/artists")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminArtistsPage,
});

function AdminArtistsPage() {
  return (
    <DashboardPage title="Artists" subtitle="Manage the active roster and artist relationships.">
      <SectionCard title="Artist roster" eyebrow="Management">
        <TableCard
          columns={[{ key: "artist", label: "Artist" }, { key: "genre", label: "Genre" }, { key: "city", label: "City" }, { key: "status", label: "Status" }]}
          rows={dashboardArtists.map((artist) => ({
            artist: <div className="flex items-center gap-3"><img src={artist.image} alt={artist.name} className="h-10 w-10 rounded-full object-cover" /><div><p className="font-medium">{artist.name}</p><p className="text-xs text-muted-foreground">{artist.email}</p></div></div>,
            genre: artist.genre,
            city: artist.city,
            status: <StatusBadge status={artist.status} />,
          }))}
        />
      </SectionCard>
    </DashboardPage>
  );
}
