import { c as createComponent } from './astro-component_BXt5qASM.mjs';
import 'piccolore';
import { p as renderHead, q as renderSlot, k as renderTemplate } from './entrypoint_k72JWV-s.mjs';
import { clsx } from 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { createContext, useState, useCallback, useEffect, useContext, useRef, useMemo } from 'react';
import { Link, useNavigate, useParams, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, ArrowRight, Camera, Share2, MessageCircle, X, ChevronDown, ChevronUp, Check, Sparkles, Plus, Settings, LogOut, Copy, Pencil, Trash2, Minus, ShoppingBag } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import * as SelectPrimitive from '@radix-ui/react-select';

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Yaseen/Documents/vscode/plotly/src/layouts/Layout.astro", void 0);

const BACKEND_URL = typeof window !== "undefined" ? window.location.origin : "";
async function apiFetch(path, options = {}) {
  const sessionId = typeof window !== "undefined" ? localStorage.getItem("session_id") : null;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };
  if (sessionId) {
    headers["Authorization"] = `Bearer ${sessionId}`;
  }
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers
  });
  let data;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  if (!res.ok) {
    const err = new Error(data?.detail || `Request failed: ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return { data, status: res.status };
}

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const { data } = await apiFetch("/api/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  const logout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
    }
    localStorage.removeItem("session_id");
    setUser(null);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, setUser, loading, refresh, logout }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const HERO_IMG = "https://images.pexels.com/photos/5230900/pexels-photo-5230900.jpeg";
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("header", { className: "px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Sprout, { className: "w-7 h-7 text-primary", strokeWidth: 1.5 }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-2xl tracking-tight", children: "Plotly" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/login",
            className: "hidden sm:inline-flex items-center gap-2 border border-foreground text-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-secondary transition-colors",
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/register",
            className: "hidden sm:inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary transition-colors",
            children: "Get started"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-6 pb-20", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-6", children: "For independent gardeners" }),
            /* @__PURE__ */ jsxs("h1", { className: "font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight", children: [
              "Grow what you love.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-primary italic font-normal", children: "Sell it from your phone." })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 text-lg text-muted-foreground max-w-md leading-relaxed", children: "Snap a photo, set a price, share your link. Customers order through WhatsApp — no apps, no fees, no friction." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/register",
                  className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full text-base font-medium hover:bg-[#3A5233] transition-colors shadow-sm",
                  children: [
                    "Start your storefront ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#how",
                  className: "inline-flex items-center justify-center gap-2 border border-foreground text-foreground px-7 py-4 rounded-full text-base font-medium hover:bg-secondary transition-colors",
                  children: "See how it works"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.7, delay: 0.1 },
          className: "relative",
          children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-[2rem] overflow-hidden border border-border shadow-xl", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: HERO_IMG,
                alt: "Gardener with potted plant",
                className: "w-full h-[420px] sm:h-[520px] object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-x-6 bottom-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-white/40 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-display text-lg text-foreground", children: "Mango Sapling" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Plants" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-display text-primary", children: "$24" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 bg-accent text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold", children: "Live" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "how", className: "px-6 sm:px-10 lg:px-16 py-20 border-t border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-3", children: "How it works" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl sm:text-5xl text-foreground max-w-xl leading-tight mb-16", children: "From your backyard to their doorstep in four steps." }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        { icon: Camera, t: "Snap a photo", d: "Take a picture of any plant, pot or tool you have." },
        { icon: Sprout, t: "Set a price", d: "Add a name, price and category — done in seconds." },
        { icon: Share2, t: "Share your link", d: "Your storefront lives at plotly.app/g/your-name." },
        { icon: MessageCircle, t: "Get orders on WhatsApp", d: "Customers tap order — message lands in your chat." }
      ].map((s, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.08 },
          className: "bg-card border border-border rounded-3xl p-7 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsx(s.icon, { className: "w-7 h-7 text-primary", strokeWidth: 1.5 }),
            /* @__PURE__ */ jsx("div", { className: "font-display text-xl mt-5 text-foreground", children: s.t }),
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mt-2 text-sm leading-relaxed", children: s.d }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground uppercase tracking-widest mt-6", children: [
              "Step ",
              String(i + 1).padStart(2, "0")
            ] })
          ]
        },
        s.t
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 sm:px-10 lg:px-16 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "bg-foreground text-background rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-xl", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl sm:text-5xl leading-tight", children: "Your garden, your store, your rules." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-[#C4CFB9] text-lg", children: "No setup fee. No commission. Just plant, post, and grow." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/register",
            className: "inline-block mt-8 bg-accent text-white px-7 py-4 rounded-full font-medium hover:bg-[#b86a4d] transition-colors",
            children: "Start your storefront — it's free"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Sprout, { className: "absolute right-8 bottom-8 w-48 h-48 text-primary/30", strokeWidth: 0.6 })
    ] }) }),
    /* @__PURE__ */ jsxs("footer", { className: "px-6 sm:px-10 lg:px-16 py-8 border-t border-border text-sm text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Plotly · Made with soil and sunlight."
    ] })
  ] });
}

function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const { data } = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (data.session_id) {
        localStorage.setItem("session_id", data.session_id);
      }
      setUser(data.user);
      toast.success("Welcome back!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center p-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-12", children: [
      /* @__PURE__ */ jsx(Sprout, { className: "w-7 h-7 text-primary", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("span", { className: "font-display text-2xl tracking-tight text-foreground", children: "Plotly" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-foreground text-center", children: "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm text-center mt-2", children: "Sign in to your garden storefront" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-xs uppercase tracking-widest text-muted-foreground font-medium", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "mt-1 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
              placeholder: "gardener@example.com",
              "data-testid": "login-email-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "text-xs uppercase tracking-widest text-muted-foreground font-medium", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "mt-1 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
              placeholder: "••••••••",
              "data-testid": "login-password-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium hover:bg-[#3A5233] disabled:opacity-50 transition-colors",
            "data-testid": "login-submit-button",
            children: loading ? "Signing in…" : "Sign in"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground text-center mt-8", children: [
        "Don't have a storefront?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-primary underline underline-offset-4 hover:text-[#3A5233]", children: "Create one" })
      ] })
    ] })
  ] });
}

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { data } = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      if (data.session_id) {
        localStorage.setItem("session_id", data.session_id);
      }
      setUser(data.user);
      toast.success("Storefront created!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center p-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-12", children: [
      /* @__PURE__ */ jsx(Sprout, { className: "w-7 h-7 text-primary", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("span", { className: "font-display text-2xl tracking-tight text-foreground", children: "Plotly" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-foreground text-center", children: "Start growing" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm text-center mt-2", children: "Create your free storefront" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "text-xs uppercase tracking-widest text-muted-foreground font-medium", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "mt-1 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
              placeholder: "Your name",
              "data-testid": "register-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-xs uppercase tracking-widest text-muted-foreground font-medium", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "mt-1 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
              placeholder: "gardener@example.com",
              "data-testid": "register-email-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "text-xs uppercase tracking-widest text-muted-foreground font-medium", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "mt-1 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
              placeholder: "At least 6 characters",
              "data-testid": "register-password-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium hover:bg-[#3A5233] disabled:opacity-50 transition-colors",
            "data-testid": "register-submit-button",
            children: loading ? "Creating…" : "Create storefront"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground text-center mt-8", children: [
        "Already have a storefront?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary underline underline-offset-4 hover:text-[#3A5233]", children: "Sign in" })
      ] })
    ] })
  ] });
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-border bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("px-2 py-1.5 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const CATEGORIES$2 = ["Plants", "Pots", "Tools", "Seeds", "Accessories"];
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function AddItemModal({
  open,
  onOpenChange,
  onCreated,
  editingItem
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Plants");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [imageB64, setImageB64] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [aiConfidence, setAiConfidence] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);
  useEffect(() => {
    if (open) {
      if (editingItem) {
        setName(editingItem.name || "");
        setPrice(String(editingItem.price ?? ""));
        setCategory(editingItem.category || "Plants");
        setDescription(editingItem.description || "");
        setStock(editingItem.stock ?? 1);
        setImageB64(editingItem.image_base64 || "");
        setAiConfidence(null);
      } else {
        setName("");
        setPrice("");
        setCategory("Plants");
        setDescription("");
        setStock(1);
        setImageB64("");
        setAiConfidence(null);
      }
    }
  }, [open, editingItem]);
  const handlePickImage = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const b64 = await fileToBase64(f);
    setImageB64(b64);
    setDetecting(true);
    setAiConfidence(null);
    try {
      const { data } = await apiFetch(
        "/api/ai/detect-plant",
        { method: "POST", body: JSON.stringify({ image_base64: b64 }) }
      );
      setAiConfidence(data.confidence);
      if (data.confidence !== "low" && data.name) {
        setName(data.name);
        if (data.category) setCategory(data.category);
        if (data.description) setDescription(data.description);
        toast.success(`AI detected: ${data.name}`);
      } else {
        toast.message("Couldn't identify confidently — please type the name.");
      }
    } catch {
      toast.error("AI detection failed — type the details manually.");
    } finally {
      setDetecting(false);
    }
  };
  const handleSave = async () => {
    if (!name.trim() || !price) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        price: parseFloat(price),
        category,
        description,
        stock: parseInt(String(stock), 10) || 1,
        image_base64: imageB64
      };
      if (editingItem) {
        const { data } = await apiFetch(`/api/items/${editingItem.item_id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        onCreated(data, "update");
        toast.success("Updated");
      } else {
        const { data } = await apiFetch("/api/items", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        onCreated(data, "create");
        toast.success("Added to your garden");
      }
      onOpenChange(false);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg bg-background border-border", "data-testid": "add-item-modal", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-2xl text-foreground", children: editingItem ? "Edit item" : "Add a new item" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "image/*",
          capture: "environment",
          onChange: handlePickImage,
          className: "hidden",
          "data-testid": "upload-photo-input"
        }
      ),
      !imageB64 ? /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => fileRef.current?.click(),
          className: "w-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-10 bg-card text-muted-foreground hover:bg-secondary transition-colors",
          "data-testid": "upload-trigger",
          children: [
            /* @__PURE__ */ jsx(Camera, { className: "w-8 h-8 mb-3 text-primary", strokeWidth: 1.5 }),
            /* @__PURE__ */ jsx("div", { className: "font-display text-lg text-foreground", children: "Take or upload a photo" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "We'll try to identify it for you" })
          ]
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-border", children: [
        /* @__PURE__ */ jsx("img", { src: imageB64, alt: "preview", className: "w-full h-56 object-cover" }),
        detecting && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 animate-pulse opacity-70 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setImageB64("");
              setAiConfidence(null);
            },
            className: "absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80",
            "aria-label": "Remove photo",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        ),
        aiConfidence && /* @__PURE__ */ jsxs("div", { className: `absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${aiConfidence === "high" ? "bg-primary text-primary-foreground" : aiConfidence === "medium" ? "bg-accent text-white" : "bg-white/90 text-foreground border border-border"}`, children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "inline w-3 h-3 mr-1" }),
          " AI ",
          aiConfidence
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 mt-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Name" }),
        /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Mango Sapling", className: "bg-card mt-1", "data-testid": "item-name-input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Price ($)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: "0", step: "0.01", value: price, onChange: (e) => setPrice(e.target.value), placeholder: "24", className: "bg-card mt-1", "data-testid": "item-price-input" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Stock" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: "0", value: stock, onChange: (e) => setStock(Number(e.target.value)), className: "bg-card mt-1", "data-testid": "item-stock-input" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Category" }),
        /* @__PURE__ */ jsxs(Select, { value: category, onValueChange: setCategory, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-card mt-1", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: CATEGORIES$2.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Healthy, 2-foot sapling. Grown without pesticides.", className: "bg-card mt-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onOpenChange(false),
          className: "flex-1 border border-foreground text-foreground rounded-xl py-3 font-medium hover:bg-secondary",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          disabled: saving || detecting,
          className: "flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-medium hover:bg-[#3A5233] disabled:opacity-50",
          "data-testid": "save-item-button",
          children: saving ? "Saving…" : editingItem ? "Update" : "Add to garden"
        }
      )
    ] })
  ] }) });
}

