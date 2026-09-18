import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage, SectionCard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/artist/profile")({
  beforeLoad: async () => { await requireAuth("artist"); },
  component: ArtistProfilePage,
});

function ArtistProfilePage() {
  return (
    <DashboardPage title="Profile" subtitle="Your public information and account details.">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Artist profile" eyebrow="Account">
          <div className="flex flex-col items-center text-center">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80" alt="Amara Vale" className="h-28 w-28 rounded-full object-cover" />
            <h3 className="mt-4 text-xl font-semibold">Amara Vale</h3>
            <p className="mt-1 text-sm text-muted-foreground">Alt-R&B · Lagos, Nigeria</p>
            <Button className="mt-5">Edit profile</Button>
          </div>
        </SectionCard>

        <SectionCard title="Profile details" eyebrow="Overview">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p>
              <p className="mt-2 text-sm">amara@sonicbase.com</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Phone</p>
              <p className="mt-2 text-sm">+234 803 000 4456</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Bio</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Singer-songwriter Amara Vale writes intimate electronic soul shaped by Lagos light, London night drives and the emotional architecture of distance.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Instagram</p>
              <p className="mt-2 text-sm">@amaravale</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Spotify</p>
              <p className="mt-2 text-sm">Amara Vale</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
