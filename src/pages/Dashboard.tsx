import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Plus, Share2, LogOut, Settings, Pencil, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import AddItemModal from "@/components/AddItemModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = ["All", "Plants", "Pots", "Tools", "Seeds", "Accessories"];

export default function Dashboard() {
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
      const { data } = await api.get("/items");
      setItems(data);
    } catch {
      toast.error("Couldn't load your items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreated = (item, mode) => {
    if (mode === "create") setItems((s) => [item, ...s]);
    else setItems((s) => s.map((i) => (i.item_id === item.item_id ? item : i)));
    setEditingItem(null);
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await api.delete(`/items/${item.item_id}`);
      setItems((s) => s.filter((i) => i.item_id !== item.item_id));
      toast.success("Removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  const storefrontUrl = user ? `${window.location.origin}/g/${user.username}` : "";

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

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E2DEC6]">
        <div className="px-5 sm:px-10 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-[#4A6741]" strokeWidth={1.5} />
            <span className="font-display text-xl">Plotly</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setEditingItem(null); setShowAdd(true); }}
              data-testid="header-add-button"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#4A6741] text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-[#3A5233] transition-colors mr-2"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
            <button
              onClick={() => setShowSettings(true)}
              data-testid="settings-button"
              className="p-2.5 rounded-full hover:bg-[#F1EFE7]"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-[#2C332A]" />
            </button>
            <button
              onClick={logout}
              data-testid="logout-button"
              className="p-2.5 rounded-full hover:bg-[#F1EFE7]"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-[#2C332A]" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 sm:px-10 max-w-7xl mx-auto pb-32">
        {/* Hello + storefront link */}
        <section className="pt-8 pb-6">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8B9E7B] font-bold mb-2">Your garden</div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#2C332A]" data-testid="dashboard-heading">
            Hi {user?.name?.split(" ")[0] || "gardener"}.
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 bg-white border border-[#E2DEC6] rounded-2xl px-4 py-3 max-w-2xl">
            <Share2 className="w-4 h-4 text-[#4A6741] flex-shrink-0" />
            <div className="text-xs uppercase tracking-widest text-[#8B9E7B]">Your link</div>
            <div className="font-mono text-sm text-[#2C332A] truncate flex-1 min-w-0" data-testid="storefront-link-text">
              {storefrontUrl}
            </div>
            <button
              onClick={copyLink}
              data-testid="copy-link-button"
              className="inline-flex items-center gap-1.5 bg-[#2C332A] text-white text-xs px-3 py-2 rounded-full hover:bg-[#4A6741] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={`/g/${user?.username}`}
              target="_blank"
              rel="noreferrer"
              data-testid="view-storefront-link"
              className="text-xs text-[#4A6741] underline underline-offset-4 hover:text-[#3A5233]"
            >
              View
            </a>
          </div>
        </section>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-3 -mx-5 px-5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`filter-${c.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === c
                  ? "bg-[#2C332A] text-white"
                  : "bg-white border border-[#E2DEC6] text-[#5C665A] hover:border-[#8B9E7B]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <section className="mt-6">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="ai-shimmer rounded-2xl h-56" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-dashed border-[#8B9E7B] rounded-3xl p-12 text-center mt-4">
              <Sprout className="w-10 h-10 text-[#4A6741] mx-auto mb-3" strokeWidth={1.5} />
              <div className="font-display text-2xl text-[#2C332A]">Your garden is quiet.</div>
              <div className="text-[#5C665A] mt-2">Add your first plant, pot or tool.</div>
              <button
                onClick={() => { setEditingItem(null); setShowAdd(true); }}
                data-testid="empty-state-add-button"
                className="mt-6 inline-flex items-center gap-2 bg-[#4A6741] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3A5233]"
              >
                <Plus className="w-4 h-4" /> Add your first item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.item_id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="bg-white border border-[#E2DEC6] rounded-2xl overflow-hidden card-hover"
                    data-testid={`item-card-${item.item_id}`}
                  >
                    <div className="aspect-square bg-[#F1EFE7] relative">
                      {item.image_base64 ? (
                        <img src={item.image_base64} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8B9E7B]">
                          <Sprout className="w-10 h-10" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-white/90 text-[#5C665A] text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-display text-base text-[#2C332A] truncate">{item.name}</div>
                          <div className="text-xs text-[#8B9E7B] mt-0.5">Stock: {item.stock}</div>
                        </div>
                        <div className="font-display text-lg text-[#4A6741]">${item.price}</div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => { setEditingItem(item); setShowAdd(true); }}
                          data-testid={`edit-item-${item.item_id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 text-xs border border-[#E2DEC6] rounded-lg py-1.5 hover:bg-[#F1EFE7]"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          data-testid={`delete-item-${item.item_id}`}
                          className="inline-flex items-center justify-center gap-1 text-xs text-[#B84A4A] border border-[#E2DEC6] rounded-lg py-1.5 px-2 hover:bg-[#FCEFEC]"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      {/* Floating Add Button (Mobile Only) */}
      {items.length > 0 && (
        <button
          onClick={() => { setEditingItem(null); setShowAdd(true); }}
          data-testid="add-item-fab-mobile"
          className="sm:hidden fixed bottom-6 right-6 z-40 bg-[#4A6741] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-[#3A5233] transition-transform active:scale-95"
          aria-label="Add item"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      <AddItemModal
        open={showAdd}
        onOpenChange={(v) => { setShowAdd(v); if (!v) setEditingItem(null); }}
        onCreated={handleCreated}
        editingItem={editingItem}
      />

      <SettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
        user={user}
        onSaved={refresh}
      />
    </div>
  );
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
      await api.put("/profile/me", {
        store_name: storeName,
        username,
        bio,
        whatsapp_number: whatsapp,
      });
      toast.success("Saved");
      await onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#F8F6F0] border-[#E2DEC6]" data-testid="settings-modal">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Store settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div>
            <Label className="text-xs uppercase tracking-widest text-[#8B9E7B]">Store name</Label>
            <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="bg-white mt-1" data-testid="store-name-input" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-[#8B9E7B]">Username (URL slug)</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} className="bg-white mt-1" data-testid="username-input" />
            <div className="text-xs text-[#8B9E7B] mt-1">plotly.app/g/{username || "your-name"}</div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-[#8B9E7B]">WhatsApp number (with country code)</Label>
            <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+919876543210" className="bg-white mt-1" data-testid="whatsapp-input" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-[#8B9E7B]">Bio</Label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Backyard gardener since 2018. Organic, hand-grown." className="bg-white mt-1" data-testid="bio-input" />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          data-testid="save-settings-button"
          className="bg-[#4A6741] text-white rounded-xl py-3 font-medium hover:bg-[#3A5233] disabled:opacity-50 mt-2"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
