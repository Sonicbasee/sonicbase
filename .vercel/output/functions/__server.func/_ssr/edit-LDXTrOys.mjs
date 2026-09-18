import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-Cfx8QGGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-LDXTrOys.js
var $$splitComponentImporter = () => import("./edit-CIEyL5ZW.mjs");
var Route = createFileRoute("/admin/merchandise/id/edit")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
