import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PageTitle } from "@/components/sonicbase";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/order/$orderId")({
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const { data: order, isLoading, refetch } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tx_ref = params.get("tx_ref");
    const transaction_id = params.get("transaction_id");
    const status = params.get("status");
    if ((tx_ref || transaction_id) && order && order.status === "pending" && !verifying) {
      setVerifying(true);
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      fetch(`${supabaseUrl}/functions/v1/verify-flutterwave-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        body: JSON.stringify({ orderId, transaction_id, tx_ref, status }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) refetch();
          else setVerifyError(data.message || "Payment verification failed");
        })
        .catch((e) => setVerifyError(e.message))
        .finally(() => setVerifying(false));
    }
  }, [order, orderId, refetch, verifying]);

  if (isLoading) {
    return (
      <div className="page-shell py-20 text-center">
        <p className="text-muted-foreground">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-shell py-20 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Button asChild className="mt-6">
          <Link to="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  const items = Array.isArray(order.items) ? order.items : JSON.parse(order.items || "[]");

  return (
    <>
      <PageTitle intro={`Order #${order.id.slice(0, 8)} — ${order.status}`}>{order.status === "paid" ? "Payment confirmed" : order.status === "pending" ? "Complete your payment" : "Order confirmed"}</PageTitle>
      <section className="page-shell grid gap-10 pb-24 lg:grid-cols-2">
        <div className="rounded-2xl border border-border p-6">
          {verifying && <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">Verifying payment...</p>}
          {verifyError && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{verifyError}</p>}
          {order.status === "pending" && !verifying && !verifyError && (
            <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">Awaiting Flutterwave payment — complete payment to confirm order.</p>
          )}
          <h2 className="text-lg font-semibold">Thank you, {order.name}!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {order.status === "paid" ? "Your payment is confirmed. We’ll ship to" : "We’ve received your order and will contact you shortly at"} {order.email} / {order.phone}.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Delivery to:</span> {order.address}, {order.city} {order.state && `· ${order.state}`} · {order.country}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span> <span className="font-medium capitalize">{order.status}</span>
            </p>
          </div>
          <div className="mt-8 flex gap-3">
            <Button asChild>
              <Link to="/shop">Continue shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-6 space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image || "/placeholder.png"} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                  <p className="mt-1 text-sm">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₦{Number(order.subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₦{Number(order.shipping).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span>
              <span>₦{Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
