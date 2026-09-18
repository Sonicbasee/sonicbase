import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as getStoredSession } from "./auth-CuwCM1mo.mjs";
import { a as StatCard, i as SectionCard, r as PanelGrid, s as TableCard, t as DashboardPage } from "./dashboard-sBxs4e9b.mjs";
import { g as fetchReleases, u as fetchArtists } from "./api-BSsdVBy9.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/streams-CyC0OLqT.js
var import_jsx_runtime = require_jsx_runtime();
var weeklyData = [
	{
		date: "Mon",
		value: 72e3
	},
	{
		date: "Tue",
		value: 81e3
	},
	{
		date: "Wed",
		value: 76e3
	},
	{
		date: "Thu",
		value: 9e4
	},
	{
		date: "Fri",
		value: 124e3
	},
	{
		date: "Sat",
		value: 138e3
	},
	{
		date: "Sun",
		value: 118e3
	}
];
function ArtistStreamsPage() {
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
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Streams",
		subtitle: "Loading...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Streams",
		subtitle: "Performance across your catalogue and audience growth.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
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
				label: "Top release",
				value: myReleases[0]?.title || "N/A",
				detail: "Most streamed",
				accent: "neutral"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Weekly trend",
				eyebrow: "Performance",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex items-end gap-3",
					children: weeklyData.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full rounded-t-xl bg-foreground/80",
							style: { height: `${Math.max(point.value / 15e4 * 120, 20)}px` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: point.date
						})]
					}, point.date))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Streams by release",
				eyebrow: "Catalogue",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
					columns: [{
						key: "release",
						label: "Release"
					}, {
						key: "streams",
						label: "Streams",
						align: "right"
					}],
					rows: myReleases.map((r) => ({
						release: r.title,
						streams: r.streams.toLocaleString()
					}))
				})
			})]
		})]
	});
}
//#endregion
export { ArtistStreamsPage as component };
