import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { fetchNews, deleteNews } from "@/lib/api";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/news")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminNewsPage,
});

function AdminNewsPage() {
  const queryClient = useQueryClient();
  const { data: newsItems = [], isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNews });
  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  return (
    <DashboardPage title="News" subtitle="Create, review and publish editorial content for the public website." actions={<Link to="/admin/news/new"><Button size="sm">New article</Button></Link>}>
      {isLoading ? <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p> : (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {newsItems.map((item) => (
          <SectionCard key={item.id} title={item.title} eyebrow={item.category} action={<Button variant="destructive" size="sm" onClick={() => { if (confirm("Delete this article?")) deleteMutation.mutate(item.id); }}>Delete</Button>}>
            <img src={item.image || "/placeholder.png"} alt={item.title} className="h-44 w-full rounded-xl object-cover" />
            <p className="mt-4 text-sm text-muted-foreground">{item.excerpt}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.author}</span>
              <StatusBadge status={item.status} />
            </div>
            <Link to="/admin/news/$id/edit" params={{ id: item.id }} className="mt-3 block text-sm text-primary hover:underline">Edit article</Link>
          </SectionCard>
        ))}
        {newsItems.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center col-span-full">No articles yet. Create your first one.</p>}
      </div>
      )}
    </DashboardPage>
  );
}
