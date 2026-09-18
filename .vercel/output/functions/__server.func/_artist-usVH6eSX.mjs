import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./_ssr/route-access-B8ACBlyT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_artist-usVH6eSX.js
var $$splitComponentImporter = () => import("./_artist-CN_dHTiH.mjs");
var Route = createFileRoute("/admin/artists/$artist")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
