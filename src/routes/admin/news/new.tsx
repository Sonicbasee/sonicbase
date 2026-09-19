import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { createNews, uploadContentImage } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/news/new")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminNewNewsPage,
});

function AdminNewNewsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Feature");
  const [status, setStatus] = useState("Draft");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!imageFile) throw new Error("Choose an article image before saving.");
      const image = await uploadContentImage("news", imageFile);
      return createNews({ title, category, status, author, excerpt, content, image });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["news"] }); navigate({ to: "/admin/news" }); },
  });

  return (
    <DashboardPage title="New article" subtitle="Draft or publish a story for the public Sonicbase website.">
      <SectionCard title="Article content" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="A new chapter for the catalog" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Feature">Feature</option><option value="Interview">Interview</option><option value="Release">Release</option><option value="News">News</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Draft">Draft</option><option value="Published">Published</option><option value="Scheduled">Scheduled</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Input placeholder="Author name" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Article image</label>
            <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="Short description" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Article body</label>
            <textarea className="min-h-56 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm leading-relaxed" placeholder="Write the full story. Use a blank line between paragraphs." value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/news"><Button variant="secondary">Cancel</Button></Link>
            <Button onClick={() => createMutation.mutate()} disabled={!title || !imageFile || createMutation.isPending}>{createMutation.isPending ? "Saving..." : "Save draft"}</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
