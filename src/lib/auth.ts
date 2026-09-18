export type UserRole = "admin" | "artist";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export const appUsers: AuthUser[] = [
  {
    id: "admin-1",
    name: "Amina Okafor",
    email: "admin@sonicbase.com",
    password: "sonicbase123",
    role: "admin",
  },
  {
    id: "artist-1",
    name: "Amara Vale",
    email: "artist@sonicbase.com",
    password: "sonicbase123",
    role: "artist",
  },
];

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

export function loginUser(email: string, password: string): SessionUser | null {
  const match = appUsers.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  );

  if (!match) return null;

  const session = {
    id: match.id,
    name: match.name,
    email: match.email,
    role: match.role,
  };

  setStoredSession(session);
  return session;
}

export function logoutUser() {
  clearStoredSession();
}
