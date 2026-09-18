import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Input, r as cn, t as Button } from "./input-DHehfD_4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-5D8HRS-f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function ContactPage() {
	const [topic, setTopic] = (0, import_react.useState)(null);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		if (!topic || !data.get("name") || !data.get("email") || !data.get("message")) {
			setError("Please complete every field and choose a topic.");
			return;
		}
		setError("");
		setSent(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "min-h-[680px] bg-primary px-4 py-16 text-primary-foreground md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-title text-center text-4xl sm:text-6xl",
				children: "Get in touch"
			}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-[7px] border border-primary-foreground/25 p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold",
						children: "Message received."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-primary-foreground/65",
						children: "Our team will get back to you soon."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "mt-6",
						onClick: () => setSent(false),
						children: "Send another"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-10 rounded-[7px] border border-primary-foreground/25 p-5 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "mb-4 text-lg",
						children: "What do you need?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: [
							"General",
							"Artist submissions",
							"Press & partnerships",
							"Licensing request"
						].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: topic === x ? "secondary" : "outline",
							className: topic === x ? "justify-start" : "justify-start border-primary-foreground/25 bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary",
							onClick: () => setTopic(x),
							children: x
						}, x))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								placeholder: "Name",
								"aria-label": "Name",
								className: "h-10 border-primary-foreground/25 text-primary-foreground placeholder:text-primary-foreground/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								placeholder: "Email",
								"aria-label": "Email",
								className: "h-10 border-primary-foreground/25 text-primary-foreground placeholder:text-primary-foreground/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "message",
								placeholder: "Tell us a little more",
								"aria-label": "Message",
								className: "min-h-32 border-primary-foreground/25 text-primary-foreground placeholder:text-primary-foreground/50"
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "mt-5 w-full",
						children: "Send inquiry"
					})
				]
			})]
		})
	});
}
//#endregion
export { ContactPage as component };
