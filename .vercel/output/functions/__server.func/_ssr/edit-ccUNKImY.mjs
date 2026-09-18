import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-Cfx8QGGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-ccUNKImY.js
var $$splitComponentImporter = () => import("./edit-kjsPoNW32.mjs");
var Route = createFileRoute("/admin/releases/release/edit")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
