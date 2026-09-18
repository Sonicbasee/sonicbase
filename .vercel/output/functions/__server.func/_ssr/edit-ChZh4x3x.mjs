import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-BEnCzycm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-ChZh4x3x.js
var $$splitComponentImporter = () => import("./edit-C830wPlR.mjs");
var Route = createFileRoute("/admin/releases/release/edit")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
