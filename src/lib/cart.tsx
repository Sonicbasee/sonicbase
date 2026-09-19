import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PublicMerch } from "@/lib/public-data";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  artist: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: PublicMerch, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "sonicbase-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      // dispatch event for header badge
      window.dispatchEvent(new Event("cart-updated"));
    } catch {}
  }, [items]);

  const addItem = (product: PublicMerch, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, artist: product.artist, quantity: qty }];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };
  const clear = () => setItems([]);

  const count = items.reduce((a, b) => a + b.quantity, 0);
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0);

  return <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, subtotal }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
