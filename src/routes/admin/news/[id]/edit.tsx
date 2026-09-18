import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/news/id/edit")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: NewsEditPage,
});

function NewsEditPage() {
  return (
    <DashboardPage title="Edit article" subtitle="Apply content updates and publishing changes.">
      <SectionCard title="Story editor" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input value="Amara Vale unveils a new visual chapter" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input value="Feature" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Input value="Published" />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/news"><Button variant="secondary">Cancel</Button></Link>
            <Button>Save article</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
