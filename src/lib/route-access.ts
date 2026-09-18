import { redirect } from "@tanstack/react-router";
import { getStoredSession, type UserRole } from "@/lib/auth";

export async function requireAuth(requiredRole?: UserRole) {
  const session = typeof window === "undefined" ? null : getStoredSession();

  if (!session) {
    throw redirect({ to: "/login" });
  }

  if (requiredRole && session.role !== requiredRole) {
    throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
  }
}
