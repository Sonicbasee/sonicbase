import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./_ssr/route-access-Cfx8QGGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_release-CrMaJob5.js
var $$splitComponentImporter = () => import("./_release-DLdDHO-g.mjs");
var Route = createFileRoute("/artist/releases/$release")({
	beforeLoad: async () => {
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
