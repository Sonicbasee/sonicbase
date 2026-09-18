import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { p as Tag, u as ReleaseCard } from "./sonicbase-Dir2Rrov.mjs";
import { n as fetchPublicReleases } from "./public-data-SLjy_1a6.mjs";
import { t as Route } from "./music._release-DzzE7Kau.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/music._release-BUyePMCR.js
var import_jsx_runtime = require_jsx_runtime();
function ReleasePage() {
	const release = Route.useLoaderData();
	const { data: allReleases = [] } = useQuery({
		queryKey: ["public-releases"],
		queryFn: fetchPublicReleases,
		staleTime: 6e4
	});
	const related = allReleases.filter((r) => r.id !== release.id).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell grid gap-10 pb-20 pt-10 lg:grid-cols-2 lg:items-end",
			children: [release.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: release.image,
				alt: `${release.title} artwork`,
				width: 1536,
				height: 1536,
				className: "aspect-square w-full rounded-[7px] object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square w-full rounded-[7px] bg-muted flex items-center justify-center text-muted-foreground",
				children: "No cover art"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: release.type }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display-title mt-5 text-5xl sm:text-7xl",
						children: release.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/artists/$artist",
						params: { artist: release.artistSlug },
						className: "mt-3 block text-xl font-bold",
						children: release.artist
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-base text-muted-foreground",
						children: release.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs",
						children: release.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => alert("Streaming links coming soon!"),
							children: "Listen now"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => alert("Purchase options coming soon!"),
							children: "Buy"
						})]
					})
				]
			})]
		}),
		release.tracks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-shell grid gap-10 py-20 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-title text-4xl",
					children: "Track listing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: release.tracks.map((track, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[2rem_1fr_auto] border-b border-primary-foreground/25 py-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary-foreground/50",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: track }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary-foreground/50",
							children: "•••"
						})
					]
				}, track)) })]
			})
		}),
		related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-shell py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display-title text-4xl",
				children: "More music"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseCard, { release: r }, r.id))
			})]
		})
	] });
}
//#endregion
export { ReleasePage as component };
