import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/news/new")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminNewNewsPage,
});

function AdminNewNewsPage() {
  return (
    <DashboardPage title="New article" subtitle="Draft or publish a story for the public Sonicbase website.">
      <SectionCard title="Article content" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="A new chapter for the catalog" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input placeholder="Feature" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Input placeholder="Draft" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="Short description for the article preview" />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/news"><Button variant="secondary">Cancel</Button></Link>
            <Button>Save draft</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
