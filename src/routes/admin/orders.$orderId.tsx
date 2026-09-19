import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/orders/$orderId")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminOrderDetailPage,
});

function AdminOrderDetailPage() {
  const { orderId } = Route.useParams();
  const { data: order, isLoading } = useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <DashboardPage title="Loading..." subtitle=""><p className="text-sm text-muted-foreground">Loading...</p></DashboardPage>;
  if (!order) return <DashboardPage title="Not found" subtitle="Order not found"><Link to="/admin/orders"><Button>Back to orders</Button></Link></DashboardPage>;

  const items = Array.isArray(order.items) ? order.items : JSON.parse(order.items || "[]");

  return (
    <DashboardPage title={`Order #${order.id.slice(0, 8)}`} subtitle={`${order.status} · ${new Date(order.created_at).toLocaleString()}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Customer" eyebrow="Buyer">
          <div className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">Name:</span> {order.name}</p>
            <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
            <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
            <p><span className="text-muted-foreground">Address:</span> {order.address}, {order.city} {order.state && `· ${order.state}`} · {order.country}</p>
            <p><span className="text-muted-foreground">Payment ref:</span> {order.flutterwave_ref || order.payment_ref || "—"}</p>
            <p><span className="text-muted-foreground">Tx ID:</span> {order.flutterwave_tx_id || "—"}</p>
          </div>
        </SectionCard>
        <SectionCard title="Summary" eyebrow="Order">
          <div className="space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image || "/placeholder.png"} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity} · {item.artist}</p>
                  <p className="mt-1 text-sm">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₦{Number(order.subtotal).toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>₦{Number(order.shipping).toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><span>Total</span><span>₦{Number(order.total).toLocaleString()}</span></div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
