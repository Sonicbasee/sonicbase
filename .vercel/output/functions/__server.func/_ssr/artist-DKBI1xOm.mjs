import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as getStoredSession } from "./auth-CkweP9EE.mjs";
import { a as StatCard, c as formatMoney, i as SectionCard, o as StatusBadge, r as PanelGrid, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { f as fetchArtists, w as fetchReleases } from "./api-Eeax_ugD.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artist-DKBI1xOm.js
var import_jsx_runtime = require_jsx_runtime();
function ArtistOverviewPage() {
	const session = getStoredSession();
	const { data: releases = [], isLoading } = useQuery({
		queryKey: ["releases"],
		queryFn: fetchReleases
	});
	const { data: artists = [] } = useQuery({
		queryKey: ["artists"],
		queryFn: fetchArtists
	});
	const myArtist = artists.find((a) => a.name === session?.name || a.email === session?.email);
	const myReleases = releases.filter((r) => r.artist === session?.name || r.artistId === myArtist?.id);
	const totalStreams = myReleases.reduce((sum, r) => sum + r.streams, 0);
	const totalRevenue = myReleases.reduce((sum, r) => sum + r.revenue, 0);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Artist overview",
		subtitle: "Loading...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Artist overview",
		subtitle: "Track performance, streams and revenue in one place.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground",
			children: "Live snapshot"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total revenue",
				value: formatMoney(totalRevenue),
				detail: "This year"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total streams",
				value: totalStreams.toLocaleString(),
				detail: "All time",
				accent: "success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Releases",
				value: String(myReleases.length),
				detail: "Catalogue",
				accent: "neutral"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Published",
				value: String(myReleases.filter((r) => r.status === "Published").length),
				detail: "Live",
				accent: "neutral"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Your releases",
				eyebrow: "Catalogue",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
					columns: [
						{
							key: "title",
							label: "Release"
						},
						{
							key: "streams",
							label: "Streams"
						},
						{
							key: "revenue",
							label: "Revenue"
						},
						{
							key: "status",
							label: "Status"
						}
					],
					rows: myReleases.map((r) => ({
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: r.cover || "/placeholder.png",
								alt: r.title,
								className: "h-10 w-10 rounded-md object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: r.type
							})] })]
						}),
						streams: r.streams.toLocaleString(),
						revenue: formatMoney(r.revenue),
						status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })
					}))
				}), myReleases.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground py-8 text-center",
					children: "No releases found. Your catalogue will appear here once published."
				})]
			})
		})]
	});
}
//#endregion
export { ArtistOverviewPage as component };
