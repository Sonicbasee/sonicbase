import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { g as fetchDistributions, o as deleteDistribution } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/distribution-Onxcjndr.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDistributionPage() {
	const queryClient = useQueryClient();
	const { data: records = [], isLoading } = useQuery({
		queryKey: ["distributions"],
		queryFn: fetchDistributions
	});
	const deleteMutation = useMutation({
		mutationFn: deleteDistribution,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["distributions"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Distribution",
		subtitle: "Track submissions, platform availability and release status.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Distribution queue",
			eyebrow: "Operations",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center",
				children: "Loading..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
				columns: [
					{
						key: "id",
						label: "ID"
					},
					{
						key: "artist",
						label: "Artist"
					},
					{
						key: "release",
						label: "Release"
					},
					{
						key: "platforms",
						label: "Platforms"
					},
					{
						key: "status",
						label: "Status"
					},
					{
						key: "actions",
						label: "Actions"
					}
				],
				rows: records.map((item) => ({
					id: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/distribution/$id",
						params: { id: item.id },
						className: "hover:underline",
						children: item.id
					}),
					artist: item.artist,
					release: item.release,
					platforms: item.platforms.join(", "),
					status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status }),
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							if (confirm("Delete this record?")) deleteMutation.mutate(item.id);
						},
						children: "Delete"
					})
				}))
			})
		})
	});
}
//#endregion
export { AdminDistributionPage as component };
