import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardPage, SectionCard, StatusBadge, TableCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/orders")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminOrdersPage,
});

type OrderRow = {
  id: string;
  name: string;
  email: string;
  total: number;
  status: string;
  created_at: string;
  items: any[];
};

function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as OrderRow[];
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  return (
    <DashboardPage title="Orders" subtitle="Manage shop orders, payments and fulfillment.">
      <SectionCard title="All orders" eyebrow={`${orders.length} total`}>
        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
        ) : (
          <TableCard
            columns={[
              { key: "order", label: "Order" },
              { key: "customer", label: "Customer" },
              { key: "total", label: "Total" },
              { key: "status", label: "Status" },
              { key: "actions", label: "Actions" },
            ]}
            rows={orders.map((o) => ({
              order: (
                <Link to="/admin/orders/$orderId" params={{ orderId: o.id }} className="font-medium hover:underline">
                  #{o.id.slice(0, 8)} <span className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</span>
                </Link>
              ),
              customer: (
                <div>
                  <p className="font-medium">{o.name}</p>
                  <p className="text-xs text-muted-foreground">{o.email}</p>
                </div>
              ),
              total: `₦${Number(o.total).toLocaleString()}`,
              status: <StatusBadge status={o.status} />,
              actions: (
                <div className="flex gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => statusMutation.mutate({ id: o.id, status: e.target.value })}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                  >
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                  <Button asChild variant="secondary" size="sm">
                    <Link to="/admin/orders/$orderId" params={{ orderId: o.id }}>
                      View
                    </Link>
                  </Button>
                </div>
              ),
            }))}
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
