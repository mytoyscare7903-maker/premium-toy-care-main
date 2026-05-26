import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Edit2, EyeOff, Eye, Trash2, Lock, X, Check, Shield, MoreVertical, ExternalLink, Loader2, ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, supabaseConfigured } from "../../lib/supabase";
import type { DbReview } from "../../lib/supabase";

/* ─── Image compression ──────────────────────────────────────── */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        const MAX = 640;
        let { width: w, height: h } = img;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/* ─── Types ─────────────────────────────────────────────────── */
interface Review extends DbReview {
  isNew?: boolean;
}

/* ─── Constants ──────────────────────────────────────────────── */
const ADMIN_PASSWORD = "mytoys2024";
const SCROLL_SPEED = 0.55;

/* ─── Fallback reviews (shown when Supabase is unreachable) ─── */
const FALLBACK_REVIEWS: Review[] = [
  { id: "f1", name: "Priya Sharma", date: "Jan 2025", stars: 5, text: "Excellent service! My son's electric ride-on car was repaired perfectly within 2 days. The technician was very professional and explained everything clearly. Highly recommend MyToysCare!", hidden: false, verified: true, created_at: "2025-01-15T10:00:00Z" },
  { id: "f2", name: "Rahul Nair", date: "Feb 2025", stars: 5, text: "Got my daughter's RC jeep assembled at home. The team arrived on time, assembled it carefully and did a full safety check. Very impressed with the quality of work. Will definitely use again.", hidden: false, verified: true, created_at: "2025-02-10T10:00:00Z" },
  { id: "f3", name: "Anitha Krishnan", date: "Dec 2024", stars: 5, text: "My kids' bike motor stopped working suddenly. Called MyToysCare and they came the next day. Motor replaced, battery checked, and it's running like new. Great value for money!", hidden: false, verified: true, created_at: "2024-12-20T10:00:00Z" },
  { id: "f4", name: "Suresh Venkat", date: "Mar 2025", stars: 5, text: "Superb experience from start to finish. Booked through WhatsApp, got a quick reply, and the technician was here within 24 hours. Fixed our ride-on car's wiring issue perfectly.", hidden: false, verified: true, created_at: "2025-03-05T10:00:00Z" },
  { id: "f5", name: "Deepa Menon", date: "Nov 2024", stars: 5, text: "Amazing assembly service for our new electric jeep. The team unpacked, assembled, tested and even showed my son how to use it. Bangalore's best toy repair team without a doubt!", hidden: false, verified: true, created_at: "2024-11-18T10:00:00Z" },
  { id: "f6", name: "Karthik Rajan", date: "Apr 2025", stars: 5, text: "Spare parts were exactly what I needed for my son's scooter. Quick delivery, genuine parts, and very reasonable pricing. The staff were helpful in identifying the right part too.", hidden: false, verified: true, created_at: "2025-04-02T10:00:00Z" },
  { id: "f7", name: "Meera Pillai", date: "Jan 2025", stars: 5, text: "My daughter's pink car had a broken door and flat tyre. Both fixed in one visit for a very fair price. The technician was friendly and the repair was clean. 5 stars well deserved!", hidden: false, verified: true, created_at: "2025-01-28T10:00:00Z" },
  { id: "f8", name: "Arun Balakrishnan", date: "Feb 2025", stars: 5, text: "Rented a ride-on jeep for my son's birthday party from MyToysCare. It was clean, well-maintained and the kids absolutely loved it. Pickup and drop was seamless. Great service!", hidden: false, verified: true, created_at: "2025-02-22T10:00:00Z" },
  { id: "f9", name: "Lakshmi Iyer", date: "Mar 2025", stars: 5, text: "Very professional team. They repaired my son's hoverboard motor and replaced the battery. Tested it thoroughly before leaving. Quick, affordable and reliable — exactly what I needed.", hidden: false, verified: true, created_at: "2025-03-14T10:00:00Z" },
];

