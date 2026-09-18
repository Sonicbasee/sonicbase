import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, t as Button } from "./input-DHehfD_4.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowRight, a as ShoppingBag, m as Instagram, n as X, s as Search, t as Youtube, u as Menu } from "../_libs/lucide-react.mjs";
import { a as SheetTrigger, i as SheetTitle, n as SheetClose, r as SheetContent, t as Sheet } from "./sheet-BygBrdyb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sonicbase-CB5emti4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sonicbase_hero_default = "/assets/sonicbase-hero-BtPAiBMK.jpg";
var artist_amara_default = "/assets/artist-amara-gsdHeDrN.jpg";
var artist_kairo_default = "/assets/artist-kairo-lAeBebWI.jpg";
var artist_nova_default = "/assets/artist-nova-DA9uhPh_.jpg";
var release_afterlight_default = "/assets/release-afterlight-B_qL6HV6.jpg";
var release_open_water_default = "/assets/release-open-water-D1MWVW-7.jpg";
var release_static_bloom_default = "/assets/release-static-bloom-SVsGfDaO.jpg";
var studio_story_default = "/assets/studio-story-BTMCXDyE.jpg";
var images = {
	hero: sonicbase_hero_default,
	studio: studio_story_default
};
var artists = [
	{
		slug: "amara-vale",
		name: "Amara Vale",
		genre: "ALT-R&B · SOUL",
		city: "Lagos, NG",
		image: artist_amara_default,
		bio: "Amara Vale writes nocturnal songs with a bright edge. Raised between Lagos and London, she moves through R&B, soul and sparse electronic production with a voice built for close listening.",
		statement: "Every record should leave a little light on after it ends."
	},
	{
		slug: "kairo-north",
		name: "Kairo North",
		genre: "AFRO-FUSION · RAP",
		city: "Lagos, NG",
		image: artist_kairo_default,
		bio: "Kairo North turns city observations into lucid, rhythm-led songs. His work connects Afrobeats percussion, melodic rap and the restless energy of Lagos after dark.",
		statement: "I make music for the distance between where you are and where you are going."
	},
	{
		slug: "nova-eze",
		name: "Nova Eze",
		genre: "ELECTRONIC · CLUB",
		city: "Accra, GH",
		image: artist_nova_default,
		bio: "Producer, DJ and multidisciplinary artist Nova Eze builds immersive club music from fractured vocals, live percussion and sculptural low end.",
		statement: "The dance floor is an archive. I want every set to add something to it."
	}
];
var releases = [
	{
		slug: "afterlight",
		title: "Afterlight",
		artist: "Amara Vale",
		artistSlug: "amara-vale",
		image: release_afterlight_default,
		type: "EP",
		date: "18 SEPTEMBER 2026",
		description: "A five-song study of intimacy, distance and the warm glow that remains when a room goes quiet.",
		tracks: [
			"Red Room",
			"Say Less",
			"Afterlight",
			"Half Awake",
			"Home Before Morning"
		]
	},
	{
		slug: "open-water",
		title: "Open Water",
		artist: "Kairo North",
		artistSlug: "kairo-north",
		image: release_open_water_default,
		type: "ALBUM",
		date: "29 AUGUST 2026",
		description: "Wide-screen Afrofusion shaped by Lagos mornings, late-night drives and the pull of somewhere new.",
		tracks: [
			"First Light",
			"Mainland",
			"No Signal",
			"Open Water",
			"Palmwine",
			"North Star"
		]
	},
	{
		slug: "static-bloom",
		title: "Static Bloom",
		artist: "Nova Eze",
		artistSlug: "nova-eze",
		image: release_static_bloom_default,
		type: "SINGLE",
		date: "01 AUGUST 2026",
		description: "A chrome-edged club track where industrial rhythm opens into something unexpectedly tender.",
		tracks: ["Static Bloom", "Static Bloom (After Hours Mix)"]
	}
];
var news = [
	{
		tag: "NEW MUSIC",
		title: "Amara Vale finds the glow on Afterlight",
		excerpt: "Inside the intimate sessions behind Sonicbase’s newest release.",
		image: release_afterlight_default
	},
	{
		tag: "INTERVIEW",
		title: "Kairo North on making a city feel infinite",
		excerpt: "The Lagos artist talks movement, memory and Open Water.",
		image: artist_kairo_default
	},
	{
		tag: "STUDIO",
		title: "Building records together, from the room outward",
		excerpt: "A look inside the collaborative process at Sonicbase Studios.",
		image: studio_story_default
	}
];
var products = [
	{
		name: "Afterlight Limited Vinyl",
		price: "$32.00",
		tag: "VINYL",
		image: release_afterlight_default
	},
	{
		name: "Open Water Gatefold LP",
		price: "$36.00",
		tag: "VINYL",
		image: release_open_water_default
	},
	{
		name: "Static Bloom Art Print",
		price: "$28.00",
		tag: "PRINT",
		image: release_static_bloom_default
	},
	{
		name: "Sonicbase Studio Tee",
		price: "$40.00",
		tag: "T-SHIRT",
		image: studio_story_default
	},
	{
		name: "Amara Vale Photo Zine",
		price: "$18.00",
		tag: "ZINE",
		image: artist_amara_default
	},
	{
		name: "Kairo North Tour Poster",
		price: "$24.00",
		tag: "POSTER",
		image: artist_kairo_default
	}
];
var heroSlides = [
	{
		title: "Amara Vale",
		subtitle: "'AFTERLIGHT' OUT NOW",
		image: sonicbase_hero_default,
		alt: "Amara Vale on a Lagos street",
		primaryTo: "/music",
		secondaryTo: "/artists"
	},
	{
		title: "Kairo North",
		subtitle: "'OPEN WATER' OUT NOW",
		image: artist_kairo_default,
		alt: "Kairo North portrait",
		primaryTo: "/music",
		secondaryTo: "/artists"
	},
	{
		title: "Nova Eze",
		subtitle: "'STATIC BLOOM' OUT NOW",
		image: artist_nova_default,
		alt: "Nova Eze portrait",
		primaryTo: "/music",
		secondaryTo: "/artists"
	}
];
var socials = [
	{
		image: artist_amara_default,
		alt: "Amara Vale backstage"
	},
	{
		image: studio_story_default,
		alt: "Inside Sonicbase Studios"
	},
	{
		image: artist_kairo_default,
		alt: "Kairo North on tour"
	},
	{
		image: release_static_bloom_default,
		alt: "Static Bloom artwork"
	},
	{
		image: artist_nova_default,
		alt: "Nova Eze live set"
	},
	{
		image: release_open_water_default,
		alt: "Open Water artwork"
	}
];
function Logo({ className = "h-11 w-11" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex flex-col items-center gap-0.5",
		"aria-label": "Sonicbase",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `sonicbase-logo-mark block ${className}`,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[8px] font-bold uppercase tracking-[0.24em]",
			children: "Sonicbase"
		})]
	});
}
var nav = [
	["Home", "/"],
	["Artists", "/artists"],
	["Music", "/music"],
	["Shop", "/shop"],
	["Contact", "/contact"],
	["About", "/about"]
];
function PillLink({ to, children, dark = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: `inline-flex shrink-0 items-center rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 md:px-6 md:py-3 md:text-base ${dark ? "bg-primary text-primary-foreground" : "border border-input bg-background text-foreground"}`,
		children
	});
}
function Tag({ children, pale = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-full px-3 py-1.5 text-[11px] font-medium uppercase leading-none tracking-wide ${pale ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`,
		children
	});
}
function PageTitle({ children, action, intro }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-shell pb-8 pt-12 md:pb-12 md:pt-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-title text-4xl sm:text-6xl lg:text-7xl",
				children
			}), action]
		}), intro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 max-w-2xl text-base leading-snug text-muted-foreground md:text-lg",
			children: intro
		})]
	});
}
function SectionHeading({ children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "display-title min-w-0 text-3xl sm:text-5xl lg:text-6xl",
			children
		}), action]
	});
}
function Header() {
	const overlay = useRouterState({ select: (s) => s.location.pathname }) === "/";
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const results = (0, import_react.useMemo)(() => {
		if (!query.trim()) return [];
		const q = query.toLowerCase();
		return [...artists.filter((x) => x.name.toLowerCase().includes(q)).map((x) => ({
			title: x.name,
			label: "Artist",
			to: "/artists/$artist",
			params: { artist: x.slug }
		})), ...releases.filter((x) => `${x.title} ${x.artist}`.toLowerCase().includes(q)).map((x) => ({
			title: x.title,
			label: x.artist,
			to: "/music/$release",
			params: { release: x.slug }
		}))];
	}, [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `page-shell z-40 grid h-[104px] grid-cols-[1fr_auto_1fr] items-center ${overlay ? "absolute inset-x-0 top-0 text-primary-foreground" : "relative bg-background text-foreground"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "hidden items-center gap-7 text-[15px] lg:flex",
				"aria-label": "Main navigation",
				children: nav.slice(0, 5).map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to,
					activeProps: { className: "font-bold" },
					children: label
				}, to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-full border-none p-6 sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Navigation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 flex flex-col gap-5",
						children: nav.map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							className: "display-title text-4xl",
							children: label
						}, to))
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "justify-self-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-3 sm:gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "hidden h-auto p-0 text-[15px] hover:bg-transparent sm:inline-flex",
						onClick: () => setSearchOpen(true),
						children: "Search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "sm:hidden",
						onClick: () => setSearchOpen(true),
						"aria-label": "Search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPanel, {})
				]
			})
		]
	}), searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-background p-5 sm:p-12",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Site search",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 border-b border-foreground pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-6 w-6 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search artists and releases",
						className: "h-14 border-0 text-2xl shadow-none focus-visible:ring-0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setSearchOpen(false),
						"aria-label": "Close search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-2",
				children: [query && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "No results found. Try an artist or release title."
				}), results.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					params: item.params,
					onClick: () => setSearchOpen(false),
					className: "grid grid-cols-[1fr_auto] items-center border-b py-5 text-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "ml-3 text-sm text-muted-foreground",
						children: item.label
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				}, `${item.label}-${item.title}`))]
			})]
		})
	})] });
}
function CartPanel() {
	const popular = products.slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			className: "h-auto gap-2 p-0 text-[15px] hover:bg-transparent",
			"aria-label": "Open shopping bag, 0 items",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
				className: "h-5 w-5",
				strokeWidth: 1.7
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
		side: "right",
		className: "flex w-full flex-col gap-0 rounded-l-[18px] border-l bg-background p-0 sm:max-w-[460px] [&>button]:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-16 shrink-0 items-center justify-between border-b px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "text-base font-bold",
				children: "Your cart is empty"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Close shopping bag",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col px-5 pb-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between py-6 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Popular items"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "inline-flex items-center gap-2 font-medium",
							children: ["Go to Shop ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 overflow-y-auto",
					children: popular.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "grid grid-cols-[90px_1fr] items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square overflow-hidden rounded-[8px] bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: "",
								width: 180,
								height: 180,
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium leading-snug",
							children: product.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: product.price
						})] })]
					}, product.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto flex justify-center gap-3 pt-8",
					"aria-label": "Accepted payment methods",
					children: [
						"VISA",
						"●●",
						"DISCOVER",
						"AMEX"
					].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-6 min-w-10 items-center justify-center rounded-[3px] border px-1.5 text-[9px] font-bold text-foreground",
						children: label
					}, label))
				})
			]
		})]
	})] });
}
function HeroCarousel() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const count = heroSlides.length;
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setIndex((i) => (i + 1) % count), 12e3);
		return () => clearInterval(id);
	}, [count]);
	const active = heroSlides[index] ?? heroSlides[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-[92vh] min-h-[620px] overflow-hidden bg-primary text-primary-foreground",
		children: [
			heroSlides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: slide.image,
				alt: slide.alt,
				width: 1920,
				height: 1088,
				className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`
			}, slide.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-foreground/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-foreground/95 via-foreground/40 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-shell absolute inset-x-0 bottom-10 z-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display-title text-[11vw] leading-[0.85] sm:text-[9vw] lg:text-[7rem]",
						children: active.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg font-medium uppercase md:text-2xl",
						children: active.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: active.primaryTo,
							className: "inline-flex items-center rounded-full bg-background px-8 py-2.5 text-base font-medium text-foreground transition-opacity hover:opacity-85",
							children: "Listen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: active.secondaryTo,
							className: "inline-flex items-center rounded-full bg-background px-8 py-2.5 text-base font-medium text-foreground transition-opacity hover:opacity-85",
							children: "Watch"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 flex justify-center gap-2.5",
						role: "tablist",
						"aria-label": "Hero slides",
						children: heroSlides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": i === index,
							"aria-label": `Slide ${i + 1}`,
							onClick: () => setIndex(i),
							className: `h-2.5 w-2.5 rounded-full transition-opacity ${i === index ? "bg-primary-foreground" : "bg-primary-foreground/45"}`
						}, slide.title))
					})
				]
			})
		]
	});
}
function MediaCard({ to, params, image, alt, tag, title, meta, ratio = "aspect-square" }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative ${ratio} overflow-hidden rounded-[10px] bg-muted`,
			children: [tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-4 top-4 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: tag })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt,
				loading: "lazy",
				width: 1536,
				height: 1536,
				className: "image-reveal h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-3 text-[15px] font-medium leading-snug",
			children: title
		}),
		meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: meta
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		params,
		className: "group block",
		children: inner
	});
}
function ArtistCard({ artist }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, {
		to: "/artists/$artist",
		params: { artist: artist.slug },
		image: artist.image,
		alt: artist.name,
		tag: artist.genre.split(" · ")[0] ?? "ARTIST",
		title: artist.name,
		meta: artist.city,
		ratio: "aspect-square"
	});
}
function ReleaseCard({ release }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, {
		to: "/music/$release",
		params: { release: release.slug },
		image: release.image,
		alt: `${release.title} artwork`,
		tag: release.type,
		title: `${release.artist} — ${release.title}`,
		meta: release.date
	});
}
function ProductCard({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-square overflow-hidden rounded-[10px] bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-4 top-4 z-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: product.tag })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					loading: "lazy",
					width: 1536,
					height: 1536,
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-[15px] font-medium leading-snug",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: product.price
			})
		]
	});
}
function NewsFeature({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid gap-4 rounded-[10px] bg-muted p-3 sm:grid-cols-[1.15fr_1fr] sm:items-center sm:gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-[16/10] overflow-hidden rounded-[8px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.image,
				alt: "",
				loading: "lazy",
				width: 1536,
				height: 1536,
				className: "h-full w-full object-cover"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pb-2 pr-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: item.tag }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-8 text-xl font-bold leading-tight sm:mt-10",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-snug text-muted-foreground",
					children: item.excerpt
				})
			]
		})]
	});
}
function NewsGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 lg:grid-cols-[1.55fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: news.slice(0, 2).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsFeature, { item }, item.title))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3",
			children: news.slice(2).concat(news.slice(0, 2)).slice(0, 4).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square overflow-hidden rounded-[10px] bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.image,
					alt: "",
					loading: "lazy",
					width: 1536,
					height: 1536,
					className: "h-full w-full object-cover"
				})
			}, `${item.title}-${i}`))
		})]
	});
}
function Socials() {
	const loop = [...socials, ...socials];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden py-16 md:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-shell",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://instagram.com",
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex shrink-0 items-center rounded-full bg-primary px-6 py-3 text-base text-primary-foreground transition-opacity hover:opacity-85",
					children: "Follow Us"
				}),
				children: "Socials"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-9 w-max animate-social-loop motion-reduce:animate-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-5 pr-5",
				children: loop.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `shrink-0 overflow-hidden rounded-[10px] bg-muted ${i % 3 === 1 ? "h-[230px] w-[230px]" : "h-[230px] w-[170px]"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image,
						alt: item.alt,
						loading: "lazy",
						width: 1536,
						height: 1536,
						className: "h-full w-full object-cover"
					})
				}, `${item.alt}-${i}`))
			})
		})]
	});
}
function Marquee() {
	const unit = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DEFINING INDEPENDENCE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-9 w-9" })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden bg-primary py-6 text-primary-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "marquee-track flex w-max items-center gap-10 whitespace-nowrap font-display text-3xl uppercase md:text-5xl",
			children: [
				unit,
				unit,
				unit,
				unit,
				unit,
				unit,
				unit,
				unit
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-primary text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-shell grid gap-14 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xs text-lg",
						children: "Independent music. Artist-led. Built to travel."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: "X"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterGroup, {
					title: "Company",
					links: [
						["About", "/about"],
						["Artists", "/artists"],
						["Contact", "/contact"]
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterGroup, {
					title: "Shop",
					links: [
						["Music", "/music"],
						["News", "/news"],
						["Shop", "/shop"]
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs uppercase text-primary-foreground/60",
					children: "Legal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-7",
					children: [
						"hello@sonicbase.music",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Lagos · London · Accra",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"© 2026 Sonicbase"
					]
				})] })
			]
		})]
	});
}
function FooterGroup({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-xs uppercase text-primary-foreground/60",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-4",
		children: links.map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			children: label
		}, to))
	})] });
}
//#endregion
export { releases as _, Logo as a, PillLink as c, SectionHeading as d, Socials as f, products as g, images as h, HeroCarousel as i, ProductCard as l, artists as m, Footer as n, NewsGrid as o, Tag as p, Header as r, PageTitle as s, ArtistCard as t, ReleaseCard as u };
