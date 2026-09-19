import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { fetchArtist, updateArtist, uploadContentImage } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/artists/$artist/edit")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: EditArtistPage,
});

function EditArtistPage() {
  const { artist: artistId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({ queryKey: ["artist", artistId], queryFn: () => fetchArtist(artistId) });
  const [initialized, setInitialized] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [statement, setStatement] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [appleMusicUrl, setAppleMusicUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  if (item && !initialized) {
    setName(item.name);
    setEmail(item.email);
    setCity(item.city);
    setGenre(item.genre);
    setBio(item.bio);
    setStatement(item.statement);
    setImage(item.image);
    setSpotifyUrl(item.spotifyUrl || "");
    setAppleMusicUrl(item.appleMusicUrl || "");
    setInstagramUrl(item.instagramUrl || "");
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const nextImage = imageFile ? await uploadContentImage("artists", imageFile) : image;
      return updateArtist(artistId, { name, email, city, genre, bio, statement, image: nextImage, spotifyUrl, appleMusicUrl, instagramUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      queryClient.invalidateQueries({ queryKey: ["artist", artistId] });
      navigate({ to: "/admin/artists/$artist", params: { artist: artistId } });
    },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading artist...</p></DashboardPage>;
  if (!item) return <DashboardPage title="Not found" subtitle="Artist not found"><Link to="/admin/artists"><Button>Back to artists</Button></Link></DashboardPage>;

  return (
    <DashboardPage title="Edit artist" subtitle="Update the artist profile shown across Sonicbase.">
      <SectionCard title="Artist details" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Artist name</label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">City</label><Input value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Genre</label><Input value={genre} onChange={(e) => setGenre(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Artist image</label><Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />{image && <p className="text-xs text-muted-foreground">Current image is saved. Choose a file to replace it.</p>}</div>
          <div className="space-y-2"><label className="text-sm font-medium">Spotify URL</label><Input type="url" value={spotifyUrl} onChange={(e) => setSpotifyUrl(e.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Apple Music URL</label><Input type="url" value={appleMusicUrl} onChange={(e) => setAppleMusicUrl(e.target.value)} /></div>
          <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Instagram URL</label><Input type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} /></div>
          <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Bio</label><textarea className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={bio} onChange={(e) => setBio(e.target.value)} /></div>
          <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium">Artist statement</label><textarea className="min-h-20 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={statement} onChange={(e) => setStatement(e.target.value)} /></div>
          <div className="flex justify-end gap-3 pt-4 md:col-span-2"><Link to="/admin/artists/$artist" params={{ artist: artistId }}><Button variant="secondary">Cancel</Button></Link><Button onClick={() => saveMutation.mutate()} disabled={!name || !email || saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save artist"}</Button></div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
