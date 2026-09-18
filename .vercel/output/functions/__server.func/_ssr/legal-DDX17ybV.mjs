import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { s as deleteLegalMatter, v as fetchLegalMatters } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-DDX17ybV.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLegalPage() {
	const queryClient = useQueryClient();
	const { data: matters = [], isLoading } = useQuery({
		queryKey: ["legal"],
		queryFn: fetchLegalMatters
	});
	const deleteMutation = useMutation({
		mutationFn: deleteLegalMatter,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["legal"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Legal",
		subtitle: "Track matters, agreements and deadlines.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Legal matters",
			eyebrow: "Compliance",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center",
				children: "Loading..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
				columns: [
					{
						key: "matter",
						label: "Matter"
					},
					{
						key: "artist",
						label: "Artist"
					},
					{
						key: "status",
						label: "Status"
					},
					{
						key: "deadline",
						label: "Deadline"
					},
					{
						key: "assigned",
						label: "Assigned"
					},
					{
						key: "actions",
						label: "Actions"
					}
				],
				rows: matters.map((matter) => ({
					matter: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/legal/$id",
						params: { id: matter.id },
						className: "hover:underline",
						children: matter.matter
					}),
					artist: matter.artist,
					status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: matter.status }),
					deadline: matter.deadline,
					assigned: matter.assigned,
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							if (confirm("Delete this matter?")) deleteMutation.mutate(matter.id);
						},
						children: "Delete"
					})
				}))
			})
		})
	});
}
//#endregion
export { AdminLegalPage as component };
