import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as StatCard, i as SectionCard, r as PanelGrid, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { w as fetchReleases } from "./api-Eeax_ugD.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/streams-CWHpVKdV.js
var import_jsx_runtime = require_jsx_runtime();
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
function AdminStreamsPage() {
	const { data: releases = [] } = useQuery({
		queryKey: ["releases"],
		queryFn: fetchReleases
	});
	const totalStreams = releases.reduce((sum, r) => sum + r.streams, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardPage, {
		title: "Streams",
		subtitle: "Performance analytics for all artists and territories.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelGrid, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total streams",
				value: totalStreams.toLocaleString(),
				change: "+14.8%",
				detail: "Overall",
				accent: "success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Total releases",
				value: String(releases.length),
				detail: "Catalogue",
				accent: "neutral"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Top platform",
				value: "Spotify",
				change: "49%",
				detail: "Share",
				accent: "neutral"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Top release",
				value: releases[0]?.title || "N/A",
				detail: "Most streamed",
				accent: "neutral"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Platform share",
				eyebrow: "Analytics",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: platformData.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [p.value, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-foreground",
							style: { width: `${p.value}%` }
						})
					})] }, p.name))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Release stream leaders",
				eyebrow: "Catalogue",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
					columns: [{
						key: "title",
						label: "Release"
					}, {
						key: "streams",
						label: "Streams",
						align: "right"
					}],
					rows: releases.map((r) => ({
						title: r.title,
						streams: r.streams.toLocaleString()
					}))
				})
			})]
		})]
	});
}
//#endregion
export { AdminStreamsPage as component };
