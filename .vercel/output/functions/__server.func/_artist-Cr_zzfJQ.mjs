import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./_ssr/route-access-BhXKI0Kn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_artist-Cr_zzfJQ.js
var $$splitComponentImporter = () => import("./_artist-wtqoWCGO.mjs");
var Route = createFileRoute("/admin/artists/$artist")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
