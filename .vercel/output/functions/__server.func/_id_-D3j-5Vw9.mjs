import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./_ssr/input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, t as DashboardPage } from "./_ssr/dashboard-BdBWmyrI.mjs";
import { _ as fetchLegalMatter, s as deleteLegalMatter } from "./_ssr/api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as Route } from "./_id_-9Pe6PU2n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id_-D3j-5Vw9.js
var import_jsx_runtime = require_jsx_runtime();
function LegalDetailPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: item, isLoading } = useQuery({
		queryKey: ["legal", id],
		queryFn: () => fetchLegalMatter(id)
	});
	const deleteMutation = useMutation({
		mutationFn: deleteLegalMatter,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["legal"] });
			navigate({ to: "/admin/legal" });
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
			to: "/admin/legal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Back" })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: item.matter,
		subtitle: "Legal matter review and deadline tracking.",
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
				title: "Matter",
				eyebrow: "Details",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold",
							children: item.matter
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Artist: ", item.artist]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Review",
				eyebrow: "Controls",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
						children: "Deadline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: item.deadline
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
						children: "Assigned"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: item.assigned
					})] })]
				})
			})]
		})
	});
}
//#endregion
export { LegalDetailPage as component };
