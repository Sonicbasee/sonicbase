import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { createRelease, fetchArtists } from "@/lib/api";
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
  const [cover, setCover] = useState("");

  const createMutation = useMutation({
    mutationFn: () => createRelease({ title, artist_id: artistId, type, status, release_date: date, cover }),
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
            <label className="text-sm font-medium">Cover URL</label>
            <Input placeholder="https://..." value={cover} onChange={(e) => setCover(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/releases"><Button variant="secondary">Cancel</Button></Link>
            <Button onClick={() => createMutation.mutate()} disabled={!title || !artistId || createMutation.isPending}>{createMutation.isPending ? "Creating..." : "Create release"}</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
