import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { newsItems } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/news")({
  beforeLoad: () => requireAuth("admin"),
  component: AdminNewsPage,
});

function AdminNewsPage() {
  return (
    <DashboardPage
      title="News"
      subtitle="Create, review and publish editorial content for the public website."
      actions={<Link to="/admin/news/new"><Button size="sm">New article</Button></Link>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {newsItems.map((item) => (
          <SectionCard key={item.id} title={item.title} eyebrow={item.category}>
            <img src={item.image} alt={item.title} className="h-44 w-full rounded-xl object-cover" />
            <p className="mt-4 text-sm text-muted-foreground">{item.excerpt}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.author}</span>
              <StatusBadge status={item.status} />
            </div>
          </SectionCard>
        ))}
      </div>
    </DashboardPage>
  );
}
