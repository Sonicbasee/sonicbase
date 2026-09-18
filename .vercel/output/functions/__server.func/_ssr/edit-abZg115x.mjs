import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, t as Button } from "./input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { E as updateNews, S as fetchNewsItem } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./edit-xcCPeNN1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-abZg115x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsEditPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: item, isLoading } = useQuery({
		queryKey: ["news", id],
		queryFn: () => fetchNewsItem(id)
	});
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [author, setAuthor] = (0, import_react.useState)("");
	const [excerpt, setExcerpt] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [initialized, setInitialized] = (0, import_react.useState)(false);
	if (item && !initialized) {
		setTitle(item.title);
		setCategory(item.category);
		setStatus(item.status);
		setAuthor(item.author);
		setExcerpt(item.excerpt);
		setImage(item.image);
		setInitialized(true);
	}
	const saveMutation = useMutation({
		mutationFn: () => updateNews(id, {
			title,
			category,
			status,
			author,
			excerpt,
			image
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
			navigate({ to: "/admin/news" });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Edit article",
		subtitle: "Apply content updates and publishing changes.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Story editor",
			eyebrow: "Edit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Feature",
									children: "Feature"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Interview",
									children: "Interview"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Release",
									children: "Release"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "News",
									children: "News"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
							value: status,
							onChange: (e) => setStatus(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Draft",
									children: "Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Published",
									children: "Published"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Scheduled",
									children: "Scheduled"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Archived",
									children: "Archived"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Author"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: author,
							onChange: (e) => setAuthor(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Image URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: image,
							onChange: (e) => setImage(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Excerpt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
							value: excerpt,
							onChange: (e) => setExcerpt(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2 flex justify-end gap-3 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/news",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								children: "Cancel"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending,
							children: saveMutation.isPending ? "Saving..." : "Save article"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { NewsEditPage as component };