const BG_COLORS = [
  ["#E97316", "#F59E0B"],
  ["#8B5CF6", "#EC4899"],
  ["#3B82F6", "#06B6D4"],
  ["#10B981", "#14B8A6"],
  ["#EF4444", "#F97316"],
  ["#6366F1", "#8B5CF6"],
  ["#EC4899", "#F43F5E"],
  ["#F59E0B", "#EAB308"],
];

function avatarBg(name: string): [string, string] {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return BG_COLORS[h % BG_COLORS.length];
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

/* ─── Relative date ──────────────────────────────────────────── */
const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function relativeDate(dateStr: string): string {
  let date: Date;
  if (dateStr.includes("T") || (dateStr.includes("-") && !dateStr.match(/^\w{3} \d{4}$/))) {
    date = new Date(dateStr);
  } else {
    const [mon, yr] = dateStr.split(" ");
    date = new Date(parseInt(yr), MONTH_MAP[mon] ?? 0, 15);
  }
  if (isNaN(date.getTime())) return dateStr;
  const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (diff < 1) return "this month";
  if (diff === 1) return "a month ago";
  if (diff < 12) return `${diff} months ago`;
  const y = Math.floor(diff / 12);
  return y === 1 ? "a year ago" : `${y} years ago`;
}

/* ─── Star input ─────────────────────────────────────────────── */
function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button"
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="transition-transform active:scale-95 hover:scale-110"
        >
          <Star className={`h-8 w-8 transition-colors ${n <= (hover || value) ? "fill-orange-400 text-orange-400" : "text-slate-500"}`} />
        </button>
      ))}
    </div>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────── */
