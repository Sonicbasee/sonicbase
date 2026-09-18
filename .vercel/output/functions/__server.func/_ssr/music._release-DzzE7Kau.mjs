import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchPublicReleases } from "./public-data-SLjy_1a6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/music._release-DzzE7Kau.js
var $$splitComponentImporter = () => import("./music._release-BUyePMCR.mjs");
var Route = createFileRoute("/music/$release")({
	head: ({ loaderData }) => ({ meta: [
		{ title: `${loaderData?.title ?? "Release"} — Sonicbase` },
		{
			name: "description",
			content: loaderData?.description ?? "A Sonicbase release."
		},
		{
			property: "og:title",
			content: `${loaderData?.title ?? "Release"} — Sonicbase`
		},
		{
			property: "og:description",
			content: loaderData?.description ?? "A Sonicbase release."
		},
		{
			property: "og:type",
			content: "music.album"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ params }) => {
		const release = (await fetchPublicReleases()).find((r) => r.slug === params.release);
		if (!release) throw notFound();
		return release;
	}
});
//#endregion
export { Route as t };
