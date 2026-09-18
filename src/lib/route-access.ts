import { redirect } from "@tanstack/react-router";
import { getStoredSession, type UserRole, getCurrentSession } from "@/lib/auth";

export function requireAuth(requiredRole?: UserRole) {
  if (typeof window === "undefined") return;

  const session = getStoredSession();

  if (!session) {
    throw redirect({ to: "/login" });
  }

  if (requiredRole && session.role !== requiredRole) {
    throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
  }
}

export function requireAuthSupabase(requiredRole?: UserRole) {
  return async () => {
    if (typeof window === "undefined") {
      throw redirect({ to: "/login" });
    }

    const session = await getCurrentSession();

    if (!session) {
      throw redirect({ to: "/login" });
    }

    if (requiredRole && session.role !== requiredRole) {
      throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
    }
  };
}