function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [from, to] = avatarBg(name);
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
  const src = `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=transparent`;

  return (
    <div
      className="relative flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center font-bold text-white shadow-md"
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${from}, ${to})`, fontSize: size * 0.36 }}
    >
      {!imgError && (
        <img
          src={src} alt={name}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {(!imgLoaded || imgError) && <span>{initials(name)}</span>}
    </div>
  );
}

/* ─── Google logo ────────────────────────────────────────────── */
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ─── Review card ────────────────────────────────────────────── */
function ReviewCard({
  review, isAdmin, onEdit, onToggleHide, onDelete,
}: {
  review: Review; isAdmin: boolean;
  onEdit: (r: Review) => void; onToggleHide: (id: string) => void; onDelete: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLong = review.text.length > 160;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <motion.div
      layout
      initial={review.isNew ? { opacity: 0, scale: 0.92, y: 12 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative flex-shrink-0 w-[290px] sm:w-[320px] rounded-2xl border border-slate-300/20 bg-slate-800/90 shadow-xl flex flex-col select-none transition-all duration-200 ${
        review.hidden && isAdmin
          ? "border-dashed border-border opacity-60"
          : "border-border hover:border-brand/30 hover:shadow-[0_8px_40px_-12px_oklch(0.74_0.18_55_/_0.25)]"
      } ${review.isNew ? "ring-2 ring-brand/40" : ""}`}
    >
      {review.isNew && (
        <div className="absolute -top-2 -right-2 rounded-full bg-gradient-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground shadow-glow z-10">
          New
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar name={review.name} size={42} />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-foreground leading-tight truncate">{review.name}</div>
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-green-400 font-medium mt-0.5">
                <Shield className="h-2.5 w-2.5" /> Verified customer
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <GoogleLogo />
            {isAdmin && (
              <div ref={menuRef} className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
                  className="rounded-lg p-1 text-slate-300 hover:text-white hover:bg-slate-700/70 transition"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-7 w-36 glass rounded-xl border border-border shadow-elegant overflow-hidden z-30"
                    >
                      <button onClick={() => { onEdit(review); setMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-foreground hover:bg-surface-elevated transition">
                        <Edit2 className="h-3.5 w-3.5 text-brand" /> Edit review
                      </button>
                      <button onClick={() => { onToggleHide(review.id); setMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-foreground hover:bg-surface-elevated transition">
                        {review.hidden ? <Eye className="h-3.5 w-3.5 text-blue-400" /> : <EyeOff className="h-3.5 w-3.5 text-yellow-400" />}
                        {review.hidden ? "Show" : "Hide"}
                      </button>
                      <div className="border-t border-border/50" />
                      <button onClick={() => { onDelete(review.id); setMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-red-400 hover:bg-surface-elevated transition">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Stars + date */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={`h-3.5 w-3.5 ${n <= review.stars ? "fill-[#FBBC04] text-[#FBBC04]" : "text-white/90/20 fill-muted-foreground/10"}`} />
            ))}
          </div>
          <span className="text-[11px] text-white/90">{relativeDate(review.date)}</span>
          {review.hidden && isAdmin && (
            <span className="text-[10px] text-white/90 bg-surface-elevated rounded px-1.5 py-0.5">hidden</span>
          )}
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className={`text-[13px] text-white/90 leading-relaxed ${!expanded && isLong ? "line-clamp-3" : ""}`}>
            {review.text}
          </p>
          {isLong && (
            <button onClick={() => setExpanded((p) => !p)}
              className="mt-1 text-[12px] font-medium text-brand hover:underline">
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Review photo */}
        {review.image_url && (
          <div className="mt-3 rounded-xl overflow-hidden border border-border">
            <img
              src={review.image_url}
              alt={`Photo from ${review.name}`}
              className="w-full h-36 object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Infinite carousel ──────────────────────────────────────── */
const CARD_STEP = 336; // card width (320) + gap (16)

function Carousel({ items, isAdmin, onEdit, onToggleHide, onDelete }: {
  items: Review[]; isAdmin: boolean;
  onEdit: (r: Review) => void; onToggleHide: (id: string) => void; onDelete: (id: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const dragRef = useRef<{ startX: number; startPos: number } | null>(null);
  const doubled = [...items, ...items];

  useEffect(() => {
    if (items.length === 0) return;
    const step = () => {
      if (!pausedRef.current && trackRef.current) {
        posRef.current += SCROLL_SPEED;
        const half = trackRef.current.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  // Smooth manual scroll by one card
  const scrollBy = (dir: 1 | -1) => {
    if (!trackRef.current) return;
    pause();
    const half = trackRef.current.scrollWidth / 2;
    let target = posRef.current + dir * CARD_STEP;
    if (target < 0) target += half;
    if (target >= half) target -= half;
    const start = posRef.current;
    const delta = target - start;
    const duration = 320;
    const startTime = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      let pos = start + delta * ease;
      if (pos < 0) pos += half;
      if (pos >= half) pos -= half;
      posRef.current = pos;
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${pos}px)`;
      if (t < 1) requestAnimationFrame(animate);
      else setTimeout(resume, 800);
    };
    requestAnimationFrame(animate);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    pause();
    dragRef.current = { startX: e.touches[0].clientX, startPos: posRef.current };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current || !trackRef.current) return;
    const dx = dragRef.current.startX - e.touches[0].clientX;
    const half = trackRef.current.scrollWidth / 2;
    let next = dragRef.current.startPos + dx;
    if (next < 0) next += half;
    if (next >= half) next -= half;
    posRef.current = next;
    trackRef.current.style.transform = `translateX(-${next}px)`;
  };
  const onTouchEnd = () => { dragRef.current = null; resume(); };

  return (
    <div className="relative w-full overflow-hidden"
      onMouseEnter={pause} onMouseLeave={resume}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
    >
      <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ paddingBlock: "12px" }}>
        {doubled.map((r, idx) => (
          <ReviewCard key={`${r.id}-${idx}`} review={r} isAdmin={isAdmin}
            onEdit={onEdit} onToggleHide={onToggleHide} onDelete={onDelete} />
        ))}
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Navigation buttons */}
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Previous review"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600/40 bg-slate-800/90 shadow-xl text-white hover:border-orange-400/50 hover:text-orange-300 hover:scale-110 transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Next review"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-gradient-card shadow-card text-foreground hover:border-brand/50 hover:text-brand hover:scale-110 transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ─── Modal ──────────────────────────────────────────────────── */
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background: "oklch(0 0 0 / 0.72)", backdropFilter: "blur(10px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-border bg-gradient-card shadow-elegant overflow-y-auto max-h-[92dvh] sm:max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  const [writeOpen, setWriteOpen] = useState(false);
  const [wName, setWName] = useState("");
  const [wStars, setWStars] = useState(5);
  const [wText, setWText] = useState("");
  const [wSuccess, setWSuccess] = useState(false);
  const [wSubmitting, setWSubmitting] = useState(false);
  const [wImage, setWImage] = useState<File | null>(null);
  const [wImagePreview, setWImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("Please choose an image under 8 MB.");
      return;
    }
    setWImage(file);
    setWImagePreview(URL.createObjectURL(file));
  };

  const [editTarget, setEditTarget] = useState<Review | null>(null);
  const [eText, setEText] = useState("");
  const [eStars, setEStars] = useState(5);
  const [eSaving, setESaving] = useState(false);

  /* ── Load all reviews + realtime subscription ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!supabaseConfigured) {
      setDbError("Supabase not configured");
      setLoading(false);
      return;
    }

    // Initial fetch — load ALL rows (admin may need hidden ones)
    supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setDbError(error.message);
        } else {
          setReviews((data ?? []) as Review[]);
        }
        setLoading(false);
      })
      .catch(() => {
        setDbError("Failed to load reviews");
        setLoading(false);
      });

    // Realtime: any INSERT / UPDATE / DELETE syncs instantly
    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel("reviews-realtime")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "reviews" },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setReviews((prev) => {
                if (prev.find((r) => r.id === (payload.new as DbReview).id)) return prev;
                return [{ ...(payload.new as DbReview), isNew: true }, ...prev];
              });
              setTimeout(() => {
                setReviews((prev) =>
                  prev.map((r) => r.id === (payload.new as DbReview).id ? { ...r, isNew: false } : r)
                );
              }, 3000);
            } else if (payload.eventType === "UPDATE") {
              setReviews((prev) =>
                prev.map((r) => r.id === (payload.new as DbReview).id ? { ...r, ...(payload.new as DbReview) } : r)
              );
            } else if (payload.eventType === "DELETE") {
              setReviews((prev) => prev.filter((r) => r.id !== (payload.old as DbReview).id));
            }
          }
        )
        .subscribe();
    } catch {
      // Realtime failed silently — reviews still loaded via fetch above
    }

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const visible = reviews.filter((r) => !r.hidden || isAdmin);

  /* ── Secret admin keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A) ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") {
        e.preventDefault();
        if (isAdmin) { setIsAdmin(false); } else { setAdminOpen(true); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isAdmin]);

  /* ── Admin unlock (kept for fallback, not surfaced in UI) ── */
  const handleAdminClick = () => {
    if (isAdmin) { setIsAdmin(false); return; }
    const n = adminClickCount + 1;
    setAdminClickCount(n);
    if (n >= 3) { setAdminClickCount(0); setAdminOpen(true); }
  };
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPwd === ADMIN_PASSWORD) {
      setIsAdmin(true); setAdminOpen(false); setAdminPwd(""); setAdminErr(false);
    } else {
      setAdminErr(true); setAdminPwd("");
    }
  };

  /* ── Submit review → insert into Supabase ── */
  const handleWrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wName.trim() || !wText.trim()) return;
    setWSubmitting(true);

    let imageUrl: string | undefined;
    if (wImage) {
      try {
        imageUrl = await compressImage(wImage);
      } catch {
        // Image compression failed — proceed without image
      }
    }

    const { error } = await supabase.from("reviews").insert({
      name: wName.trim(),
      date: new Date().toISOString(),
      stars: wStars,
      text: wText.trim(),
      hidden: false,
      verified: true,
      ...(imageUrl ? { image_url: imageUrl } : {}),
    });

    setWSubmitting(false);
    if (error) {
      alert("Could not save review: " + error.message);
      return;
    }
    setWSuccess(true);
    if (wImagePreview) URL.revokeObjectURL(wImagePreview);
    setTimeout(() => {
      setWSuccess(false); setWriteOpen(false);
      setWName(""); setWText(""); setWStars(5);
      setWImage(null); setWImagePreview(null);
    }, 2200);
  };

  /* ── Admin: edit → update in Supabase ── */
  const handleEdit = useCallback((r: Review) => {
    setEditTarget(r); setEText(r.text); setEStars(r.stars);
  }, []);

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setESaving(true);
    const { error } = await supabase
      .from("reviews")
      .update({ text: eText, stars: eStars })
      .eq("id", editTarget.id);
    setESaving(false);
    if (!error) setEditTarget(null);
  };

  /* ── Admin: hide/show → update in Supabase ── */
  const handleToggleHide = useCallback(async (id: string) => {
    const review = reviews.find((r) => r.id === id);
    if (!review) return;
    await supabase.from("reviews").update({ hidden: !review.hidden }).eq("id", id);
  }, [reviews]);

  /* ── Admin: delete → delete from Supabase ── */
  const handleDelete = useCallback(async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
  }, []);

  /* ── Stats ── */
  const visibleReviews = reviews.filter((r) => !r.hidden);
  const avg = visibleReviews.length
    ? (visibleReviews.reduce((a, r) => a + r.stars, 0) / visibleReviews.length).toFixed(1)
    : "4.9";

  return (
    <section id="reviews" className="py-24 overflow-hidden">

      {/* Header */}
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Customer Reviews</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Loved by <span className="text-gradient-brand">Indian Parents</span>
            </h2>
            <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-6 py-4 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.45)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/20 border border-orange-400/20">
                <GoogleLogo size={28} />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-brand">{avg}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {loading ? "Loading reviews…" : `${visibleReviews.length} verified Google reviews`}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Carousel or states */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading reviews…</span>
        </div>
      ) : (dbError ? FALLBACK_REVIEWS : visible).length > 0 ? (
        <Carousel items={dbError ? FALLBACK_REVIEWS : visible} isAdmin={isAdmin}
          onEdit={handleEdit} onToggleHide={handleToggleHide} onDelete={handleDelete} />
      ) : (
        <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
          No reviews yet. Be the first to share your experience!
        </div>
      )}

      {/* CTA buttons */}
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => setWriteOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-7 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.03] transition-transform">
            <Star className="h-4 w-4 fill-current" /> Write a Review
          </button>

          <a
            href="https://www.google.com/maps/search/MyToysCare+toy+repair+Ramamurthy+Nagar+Bengaluru/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-gradient-card px-6 py-3 text-sm font-semibold text-foreground shadow-card hover:scale-[1.03] hover:border-[#4285F4]/40 hover:shadow-[0_4px_24px_-6px_rgba(66,133,244,0.25)] transition-all"
          >
            <GoogleLogo size={16} />
            Leave a Google Review
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>

          {/* Admin indicator — only visible when admin mode is active */}
          {isAdmin && (
            <button onClick={() => setIsAdmin(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-brand/50 bg-brand/10 px-5 py-3 text-sm font-medium text-brand transition-all">
              <Lock className="h-4 w-4 text-brand" />
              Admin On
            </button>
          )}
        </div>

        {/* Admin info bar */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-5 mx-auto max-w-lg rounded-2xl border border-brand/25 bg-brand/5 px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-brand">Admin Controls Active</p>
                  <button onClick={() => setIsAdmin(false)} className="text-muted-foreground hover:text-foreground transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Click the ⋮ menu on any card to edit, hide, or delete. Changes sync to Supabase instantly.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: `${visibleReviews.length} visible`, color: "text-green-400" },
                    { label: `${reviews.filter(r => r.hidden).length} hidden`, color: "text-yellow-400" },
                    { label: `${reviews.length} total`, color: "text-muted-foreground" },
                  ].map(({ label, color }) => (
                    <span key={label} className={`text-xs rounded-lg border border-border px-3 py-1 ${color}`}>{label}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Write Review Modal ── */}
      <Modal open={writeOpen} onClose={() => !wSubmitting && !wSuccess && setWriteOpen(false)}>
        {wSuccess ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mb-5">
              <Check className="h-10 w-10 text-green-400" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-foreground">Thank you!</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Your review is now live and synced across all devices.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Share Your Experience</h3>
                <p className="text-xs text-muted-foreground mt-1">Help Bangalore parents find reliable toy repair</p>
              </div>
              <button onClick={() => setWriteOpen(false)} disabled={wSubmitting}
                className="rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleWrite} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Your Name</label>
                <input value={wName} onChange={(e) => setWName(e.target.value)} required
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand transition" />
              </div>

              {wName.trim().length > 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated border border-border">
                  <Avatar name={wName.trim()} size={36} />
                  <div>
                    <div className="text-sm font-medium text-foreground">{wName.trim()}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Shield className="h-3 w-3 text-green-400" /> Verified customer
                    </div>
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Your Rating</label>
                <StarInput value={wStars} onChange={setWStars} />
                <p className="text-xs text-muted-foreground mt-1">
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][wStars]}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Your Review</label>
                <textarea value={wText} onChange={(e) => setWText(e.target.value)} required rows={4}
                  placeholder="Tell other parents about your experience..."
                  className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand resize-none transition" />
                <p className="text-[11px] text-muted-foreground mt-1 text-right">{wText.length} chars</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Add a Photo <span className="normal-case font-normal text-muted-foreground/60">(optional)</span>
                </label>
                {wImagePreview ? (
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={wImagePreview}
                        alt="Preview"
                        className="h-20 w-20 rounded-xl object-cover border-2 border-brand/30 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => { setWImage(null); if (wImagePreview) URL.revokeObjectURL(wImagePreview); setWImagePreview(null); }}
                        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow hover:scale-110 transition-transform"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm font-medium text-foreground truncate">{wImage?.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Photo ready to submit</p>
                    </div>
                  </div>
                ) : (
                  <label className="group flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-brand/40 bg-brand/5 px-4 py-6 text-center hover:border-brand hover:bg-brand/10 active:bg-brand/10 transition-all">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 group-hover:bg-brand/25 transition-colors">
                      <ImagePlus className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand">Upload a photo</p>
                      <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG, HEIC — up to 8 MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*,image/heic,image/heif"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <button type="submit" disabled={wSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3.5 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:scale-100">
                {wSubmitting
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                  : <><Star className="h-4 w-4 fill-current" /> Post Review</>}
              </button>
            </form>
          </div>
        )}
      </Modal>

      {/* ── Admin Login Modal ── */}
      <Modal open={adminOpen} onClose={() => { setAdminOpen(false); setAdminPwd(""); setAdminErr(false); }}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15">
              <Lock className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Admin Access</h3>
              <p className="text-xs text-muted-foreground">Enter password to manage reviews</p>
            </div>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input type="password" value={adminPwd}
              onChange={(e) => { setAdminPwd(e.target.value); setAdminErr(false); }}
              placeholder="Admin password" autoFocus
              className={`w-full rounded-xl border px-4 py-3 text-sm bg-surface-elevated placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand transition ${adminErr ? "border-red-500 ring-1 ring-red-500/50" : "border-border"}`}
            />
            <AnimatePresence>
              {adminErr && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-red-400">Incorrect password. Please try again.</motion.p>
              )}
            </AnimatePresence>
            <button type="submit"
              className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.01] transition-transform">
              Unlock Admin
            </button>
          </form>
        </div>
      </Modal>

      {/* ── Edit Review Modal ── */}
      <Modal open={!!editTarget} onClose={() => !eSaving && setEditTarget(null)}>
        {editTarget && (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar name={editTarget.name} size={38} />
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Edit Review</h3>
                  <p className="text-xs text-muted-foreground">{editTarget.name}</p>
                </div>
              </div>
              <button onClick={() => setEditTarget(null)} disabled={eSaving}
                className="rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditSave} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Rating</label>
                <StarInput value={eStars} onChange={setEStars} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Review Text</label>
                <textarea value={eText} onChange={(e) => setEText(e.target.value)} required rows={5}
                  className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none transition" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setEditTarget(null)} disabled={eSaving}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground hover:bg-surface-elevated transition disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={eSaving}
                  className="flex-1 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:scale-100">
                  {eSaving ? <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Saving…</span> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
}
 