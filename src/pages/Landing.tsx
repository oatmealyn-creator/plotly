import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Sprout, Camera, MessageCircle, Share2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

const HERO_IMG = "https://images.pexels.com/photos/5230900/pexels-photo-5230900.jpeg";

export default function Landing() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();
  const [storeName, setStoreName] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/dashboard";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}&name=${encodeURIComponent("Harvest Catalog")}&title=${encodeURIComponent("Harvest Catalog")}&app_name=${encodeURIComponent("Harvest Catalog")}&app=${encodeURIComponent("Harvest Catalog")}`;
  };

  if (!loading && user) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#2C332A]">
      {/* Top Bar */}
      <header className="px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="w-7 h-7 text-[#4A6741]" strokeWidth={1.5} />
          <span className="font-display text-2xl tracking-tight">Plotly</span>
        </div>
        <button
          data-testid="login-google-button-top"
          onClick={handleGoogleLogin}
          className="hidden sm:inline-flex items-center gap-2 bg-[#2C332A] text-[#F8F6F0] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4A6741] transition-colors"
        >
          Sign in with Google
        </button>
      </header>

      {/* Hero */}
      <section className="px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#8B9E7B] font-bold mb-6">
            For independent gardeners
          </div>
          <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            Grow what you love.
            <br />
            <span className="text-[#4A6741] italic font-normal">Sell it from your phone.</span>
          </h1>
          <p className="mt-8 text-lg text-[#5C665A] max-w-md leading-relaxed">
            Snap a photo, set a price, share your link. Customers order through WhatsApp — no
            apps, no fees, no friction.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              data-testid="login-google-button"
              onClick={handleGoogleLogin}
              className="inline-flex items-center justify-center gap-3 bg-[#4A6741] text-white px-7 py-4 rounded-full text-base font-medium hover:bg-[#3A5233] transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#fff" d="M21.35 11.1H12v3.2h5.35c-.23 1.23-.93 2.27-1.97 2.97v2.46h3.17c1.85-1.7 2.92-4.22 2.92-7.22 0-.74-.07-1.46-.2-2.16zM12 22c2.66 0 4.9-.88 6.53-2.39l-3.17-2.46c-.88.59-2 .94-3.36.94-2.59 0-4.78-1.75-5.57-4.1H3.16v2.55C4.78 19.85 8.11 22 12 22zm-5.57-9.45c-.2-.6-.31-1.23-.31-1.88s.11-1.28.31-1.88V6.24H3.16C2.42 7.72 2 9.34 2 11.07s.42 3.35 1.16 4.83l3.27-2.55zM12 5.5c1.46 0 2.76.5 3.79 1.49l2.81-2.81C16.9 2.6 14.66 1.5 12 1.5 8.11 1.5 4.78 3.65 3.16 6.84l3.27 2.55C7.22 7.25 9.41 5.5 12 5.5z"/></svg>
              Continue with Google
            </button>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 border border-[#2C332A] text-[#2C332A] px-7 py-4 rounded-full text-base font-medium hover:bg-[#F1EFE7] transition-colors"
            >
              See how it works
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden border border-[#E2DEC6] shadow-xl">
            <img
              src={HERO_IMG}
              alt="Gardener with potted plant"
              className="w-full h-[420px] sm:h-[520px] object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-white/40 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-lg text-[#2C332A]">Mango Sapling</div>
                  <div className="text-xs uppercase tracking-widest text-[#8B9E7B] mt-1">Plants</div>
                </div>
                <div className="text-2xl font-display text-[#4A6741]">$24</div>
              </div>
            </div>
            <div className="absolute top-6 left-6 bg-[#C8795A] text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold floaty">
              Live
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 sm:px-10 lg:px-16 py-20 border-t border-[#E2DEC6]">
        <div className="text-xs uppercase tracking-[0.3em] text-[#8B9E7B] font-bold mb-3">How it works</div>
        <h2 className="font-display text-4xl sm:text-5xl text-[#2C332A] max-w-xl leading-tight mb-16">
          From your backyard to their doorstep in four steps.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Camera, t: "Snap a photo", d: "Take a picture of any plant, pot or tool you have." },
            { icon: Sprout, t: "Set a price", d: "Add a name, price and category — done in seconds." },
            { icon: Share2, t: "Share your link", d: "Your storefront lives at plotly.app/g/your-name." },
            { icon: MessageCircle, t: "Get orders on WhatsApp", d: "Customers tap order — message lands in your chat." },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-[#E2DEC6] rounded-3xl p-7 card-hover"
            >
              <s.icon className="w-7 h-7 text-[#4A6741]" strokeWidth={1.5} />
              <div className="font-display text-xl mt-5 text-[#2C332A]">{s.t}</div>
              <div className="text-[#5C665A] mt-2 text-sm leading-relaxed">{s.d}</div>
              <div className="text-xs text-[#8B9E7B] uppercase tracking-widest mt-6">Step {String(i + 1).padStart(2, "0")}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-16 pb-24">
        <div className="bg-[#2C332A] text-[#F8F6F0] rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h3 className="font-display text-4xl sm:text-5xl leading-tight">
              Your garden, your store, your rules.
            </h3>
            <p className="mt-5 text-[#C4CFB9] text-lg">
              No setup fee. No commission. Just plant, post, and grow.
            </p>
            <button
              data-testid="login-google-button-cta"
              onClick={handleGoogleLogin}
              className="mt-8 bg-[#C8795A] text-white px-7 py-4 rounded-full font-medium hover:bg-[#b86a4d] transition-colors"
            >
              Start your storefront — it's free
            </button>
          </div>
          <Sprout className="absolute right-8 bottom-8 w-48 h-48 text-[#4A6741]/30" strokeWidth={0.6} />
        </div>
      </section>

      <footer className="px-6 sm:px-10 lg:px-16 py-8 border-t border-[#E2DEC6] text-sm text-[#5C665A]">
        © {new Date().getFullYear()} Plotly · Made with soil and sunlight.
      </footer>
    </div>
  );
}
