import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as releases } from "./sonicbase-CB5emti4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/music._release-BXsBTHxv.js
var $$splitComponentImporter = () => import("./music._release-D1iy5zlk.mjs");
var Route = createFileRoute("/music/$release")({
	loader: ({ params }) => {
		const release = releases.find((r) => r.slug === params.release);
		if (!release) throw notFound();
		return release;
	},
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
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
