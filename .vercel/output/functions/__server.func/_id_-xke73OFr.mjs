import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./_ssr/route-access-Cfx8QGGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id_-xke73OFr.js
var $$splitComponentImporter = () => import("./_id_-DsaQcikF.mjs");
var Route = createFileRoute("/admin/distribution/id")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
