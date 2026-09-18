import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as fetchPublicArtists } from "./public-data-SLjy_1a6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artists._artist-BZrshYN_.js
var $$splitComponentImporter = () => import("./artists._artist-P0dJpBSI.mjs");
var Route = createFileRoute("/artists/$artist")({
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
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ params }) => {
		const artist = (await fetchPublicArtists()).find((a) => a.slug === params.artist);
		if (!artist) throw notFound();
		return artist;
	}
});
//#endregion
export { Route as t };
