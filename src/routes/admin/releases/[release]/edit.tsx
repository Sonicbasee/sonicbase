import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { fetchRelease, updateRelease, fetchArtists } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/release/edit")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: EditReleasePage,
});

function EditReleasePage() {
  const { release: releaseId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["release", releaseId], queryFn: () => fetchRelease(releaseId) });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [cover, setCover] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (item && !initialized) {
    setTitle(item.title);
    setArtistId(item.artistId || "");
    setType(item.type);
    setStatus(item.status);
    setDate(item.date);
    setCover(item.cover);
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: () => updateRelease(releaseId, { title, artist_id: artistId, type, status, release_date: date, cover }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["releases"] }); navigate({ to: "/admin/releases/$release", params: { release: releaseId } }); },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;

  return (
    <DashboardPage title="Edit release" subtitle="Update metadata, artwork and release status.">
      <SectionCard title="Release update" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={artistId} onChange={(e) => setArtistId(e.target.value)}>
              <option value="">Select artist</option>
              {artists.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Single">Single</option><option value="EP">EP</option><option value="Album">Album</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Draft">Draft</option><option value="Pending">Pending</option><option value="Published">Published</option><option value="Processing">Processing</option><option value="Archived">Archived</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Cover URL</label>
            <Input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/releases/$release" params={{ release: releaseId }}><Button variant="secondary">Cancel</Button></Link>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save changes"}</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
