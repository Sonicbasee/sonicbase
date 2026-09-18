import { redirect } from "@tanstack/react-router";
import { getStoredSession, type UserRole, getCurrentSession } from "@/lib/auth";

export async function requireAuth(requiredRole?: UserRole) {
  const session = await getCurrentSession();

  if (!session) {
    throw redirect({ to: "/login" });
  }

  if (requiredRole && session.role !== requiredRole) {
    throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
  }
}
