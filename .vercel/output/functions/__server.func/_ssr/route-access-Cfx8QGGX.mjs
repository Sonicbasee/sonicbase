import { n as __exportAll$1 } from "../_runtime.mjs";
import { t as getCurrentSession } from "./auth-CkweP9EE.mjs";
import { A as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-access-Cfx8QGGX.js
var route_access_Cfx8QGGX_exports = /* @__PURE__ */ __exportAll$1({
	n: () => route_access_exports,
	t: () => requireAuth
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var route_access_exports = /* @__PURE__ */ __exportAll({ requireAuth: () => requireAuth });
async function requireAuth(requiredRole) {
	const session = await getCurrentSession();
	if (!session) throw redirect({ to: "/login" });
	if (requiredRole && session.role !== requiredRole) throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
}
//#endregion
export { route_access_Cfx8QGGX_exports as n, requireAuth as t };
