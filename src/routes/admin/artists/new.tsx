import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { createArtist } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/artists/new")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminNewArtistPage,
});

function AdminNewArtistPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [statement, setStatement] = useState("");

  const createMutation = useMutation({
    mutationFn: () => createArtist({ name, email, city, genre, image, status: "Active" }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["artists"] }); navigate({ to: "/admin/artists" }); },
  });

  return (
    <DashboardPage title="New artist" subtitle="Add a new artist to the Sonicbase roster.">
      <SectionCard title="Artist details" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Artist name</label>
            <Input placeholder="Artist name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="artist@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input placeholder="Lagos, NG" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Genre</label>
            <Input placeholder="ALT-R&B · SOUL" value={genre} onChange={(e) => setGenre(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="Artist biography..." value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Artist statement</label>
            <textarea className="min-h-20 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="A quote from the artist..." value={statement} onChange={(e) => setStatement(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/artists"><Button variant="secondary">Cancel</Button></Link>
            <Button onClick={() => createMutation.mutate()} disabled={!name || !email || createMutation.isPending}>{createMutation.isPending ? "Creating..." : "Create artist"}</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
