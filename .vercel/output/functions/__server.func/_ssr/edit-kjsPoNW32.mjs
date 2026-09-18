import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, t as Button } from "./input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { C as fetchRelease, D as updateRelease, f as fetchArtists } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./edit-ccUNKImY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-kjsPoNW32.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditReleasePage() {
	const { release: releaseId } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: item, isLoading } = useQuery({
		queryKey: ["release", releaseId],
		queryFn: () => fetchRelease(releaseId)
	});
	const { data: artists = [] } = useQuery({
		queryKey: ["artists"],
		queryFn: fetchArtists
	});
	const [title, setTitle] = (0, import_react.useState)("");
	const [artistId, setArtistId] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [cover, setCover] = (0, import_react.useState)("");
	const [initialized, setInitialized] = (0, import_react.useState)(false);
	if (item && !initialized) {
		setTitle(item.title);
		setArtistId(item.artistId || "");
		setType(item.type);
		setStatus(item.status);
		setDate(item.date);
		setCover(item.cover);
		setInitialized(true);
	}
	const saveMutation = useMutation({
		mutationFn: () => updateRelease(releaseId, {
			title,
			artist_id: artistId,
			type,
			status,
			release_date: date,
			cover
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["releases"] });
			navigate({
				to: "/admin/releases/$release",
				params: { release: releaseId }
			});
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
		title: "Edit release",
		subtitle: "Update metadata, artwork and release status.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Release update",
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
							children: "Artist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
							value: artistId,
							onChange: (e) => setArtistId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select artist"
							}), artists.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: a.id,
								children: a.name
							}, a.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
							value: type,
							onChange: (e) => setType(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Single",
									children: "Single"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "EP",
									children: "EP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Album",
									children: "Album"
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
									value: "Pending",
									children: "Pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Published",
									children: "Published"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Processing",
									children: "Processing"
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
							children: "Release date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Cover URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: cover,
							onChange: (e) => setCover(e.target.value),
							placeholder: "https://..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2 flex justify-end gap-3 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/releases/$release",
							params: { release: releaseId },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								children: "Cancel"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending,
							children: saveMutation.isPending ? "Saving..." : "Save changes"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { EditReleasePage as component };
