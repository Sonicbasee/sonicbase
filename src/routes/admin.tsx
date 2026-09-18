import { Outlet, createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-access";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => { await requireAuth("admin"); },
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}
