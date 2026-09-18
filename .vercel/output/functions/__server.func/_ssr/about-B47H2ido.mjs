import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as PageTitle } from "./sonicbase-Dir2Rrov.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-B47H2ido.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			intro: "An independent music company connecting bold artists, patient development and global audiences.",
			children: "We move music forward."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[55vw] max-h-[680px] min-h-[340px] w-full bg-muted" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell grid gap-10 py-20 md:grid-cols-2 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "display-title text-4xl md:text-6xl",
				children: [
					"Artist first.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Always."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl space-y-5 text-base leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sonicbase began with a simple belief: artists do their best work when creative independence and practical support move together." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We partner across recording, distribution, publishing, strategy and live culture. Every relationship is designed around the artist—not a template." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							children: "Work with us"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "page-shell grid gap-px py-20 md:grid-cols-3",
				children: [
					[
						"01",
						"Development",
						"Patient, hands-on support from first demo to lasting catalogue."
					],
					[
						"02",
						"Distribution",
						"Global release strategy with local cultural intelligence."
					],
					[
						"03",
						"Ownership",
						"Transparent partnerships that protect creative control."
					]
				].map(([n, t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "border-t border-foreground py-7 md:px-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs",
							children: n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-10 text-xl font-bold",
							children: t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: d
						})
					]
				}, n))
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
