import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./_ssr/input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, t as DashboardPage } from "./_ssr/dashboard-BdBWmyrI.mjs";
import { h as fetchDistribution, o as deleteDistribution } from "./_ssr/api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as Route } from "./_id_-xke73OFr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id_-DsaQcikF.js
var import_jsx_runtime = require_jsx_runtime();
function DistributionDetailPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: item, isLoading } = useQuery({
		queryKey: ["distribution", id],
		queryFn: () => fetchDistribution(id)
	});
	const deleteMutation = useMutation({
		mutationFn: deleteDistribution,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["distributions"] });
			navigate({ to: "/admin/distribution" });
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Loading...",
		subtitle: "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		})
	});
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Not found",
		subtitle: "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/distribution",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Back" })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: item.release,
		subtitle: "Distribution status and platform details.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "destructive",
			size: "sm",
			onClick: () => {
				if (confirm("Delete?")) deleteMutation.mutate(id);
			},
			children: "Delete"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[0.8fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Release",
				eyebrow: "Overview",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold",
							children: item.release
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["By ", item.artist]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Distribution details",
				eyebrow: "Timeline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Platforms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.platforms.join(", ")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Submission"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.submitted
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Release"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.released
						})] })
					]
				})
			})]
		})
	});
}
//#endregion
export { DistributionDetailPage as component };
