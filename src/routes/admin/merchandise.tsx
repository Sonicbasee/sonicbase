import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardPage, SectionCard, StatusBadge } from "@/components/dashboard";
import { merchandise } from "@/lib/dashboard-data";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/merchandise")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminMerchPage,
});

function AdminMerchPage() {
  return (
    <DashboardPage
      title="Merchandise"
      subtitle="Manage artist merchandise and published drops."
      actions={<Link to="/admin/merchandise/new"><Button size="sm">Add item</Button></Link>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {merchandise.map((item) => (
          <SectionCard key={item.id} title={item.title} eyebrow={item.artist}>
            <img src={item.image} alt={item.title} className="h-48 w-full rounded-xl object-cover" />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold">₦{item.price.toLocaleString()}</span>
              <StatusBadge status={item.status} />
            </div>
          </SectionCard>
        ))}
      </div>
    </DashboardPage>
  );
}
