import { Outlet, createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/artist")({
  beforeLoad: () => requireAuth("artist"),
  component: ArtistLayout,
});

function ArtistLayout() {
  return <Outlet />;
}
