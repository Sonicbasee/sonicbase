import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin/profile")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminProfilePage,
});

function AdminProfilePage() {
  return (
    <DashboardPage title="Profile" subtitle="Your account details and editor permissions.">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Administrator" eyebrow="Account">
          <div className="flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" alt="Amina Okafor" className="h-28 w-28 rounded-full object-cover" />
            <h3 className="mt-4 text-xl font-semibold">Amina Okafor</h3>
            <p className="mt-1 text-sm text-muted-foreground">Head of operations</p>
            <Button className="mt-5">Edit profile</Button>
          </div>
        </SectionCard>

        <SectionCard title="Assigned access" eyebrow="Permissions">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p>
              <p className="mt-2 text-sm">admin@sonicbase.com</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Role</p>
              <p className="mt-2 text-sm">Full admin</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Team</p>
              <p className="mt-2 text-sm">Creative, distribution, finance</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Location</p>
              <p className="mt-2 text-sm">Lagos, Nigeria</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
