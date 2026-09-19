import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { fetchRelease, updateRelease, fetchArtists, uploadContentImage } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/$release/edit")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: EditReleasePage,
});

const ARTIST_ROLES = ["Main Artist", "Lead Artist", "Featured", "Collaborator", "Producer"] as const;

function EditReleasePage() {
  const { release: releaseId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["release", releaseId], queryFn: () => fetchRelease(releaseId) });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const [title, setTitle] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<{ artist_id: string; role: string }[]>([{ artist_id: "", role: "Main Artist" }]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [cover, setCover] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [listenUrl, setListenUrl] = useState("");
  const [watchUrl, setWatchUrl] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!item || initialized) return;
    setTitle(item.title);
    setSelectedArtists(
      item.artists?.length
        ? item.artists.map((a) => ({ artist_id: a.id, role: a.role }))
        : item.artistId
          ? [{ artist_id: item.artistId, role: "Main Artist" }]
          : [{ artist_id: "", role: "Main Artist" }]
    );
    setType(item.type);
    setStatus(item.status);
    setDate(item.date);
    setCover(item.cover);
    setListenUrl(item.listenUrl || "");
    setWatchUrl(item.watchUrl || "");
    setInitialized(true);
  }, [item, initialized]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const nextCover = coverFile ? await uploadContentImage("releases", coverFile) : cover;
      const validArtists = selectedArtists.filter((a) => a.artist_id);
      return updateRelease(releaseId, { title, artists: validArtists, type, status, release_date: date, cover: nextCover, listen_url: listenUrl, watch_url: watchUrl });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["releases"] }); queryClient.invalidateQueries({ queryKey: ["release", releaseId] }); navigate({ to: "/admin/releases/$release", params: { release: releaseId } }); },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle="Release not found"><Link to="/admin/releases"><Button>Back to releases</Button></Link></DashboardPage>;

  return (
    <DashboardPage title="Edit release" subtitle="Update metadata, artwork and release status.">
      <SectionCard title="Release update" eyebrow="Edit"><div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Title</label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Artists — manage all contributors</label>
          <div className="space-y-3">
            {selectedArtists.map((entry, idx) => (
              <div key={idx} className="flex gap-2">
                <select className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm" value={entry.artist_id} onChange={(e) => { const next = [...selectedArtists]; next[idx] = { ...next[idx], artist_id: e.target.value }; setSelectedArtists(next); }}>
                  <option value="">Select artist</option>{artists.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <select className="w-40 rounded-xl border border-border bg-background px-3 py-2 text-sm" value={entry.role} onChange={(e) => { const next = [...selectedArtists]; next[idx] = { ...next[idx], role: e.target.value }; setSelectedArtists(next); }}>
                  {ARTIST_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedArtists(selectedArtists.filter((_, i) => i !== idx))} disabled={selectedArtists.length === 1}>Remove</Button>
              </div>
            ))}
            <Button type="button" variant="secondary" size="sm" onClick={() => setSelectedArtists([...selectedArtists, { artist_id: "", role: "Featured" }])}>+ Add artist</Button>
          </div>
        </div>
        <div className="space-y-2"><label className="text-sm font-medium">Type</label><select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}><option value="Single">Single</option><option value="EP">EP</option><option value="Album">Album</option></select></div>
        <div className="space-y-2"><label className="text-sm font-medium">Status</label><select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}><option value="Draft">Draft</option><option value="Pending">Pending</option><option value="Published">Published</option><option value="Processing">Processing</option><option value="Archived">Archived</option></select></div>
        <div className="space-y-2"><label className="text-sm font-medium">Release date</label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Release artwork</label><Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} />{cover && <p className="text-xs text-muted-foreground">Current artwork is saved. Choose a file to replace it.</p>}</div>
        <div className="space-y-2"><label className="text-sm font-medium">Listen URL</label><Input type="url" value={listenUrl} onChange={(e) => setListenUrl(e.target.value)} placeholder="https://open.spotify.com/..." /></div>
        <div className="space-y-2"><label className="text-sm font-medium">Watch URL</label><Input type="url" value={watchUrl} onChange={(e) => setWatchUrl(e.target.value)} placeholder="https://youtube.com/watch?..." /></div>
        {saveMutation.isError && <p className="text-sm text-destructive md:col-span-2">Unable to save this release. Please try again.</p>}
        <div className="flex justify-end gap-3 pt-4 md:col-span-2"><Link to="/admin/releases/$release" params={{ release: releaseId }}><Button variant="secondary">Cancel</Button></Link><Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save changes"}</Button></div>
      </div></SectionCard>
    </DashboardPage>
  );
}
