import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as getStoredSession } from "./auth-DiGeC_3j.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as EmptyState, o as StatusBadge, t as DashboardPage } from "./dashboard-CaoKVZLR.mjs";
import { g as fetchReleases, u as fetchArtists } from "./api-BSsdVBy9.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/releases-BFnyOVwC.js
var import_jsx_runtime = require_jsx_runtime();
function ArtistReleasesPage() {
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
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Releases",
		subtitle: "Loading...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Releases",
		subtitle: "Your current catalogue and performance history.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: myReleases.map((release) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/artist/releases/$release",
				params: { release: release.id },
				className: "rounded-2xl border border-border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: release.cover || "/placeholder.png",
						alt: release.title,
						className: "h-56 w-full rounded-xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold",
							children: release.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								release.type,
								" · ",
								release.date
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: release.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Streams"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: release.streams.toLocaleString()
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Revenue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-medium",
							children: ["₦", release.revenue.toLocaleString()]
						})] })]
					})
				]
			}, release.id))
		}), myReleases.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No releases yet",
				description: "Your public catalogue will appear here once a release is published."
			})
		})]
	});
}
//#endregion
export { ArtistReleasesPage as component };
