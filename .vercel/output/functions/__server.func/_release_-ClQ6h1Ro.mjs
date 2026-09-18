import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./_ssr/route-access-BhXKI0Kn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_release_-ClQ6h1Ro.js
var $$splitComponentImporter = () => import("./_release_-CoAh-vH_.mjs");
var Route = createFileRoute("/admin/releases/release")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
