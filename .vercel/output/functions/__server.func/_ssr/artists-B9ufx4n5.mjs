import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input } from "./input-DHehfD_4.mjs";
import { m as artists, s as PageTitle, t as ArtistCard } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artists-B9ufx4n5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArtistsPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => artists.filter((a) => `${a.name} ${a.genre} ${a.city}`.toLowerCase().includes(query.toLowerCase())), [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		intro: "Distinct voices. Long-term vision. Meet the artists building what comes next.",
		children: "Artists"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-shell pb-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-12 max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search artists",
				"aria-label": "Search artists",
				className: "h-12 rounded-full px-5 shadow-none"
			})
		}), filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-3",
			children: filtered.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistCard, { artist: a }, a.slug))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-y py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xl font-bold",
				children: "No artists found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Try a different name, city or genre."
			})]
		})]
	})] });
}
//#endregion
export { ArtistsPage as component };
