import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageTitle } from "@/components/sonicbase";
import { useCart } from "@/lib/cart";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", country: "Nigeria" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = items.length > 0 ? 3500 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="page-shell py-20 text-center">
        <h1 className="display-title text-4xl">Your cart is empty</h1>
        <p className="mt-4 text-muted-foreground">Add something from the shop to checkout.</p>
        <Button asChild className="mt-6">
          <Link to="/shop">Go to shop</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert({
          email: form.email,
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          items: items,
          subtotal,
          shipping,
          total,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) throw error;
      clear();
      navigate({ to: "/order/$orderId", params: { orderId: data.id } });
    } catch (err: any) {
      setError(err.message || "Could not place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle intro="Review your bag, add delivery details and place your order.">Checkout</PageTitle>
      <section className="page-shell grid gap-10 pb-24 lg:grid-cols-[1.4fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-lg font-semibold">Delivery details</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone *</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="080..." required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City *</label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Lagos" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Address *</label>
                <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, area, landmark" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Lagos" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Nigeria" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pay on delivery or via bank transfer. Online payment (Paystack) coming soon.</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted p-4 text-sm">
              <span className="font-medium">Cash on delivery</span>
              <span className="ml-auto text-muted-foreground">Pay when your order arrives</span>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full rounded-full py-6 text-base">
            {loading ? "Placing order..." : `Place order — ₦${total.toLocaleString()}`}
          </Button>
          <p className="text-center text-xs text-muted-foreground">By placing your order, you agree to our terms.</p>
        </form>

        <div className="h-fit rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image || "/placeholder.png"} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity} · {item.artist}</p>
                  <p className="mt-1 text-sm font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₦{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
