import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { c as deleteMerch, y as fetchMerch } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/merchandise-By1--Sco.js
var import_jsx_runtime = require_jsx_runtime();
function AdminMerchPage() {
	const queryClient = useQueryClient();
	const { data: items = [], isLoading } = useQuery({
		queryKey: ["merch"],
		queryFn: fetchMerch
	});
	const deleteMutation = useMutation({
		mutationFn: deleteMerch,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["merch"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Merchandise",
		subtitle: "Manage artist merchandise and published drops.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/merchandise/new",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				children: "Add item"
			})
		}),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground py-8 text-center",
			children: "Loading..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: item.title,
				eyebrow: item.artist,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image || "/placeholder.png",
						alt: item.title,
						className: "h-48 w-full rounded-xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-lg font-semibold",
							children: ["₦", item.price.toLocaleString()]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/merchandise/$id/edit",
							params: { id: item.id },
							className: "text-sm text-primary hover:underline",
							children: "Edit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							className: "ml-auto",
							onClick: () => {
								if (confirm("Delete this item?")) deleteMutation.mutate(item.id);
							},
							children: "Delete"
						})]
					})
				]
			}, item.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center col-span-full",
				children: "No merchandise yet. Add your first item."
			})]
		})
	});
}
//#endregion
export { AdminMerchPage as component };
