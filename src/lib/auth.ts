import { supabase } from "@/lib/supabase";

export type UserRole = "admin" | "artist";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

const SESSION_KEY = "sonicbase-session";

export function getStoredSession(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function setStoredSession(user: SessionUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export async function loginUser(email: string, password: string): Promise<SessionUser | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) return null;

  const { user } = data;
  const rawRole: string | undefined = user.user_metadata?.["role"];
  const role: UserRole = (rawRole as string) === "admin" ? "admin" : "artist";
  const fullName: string | undefined = user.user_metadata?.["full_name"] as string;
  const userEmail = user.email || "user@sonicbase.com";

  const session: SessionUser = {
    id: user.id,
    name: fullName || "User",
    email: userEmail,
    role,
  };

  setStoredSession(session);
  return session;
}

export async function signupUser(name: string, email: string, password: string, role: UserRole): Promise<SessionUser | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role,
      },
    },
  });

  if (error || !data.user) return null;

  const session: SessionUser = {
    id: data.user.id,
    name: name,
    email: email,
    role,
  };

  setStoredSession(session);
  return session;
}

export async function logoutUser() {
  await supabase.auth.signOut();
  clearStoredSession();
}

export async function getCurrentSession(): Promise<SessionUser | null> {
  const stored = getStoredSession();
  if (stored) {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        clearStoredSession();
        return null;
      }
      return stored;
    } catch {
      clearStoredSession();
      return null;
    }
  }

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return null;
    }

    const { user } = data.session;
    const rawRole: string | undefined = user.user_metadata?.["role"];
    const role: UserRole = (rawRole as string) === "admin" ? "admin" : "artist";
    const rawFullName: string | undefined = user.user_metadata?.["full_name"];
    const userEmail = user.email || "user@sonicbase.com";
    const session: SessionUser = {
      id: user.id,
      name: rawFullName || "User",
      email: userEmail,
      role,
    };

    setStoredSession(session);
    return session;
  } catch (e) {
    return getStoredSession();
  }
}