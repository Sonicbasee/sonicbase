import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as releases, p as Tag, u as ReleaseCard } from "./sonicbase-CB5emti4.mjs";
import { t as Route } from "./artists._artist-DN3kdAXX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artists._artist-Cm1L_yb5.js
var import_jsx_runtime = require_jsx_runtime();
function ArtistPage() {
	const artist = Route.useLoaderData();
	const artistReleases = releases.filter((r) => r.artistSlug === artist.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[660px] bg-primary text-primary-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: artist.image,
					alt: artist.name,
					width: 1536,
					height: 1536,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-foreground/35" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-shell absolute inset-x-0 bottom-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
							pale: true,
							children: artist.genre
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display-title mt-5 text-5xl sm:text-7xl lg:text-8xl",
							children: artist.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base",
							children: artist.city
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell grid gap-10 py-20 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "display-title text-3xl leading-tight",
				children: [
					"“",
					artist.statement,
					"”"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg leading-relaxed",
				children: artist.bio
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Spotify" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Apple Music"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Instagram"
					})
				]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-title text-4xl",
					children: "Featured releases"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid max-w-md grid-cols-1",
					children: artistReleases.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseCard, { release: r }, r.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-8",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/artists",
						children: "All artists"
					})
				})
			]
		})
	] });
}
//#endregion
export { ArtistPage as component };