const CATEGORIES$1 = ["All", "Plants", "Pots", "Tools", "Seeds", "Accessories"];
function Dashboard() {
  const { user, refresh, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState("All");
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const fetchItems = async () => {
    try {
      const { data } = await apiFetch("/api/items");
      setItems(data);
    } catch {
      toast.error("Couldn't load your items");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const handleCreated = (item, mode) => {
    if (mode === "create") setItems((s) => [item, ...s]);
    else setItems((s) => s.map((i) => i.item_id === item.item_id ? item : i));
    setEditingItem(null);
  };
  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await apiFetch(`/api/items/${item.item_id}`, { method: "DELETE" });
      setItems((s) => s.filter((i) => i.item_id !== item.item_id));
      toast.success("Removed");
    } catch {
      toast.error("Delete failed");
    }
  };
  const storefrontUrl = user ? `${window.location.origin}/g/${user.username || user.user_id}` : "";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(storefrontUrl);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "px-5 sm:px-10 py-4 flex items-center justify-between max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Sprout, { className: "w-6 h-6 text-primary", strokeWidth: 1.5 }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-xl text-foreground", children: "Plotly" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingItem(null);
              setShowAdd(true);
            },
            className: "hidden sm:inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full font-medium hover:bg-[#3A5233] transition-colors mr-2",
            "data-testid": "header-add-button",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              " Add Item"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowSettings(true),
            className: "p-2.5 rounded-full hover:bg-secondary",
            "aria-label": "Settings",
            children: /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5 text-foreground" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: logout,
            className: "p-2.5 rounded-full hover:bg-secondary",
            "aria-label": "Logout",
            children: /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5 text-foreground" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "px-5 sm:px-10 max-w-7xl mx-auto pb-32", children: [
      /* @__PURE__ */ jsxs("section", { className: "pt-8 pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2", children: "Your garden" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-4xl sm:text-5xl text-foreground", "data-testid": "dashboard-heading", children: [
          "Hi ",
          user?.name?.split(" ")[0] || "gardener",
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 max-w-2xl", children: [
          /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Your link" }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-sm text-foreground truncate flex-1 min-w-0", "data-testid": "storefront-link-text", children: storefrontUrl }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: copyLink,
              className: "inline-flex items-center gap-1.5 bg-foreground text-background text-xs px-3 py-2 rounded-full hover:bg-primary transition-colors",
              children: [
                copied ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
                copied ? "Copied" : "Copy"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: storefrontUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-xs text-primary underline underline-offset-4 hover:text-[#3A5233]",
              children: "View"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar py-3 -mx-5 px-5", children: CATEGORIES$1.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilter(c),
          "data-testid": `filter-${c.toLowerCase()}`,
          className: `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === c ? "bg-foreground text-background" : "bg-card border border-border text-muted-foreground hover:border-[#8B9E7B]"}`,
          children: c
        },
        c
      )) }),
      /* @__PURE__ */ jsx("section", { className: "mt-6", children: loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl h-56 bg-secondary animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-card border border-dashed border-border rounded-3xl p-12 text-center mt-4", children: [
        /* @__PURE__ */ jsx(Sprout, { className: "w-10 h-10 text-primary mx-auto mb-3", strokeWidth: 1.5 }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-2xl text-foreground", children: "Your garden is quiet." }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mt-2", children: "Add your first plant, pot or tool." }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingItem(null);
              setShowAdd(true);
            },
            className: "mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-[#3A5233]",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              " Add your first item"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { children: filtered.map((item, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, scale: 0.96 },
          transition: { duration: 0.35, delay: i * 0.03 },
          className: "bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow",
          "data-testid": `item-card-${item.item_id}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "aspect-square bg-secondary relative", children: [
              item.image_base64 ? /* @__PURE__ */ jsx("img", { src: item.image_base64, alt: item.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(Sprout, { className: "w-10 h-10", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 bg-white/90 text-muted-foreground text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full", children: item.category })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-display text-base text-foreground truncate", children: item.name }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Stock: ",
                    item.stock
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "font-display text-lg text-primary", children: [
                  "$",
                  item.price
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setEditingItem(item);
                      setShowAdd(true);
                    },
                    className: "flex-1 inline-flex items-center justify-center gap-1 text-xs border border-border rounded-lg py-1.5 hover:bg-secondary",
                    children: [
                      /* @__PURE__ */ jsx(Pencil, { className: "w-3 h-3" }),
                      " Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(item),
                    className: "inline-flex items-center justify-center gap-1 text-xs text-destructive border border-border rounded-lg py-1.5 px-2 hover:bg-[#FCEFEC]",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ] })
            ] })
          ]
        },
        item.item_id
      )) }) }) })
    ] }),
    items.length > 0 && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          setEditingItem(null);
          setShowAdd(true);
        },
        className: "sm:hidden fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-[#3A5233] transition-transform active:scale-95",
        "aria-label": "Add item",
        children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" })
      }
    ),
    /* @__PURE__ */ jsx(
      AddItemModal,
      {
        open: showAdd,
        onOpenChange: (v) => {
          setShowAdd(v);
          if (!v) setEditingItem(null);
        },
        onCreated: handleCreated,
        editingItem
      }
    ),
    /* @__PURE__ */ jsx(
      SettingsModal,
      {
        open: showSettings,
        onOpenChange: setShowSettings,
        user,
        onSaved: refresh
      }
    )
  ] });
}
function SettingsModal({ open, onOpenChange, user, onSaved }) {
  const [storeName, setStoreName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open && user) {
      setStoreName(user.store_name || "");
      setUsername(user.username || "");
      setBio(user.bio || "");
      setWhatsapp(user.whatsapp_number || "");
    }
  }, [open, user]);
  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch("/api/profile/me", {
        method: "PUT",
        body: JSON.stringify({
          store_name: storeName,
          username,
          bio,
          whatsapp_number: whatsapp
        })
      });
      toast.success("Saved");
      await onSaved();
      onOpenChange(false);
    } catch (err) {
      const detail = err?.data?.detail || "Save failed";
      toast.error(detail);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-background border-border", "data-testid": "settings-modal", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-2xl", children: "Store settings" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Store name" }),
        /* @__PURE__ */ jsx(Input, { value: storeName, onChange: (e) => setStoreName(e.target.value), className: "bg-card mt-1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Username (URL slug)" }),
        /* @__PURE__ */ jsx(Input, { value: username, onChange: (e) => setUsername(e.target.value), className: "bg-card mt-1" }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
          "plotly.app/g/",
          username || "your-name"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "WhatsApp number (with country code)" }),
        /* @__PURE__ */ jsx(Input, { value: whatsapp, onChange: (e) => setWhatsapp(e.target.value), placeholder: "+919876543210", className: "bg-card mt-1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Bio" }),
        /* @__PURE__ */ jsx(Textarea, { value: bio, onChange: (e) => setBio(e.target.value), placeholder: "Backyard gardener since 2018. Organic, hand-grown.", className: "bg-card mt-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSave,
        disabled: saving,
        className: "bg-primary text-primary-foreground rounded-xl py-3 font-medium hover:bg-[#3A5233] disabled:opacity-50 mt-2",
        children: saving ? "Saving…" : "Save changes"
      }
    )
  ] }) });
}

const CATEGORIES = ["All", "Plants", "Pots", "Tools", "Seeds", "Accessories"];
function Storefront() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const [filter, setFilter] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const { data: res } = await apiFetch(
          `/api/storefront/${username}`
        );
        setData(res);
      } catch (e) {
        setError(e?.data?.detail || "Storefront not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);
  const itemMap = useMemo(() => {
    const m = {};
    (data?.items || []).forEach((i) => m[i.item_id] = i);
    return m;
  }, [data]);
  const cartLines = Object.entries(cart).filter(([, q]) => q > 0).map(([id, qty]) => ({ item: itemMap[id], qty })).filter((l) => l.item);
  const totalQty = cartLines.reduce((s, l) => s + l.qty, 0);
  const totalPrice = cartLines.reduce((s, l) => s + l.qty * l.item.price, 0);
  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));
  const checkoutWhatsApp = () => {
    if (cartLines.length === 0 || !data) return;
    const wa = (data.profile.whatsapp_number || "").replace(/[^\d+]/g, "");
    if (!wa) {
      toast.error("This gardener hasn't set up WhatsApp yet.");
      return;
    }
    const lines = cartLines.map((l) => `• ${l.qty} × ${l.item.name} — $${(l.item.price * l.qty).toFixed(2)}`).join("\n");
    const text = `Hi ${data.profile.name || ""}! I'd like to order from ${data.profile.store_name || "your garden"}:

${lines}

Total: $${totalPrice.toFixed(2)}

Link: ${window.location.href}`;
    const url = `https://wa.me/${wa.replace(/^\+/, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-muted-foreground font-display", children: "Loading…" });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center", children: [
      /* @__PURE__ */ jsx(Sprout, { className: "w-12 h-12 text-primary mb-4", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("div", { className: "font-display text-3xl text-foreground", children: "Nothing growing here." }),
      /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mt-2", children: error })
    ] });
  }
  const profile = data.profile;
  const items = data.items || [];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background pb-32", children: [
    /* @__PURE__ */ jsxs("header", { className: "bg-foreground text-background px-6 sm:px-10 lg:px-16 pt-10 pb-16 sm:pb-20 rounded-b-[2rem] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold", children: "Storefront" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-6xl mt-3 leading-none", "data-testid": "storefront-title", children: profile.store_name || profile.name }),
        profile.bio && /* @__PURE__ */ jsx("p", { className: "mt-5 text-[#C4CFB9] text-base sm:text-lg max-w-xl leading-relaxed", children: profile.bio }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-3 text-sm text-[#C4CFB9]", children: [
          profile.picture ? /* @__PURE__ */ jsx("img", { src: profile.picture, alt: "", className: "w-9 h-9 rounded-full border border-primary" }) : /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(Sprout, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Grown by ",
            profile.name
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Sprout, { className: "absolute -right-8 -bottom-8 w-64 h-64 text-primary/30", strokeWidth: 0.6 })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "px-5 sm:px-10 max-w-6xl mx-auto -mt-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar py-2", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilter(c),
          "data-testid": `store-filter-${c.toLowerCase()}`,
          className: `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-[#8B9E7B]"}`,
          children: c
        },
        c
      )) }),
      filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-card border border-dashed border-border rounded-3xl p-12 text-center mt-8", children: [
        /* @__PURE__ */ jsx(Sprout, { className: "w-10 h-10 text-primary mx-auto mb-3", strokeWidth: 1.5 }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-xl text-foreground", children: "No items in this category yet." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6", children: filtered.map((item, i) => {
        const qty = cart[item.item_id] || 0;
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: i * 0.03 },
            className: "bg-card border border-border rounded-3xl overflow-hidden hover:shadow-md transition-shadow",
            "data-testid": `product-card-${item.item_id}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "aspect-square bg-secondary relative", children: [
                item.image_base64 ? /* @__PURE__ */ jsx("img", { src: item.image_base64, alt: item.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(Sprout, { className: "w-12 h-12", strokeWidth: 1.5 }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 bg-white/90 text-muted-foreground text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full", children: item.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("div", { className: "font-display text-lg text-foreground truncate", children: item.name }),
                    item.description && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: item.description })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "font-display text-xl text-primary flex-shrink-0", children: [
                    "$",
                    item.price
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-4", children: qty === 0 ? /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => addToCart(item.item_id),
                    className: "w-full bg-foreground text-background rounded-full py-2.5 text-sm font-medium hover:bg-primary transition-colors inline-flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                      " Add to order"
                    ]
                  }
                ) : /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-secondary rounded-full p-1", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeFromCart(item.item_id),
                      className: "w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center",
                      "aria-label": "Decrease",
                      children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "font-display text-lg", children: qty }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => addToCart(item.item_id),
                      className: "w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center",
                      "aria-label": "Increase",
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ] })
            ]
          },
          item.item_id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: totalQty > 0 && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: 80, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 80, opacity: 0 },
        transition: { duration: 0.3 },
        className: "fixed bottom-0 left-0 right-0 z-40",
        children: /* @__PURE__ */ jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto bg-card border border-border rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3 backdrop-blur-xl", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setCartOpen(true),
              className: "flex items-center gap-3 flex-1 text-left",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-secondary rounded-2xl w-12 h-12 flex items-center justify-center relative", children: [
                  /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold", children: totalQty })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Your order" }),
                  /* @__PURE__ */ jsxs("div", { className: "font-display text-lg text-foreground", children: [
                    "$",
                    totalPrice.toFixed(2)
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: checkoutWhatsApp,
              className: "bg-[#25D366] text-white px-5 py-3 rounded-2xl font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Order on WhatsApp" }),
                /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Order" })
              ]
            }
          )
        ] }) })
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: cartOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-6",
        onClick: () => setCartOpen(false),
        "data-testid": "cart-drawer",
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { y: 100 },
            animate: { y: 0 },
            exit: { y: 100 },
            onClick: (e) => e.stopPropagation(),
            className: "bg-background rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "font-display text-2xl text-foreground", children: "Your order" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setCartOpen(false), className: "p-2 rounded-full hover:bg-secondary", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-80 overflow-y-auto", children: cartLines.map((l) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-card border border-border rounded-2xl p-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-secondary overflow-hidden flex-shrink-0", children: l.item.image_base64 && /* @__PURE__ */ jsx("img", { src: l.item.image_base64, className: "w-full h-full object-cover", alt: "" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-display text-base text-foreground truncate", children: l.item.name }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    "$",
                    l.item.price,
                    " × ",
                    l.qty
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("button", { onClick: () => removeFromCart(l.item.item_id), className: "w-7 h-7 rounded-full border border-border flex items-center justify-center", children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" }) }),
                  /* @__PURE__ */ jsx("div", { className: "w-6 text-center font-medium", children: l.qty }),
                  /* @__PURE__ */ jsx("button", { onClick: () => addToCart(l.item.item_id), className: "w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center", children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }) })
                ] })
              ] }, l.item.item_id)) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-5 pt-4 border-t border-border", children: [
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Total" }),
                /* @__PURE__ */ jsxs("div", { className: "font-display text-2xl text-foreground", children: [
                  "$",
                  totalPrice.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: checkoutWhatsApp,
                  className: "w-full mt-5 bg-[#25D366] text-white px-5 py-4 rounded-2xl font-medium inline-flex items-center justify-center gap-2 hover:opacity-90",
                  children: [
                    /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                    " Send order on WhatsApp"
                  ]
                }
              )
            ]
          }
        )
      }
    ) })
  ] });
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground font-display text-lg", children: "Loading…" }) });
  }
  if (!user) return null;
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground font-display text-lg", children: "Loading…" }) });
  }
  if (user) return null;
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function AppContent() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(Landing, {}) }) }),
    /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(Login, {}) }) }),
    /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(GuestRoute, { children: /* @__PURE__ */ jsx(Register, {}) }) }),
    /* @__PURE__ */ jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Dashboard, {}) }) }),
    /* @__PURE__ */ jsx(Route, { path: "/g/:username", element: /* @__PURE__ */ jsx(Storefront, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) })
  ] });
}
function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground font-display text-lg", children: "Loading…" }) });
  }
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(AppContent, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true })
  ] }) });
}

function AppShell() {
  return /* @__PURE__ */ jsx(App, {});
}

export { $$Layout as $, AppShell as A };
