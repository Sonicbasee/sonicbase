import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { fetchNewsItem, updateNews } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/news/id/edit")({
  beforeLoad: async () => {
    await requireAuth("admin");
  },
  component: NewsEditPage,
});

function NewsEditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: item, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchNewsItem(id),
  });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (item && !initialized) {
    setTitle(item.title);
    setCategory(item.category);
    setStatus(item.status);
    setAuthor(item.author);
    setExcerpt(item.excerpt);
    setImage(item.image);
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: () =>
      updateNews(id, { title, category, status, author, excerpt, image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      navigate({ to: "/admin/news" });
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
      title="Edit article"
      subtitle="Apply content updates and publishing changes."
    >
      <SectionCard title="Story editor" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Feature">Feature</option>
              <option value="Interview">Interview</option>
              <option value="Release">Release</option>
              <option value="News">News</option>
            </select>
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
              <option value="Scheduled">Scheduled</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea
              className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/news">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? "Saving..." : "Save article"}
            </Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
