import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, t as DashboardPage } from "./dashboard-sBxs4e9b.mjs";
import { p as fetchNews, s as deleteNews } from "./api-BSsdVBy9.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-ghE05WAF.js
var import_jsx_runtime = require_jsx_runtime();
function AdminNewsPage() {
	const queryClient = useQueryClient();
	const { data: newsItems = [], isLoading } = useQuery({
		queryKey: ["news"],
		queryFn: fetchNews
	});
	const deleteMutation = useMutation({
		mutationFn: deleteNews,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "News",
		subtitle: "Create, review and publish editorial content for the public website.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/news/new",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				children: "New article"
			})
		}),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground py-8 text-center",
			children: "Loading..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: [newsItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: item.title,
				eyebrow: item.category,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					size: "sm",
					onClick: () => {
						if (confirm("Delete this article?")) deleteMutation.mutate(item.id);
					},
					children: "Delete"
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image || "/placeholder.png",
						alt: item.title,
						className: "h-44 w-full rounded-xl object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: item.excerpt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: item.author
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/news/$id/edit",
						params: { id: item.id },
						className: "mt-3 block text-sm text-primary hover:underline",
						children: "Edit article"
					})
				]
			}, item.id)), newsItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center col-span-full",
				children: "No articles yet. Create your first one."
			})]
		})
	});
}
//#endregion
export { AdminNewsPage as component };
