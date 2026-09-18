import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as StatCard, c as formatMoney, i as SectionCard, r as PanelGrid, t as DashboardPage } from "./dashboard-CaoKVZLR.mjs";
import { g as fetchReleases, u as fetchArtists } from "./api-BSsdVBy9.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DwPhpclY.js
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
var platformData = [
	{
		name: "Spotify",
		value: 49
	},
	{
		name: "Apple",
		value: 24
	},
	{
		name: "YouTube",
		value: 12
	},
	{
		name: "Audiomack",
		value: 9
	},
	{
		name: "Boomplay",
		value: 6
	}
];
function AdminOverviewPage() {
	const { data: artists = [] } = useQuery({
		queryKey: ["artists"],
		queryFn: fetchArtists
	});
	const { data: releases = [] } = useQuery({
		queryKey: ["releases"],
		queryFn: fetchReleases
	});
	const totalStreams = releases.reduce((sum, r) => sum + r.streams, 0);
	const totalRevenue = releases.reduce((sum, r) => sum + r.revenue, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Admin overview",
		subtitle: "Commercial and operational performance across the Sonicbase network.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium",
			children: "Live data"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total artists",
				value: String(artists.length),
				detail: "Active roster",
				accent: "success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total releases",
				value: String(releases.length),
				detail: "Catalogue",
				accent: "neutral"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total streams",
				value: totalStreams.toLocaleString(),
				detail: "Overall",
				accent: "success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Revenue",
				value: formatMoney(totalRevenue),
				detail: "YTD",
				accent: "neutral"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Revenue trajectory",
				eyebrow: "Business",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-9 items-end gap-2",
					children: monthlyData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full rounded-t-xl bg-foreground/80",
							style: { height: `${Math.max(item.revenue / 15e6 * 120, 18)}px` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: item.month
						})]
					}, item.month))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Platform mix",
				eyebrow: "Streams",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: platformData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [item.value, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-foreground",
							style: { width: `${item.value}%` }
						})
					})] }, item.name))
				})
			})]
		})]
	});
}
//#endregion
export { AdminOverviewPage as component };
