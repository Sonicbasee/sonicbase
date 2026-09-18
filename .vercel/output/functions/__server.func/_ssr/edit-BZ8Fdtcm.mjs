import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-B8ACBlyT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-BZ8Fdtcm.js
var $$splitComponentImporter = () => import("./edit-CmWG71Js.mjs");
var Route = createFileRoute("/admin/news/id/edit")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
