import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as StatCard, i as SectionCard, r as PanelGrid, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-C_TmwZBg.js
var import_jsx_runtime = require_jsx_runtime();
var dashboardReleases = [
	{
		id: "afterlight",
		title: "Afterlight",
		artist: "Amara Vale",
		artistId: "amara",
		type: "EP",
		status: "Published",
		streams: 24e5,
		revenue: 125e4,
		date: "2026-09-18",
		cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
		platformBreakdown: [
			{
				platform: "Spotify",
				value: 89e4
			},
			{
				platform: "Apple Music",
				value: 54e4
			},
			{
				platform: "YouTube Music",
				value: 31e4
			},
			{
				platform: "Audiomack",
				value: 21e4
			},
			{
				platform: "Boomplay",
				value: 2e5
			}
		]
	},
	{
		id: "open-water",
		title: "Open Water",
		artist: "Kairo North",
		artistId: "kairo",
		type: "Album",
		status: "Published",
		streams: 41e5,
		revenue: 269e4,
		date: "2026-08-29",
		cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
		platformBreakdown: [
			{
				platform: "Spotify",
				value: 157e4
			},
			{
				platform: "Apple Music",
				value: 93e4
			},
			{
				platform: "YouTube Music",
				value: 56e4
			},
			{
				platform: "Audiomack",
				value: 32e4
			},
			{
				platform: "Boomplay",
				value: 73e4
			}
		]
	},
	{
		id: "static-bloom",
		title: "Static Bloom",
		artist: "Nova Eze",
		artistId: "nova",
		type: "Single",
		status: "Processing",
		streams: 98e4,
		revenue: 42e4,
		date: "2026-08-01",
		cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
		platformBreakdown: [
			{
				platform: "Spotify",
				value: 32e4
			},
			{
				platform: "Apple Music",
				value: 19e4
			},
			{
				platform: "YouTube Music",
				value: 21e4
			},
			{
				platform: "Audiomack",
				value: 16e4
			},
			{
				platform: "Boomplay",
				value: 1e5
			}
		]
	}
];
var adminRevenueData = [
	{
		month: "Jan",
		revenue: 52e5
	},
	{
		month: "Feb",
		revenue: 61e5
	},
	{
		month: "Mar",
		revenue: 71e5
	},
	{
		month: "Apr",
		revenue: 76e5
	},
	{
		month: "May",
		revenue: 89e5
	},
	{
		month: "Jun",
		revenue: 95e5
	},
	{
		month: "Jul",
		revenue: 108e5
	},
	{
		month: "Aug",
		revenue: 116e5
	},
	{
		month: "Sep",
		revenue: 129e5
	}
];
function AdminReportsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Reports",
		subtitle: "Revenue, streams and operational reports across the catalog.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Revenue",
					value: "₦148.0M",
					change: "+12.6%",
					detail: "YTD",
					accent: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Streams",
					value: "382.4M",
					change: "+14.8%",
					detail: "Total",
					accent: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Artists",
					value: "34",
					change: "+6",
					detail: "New this quarter",
					accent: "neutral"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Distribution",
					value: "18",
					change: "Active",
					detail: "Live networks",
					accent: "neutral"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Monthly revenue",
					eyebrow: "Reports",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-9 items-end gap-2",
						children: adminRevenueData.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-t-xl bg-foreground/80",
								style: { height: `${Math.max(point.revenue / 15e6 * 110, 16)}px` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: point.month
							})]
						}, point.month))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Release filters",
					eyebrow: "Report controls",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Artist: All artists" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Platform: All platforms" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Range: Last 12 months" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Export: CSV available" })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Top performers",
					eyebrow: "Performance",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
						columns: [
							{
								key: "artist",
								label: "Artist"
							},
							{
								key: "releases",
								label: "Releases"
							},
							{
								key: "revenue",
								label: "Revenue",
								align: "right"
							}
						],
						rows: dashboardReleases.map((release) => ({
							artist: release.artist,
							releases: release.title,
							revenue: `₦${release.revenue.toLocaleString()}`
						}))
					})
				})
			})
		]
	});
}
//#endregion
export { AdminReportsPage as component };
