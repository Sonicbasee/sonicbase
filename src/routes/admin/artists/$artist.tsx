import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchArtist, deleteArtist } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/artists/$artist")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminArtistDetailPage,
});

function AdminArtistDetailPage() {
  const { artist: artistId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["artist", artistId], queryFn: () => fetchArtist(artistId) });
  const deleteMutation = useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["artists"] }); navigate({ to: "/admin/artists" }); },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle="Artist not found"><Link to="/admin/artists"><Button>Back to artists</Button></Link></DashboardPage>;

  return (
    <DashboardPage title={item.name} subtitle="Artist management overview and profile details." actions={<Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this artist?")) deleteMutation.mutate(artistId); }}>Delete artist</Button>}>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Profile" eyebrow="Artist">
          <div className="flex flex-col items-center text-center">
            <img src={item.image || "/placeholder.png"} alt={item.name} className="h-28 w-28 rounded-full object-cover" />
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
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
