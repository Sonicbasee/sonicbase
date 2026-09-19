import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { requireAuth } from "@/lib/route-access";
import { getStoredSession, logoutUser } from "@/lib/auth";

export const Route = createFileRoute("/artist/profile")({
  beforeLoad: async () => {
    await requireAuth("artist");
  },
  component: ArtistProfilePage,
});

function ArtistProfilePage() {
  const navigate = useNavigate();
  const session = getStoredSession();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <>
      <DashboardPage
        title="Profile"
        subtitle="Your public information and account details."
      >
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <SectionCard title="Artist profile" eyebrow="Account">
            <div className="flex flex-col items-center text-center">
              <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground">
                {(session?.name || "A").charAt(0)}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {session?.name || "Artist"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">Artist</p>
              <Button
                className="mt-5"
                variant="destructive"
                onClick={() => setShowLogoutDialog(true)}
              >
                Logout
              </Button>
            </div>
          </SectionCard>

        <SectionCard title="Profile details" eyebrow="Overview">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Email
              </p>
              <p className="mt-2 text-sm">{session?.email || ""}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Role
              </p>
              <p className="mt-2 text-sm">Artist</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
      <ConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Log out?"
        description="You will be signed out and redirected to the login page. Are you sure you want to log out?"
        confirmLabel="Log out"
        variant="destructive"
        onConfirm={async () => {
          await logoutUser();
          setShowLogoutDialog(false);
          navigate({ to: "/login" });
        }}
      />
    </>
  );
}
