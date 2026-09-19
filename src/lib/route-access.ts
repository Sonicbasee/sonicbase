import { redirect } from "@tanstack/react-router";
import { getCurrentSession, type UserRole } from "@/lib/auth";

export async function requireAuth(requiredRole?: UserRole) {
  if (typeof window === "undefined") return;
  const session = await getCurrentSession();

  if (!session) {
    throw redirect({ to: "/login" });
  }

  if (requiredRole && session.role !== requiredRole) {
    throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
  }
}
