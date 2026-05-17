import { useState, useRef, useCallback } from "react";
import { Reveal } from "./Reveal";
import { ChevronsLeftRight, Wrench, Zap, Settings2, Car } from "lucide-react";

import rcImg    from "@/assets/rent-rc.jpg";
import bikeImg  from "@/assets/rent-bike.jpg";
import scooterImg from "@/assets/rent-scooter.jpg";
import aboutImg from "@/assets/about-toy.jpg";

interface TransformItem {
  img: string;
  label: string;
  tag: string;
  Icon: React.ElementType;
  desc: string;
  whatsapp: string;
}

const ITEMS: TransformItem[] = [
  {
    img: rcImg,
    label: "RC Car Full Repair",
    tag: "Motor & Electronics",
    Icon: Zap,
    desc: "Burnt motor, broken remote receiver and dead battery — fully replaced and road-tested.",
    whatsapp: "RC Car Repair",
  },
  {
    img: bikeImg,
    label: "Ride-On Bike Restore",
    tag: "Body & Battery",
    Icon: Car,
    desc: "Cracked chassis, flat tyres, exhausted battery pack — all replaced with genuine parts.",
    whatsapp: "Ride-On Bike Restoration",
  },
  {
    img: scooterImg,
    label: "Kids Scooter Revival",
    tag: "Motor & Wiring",
    Icon: Settings2,
    desc: "Faulty accelerator, frayed wiring harness and seized wheel motor — diagnosed and restored.",
    whatsapp: "Kids Scooter Repair",
  },
  {
    img: aboutImg,
    label: "Workshop Full-Service",
    tag: "Deep Overhaul",
    Icon: Wrench,
    desc: "Complete strip-down, component inspection and reassembly for maximum longevity.",
    whatsapp: "Full Service Overhaul",
  },
];

/* ─── Drag-reveal slider card ────────────────────────────────── */
function SliderCard({ item, delay }: { item: TransformItem; delay: number }) {
  const [pos, setPos] = useState(42);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updatePos(e.clientX);
    const onMove = (ev: MouseEvent) => { if (dragging.current) updatePos(ev.clientX); };
    const onUp   = () => { dragging.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    updatePos(e.touches[0].clientX);
    const onMove = (ev: TouchEvent) => updatePos(ev.touches[0].clientX);
    const onEnd  = () => { window.removeEventListener("touchmove", onMove); window.removeEventListener("touchend", onEnd); };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
  };

  const waLink = `https://wa.me/919972539440?text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(item.whatsapp)}`;

  return (
    <Reveal delay={delay}>
      <div className="group rounded-3xl border border-border bg-card shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 overflow-hidden">

        {/* ── Image slider ── */}
        <div
          ref={containerRef}
          className="relative h-56 sm:h-64 select-none overflow-hidden cursor-ew-resize"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* After — full colour */}
          <img
            src={item.img}
            alt={`After: ${item.label}`}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          />

          {/* Before — grayscale + darkened, clipped to left side */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={item.img}
              alt={`Before: ${item.label}`}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover grayscale brightness-60 contrast-90"
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 z-10 w-px bg-white shadow-[0_0_8px_2px_rgba(0,0,0,0.35)] pointer-events-none"
            style={{ left: `${pos}%` }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.28)] border border-white/60">
              <ChevronsLeftRight className="h-4 w-4 text-foreground" />
            </div>
          </div>

          {/* Before / After labels */}
          <span className="absolute top-3 left-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm pointer-events-none">
            Before
          </span>
          <span className="absolute top-3 right-3 z-10 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm pointer-events-none">
            After ✓
          </span>

          {/* Drag hint — fades out after first interaction */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none">
            <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] text-white/80 backdrop-blur-sm">
              ← drag to reveal →
            </span>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <item.Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">{item.tag}</span>
              </div>
              <h3 className="font-display font-bold text-base text-foreground">{item.label}</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand/10 border border-brand/25 px-4 py-2 text-xs font-semibold text-brand hover:bg-brand hover:text-brand-foreground hover:border-transparent transition-all"
          >
            Book this repair →
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export function BeforeAfter() {
  return (
    <section id="transformations" className="py-24">
      <div className="container mx-auto px-4">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Real Results</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              See the <span className="text-gradient-brand">Transformation</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Drag the slider on each card to see exactly how we bring broken toys back to life.
              Every repair uses genuine parts and is tested before delivery.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item, i) => (
            <SliderCard key={item.label} item={item} delay={i * 0.08} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-3xl border border-brand/20 bg-brand/5 px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold text-lg text-foreground">Ready to restore your child's favourite toy?</p>
              <p className="text-sm text-muted-foreground mt-0.5">Doorstep pickup across Bangalore — get a free quote in minutes.</p>
            </div>
            <a
              href="https://wa.me/919972539440?text=Hi%2C%20I%20want%20to%20book%20a%20toy%20repair"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.02] transition-transform"
            >
              <Wrench className="h-4 w-4" />
              Book a Repair Now
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
