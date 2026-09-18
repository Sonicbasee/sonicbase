import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./_ssr/input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, t as DashboardPage } from "./_ssr/dashboard-CaoKVZLR.mjs";
import { c as deleteRelease, h as fetchRelease } from "./_ssr/api-BSsdVBy9.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as Route } from "./_release_-Dj6j0_tc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_release_-DKKdbgz1.js
var import_jsx_runtime = require_jsx_runtime();
function AdminReleaseDetailPage() {
	const { release: releaseId } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: item, isLoading } = useQuery({
		queryKey: ["release", releaseId],
		queryFn: () => fetchRelease(releaseId)
	});
	const deleteMutation = useMutation({
		mutationFn: deleteRelease,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["releases"] });
			navigate({ to: "/admin/releases" });
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Loading...",
		subtitle: "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading release..."
		})
	});
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Not found",
		subtitle: "Release not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/releases",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Back to releases" })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: item.title,
		subtitle: "Release management and metadata overview.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/releases/$release/edit",
				params: { release: releaseId },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					children: "Edit"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "destructive",
				size: "sm",
				onClick: () => {
					if (confirm("Delete this release?")) deleteMutation.mutate(releaseId);
				},
				children: "Delete"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[0.8fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Cover artwork",
				eyebrow: "Release",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.cover || "/placeholder.png",
					alt: item.title,
					className: "h-72 w-full rounded-2xl object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Release information",
				eyebrow: "Metadata",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Artist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.artist
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.type
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Release date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.date
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Streams"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: item.streams.toLocaleString()
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
							children: "Revenue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2",
							children: ["₦", item.revenue.toLocaleString()]
						})] })
					]
				})
			})]
		})
	});
}
//#endregion
export { AdminReleaseDetailPage as component };
