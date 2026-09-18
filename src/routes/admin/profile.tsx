import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/route-access";
import { getStoredSession, logoutUser } from "@/lib/auth";

export const Route = createFileRoute("/admin/profile")({
  beforeLoad: async () => {
    await requireAuth("admin");
  },
  component: AdminProfilePage,
});

function AdminProfilePage() {
  const navigate = useNavigate();
  const session = getStoredSession();

  return (
    <DashboardPage
      title="Profile"
      subtitle="Your account details and editor permissions."
    >
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Administrator" eyebrow="Account">
          <div className="flex flex-col items-center text-center">
            <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground">
              {(session?.name || "A").charAt(0)}
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              {session?.name || "Admin"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">Administrator</p>
            <Button
              className="mt-5"
              variant="destructive"
              onClick={async () => {
                await logoutUser();
                navigate({ to: "/login" });
              }}
            >
              Logout
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Assigned access" eyebrow="Permissions">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Email
              </p>
              <p className="mt-2 text-sm">
                {session?.email || "admin@sonicbase.com"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Role
              </p>
              <p className="mt-2 text-sm">Admin</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
