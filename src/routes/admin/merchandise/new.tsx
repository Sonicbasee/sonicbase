import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { createMerch, fetchArtists, uploadContentImage } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/merchandise/new")({
  beforeLoad: async () => {
    await requireAuth("admin");
  },
  component: NewMerchPage,
});

function NewMerchPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: artists = [] } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!imageFile) throw new Error("Choose a product image before saving.");
      const image = await uploadContentImage("merchandise", imageFile);
      return createMerch({ title, artist_id: artistId, price: parseInt(price) || 0, description, status, image });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merch"] });
      navigate({ to: "/admin/merchandise" });
    },
  });

  return (
    <DashboardPage
      title="New merchandise"
      subtitle="Add a new physical or digital merchandise item."
    >
      <SectionCard title="Product details" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Afterlight Tee"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <select
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              value={artistId}
              onChange={(e) => setArtistId(e.target.value)}
            >
              <option value="">Select artist</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (₦)</label>
            <Input
              type="number"
              placeholder="42000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Product image</label>
            <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="min-h-28 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              placeholder="Describe the item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/merchandise">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button
              onClick={() => createMutation.mutate()}
              disabled={!title || !artistId || !imageFile || createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Publish item"}
            </Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
