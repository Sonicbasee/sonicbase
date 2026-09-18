import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { _ as releases, s as PageTitle, u as ReleaseCard } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/music-BDWo9eaB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MusicPage() {
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const shown = (0, import_react.useMemo)(() => filter === "ALL" ? releases : releases.filter((r) => r.type === filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		intro: "Albums, EPs and singles from artists moving on their own frequency.",
		children: "Music"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-shell pb-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-12 flex gap-2 overflow-x-auto pb-2",
			children: [
				"ALL",
				"ALBUM",
				"EP",
				"SINGLE"
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: filter === x ? "default" : "outline",
				onClick: () => setFilter(x),
				children: x === "ALL" ? "All releases" : x
			}, x))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3",
			children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseCard, { release: r }, r.slug))
		})]
	})] });
}
//#endregion
export { MusicPage as component };
