import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as artists } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artists._artist-DN3kdAXX.js
var $$splitComponentImporter = () => import("./artists._artist-Cm1L_yb5.mjs");
var Route = createFileRoute("/artists/$artist")({
	loader: ({ params }) => {
		const artist = artists.find((a) => a.slug === params.artist);
		if (!artist) throw notFound();
		return artist;
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: `${loaderData?.name ?? "Artist"} — Sonicbase` },
		{
			name: "description",
			content: loaderData?.bio ?? "Sonicbase artist."
		},
		{
			property: "og:title",
			content: `${loaderData?.name ?? "Artist"} — Sonicbase`
		},
		{
			property: "og:description",
			content: loaderData?.bio ?? "Sonicbase artist."
		},
		{
			property: "og:type",
			content: "profile"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
