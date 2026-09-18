import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { u as deleteRelease, w as fetchReleases } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/releases-93TDvMvG.js
var import_jsx_runtime = require_jsx_runtime();
function AdminReleasesPage() {
	const queryClient = useQueryClient();
	const { data: releases = [], isLoading } = useQuery({
		queryKey: ["releases"],
		queryFn: fetchReleases
	});
	const deleteMutation = useMutation({
		mutationFn: deleteRelease,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["releases"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Releases",
		subtitle: "Manage release planning, metadata and publishing status.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/releases/new",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				children: "New release"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Release pipeline",
			eyebrow: "Catalogue",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center",
				children: "Loading..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
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
						key: "type",
						label: "Type"
					},
					{
						key: "status",
						label: "Status"
					},
					{
						key: "streams",
						label: "Streams",
						align: "right"
					},
					{
						key: "actions",
						label: "Actions"
					}
				],
				rows: releases.map((release) => ({
					release: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/releases/$release",
						params: { release: release.id },
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: release.cover || "/placeholder.png",
							alt: release.title,
							className: "h-10 w-10 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hover:underline",
							children: release.title
						})]
					}),
					artist: release.artist,
					type: release.type,
					status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: release.status }),
					streams: release.streams.toLocaleString(),
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							if (confirm("Delete this release?")) deleteMutation.mutate(release.id);
						},
						children: "Delete"
					})
				}))
			})
		})
	});
}
//#endregion
export { AdminReleasesPage as component };
