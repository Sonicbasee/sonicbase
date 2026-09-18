import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/new")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminNewReleasePage,
});

function AdminNewReleasePage() {
  return (
    <DashboardPage title="New release" subtitle="Create a new catalog release and set publishing metadata.">
      <SectionCard title="Release details" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Release title</label>
            <Input placeholder="Untitled release" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input placeholder="Amara Vale" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release type</label>
            <Input placeholder="Album" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release date</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Input placeholder="Draft" />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/releases"><Button variant="secondary">Cancel</Button></Link>
            <Button>Save draft</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
