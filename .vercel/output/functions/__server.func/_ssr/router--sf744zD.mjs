import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as getStoredSession } from "./auth-CuwCM1mo.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-B8ACBlyT.mjs";
import { t as Route$29 } from "../_artist-usVH6eSX.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$30 } from "../_release-DOFFcHEE.mjs";
import { t as Route$31 } from "../_release_-CPJs7uVs.mjs";
import { n as Footer, r as Header } from "./sonicbase-Dir2Rrov.mjs";
import { n as fetchPublicReleases, t as fetchPublicArtists } from "./public-data-SLjy_1a6.mjs";
import { t as Route$32 } from "./artists._artist-BZrshYN_.mjs";
import { t as Route$33 } from "./edit-CYqK4srb.mjs";
import { t as Route$34 } from "./edit-BZ8Fdtcm.mjs";
import { t as Route$35 } from "./edit-Bnu09dFP.mjs";
import { t as Route$36 } from "./music._release-DzzE7Kau.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router--sf744zD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CFfSHsG5.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("Root error:", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$28 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sonicbase" },
			{
				name: "description",
				content: "Independent music, artist-led."
			},
			{
				name: "author",
				content: "Sonicbase"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$28.useRouteContext();
	const location = useRouterState({ select: (state) => state.location.pathname });
	const isDashboardRoute = location.startsWith("/admin") || location.startsWith("/artist") || [
		"/login",
		"/forgot-password",
		"/reset-password"
	].includes(location);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			!isDashboardRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderWithData, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: isDashboardRoute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			!isDashboardRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function HeaderWithData() {
	const { data: headerArtists = [] } = useQuery({
		queryKey: ["public-artists"],
		queryFn: fetchPublicArtists,
		staleTime: 6e4
	});
	const { data: headerReleases = [] } = useQuery({
		queryKey: ["public-releases"],
		queryFn: fetchPublicReleases,
		staleTime: 6e4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
		artists: headerArtists,
		releases: headerReleases
	});
}
var $$splitComponentImporter$27 = () => import("./routes-DwwsikrE.mjs");
var Route$27 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sonicbase — Independent Music, Artist-Led" },
		{
			name: "description",
			content: "Sonicbase is a contemporary independent music company supporting artists and releases across Africa and beyond."
		},
		{
			property: "og:title",
			content: "Sonicbase — Independent Music, Artist-Led"
		},
		{
			property: "og:description",
			content: "Meet the artists, music and culture moving through Sonicbase."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./about-B47H2ido.mjs");
var Route$26 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — Sonicbase" },
		{
			name: "description",
			content: "Meet the independent music company behind Sonicbase."
		},
		{
			property: "og:title",
			content: "About Sonicbase"
		},
		{
			property: "og:description",
			content: "An artist-led music company connecting bold ideas to global audiences."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin-ChRe4jtd.mjs");
var Route$25 = createFileRoute("/admin")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./artist-3chDcH65.mjs");
var Route$24 = createFileRoute("/artist")({
	beforeLoad: async () => {
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./artists-D4SP-Bvo.mjs");
var Route$23 = createFileRoute("/artists")({
	head: () => ({ meta: [
		{ title: "Artists — Sonicbase" },
		{
			name: "description",
			content: "Explore the artists shaping Sonicbase."
		},
		{
			property: "og:title",
			content: "Sonicbase Artists"
		},
		{
			property: "og:description",
			content: "Independent voices across R&B, Afrofusion and electronic music."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./contact-5D8HRS-f.mjs");
var Route$22 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — Sonicbase" },
		{
			name: "description",
			content: "Contact Sonicbase about music, partnerships, press or licensing."
		},
		{
			property: "og:title",
			content: "Contact Sonicbase"
		},
		{
			property: "og:description",
			content: "Start a conversation with the Sonicbase team."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./forgot-password-CN6cGwpE.mjs");
var Route$21 = createFileRoute("/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./login-CxeQuMtp.mjs");
var Route$20 = createFileRoute("/login")({
	beforeLoad: () => {
		const session = getStoredSession();
		if (session) throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
	},
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./music-B5ECKHXP.mjs");
var Route$19 = createFileRoute("/music")({
	head: () => ({ meta: [
		{ title: "Music — Sonicbase" },
		{
			name: "description",
			content: "Browse new music and the Sonicbase catalogue."
		},
		{
			property: "og:title",
			content: "Music — Sonicbase"
		},
		{
			property: "og:description",
			content: "New albums, EPs and singles from Sonicbase artists."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./news-Dq7W3qz1.mjs");
var Route$18 = createFileRoute("/news")({
	head: () => ({ meta: [
		{ title: "News — Sonicbase" },
		{
			name: "description",
			content: "News, interviews and studio stories from Sonicbase."
		},
		{
			property: "og:title",
			content: "News — Sonicbase"
		},
		{
			property: "og:description",
			content: "New music, conversations and culture from inside Sonicbase."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./reset-password-C51MyNpN.mjs");
var Route$17 = createFileRoute("/reset-password")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./shop-C7J1bLeb.mjs");
var Route$16 = createFileRoute("/shop")({
	head: () => ({ meta: [
		{ title: "Shop — Sonicbase" },
		{
			name: "description",
			content: "Limited music, prints and artist merchandise from Sonicbase."
		},
		{
			property: "og:title",
			content: "Shop Sonicbase"
		},
		{
			property: "og:description",
			content: "Official releases and artist merchandise."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin-BE2vans8.mjs");
var Route$15 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./artists-Ch16HdHS.mjs");
var Route$14 = createFileRoute("/admin/artists")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./merchandise-6FwwZDVp.mjs");
var Route$13 = createFileRoute("/admin/merchandise")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./news-ghE05WAF.mjs");
var Route$12 = createFileRoute("/admin/news")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./profile-t7aSpI4y.mjs");
var Route$11 = createFileRoute("/admin/profile")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./releases-nuMOCHnN.mjs");
var Route$10 = createFileRoute("/admin/releases")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./revenue-CjBMt-1a.mjs");
var Route$9 = createFileRoute("/admin/revenue")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./artist-SOhhwZk9.mjs");
var Route$8 = createFileRoute("/artist/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./profile-nl75M3fW.mjs");
var Route$7 = createFileRoute("/artist/profile")({
	beforeLoad: async () => {
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./releases-DFsWDBLB.mjs");
var Route$6 = createFileRoute("/artist/releases")({
	beforeLoad: async () => {
		const { requireAuth } = await import("./route-access-B8ACBlyT.mjs").then((n) => n.n).then((n) => n.n);
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./revenue-Diuql4Og.mjs");
var Route$5 = createFileRoute("/artist/revenue")({
	beforeLoad: async () => {
		const { requireAuth } = await import("./route-access-B8ACBlyT.mjs").then((n) => n.n).then((n) => n.n);
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./streams-CyC0OLqT.mjs");
var Route$4 = createFileRoute("/artist/streams")({
	beforeLoad: async () => {
		const { requireAuth } = await import("./route-access-B8ACBlyT.mjs").then((n) => n.n).then((n) => n.n);
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./new-DqKqQBTl.mjs");
var Route$3 = createFileRoute("/admin/artists/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./new-d18Lm1M_.mjs");
var Route$2 = createFileRoute("/admin/merchandise/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./new-DtgZBvJE.mjs");
var Route$1 = createFileRoute("/admin/news/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./new-0SWt8fFP.mjs");
var Route = createFileRoute("/admin/releases/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$27.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$28
});
var AboutRoute = Route$26.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$28
});
var AdminRoute = Route$25.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$28
});
var ArtistRoute = Route$24.update({
	id: "/artist",
	path: "/artist",
	getParentRoute: () => Route$28
});
var ArtistsRoute = Route$23.update({
	id: "/artists",
	path: "/artists",
	getParentRoute: () => Route$28
});
var ContactRoute = Route$22.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$28
});
var ForgotPasswordRoute = Route$21.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$28
});
var LoginRoute = Route$20.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$28
});
var MusicRoute = Route$19.update({
	id: "/music",
	path: "/music",
	getParentRoute: () => Route$28
});
var NewsRoute = Route$18.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => Route$28
});
var ResetPasswordRoute = Route$17.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$28
});
var ShopRoute = Route$16.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$28
});
var AdminIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminArtistsRoute = Route$14.update({
	id: "/artists",
	path: "/artists",
	getParentRoute: () => AdminRoute
});
var AdminMerchandiseRoute = Route$13.update({
	id: "/merchandise",
	path: "/merchandise",
	getParentRoute: () => AdminRoute
});
var AdminNewsRoute = Route$12.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => AdminRoute
});
var AdminProfileRoute = Route$11.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AdminRoute
});
var AdminReleasesRoute = Route$10.update({
	id: "/releases",
	path: "/releases",
	getParentRoute: () => AdminRoute
});
var AdminRevenueRoute = Route$9.update({
	id: "/revenue",
	path: "/revenue",
	getParentRoute: () => AdminRoute
});
var ArtistIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => ArtistRoute
});
var ArtistProfileRoute = Route$7.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => ArtistRoute
});
var ArtistReleasesRoute = Route$6.update({
	id: "/releases",
	path: "/releases",
	getParentRoute: () => ArtistRoute
});
var ArtistRevenueRoute = Route$5.update({
	id: "/revenue",
	path: "/revenue",
	getParentRoute: () => ArtistRoute
});
var ArtistStreamsRoute = Route$4.update({
	id: "/streams",
	path: "/streams",
	getParentRoute: () => ArtistRoute
});
var ArtistsArtistRoute = Route$32.update({
	id: "/$artist",
	path: "/$artist",
	getParentRoute: () => ArtistsRoute
});
var MusicReleaseRoute = Route$36.update({
	id: "/$release",
	path: "/$release",
	getParentRoute: () => MusicRoute
});
var AdminArtistsArtistRoute = Route$29.update({
	id: "/$artist",
	path: "/$artist",
	getParentRoute: () => AdminArtistsRoute
});
var AdminArtistsNewRoute = Route$3.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminArtistsRoute
});
var AdminMerchandiseNewRoute = Route$2.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminMerchandiseRoute
});
var AdminNewsNewRoute = Route$1.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminNewsRoute
});
var AdminReleasesNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminReleasesRoute
});
var AdminReleasesChar91releaseChar93Route = Route$31.update({
	id: "/release",
	path: "/release",
	getParentRoute: () => AdminReleasesRoute
});
var ArtistReleasesReleaseRoute = Route$30.update({
	id: "/$release",
	path: "/$release",
	getParentRoute: () => ArtistReleasesRoute
});
var AdminMerchandiseChar91idChar93EditRoute = Route$35.update({
	id: "/id/edit",
	path: "/id/edit",
	getParentRoute: () => AdminMerchandiseRoute
});
var AdminNewsChar91idChar93EditRoute = Route$34.update({
	id: "/id/edit",
	path: "/id/edit",
	getParentRoute: () => AdminNewsRoute
});
var AdminReleasesChar91releaseChar93EditRoute = Route$33.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminReleasesChar91releaseChar93Route
});
var AdminArtistsRouteChildren = {
	AdminArtistsArtistRoute,
	AdminArtistsNewRoute
};
var AdminArtistsRouteWithChildren = AdminArtistsRoute._addFileChildren(AdminArtistsRouteChildren);
var AdminMerchandiseRouteChildren = {
	AdminMerchandiseNewRoute,
	AdminMerchandiseChar91idChar93EditRoute
};
var AdminMerchandiseRouteWithChildren = AdminMerchandiseRoute._addFileChildren(AdminMerchandiseRouteChildren);
var AdminNewsRouteChildren = {
	AdminNewsNewRoute,
	AdminNewsChar91idChar93EditRoute
};
var AdminNewsRouteWithChildren = AdminNewsRoute._addFileChildren(AdminNewsRouteChildren);
var AdminReleasesChar91releaseChar93RouteChildren = { AdminReleasesChar91releaseChar93EditRoute };
var AdminReleasesRouteChildren = {
	AdminReleasesNewRoute,
	AdminReleasesChar91releaseChar93Route: AdminReleasesChar91releaseChar93Route._addFileChildren(AdminReleasesChar91releaseChar93RouteChildren)
};
var AdminRouteChildren = {
	AdminArtistsRoute: AdminArtistsRouteWithChildren,
	AdminMerchandiseRoute: AdminMerchandiseRouteWithChildren,
	AdminNewsRoute: AdminNewsRouteWithChildren,
	AdminProfileRoute,
	AdminReleasesRoute: AdminReleasesRoute._addFileChildren(AdminReleasesRouteChildren),
	AdminRevenueRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var ArtistReleasesRouteChildren = { ArtistReleasesReleaseRoute };
var ArtistRouteChildren = {
	ArtistProfileRoute,
	ArtistReleasesRoute: ArtistReleasesRoute._addFileChildren(ArtistReleasesRouteChildren),
	ArtistRevenueRoute,
	ArtistStreamsRoute,
	ArtistIndexRoute
};
var ArtistRouteWithChildren = ArtistRoute._addFileChildren(ArtistRouteChildren);
var ArtistsRouteChildren = { ArtistsArtistRoute };
var ArtistsRouteWithChildren = ArtistsRoute._addFileChildren(ArtistsRouteChildren);
var MusicRouteChildren = { MusicReleaseRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	ArtistRoute: ArtistRouteWithChildren,
	ArtistsRoute: ArtistsRouteWithChildren,
	ContactRoute,
	ForgotPasswordRoute,
	LoginRoute,
	MusicRoute: MusicRoute._addFileChildren(MusicRouteChildren),
	NewsRoute,
	ResetPasswordRoute,
	ShopRoute
};
var routeTree = Route$28._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
