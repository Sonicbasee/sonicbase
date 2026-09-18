import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, t as Button } from "./input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, t as DashboardPage } from "./dashboard-CaoKVZLR.mjs";
import { _ as updateMerch, f as fetchMerchItem, u as fetchArtists } from "./api-BSsdVBy9.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./edit-BC9Hus43.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-BW4h9S9I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MerchEditPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: item, isLoading } = useQuery({
		queryKey: ["merch", id],
		queryFn: () => fetchMerchItem(id)
	});
	const { data: artists = [] } = useQuery({
		queryKey: ["artists"],
		queryFn: fetchArtists
	});
	const [title, setTitle] = (0, import_react.useState)("");
	const [artistId, setArtistId] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [initialized, setInitialized] = (0, import_react.useState)(false);
	if (item && !initialized) {
		setTitle(item.title);
		setPrice(String(item.price));
		setStatus(item.status);
		setImage(item.image);
		setInitialized(true);
	}
	const saveMutation = useMutation({
		mutationFn: () => updateMerch(id, {
			title,
			artist_id: artistId || void 0,
			price: parseInt(price) || 0,
			status,
			image
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["merch"] });
			navigate({ to: "/admin/merchandise" });
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
		title: "Edit merchandise",
		subtitle: "Modify pricing, status and item details.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Item settings",
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
								children: "Keep current"
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
							children: "Price (₦)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: price,
							onChange: (e) => setPrice(e.target.value)
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
							children: "Image URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: image,
							onChange: (e) => setImage(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2 flex justify-end gap-3 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/merchandise",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								children: "Cancel"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending,
							children: saveMutation.isPending ? "Saving..." : "Save item"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { MerchEditPage as component };
