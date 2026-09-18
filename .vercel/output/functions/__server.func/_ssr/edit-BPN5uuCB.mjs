import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-BEnCzycm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-BPN5uuCB.js
var $$splitComponentImporter = () => import("./edit-ib2Qd7nR.mjs");
var Route = createFileRoute("/admin/news/id/edit")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
