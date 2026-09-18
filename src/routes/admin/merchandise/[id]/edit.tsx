import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { fetchMerchItem, updateMerch, fetchArtists } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/merchandise/id/edit")({
  beforeLoad: async () => {
    await requireAuth("admin");
  },
  component: MerchEditPage,
});

function MerchEditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: item, isLoading } = useQuery({
    queryKey: ["merch", id],
    queryFn: () => fetchMerchItem(id),
  });

  const { data: artists = [] } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (item && !initialized) {
    setTitle(item.title);
    setPrice(String(item.price));
    setStatus(item.status);
    setImage(item.image);
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: () =>
      updateMerch(id, {
        title,
        artist_id: artistId || undefined,
        price: parseInt(price) || 0,
        status,
        image,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merch"] });
      navigate({ to: "/admin/merchandise" });
    },
  });

  if (isLoading) {
    return (
      <DashboardPage title="Loading..." subtitle="">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title="Edit merchandise"
      subtitle="Modify pricing, status and item details."
    >
      <SectionCard title="Item settings" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input
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
              <option value="">Keep current</option>
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
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/merchandise">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? "Saving..." : "Save item"}
            </Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
