import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/merchandise/id/edit")({
  beforeLoad: () => requireAuth("admin"),
  component: MerchEditPage,
});

function MerchEditPage() {
  return (
    <DashboardPage title="Edit merchandise" subtitle="Modify pricing, status and item details.">
      <SectionCard title="Item settings" eyebrow="Edit">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input value="Afterlight Tee" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input value="Amara Vale" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input value="₦42,000" />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/merchandise"><Button variant="secondary">Cancel</Button></Link>
            <Button>Save item</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
