import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { createRelease, fetchArtists, uploadContentImage } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/new")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminNewReleasePage,
});

function AdminNewReleasePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: fetchArtists });
  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [type, setType] = useState("Single");
  const [status, setStatus] = useState("Draft");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [tracksInput, setTracksInput] = useState("");
  const [listenUrl, setListenUrl] = useState("");
  const [watchUrl, setWatchUrl] = useState("");

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!coverFile) throw new Error("Choose release artwork before saving.");
      const cover = await uploadContentImage("releases", coverFile);
      return createRelease({
        title, artist_id: artistId, type, status, release_date: date, cover, listen_url: listenUrl, watch_url: watchUrl,
        description, tracks: tracksInput.split(",").map((t) => t.trim()).filter(Boolean),
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["releases"] }); navigate({ to: "/admin/releases" }); },
  });

  return (
    <DashboardPage title="New release" subtitle="Create a new catalog release and set publishing metadata.">
      <SectionCard title="Release details" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Release title</label>
            <Input placeholder="Untitled release" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={artistId} onChange={(e) => setArtistId(e.target.value)}>
              <option value="">Select artist</option>
              {artists.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release type</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Single">Single</option><option value="EP">EP</option><option value="Album">Album</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Draft">Draft</option><option value="Pending">Pending</option><option value="Published">Published</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Release artwork</label>
            <Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Listen URL</label>
            <Input type="url" placeholder="https://open.spotify.com/..." value={listenUrl} onChange={(e) => setListenUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Watch URL</label>
            <Input type="url" placeholder="https://youtube.com/watch?..." value={watchUrl} onChange={(e) => setWatchUrl(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="Describe this release..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Track list (comma-separated)</label>
            <Input placeholder="Track 1, Track 2, Track 3" value={tracksInput} onChange={(e) => setTracksInput(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/releases"><Button variant="secondary">Cancel</Button></Link>
            <Button onClick={() => createMutation.mutate()} disabled={!title || !artistId || !coverFile || createMutation.isPending}>{createMutation.isPending ? "Creating..." : "Create release"}</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
