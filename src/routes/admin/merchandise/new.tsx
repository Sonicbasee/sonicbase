import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/merchandise/new")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: NewMerchPage,
});

function NewMerchPage() {
  return (
    <DashboardPage title="New merchandise" subtitle="Add a new physical or digital merchandise item.">
      <SectionCard title="Product details" eyebrow="Create">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="Afterlight Tee" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input placeholder="Amara Vale" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input placeholder="₦42,000" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea className="min-h-28 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="Describe the item, sizing, prints and launch details." />
          </div>
          <div className="space-y-2 md:col-span-2 flex justify-end gap-3 pt-4">
            <Link to="/admin/merchandise"><Button variant="secondary">Cancel</Button></Link>
            <Button>Publish item</Button>
          </div>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
