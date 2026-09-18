import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as StatCard, c as formatMoney, i as SectionCard, r as PanelGrid, s as TableCard, t as DashboardPage } from "./dashboard-CaoKVZLR.mjs";
import { g as fetchReleases } from "./api-BSsdVBy9.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/revenue-D9sSBEM9.js
var import_jsx_runtime = require_jsx_runtime();
var monthlyData = [
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
function AdminRevenuePage() {
	const { data: releases = [] } = useQuery({
		queryKey: ["releases"],
		queryFn: fetchReleases
	});
	const totalRevenue = releases.reduce((sum, r) => sum + r.revenue, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Revenue",
		subtitle: "Portfolio-wide performance across all artists and releases.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total revenue",
					value: formatMoney(totalRevenue),
					change: "+12.6%",
					detail: "YTD"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total releases",
					value: String(releases.length),
					detail: "Catalogue",
					accent: "neutral"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Avg revenue",
					value: releases.length ? formatMoney(Math.round(totalRevenue / releases.length)) : "₦0",
					detail: "Per release",
					accent: "neutral"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Revenue trend",
					eyebrow: "Performance",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-9 items-end gap-2",
						children: monthlyData.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-t-xl bg-foreground/80",
								style: { height: `${Math.max(p.revenue / 15e6 * 120, 18)}px` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: p.month
							})]
						}, p.month))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Top revenue releases",
					eyebrow: "Catalog",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
						columns: [
							{
								key: "release",
								label: "Release"
							},
							{
								key: "artist",
								label: "Artist"
							},
							{
								key: "revenue",
								label: "Revenue",
								align: "right"
							}
						],
						rows: releases.map((r) => ({
							release: r.title,
							artist: r.artist,
							revenue: formatMoney(r.revenue)
						}))
					})
				})
			})
		]
	});
}
//#endregion
export { AdminRevenuePage as component };
