import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as Socials, o as NewsGrid, s as PageTitle } from "./sonicbase-Dir2Rrov.mjs";
import { i as fetchPublishedNews, t as fetchPublicArtists } from "./public-data-SLjy_1a6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-Dq7W3qz1.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const { data: newsItems = [], isLoading } = useQuery({
		queryKey: ["public-news"],
		queryFn: fetchPublishedNews,
		staleTime: 6e4
	});
	const { data: artists = [] } = useQuery({
		queryKey: ["public-artists"],
		queryFn: fetchPublicArtists,
		staleTime: 6e4
	});
	const socialImages = artists.filter((a) => a.image).map((a) => ({
		image: a.image,
		alt: a.name
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			intro: "News, interviews and studio stories from Sonicbase.",
			children: "News"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "page-shell pb-8",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground py-8 text-center",
				children: "Loading news..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsGrid, { items: newsItems })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Socials, { images: socialImages })
	] });
}
//#endregion
export { NewsPage as component };
