import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Music2,
  Newspaper,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { logoutUser, type UserRole } from "@/lib/auth";

export type DashboardNavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
};

const artistNav: DashboardNavItem[] = [
  { label: "Overview", path: "/artist", icon: LayoutDashboard },
  { label: "Revenue", path: "/artist/revenue", icon: CreditCard },
  { label: "Streams", path: "/artist/streams", icon: TrendingUp },
  { label: "Releases", path: "/artist/releases", icon: Music2 },
  { label: "Profile", path: "/artist/profile", icon: Users },
  { label: "Logout", path: "/login", icon: LogOut },
];

const adminNav: DashboardNavItem[] = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Artists", path: "/admin/artists", icon: Users },
  { label: "Releases", path: "/admin/releases", icon: Music2 },
  { label: "Merchandise", path: "/admin/merchandise", icon: ShoppingBag },
  { label: "News", path: "/admin/news", icon: Newspaper },
  { label: "Profile", path: "/admin/profile", icon: Users },
  { label: "Logout", path: "/login", icon: LogOut },
];

export function getDashboardNav(role: UserRole) {
  return role === "artist" ? artistNav : adminNav;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function StatCard({
  label,
  value,
  change,
  detail,
  accent,
}: {
  label: string;
  value: string;
  change?: string;
  detail?: string;
  accent?: "neutral" | "success" | "warning" | "danger";
}) {
  const accentClasses = {
    neutral: "bg-muted/60 text-foreground",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        {change && (
          <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${accentClasses[accent ?? "neutral"]}`}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {detail && <p className="mt-2 text-xs text-muted-foreground">{detail}</p>}
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const palette: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Published: "bg-emerald-100 text-emerald-700",
    Distributed: "bg-emerald-100 text-emerald-700",
    Draft: "bg-slate-200 text-slate-700",
    Pending: "bg-amber-100 text-amber-700",
    "Pending signature": "bg-amber-100 text-amber-700",
    "Requires action": "bg-red-100 text-red-700",
    Processing: "bg-blue-100 text-blue-700",
    Failed: "bg-red-100 text-red-700",
    Archived: "bg-slate-200 text-slate-700",
    Scheduled: "bg-violet-100 text-violet-700",
    "In review": "bg-violet-100 text-violet-700",
    "Awaiting document": "bg-amber-100 text-amber-700",
    Resolved: "bg-emerald-100 text-emerald-700",
    Open: "bg-blue-100 text-blue-700",
    Expiring: "bg-orange-100 text-orange-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${palette[status] ?? "bg-slate-200 text-slate-700"}`}>
      {status}
    </span>
  );
}

export function SectionCard({
  title,
  eyebrow,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          {eyebrow && <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>}
          <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function DashboardPage({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardShell search={search} setSearch={setSearch} onLogout={handleLogout} title={title} subtitle={subtitle} actions={actions}>
        {children}
      </DashboardShell>
    </div>
  );
}

function DashboardShell({
  search,
  setSearch,
  onLogout,
  title,
  subtitle,
  actions,
  children,
}: {
  search: string;
  setSearch: (value: string) => void;
  onLogout: () => void;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = useMemo(() => (typeof window === "undefined" ? "artist" : (localStorage.getItem("sonicbase-session") ? JSON.parse(localStorage.getItem("sonicbase-session") ?? "{}").role : "artist")), []);
  const nav = getDashboardNav(role as UserRole);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-72 flex-col border-r border-border bg-card/80 lg:flex">
        <div className="flex items-center gap-3 border-b border-border px-6 py-5">
          <div className="sonicbase-logo-mark h-9 w-9" aria-hidden="true" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Sonicbase</p>
            <p className="text-sm font-medium">Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {nav.map(({ label, path, icon: Icon }) => (
<Link
              key={path}
              to={path}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {label}
              </span>
              {label === "Logout" && <ChevronRight className="h-4 w-4" />}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Button type="button" variant="secondary" className="w-full justify-between" onClick={onLogout}>
            <span className="flex items-center gap-2"><LogOut className="h-4 w-4" /> Logout</span>
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[290px] border-r border-border bg-card p-0">
                  <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                  <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                    <div className="sonicbase-logo-mark h-8 w-8" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Sonicbase</p>
                      <p className="text-sm font-medium">Dashboard</p>
                    </div>
                  </div>
                  <nav className="space-y-1 p-4">
                    {nav.map(({ label, path, icon: Icon }) => (
<Link
                        key={path}
                        to={path}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Overview</p>
                <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-2 md:flex">
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="h-8 w-32 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 md:w-52" />
              </div>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button type="button" onClick={onLogout} variant="secondary" className="hidden md:inline-flex">
                Logout
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 md:px-6">
            <div>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export function TableCard({
  columns,
  rows,
}: {
  columns: { key: string; label: string; align?: "left" | "right" }[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/70 text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`px-4 py-3 font-medium ${column.align === "right" ? "text-right" : "text-left"}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-border align-middle">
                {columns.map((column) => (
                  <td key={`${index}-${column.key}`} className={`px-4 py-3 ${column.align === "right" ? "text-right" : "text-left"}`}>
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function PanelGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function PillButton({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${active ? "bg-foreground text-background" : "border border-border bg-background text-muted-foreground hover:bg-muted"}`}
    >
      {children}
    </button>
  );
}
