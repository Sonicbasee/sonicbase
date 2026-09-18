import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./input-DHehfD_4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, o as StatusBadge, s as TableCard, t as DashboardPage } from "./dashboard-CaoKVZLR.mjs";
import { a as deleteArtist, u as fetchArtists } from "./api-BSsdVBy9.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artists-Dv9H6jO2.js
var import_jsx_runtime = require_jsx_runtime();
function AdminArtistsPage() {
	const queryClient = useQueryClient();
	const { data: artists = [], isLoading } = useQuery({
		queryKey: ["artists"],
		queryFn: fetchArtists
	});
	const deleteMutation = useMutation({
		mutationFn: deleteArtist,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["artists"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "Artists",
		subtitle: "Manage the active roster and artist relationships.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/artists/new",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				children: "Add artist"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Artist roster",
			eyebrow: "Management",
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
						key: "genre",
						label: "Genre"
					},
					{
						key: "city",
						label: "City"
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
				rows: artists.map((artist) => ({
					artist: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/artists/$artist",
						params: { artist: artist.id },
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: artist.image || "/placeholder.png",
							alt: artist.name,
							className: "h-10 w-10 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium hover:underline",
							children: artist.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: artist.email
						})] })]
					}),
					genre: artist.genre,
					city: artist.city,
					status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: artist.status }),
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => {
							if (confirm("Delete this artist?")) deleteMutation.mutate(artist.id);
						},
						children: "Delete"
					})
				}))
			})
		})
	});
}
//#endregion
export { AdminArtistsPage as component };
