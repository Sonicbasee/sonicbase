import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/releases/release/edit")({
  beforeLoad: () => requireAuth("admin"),
  component: EditReleasePage,
});

function EditReleasePage() {
  return (
    <DashboardPage title="Edit release" subtitle="Update metadata, artwork and release status.">
      <SectionCard title="Release update" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input value="Afterlight" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input value="Amara Vale" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Input value="Published" />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/releases"><Button variant="secondary">Cancel</Button></Link>
            <Button>Save changes</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
