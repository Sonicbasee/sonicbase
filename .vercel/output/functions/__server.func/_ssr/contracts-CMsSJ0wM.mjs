import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, s as TableCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { a as deleteContract, m as fetchContracts } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contracts-CMsSJ0wM.js
var import_jsx_runtime = require_jsx_runtime();
function AdminContractsPage() {
	const queryClient = useQueryClient();
	const { data: contractList = [], isLoading } = useQuery({
		queryKey: ["contracts"],
		queryFn: fetchContracts
	});
	const deleteMutation = useMutation({
		mutationFn: deleteContract,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Contracts",
		subtitle: "Review active, pending and expiring agreements.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Contract ledger",
			eyebrow: "Business",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center",
				children: "Loading..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCard, {
				columns: [
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
						key: "endDate",
						label: "End date"
					},
					{
						key: "admin",
						label: "Admin"
					},
					{
						key: "actions",
						label: "Actions"
					}
				],
				rows: contractList.map((contract) => ({
					artist: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/contracts/$id",
						params: { id: contract.id },
						className: "hover:underline",
						children: contract.artist
					}),
					type: contract.type,
					status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: contract.status }),
					endDate: contract.endDate,
					admin: contract.admin,
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							if (confirm("Delete this contract?")) deleteMutation.mutate(contract.id);
						},
						children: "Delete"
					})
				}))
			})
		})
	});
}
//#endregion
export { AdminContractsPage as component };
