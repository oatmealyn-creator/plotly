import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Plus, Minus, MessageCircle, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ["All", "Plants", "Pots", "Tools", "Seeds", "Accessories"];

export default function Storefront() {
  const { username } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/storefront/${username}`);
        setData(res.data);
      } catch (e) {
        setError(e?.response?.data?.detail || "Storefront not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const itemMap = useMemo(() => {
    const m: Record<string, any> = {};
    (data?.items || []).forEach((i: any) => (m[i.item_id] = i));
    return m;
  }, [data]);

  const cartLines = (Object.entries(cart) as [string, number][])
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ item: itemMap[id], qty: q }))
    .filter((l) => l.item);

  const totalQty = cartLines.reduce((s, l: any) => s + l.qty, 0);
  const totalPrice = cartLines.reduce((s, l: any) => s + l.qty * l.item.price, 0);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));

  const checkoutWhatsApp = () => {
    if (cartLines.length === 0) return;
    const wa = (data?.profile?.whatsapp_number || "").replace(/[^\d+]/g, "");
    if (!wa) {
      toast.error("This gardener hasn't set up WhatsApp yet.");
      return;
    }
    const lines = cartLines
      .map((l) => `• ${l.qty} × ${l.item.name} — $${(l.item.price * l.qty).toFixed(2)}`)
      .join("\n");
    const text =
      `Hi ${data.profile.name || ""}! I'd like to order from ${data.profile.store_name || "your garden"}:\n\n` +
      `${lines}\n\nTotal: $${totalPrice.toFixed(2)}\n\nLink: ${window.location.href}`;
    const url = `https://wa.me/${wa.replace(/^\+/, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F0] text-[#5C665A] font-display">Loading…</div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F0] p-6 text-center">
        <Sprout className="w-12 h-12 text-[#4A6741] mb-4" strokeWidth={1.5} />
        <div className="font-display text-3xl text-[#2C332A]">Nothing growing here.</div>
        <div className="text-[#5C665A] mt-2">{error}</div>
      </div>
    );
  }

  const profile = data.profile;
  const items = data.items || [];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="min-h-screen bg-[#F8F6F0] pb-32">
      {/* Hero */}
      <header className="bg-[#2C332A] text-[#F8F6F0] px-6 sm:px-10 lg:px-16 pt-10 pb-16 sm:pb-20 rounded-b-[2rem] relative overflow-hidden">
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8B9E7B] font-bold">Storefront</div>
          <h1 className="font-display text-4xl sm:text-6xl mt-3 leading-none" data-testid="storefront-title">
            {profile.store_name || profile.name}
          </h1>
          {profile.bio && (
            <p className="mt-5 text-[#C4CFB9] text-base sm:text-lg max-w-xl leading-relaxed">{profile.bio}</p>
          )}
          <div className="mt-6 flex items-center gap-3 text-sm text-[#C4CFB9]">
            {profile.picture ? (
              <img src={profile.picture} alt="" className="w-9 h-9 rounded-full border border-[#4A6741]" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#4A6741] flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
            )}
            <span>Grown by {profile.name}</span>
          </div>
        </div>
        <Sprout className="absolute -right-8 -bottom-8 w-64 h-64 text-[#4A6741]/30" strokeWidth={0.6} />
      </header>

      <main className="px-5 sm:px-10 max-w-6xl mx-auto -mt-8">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`store-filter-${c.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === c
                  ? "bg-[#4A6741] text-white"
                  : "bg-white border border-[#E2DEC6] text-[#5C665A] hover:border-[#8B9E7B]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-dashed border-[#8B9E7B] rounded-3xl p-12 text-center mt-8">
            <Sprout className="w-10 h-10 text-[#4A6741] mx-auto mb-3" strokeWidth={1.5} />
            <div className="font-display text-xl text-[#2C332A]">No items in this category yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filtered.map((item, i) => {
              const qty = cart[item.item_id] || 0;
              return (
                <motion.div
                  key={item.item_id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="bg-white border border-[#E2DEC6] rounded-3xl overflow-hidden card-hover"
                  data-testid={`product-card-${item.item_id}`}
                >
                  <div className="aspect-square bg-[#F1EFE7] relative">
                    {item.image_base64 ? (
                      <img src={item.image_base64} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8B9E7B]">
                        <Sprout className="w-12 h-12" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 text-[#5C665A] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-display text-lg text-[#2C332A] truncate">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-[#5C665A] mt-1 line-clamp-2">{item.description}</div>
                        )}
                      </div>
                      <div className="font-display text-xl text-[#4A6741] flex-shrink-0">${item.price}</div>
                    </div>
                    <div className="mt-4">
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item.item_id)}
                          data-testid={`add-to-cart-${item.item_id}`}
                          className="w-full bg-[#2C332A] text-white rounded-full py-2.5 text-sm font-medium hover:bg-[#4A6741] transition-colors inline-flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Add to order
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-[#F1EFE7] rounded-full p-1">
                          <button
                            onClick={() => removeFromCart(item.item_id)}
                            data-testid={`decrease-${item.item_id}`}
                            className="w-9 h-9 rounded-full bg-white border border-[#E2DEC6] flex items-center justify-center"
                            aria-label="Decrease"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="font-display text-lg" data-testid={`qty-${item.item_id}`}>{qty}</div>
                          <button
                            onClick={() => addToCart(item.item_id)}
                            data-testid={`increase-${item.item_id}`}
                            className="w-9 h-9 rounded-full bg-[#4A6741] text-white flex items-center justify-center"
                            aria-label="Increase"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Sticky cart bar */}
      <AnimatePresence>
        {totalQty > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40"
          >
            <div className="px-4 pb-4">
              <div className="max-w-4xl mx-auto bg-white border border-[#E2DEC6] rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3 backdrop-blur-xl">
                <button
                  onClick={() => setCartOpen(true)}
                  data-testid="open-cart-button"
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  <div className="bg-[#F1EFE7] rounded-2xl w-12 h-12 flex items-center justify-center relative">
                    <ShoppingBag className="w-5 h-5 text-[#4A6741]" />
                    <span className="absolute -top-1 -right-1 bg-[#C8795A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalQty}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#8B9E7B]">Your order</div>
                    <div className="font-display text-lg text-[#2C332A]">${totalPrice.toFixed(2)}</div>
                  </div>
                </button>
                <button
                  onClick={checkoutWhatsApp}
                  data-testid="whatsapp-checkout-button"
                  className="bg-[#25D366] text-white px-5 py-3 rounded-2xl font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Order on WhatsApp</span>
                  <span className="sm:hidden">Order</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
            onClick={() => setCartOpen(false)}
            data-testid="cart-drawer"
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F6F0] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-display text-2xl">Your order</div>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-[#F1EFE7]" data-testid="close-cart-button">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {cartLines.map((l) => (
                  <div key={l.item.item_id} className="flex items-center gap-3 bg-white border border-[#E2DEC6] rounded-2xl p-3">
                    <div className="w-14 h-14 rounded-xl bg-[#F1EFE7] overflow-hidden flex-shrink-0">
                      {l.item.image_base64 && <img src={l.item.image_base64} className="w-full h-full object-cover" alt="" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-base truncate">{l.item.name}</div>
                      <div className="text-xs text-[#8B9E7B]">${l.item.price} × {l.qty}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => removeFromCart(l.item.item_id)} className="w-7 h-7 rounded-full border border-[#E2DEC6] flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <div className="w-6 text-center font-medium">{l.qty}</div>
                      <button onClick={() => addToCart(l.item.item_id)} className="w-7 h-7 rounded-full bg-[#4A6741] text-white flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E2DEC6]">
                <div className="text-[#5C665A]">Total</div>
                <div className="font-display text-2xl text-[#2C332A]">${totalPrice.toFixed(2)}</div>
              </div>
              <button
                onClick={checkoutWhatsApp}
                data-testid="cart-whatsapp-button"
                className="w-full mt-5 bg-[#25D366] text-white px-5 py-4 rounded-2xl font-medium inline-flex items-center justify-center gap-2 hover:opacity-90"
              >
                <MessageCircle className="w-5 h-5" /> Send order on WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
