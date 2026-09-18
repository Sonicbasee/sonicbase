import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, t as Button } from "./input-DHehfD_4.mjs";
import { i as logoutUser } from "./auth-CkweP9EE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Bell, S as BriefcaseBusiness, a as ShoppingBag, b as ChevronRight, c as Newspaper, f as LogOut, h as FileText, i as TrendingUp, l as Music2, o as ShieldCheck, p as LayoutDashboard, r as Users, u as Menu, v as CreditCard, w as ArrowUpRight, x as Building2 } from "../_libs/lucide-react.mjs";
import { a as SheetTrigger, i as SheetTitle, r as SheetContent, t as Sheet } from "./sheet-BygBrdyb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BdBWmyrI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var artistNav = [
	{
		label: "Overview",
		path: "/artist",
		icon: LayoutDashboard
	},
	{
		label: "Revenue",
		path: "/artist/revenue",
		icon: CreditCard
	},
	{
		label: "Streams",
		path: "/artist/streams",
		icon: TrendingUp
	},
	{
		label: "Releases",
		path: "/artist/releases",
		icon: Music2
	},
	{
		label: "Profile",
		path: "/artist/profile",
		icon: Users
	},
	{
		label: "Logout",
		path: "/login",
		icon: LogOut
	}
];
var adminNav = [
	{
		label: "Overview",
		path: "/admin",
		icon: LayoutDashboard
	},
	{
		label: "Artists",
		path: "/admin/artists",
		icon: Users
	},
	{
		label: "Releases",
		path: "/admin/releases",
		icon: Music2
	},
	{
		label: "Distribution",
		path: "/admin/distribution",
		icon: Building2
	},
	{
		label: "Streams",
		path: "/admin/streams",
		icon: TrendingUp
	},
	{
		label: "Revenue",
		path: "/admin/revenue",
		icon: CreditCard
	},
	{
		label: "Reports",
		path: "/admin/reports",
		icon: FileText
	},
	{
		label: "Contracts",
		path: "/admin/contracts",
		icon: BriefcaseBusiness
	},
	{
		label: "Legal",
		path: "/admin/legal",
		icon: ShieldCheck
	},
	{
		label: "Merchandise",
		path: "/admin/merchandise",
		icon: ShoppingBag
	},
	{
		label: "News",
		path: "/admin/news",
		icon: Newspaper
	},
	{
		label: "Profile",
		path: "/admin/profile",
		icon: Users
	},
	{
		label: "Logout",
		path: "/login",
		icon: LogOut
	}
];
function getDashboardNav(role) {
	return role === "artist" ? artistNav : adminNav;
}
function formatMoney(value) {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 0
	}).format(value);
}
function StatCard({ label, value, change, detail, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}), change && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${{
					neutral: "bg-muted/60 text-foreground",
					success: "bg-emerald-50 text-emerald-700",
					warning: "bg-amber-50 text-amber-700",
					danger: "bg-red-50 text-red-700"
				}[accent ?? "neutral"]}`,
				children: change
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-3xl font-semibold tracking-tight",
				children: value
			}), detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: detail
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })]
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${{
			Active: "bg-emerald-100 text-emerald-700",
			Published: "bg-emerald-100 text-emerald-700",
			Distributed: "bg-emerald-100 text-emerald-700",
			Draft: "bg-slate-200 text-slate-700",
			Pending: "bg-amber-100 text-amber-700",
			"Pending signature": "bg-amber-100 text-amber-700",
			"Requires action": "bg-red-100 text-red-700",
			Processing: "bg-blue-100 text-blue-700",
			Failed: "bg-red-100 text-red-700",
			Archived: "bg-slate-200 text-slate-700",
			Scheduled: "bg-violet-100 text-violet-700",
			"In review": "bg-violet-100 text-violet-700",
			"Awaiting document": "bg-amber-100 text-amber-700",
			Resolved: "bg-emerald-100 text-emerald-700",
			Open: "bg-blue-100 text-blue-700",
			Expiring: "bg-orange-100 text-orange-700"
		}[status] ?? "bg-slate-200 text-slate-700"}`,
		children: status
	});
}
function SectionCard({ title, eyebrow, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
				children: eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 text-lg font-semibold tracking-tight",
				children: title
			})] }), action]
		}), children]
	});
}
function DashboardPage({ title, subtitle, children, actions }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const handleLogout = () => {
		logoutUser();
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
			search,
			setSearch,
			onLogout: handleLogout,
			title,
			subtitle,
			actions,
			children
		})
	});
}
function DashboardShell({ search, setSearch, onLogout, title, subtitle, actions, children }) {
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const nav = getDashboardNav((0, import_react.useMemo)(() => typeof window === "undefined" ? "artist" : localStorage.getItem("sonicbase-session") ? JSON.parse(localStorage.getItem("sonicbase-session") ?? "{}").role : "artist", []));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-72 flex-col border-r border-border bg-card/80 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sonicbase-logo-mark h-9 w-9",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground",
						children: "Sonicbase"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Dashboard"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 p-4",
					children: nav.map(({ label, path, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: path,
						className: "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
						}), label === "Logout" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					}, path))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						className: "w-full justify-between",
						onClick: onLogout,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 px-4 py-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: sidebarOpen,
							onOpenChange: setSidebarOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-[290px] border-r border-border bg-card p-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "sr-only",
										children: "Dashboard navigation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 border-b border-border px-5 py-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "sonicbase-logo-mark h-8 w-8",
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
											children: "Sonicbase"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: "Dashboard"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
										className: "space-y-1 p-4",
										children: nav.map(({ label, path, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: path,
											onClick: () => setSidebarOpen(false),
											className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
										}, path))
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
							children: "Overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight md:text-2xl",
							children: title
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 md:gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-2 md:flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: search,
									onChange: (event) => setSearch(event.target.value),
									placeholder: "Search",
									className: "h-8 w-32 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 md:w-52"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Notifications",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: onLogout,
								variant: "secondary",
								className: "hidden md:inline-flex",
								children: "Logout"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 border-t border-border px-4 py-3 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: subtitle
					}) }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: actions })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 p-4 md:p-6",
				children
			})]
		})]
	});
}
function TableCard({ columns, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "min-w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/70 text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: `px-4 py-3 font-medium ${column.align === "right" ? "text-right" : "text-left"}`,
						children: column.label
					}, column.key)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-t border-border align-middle",
					children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: `px-4 py-3 ${column.align === "right" ? "text-right" : "text-left"}`,
						children: row[column.key]
					}, `${index}-${column.key}`))
				}, index)) })]
			})
		})
	});
}
function EmptyState({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex justify-center",
				children: action
			})
		]
	});
}
function PanelGrid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
		children
	});
}
//#endregion
export { StatCard as a, formatMoney as c, SectionCard as i, EmptyState as n, StatusBadge as o, PanelGrid as r, TableCard as s, DashboardPage as t };
