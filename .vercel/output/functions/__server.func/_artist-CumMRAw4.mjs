import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./_ssr/route-access-Cfx8QGGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_artist-CumMRAw4.js
var $$splitComponentImporter = () => import("./_artist-DwyK-7fO.mjs");
var Route = createFileRoute("/admin/artists/$artist")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
