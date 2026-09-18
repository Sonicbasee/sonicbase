import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as releases, c as PillLink, d as SectionHeading, f as Socials, g as products, i as HeroCarousel, l as ProductCard, o as NewsGrid, u as ReleaseCard } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CNPUrfLl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const [shopCategory, setShopCategory] = (0, import_react.useState)("Trending");
	const shopCategories = [
		"Trending",
		"Bestsellers",
		"Box Sets",
		"Merch"
	];
	const shopProducts = (0, import_react.useMemo)(() => {
		if (shopCategory === "Bestsellers") return products.filter((product) => product.tag === "VINYL");
		if (shopCategory === "Box Sets") return products.filter((product) => ["VINYL", "PRINT"].includes(product.tag));
		if (shopCategory === "Merch") return products.filter((product) => [
			"T-SHIRT",
			"POSTER",
			"ZINE"
		].includes(product.tag));
		return products.slice(0, 5);
	}, [shopCategory]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCarousel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell py-16 md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex max-w-full gap-2 overflow-x-auto pb-1",
					children: shopCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: shopCategory === category ? "default" : "outline",
						onClick: () => setShopCategory(category),
						children: category
					}, category))
				}),
				children: "Shop"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5",
				children: shopProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell pb-20 md:pb-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
					to: "/music",
					children: "All Music"
				}),
				children: "Music"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-3",
				children: releases.map((release) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseCard, { release }, release.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell pb-20 md:pb-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
					to: "/news",
					children: "All News"
				}),
				children: "News"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsGrid, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-primary py-20 text-primary-foreground md:py-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-shell grid gap-12 lg:grid-cols-2 lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-title text-4xl sm:text-6xl",
					children: "Built around the artist."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl text-lg leading-snug text-primary-foreground/75",
					children: "Sonicbase is an independent music company built for long careers, lasting records and creative ownership."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					className: "mt-7 inline-flex items-center rounded-full bg-background px-6 py-3 text-base text-foreground transition-opacity hover:opacity-85",
					children: "Our Story"
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Socials, {})
	] });
}
//#endregion
export { Index as component };
