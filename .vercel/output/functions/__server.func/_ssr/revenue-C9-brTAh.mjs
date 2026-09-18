import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as getStoredSession } from "./auth-DiGeC_3j.mjs";
import { a as StatCard, c as formatMoney, i as SectionCard, r as PanelGrid, s as TableCard, t as DashboardPage } from "./dashboard-CaoKVZLR.mjs";
import { g as fetchReleases, u as fetchArtists } from "./api-BSsdVBy9.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/revenue-C9-brTAh.js
var import_jsx_runtime = require_jsx_runtime();
var monthlyData = [
	{
		month: "Jan",
		revenue: 82e4
	},
	{
		month: "Feb",
		revenue: 93e4
	},
	{
		month: "Mar",
		revenue: 11e5
	},
	{
		month: "Apr",
		revenue: 104e4
	},
	{
		month: "May",
		revenue: 126e4
	},
	{
		month: "Jun",
		revenue: 138e4
	},
	{
		month: "Jul",
		revenue: 142e4
	},
	{
		month: "Aug",
		revenue: 164e4
	},
	{
		month: "Sep",
		revenue: 175e4
	}
];
function ArtistRevenuePage() {
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
	const totalRevenue = myReleases.reduce((sum, r) => sum + r.revenue, 0);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Revenue",
		subtitle: "Loading...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Revenue",
		subtitle: "Track earnings, payments and trendlines across platforms.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total earnings",
					value: formatMoney(totalRevenue),
					detail: "YTD",
					accent: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Releases",
					value: String(myReleases.length),
					detail: "Catalogue",
					accent: "neutral"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Avg per release",
					value: myReleases.length ? formatMoney(Math.round(totalRevenue / myReleases.length)) : "₦0",
					detail: "Average",
					accent: "neutral"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Revenue over time",
					eyebrow: "Payouts",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-9 items-end gap-2",
						children: monthlyData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-t-xl bg-foreground/80",
								style: { height: `${Math.max(item.revenue / 18e5 * 120, 24)}px` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: item.month
							})]
						}, item.month))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Revenue by release",
					eyebrow: "Catalogue",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
						columns: [
							{
								key: "release",
								label: "Release"
							},
							{
								key: "revenue",
								label: "Revenue",
								align: "right"
							},
							{
								key: "streams",
								label: "Streams",
								align: "right"
							}
						],
						rows: myReleases.map((r) => ({
							release: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: r.cover || "/placeholder.png",
									alt: r.title,
									className: "h-10 w-10 rounded-md object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.title })]
							}),
							revenue: formatMoney(r.revenue),
							streams: r.streams.toLocaleString()
						}))
					})
				})
			})
		]
	});
}
//#endregion
export { ArtistRevenuePage as component };
