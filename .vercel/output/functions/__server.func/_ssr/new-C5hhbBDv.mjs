import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, t as Button } from "./input-DHehfD_4.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SectionCard, t as DashboardPage } from "./dashboard-BdBWmyrI.mjs";
import { f as fetchArtists, t as createMerch } from "./api-Eeax_ugD.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-C5hhbBDv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewMerchPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: artists = [] } = useQuery({
		queryKey: ["artists"],
		queryFn: fetchArtists
	});
	const [title, setTitle] = (0, import_react.useState)("");
	const [artistId, setArtistId] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Draft");
	const [image, setImage] = (0, import_react.useState)("");
	const createMutation = useMutation({
		mutationFn: () => createMerch({
			title,
			artist_id: artistId,
			price: parseInt(price) || 0,
			description,
			status,
			image
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["merch"] });
			navigate({ to: "/admin/merchandise" });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {
		title: "New merchandise",
		subtitle: "Add a new physical or digital merchandise item.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
			title: "Product details",
			eyebrow: "Create",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Afterlight Tee",
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
							children: "Price (₦)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							placeholder: "42000",
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Draft",
								children: "Draft"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Published",
								children: "Published"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Image URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "https://...",
							value: image,
							onChange: (e) => setImage(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "min-h-28 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
							placeholder: "Describe the item...",
							value: description,
							onChange: (e) => setDescription(e.target.value)
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
							onClick: () => createMutation.mutate(),
							disabled: !title || !artistId || createMutation.isPending,
							children: createMutation.isPending ? "Creating..." : "Publish item"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { NewMerchPage as component };
