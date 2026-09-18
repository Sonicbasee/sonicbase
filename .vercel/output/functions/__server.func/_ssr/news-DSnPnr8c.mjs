import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as PillLink, f as Socials, o as NewsGrid, s as PageTitle } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-DSnPnr8c.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
				to: "/news",
				children: "All News"
			}),
			children: "News"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "page-shell pb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsGrid, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Socials, {})
	] });
}
//#endregion
export { NewsPage as component };
