import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-B8ACBlyT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-Bnu09dFP.js
var $$splitComponentImporter = () => import("./edit-DBFPGu2g.mjs");
var Route = createFileRoute("/admin/merchandise/id/edit")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
