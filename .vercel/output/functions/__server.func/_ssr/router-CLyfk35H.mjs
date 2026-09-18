import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as getStoredSession } from "./auth-CkweP9EE.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as requireAuth } from "./route-access-Cfx8QGGX.mjs";
import { t as Route$33 } from "../_artist-CumMRAw4.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$34 } from "../_id_-Bw97r3fk.mjs";
import { t as Route$35 } from "../_id_-9Pe6PU2n.mjs";
import { t as Route$36 } from "../_id_-xke73OFr.mjs";
import { t as Route$37 } from "../_release-CrMaJob5.mjs";
import { t as Route$38 } from "../_release_-oLoBbNmB.mjs";
import { n as Footer, r as Header } from "./sonicbase-CB5emti4.mjs";
import { t as Route$39 } from "./artists._artist-DN3kdAXX.mjs";
import { t as Route$40 } from "./edit-LDXTrOys.mjs";
import { t as Route$41 } from "./edit-xcCPeNN1.mjs";
import { t as Route$42 } from "./edit-ccUNKImY.mjs";
import { t as Route$43 } from "./music._release-BXsBTHxv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CLyfk35H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CYVK_Q_N.css";
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$32 = createRootRouteWithContext()({
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
	const { queryClient } = Route$32.useRouteContext();
	const location = useRouterState({ select: (state) => state.location.pathname });
	const isDashboardRoute = location.startsWith("/admin") || location.startsWith("/artist") || [
		"/login",
		"/forgot-password",
		"/reset-password"
	].includes(location);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			!isDashboardRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: isDashboardRoute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			!isDashboardRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var $$splitComponentImporter$31 = () => import("./routes-CNPUrfLl.mjs");
var Route$31 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./about-CM7Sy3Sk.mjs");
var Route$30 = createFileRoute("/about")({
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
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin-ChRe4jtd.mjs");
var Route$29 = createFileRoute("/admin")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./artist-3chDcH65.mjs");
var Route$28 = createFileRoute("/artist")({
	beforeLoad: async () => {
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./artists-B9ufx4n5.mjs");
var Route$27 = createFileRoute("/artists")({
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
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./contact-5D8HRS-f.mjs");
var Route$26 = createFileRoute("/contact")({
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
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./forgot-password-mt4LPH8e.mjs");
var Route$25 = createFileRoute("/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./login-CG_xQLfT.mjs");
var Route$24 = createFileRoute("/login")({
	beforeLoad: () => {
		const session = getStoredSession();
		if (session) throw redirect({ to: session.role === "admin" ? "/admin" : "/artist" });
	},
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./music-BDWo9eaB.mjs");
var Route$23 = createFileRoute("/music")({
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
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./news-DSnPnr8c.mjs");
var Route$22 = createFileRoute("/news")({
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
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./reset-password-C51MyNpN.mjs");
var Route$21 = createFileRoute("/reset-password")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./shop-D4KKRn7X.mjs");
var Route$20 = createFileRoute("/shop")({
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
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin-BDN87vid.mjs");
var Route$19 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./artists-BQiAawPZ.mjs");
var Route$18 = createFileRoute("/admin/artists")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./contracts-CMsSJ0wM.mjs");
var Route$17 = createFileRoute("/admin/contracts")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./distribution-Onxcjndr.mjs");
var Route$16 = createFileRoute("/admin/distribution")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./legal-DDX17ybV.mjs");
var Route$15 = createFileRoute("/admin/legal")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./merchandise-By1--Sco.mjs");
var Route$14 = createFileRoute("/admin/merchandise")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./news-Bk0LuTrL.mjs");
var Route$13 = createFileRoute("/admin/news")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./profile-CZM5fiSY.mjs");
var Route$12 = createFileRoute("/admin/profile")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./releases-93TDvMvG.mjs");
var Route$11 = createFileRoute("/admin/releases")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./reports-C_TmwZBg.mjs");
var Route$10 = createFileRoute("/admin/reports")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./revenue-JEUS5hzc.mjs");
var Route$9 = createFileRoute("/admin/revenue")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./streams-CWHpVKdV.mjs");
var Route$8 = createFileRoute("/admin/streams")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./artist-DKBI1xOm.mjs");
var Route$7 = createFileRoute("/artist/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./profile-ds94-cdW.mjs");
var Route$6 = createFileRoute("/artist/profile")({
	beforeLoad: async () => {
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./releases-Q-Mx7OB-.mjs");
var Route$5 = createFileRoute("/artist/releases")({
	beforeLoad: async () => {
		const { requireAuth } = await import("./route-access-Cfx8QGGX.mjs").then((n) => n.n).then((n) => n.n);
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./revenue-DkPm_Tww.mjs");
var Route$4 = createFileRoute("/artist/revenue")({
	beforeLoad: async () => {
		const { requireAuth } = await import("./route-access-Cfx8QGGX.mjs").then((n) => n.n).then((n) => n.n);
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./streams-5iQknSmE.mjs");
var Route$3 = createFileRoute("/artist/streams")({
	beforeLoad: async () => {
		const { requireAuth } = await import("./route-access-Cfx8QGGX.mjs").then((n) => n.n).then((n) => n.n);
		await requireAuth("artist");
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./new-C5hhbBDv.mjs");
var Route$2 = createFileRoute("/admin/merchandise/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./new-DlKRISkY.mjs");
var Route$1 = createFileRoute("/admin/news/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./new-B6-K8VNU.mjs");
var Route = createFileRoute("/admin/releases/new")({
	beforeLoad: async () => {
		await requireAuth("admin");
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$31.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$32
});
var AboutRoute = Route$30.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$32
});
var AdminRoute = Route$29.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$32
});
var ArtistRoute = Route$28.update({
	id: "/artist",
	path: "/artist",
	getParentRoute: () => Route$32
});
var ArtistsRoute = Route$27.update({
	id: "/artists",
	path: "/artists",
	getParentRoute: () => Route$32
});
var ContactRoute = Route$26.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$32
});
var ForgotPasswordRoute = Route$25.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$32
});
var LoginRoute = Route$24.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$32
});
var MusicRoute = Route$23.update({
	id: "/music",
	path: "/music",
	getParentRoute: () => Route$32
});
var NewsRoute = Route$22.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => Route$32
});
var ResetPasswordRoute = Route$21.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$32
});
var ShopRoute = Route$20.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$32
});
var AdminIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminArtistsRoute = Route$18.update({
	id: "/artists",
	path: "/artists",
	getParentRoute: () => AdminRoute
});
var AdminContractsRoute = Route$17.update({
	id: "/contracts",
	path: "/contracts",
	getParentRoute: () => AdminRoute
});
var AdminDistributionRoute = Route$16.update({
	id: "/distribution",
	path: "/distribution",
	getParentRoute: () => AdminRoute
});
var AdminLegalRoute = Route$15.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => AdminRoute
});
var AdminMerchandiseRoute = Route$14.update({
	id: "/merchandise",
	path: "/merchandise",
	getParentRoute: () => AdminRoute
});
var AdminNewsRoute = Route$13.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => AdminRoute
});
var AdminProfileRoute = Route$12.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AdminRoute
});
var AdminReleasesRoute = Route$11.update({
	id: "/releases",
	path: "/releases",
	getParentRoute: () => AdminRoute
});
var AdminReportsRoute = Route$10.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AdminRoute
});
var AdminRevenueRoute = Route$9.update({
	id: "/revenue",
	path: "/revenue",
	getParentRoute: () => AdminRoute
});
var AdminStreamsRoute = Route$8.update({
	id: "/streams",
	path: "/streams",
	getParentRoute: () => AdminRoute
});
var ArtistIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => ArtistRoute
});
var ArtistProfileRoute = Route$6.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => ArtistRoute
});
var ArtistReleasesRoute = Route$5.update({
	id: "/releases",
	path: "/releases",
	getParentRoute: () => ArtistRoute
});
var ArtistRevenueRoute = Route$4.update({
	id: "/revenue",
	path: "/revenue",
	getParentRoute: () => ArtistRoute
});
var ArtistStreamsRoute = Route$3.update({
	id: "/streams",
	path: "/streams",
	getParentRoute: () => ArtistRoute
});
var ArtistsArtistRoute = Route$39.update({
	id: "/$artist",
	path: "/$artist",
	getParentRoute: () => ArtistsRoute
});
var MusicReleaseRoute = Route$43.update({
	id: "/$release",
	path: "/$release",
	getParentRoute: () => MusicRoute
});
var AdminArtistsArtistRoute = Route$33.update({
	id: "/$artist",
	path: "/$artist",
	getParentRoute: () => AdminArtistsRoute
});
var AdminContractsChar91idChar93Route = Route$34.update({
	id: "/id",
	path: "/id",
	getParentRoute: () => AdminContractsRoute
});
var AdminDistributionChar91idChar93Route = Route$36.update({
	id: "/id",
	path: "/id",
	getParentRoute: () => AdminDistributionRoute
});
var AdminLegalChar91idChar93Route = Route$35.update({
	id: "/id",
	path: "/id",
	getParentRoute: () => AdminLegalRoute
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
var AdminReleasesChar91releaseChar93Route = Route$38.update({
	id: "/release",
	path: "/release",
	getParentRoute: () => AdminReleasesRoute
});
var ArtistReleasesReleaseRoute = Route$37.update({
	id: "/$release",
	path: "/$release",
	getParentRoute: () => ArtistReleasesRoute
});
var AdminMerchandiseChar91idChar93EditRoute = Route$40.update({
	id: "/id/edit",
	path: "/id/edit",
	getParentRoute: () => AdminMerchandiseRoute
});
var AdminNewsChar91idChar93EditRoute = Route$41.update({
	id: "/id/edit",
	path: "/id/edit",
	getParentRoute: () => AdminNewsRoute
});
var AdminReleasesChar91releaseChar93EditRoute = Route$42.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => AdminReleasesChar91releaseChar93Route
});
var AdminArtistsRouteChildren = { AdminArtistsArtistRoute };
var AdminArtistsRouteWithChildren = AdminArtistsRoute._addFileChildren(AdminArtistsRouteChildren);
var AdminContractsRouteChildren = { AdminContractsChar91idChar93Route };
var AdminContractsRouteWithChildren = AdminContractsRoute._addFileChildren(AdminContractsRouteChildren);
var AdminDistributionRouteChildren = { AdminDistributionChar91idChar93Route };
var AdminDistributionRouteWithChildren = AdminDistributionRoute._addFileChildren(AdminDistributionRouteChildren);
var AdminLegalRouteChildren = { AdminLegalChar91idChar93Route };
var AdminLegalRouteWithChildren = AdminLegalRoute._addFileChildren(AdminLegalRouteChildren);
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
	AdminContractsRoute: AdminContractsRouteWithChildren,
	AdminDistributionRoute: AdminDistributionRouteWithChildren,
	AdminLegalRoute: AdminLegalRouteWithChildren,
	AdminMerchandiseRoute: AdminMerchandiseRouteWithChildren,
	AdminNewsRoute: AdminNewsRouteWithChildren,
	AdminProfileRoute,
	AdminReleasesRoute: AdminReleasesRoute._addFileChildren(AdminReleasesRouteChildren),
	AdminReportsRoute,
	AdminRevenueRoute,
	AdminStreamsRoute,
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
var routeTree = Route$32._addFileChildren(rootRouteChildren)._addFileTypes();
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
