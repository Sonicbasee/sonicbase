import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { fetchArtists, deleteArtist } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/artists")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminArtistsPage,
});

function AdminArtistsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const { data: artists = [], isLoading } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const deleteMutation = useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      setDeleteTarget(null);
    },
  });

  if (pathname !== "/admin/artists") return <Outlet />;

  return (
    <>
      <DashboardPage title="Artists" subtitle="Manage the active roster and artist relationships." actions={<Link to="/admin/artists/new"><Button size="sm">Add artist</Button></Link>}>
        <SectionCard title="Artist roster" eyebrow="Management">
          {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
          <TableCard
            columns={[{ key: "artist", label: "Artist" }, { key: "genre", label: "Genre" }, { key: "city", label: "City" }, { key: "status", label: "Status" }, { key: "actions", label: "Actions" }]}
            rows={artists.map((artist) => ({
              artist: <Link to="/admin/artists/$artist" params={{ artist: artist.id }} className="flex items-center gap-3"><img src={artist.image || "/placeholder.png"} alt={artist.name} className="h-10 w-10 rounded-full object-cover" /><div><p className="font-medium hover:underline">{artist.name}</p><p className="text-xs text-muted-foreground">{artist.email}</p></div></Link>,
              genre: artist.genre,
              city: artist.city,
              status: <StatusBadge status={artist.status} />,
              actions: <div className="flex gap-2"><Button asChild variant="secondary" size="sm"><Link to="/admin/artists/$artist/edit" params={{ artist: artist.id }}>Edit</Link></Button><Button variant="destructive" size="sm" onClick={() => setDeleteTarget(artist.id)}>Delete</Button></div>,
            }))}
          />
          )}
        </SectionCard>
      </DashboardPage>
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete artist?"
        description="This will permanently delete the artist and their profile. This action cannot be undone."
        confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete artist"}
        variant="destructive"
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget)}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
