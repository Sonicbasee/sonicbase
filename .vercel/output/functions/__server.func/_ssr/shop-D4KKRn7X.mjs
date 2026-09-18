import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as products, l as ProductCard, s as PageTitle } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-D4KKRn7X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	"Trending",
	"Bestsellers",
	"Box Sets",
	"Merch"
];
var filterTags = {
	Trending: [],
	Bestsellers: ["VINYL"],
	"Box Sets": ["VINYL", "PRINT"],
	Merch: [
		"T-SHIRT",
		"POSTER",
		"ZINE"
	]
};
function ShopPage() {
	const [filter, setFilter] = (0, import_react.useState)("Trending");
	const shown = (0, import_react.useMemo)(() => {
		const tags = filterTags[filter] ?? [];
		return tags.length === 0 ? products : products.filter((p) => tags.includes(p.tag));
	}, [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto pb-1",
			children: filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f),
				className: `shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors md:text-base ${filter === f ? "border-foreground text-foreground" : "border-input text-muted-foreground hover:text-foreground"}`,
				children: f
			}, f))
		}),
		children: "Shop"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "page-shell pb-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5",
			children: shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.name))
		})
	})] });
}
//#endregion
export { ShopPage as component };
