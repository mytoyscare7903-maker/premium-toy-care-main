import { useState, useRef, useCallback } from "react";
import { Reveal } from "./Reveal";
import { ChevronsLeftRight, Wrench, Zap, Settings2, Car } from "lucide-react";

/* ─── IMAGES ─── */
import yellowBeforeImg from "@/assets/yellow_before.jpeg"; // BROKEN
import yellowAfterImg from "@/assets/yellow_after.jpeg";   // REPAIRED

import redJeepBeforeImg from "@/assets/redjeep_before.jpeg";
import redJeepAfterImg from "@/assets/redjeep_after.jpeg";

import bikeBeforeImg from "@/assets/bike_before.jpeg";
import bikeAfterImg from "@/assets/bike_after.jpeg";

import jeepBeforeImg from "@/assets/jeep_before.jpeg";
import jeepAfterImg from "@/assets/jeep_after.jpeg";

/* ─── TYPE ─── */
interface TransformItem {
  beforeImg: string;
  afterImg: string;
  label: string;
  tag: string;
  Icon: React.ElementType;
  desc: string;
  whatsapp: string;
}

/* ─── DATA ─── */
const ITEMS: TransformItem[] = [
  {
    beforeImg: yellowBeforeImg,  // BROKEN
    afterImg: yellowAfterImg,    // REPAIRED
    label: "RC Car Full Repair",
    tag: "Motor & Electronics",
    Icon: Zap,
    desc: "Burnt motor, broken remote receiver and dead battery — fully repaired.",
    whatsapp: "RC Car Repair",
  },
  {
    beforeImg: redJeepBeforeImg,
    afterImg: redJeepAfterImg,
    label: "Ride-On Jeep Restore",
    tag: "Body & Battery",
    Icon: Car,
    desc: "Cracked chassis, flat tyres, exhausted battery — fully restored.",
    whatsapp: "Jeep Repair",
  },
  {
    beforeImg: bikeBeforeImg,
    afterImg: bikeAfterImg,
    label: "Kids Scooter Revival",
    tag: "Motor & Wiring",
    Icon: Settings2,
    desc: "Faulty wiring and motor issues fixed completely.",
    whatsapp: "Scooter Repair",
  },
  {
    beforeImg: jeepBeforeImg,
    afterImg: jeepAfterImg,
    label: "Workshop Full-Service",
    tag: "Deep Overhaul",
    Icon: Wrench,
    desc: "Full inspection, repair and testing done professionally.",
    whatsapp: "Full Service",
  },
];

/* ─── CARD ─── */
function SliderCard({ item, delay }: { item: TransformItem; delay: number }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((x: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const pct = ((x - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updatePos(e.clientX);

    const move = (ev: MouseEvent) => {
      if (dragging.current) updatePos(ev.clientX);
    };

    const up = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const waLink = `https://wa.me/917903913346?text=Hi, I need help with ${encodeURIComponent(
    item.whatsapp
  )}`;

  return (
    <Reveal delay={delay}>
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-card">

        {/* IMAGE SLIDER */}
        <div
          ref={ref}
          onMouseDown={onDown}
          className="relative h-60 cursor-ew-resize select-none overflow-hidden"
        >
          {/* BASE = BEFORE (Repaired) */}
          <img
            src={item.beforeImg}
            className="absolute inset-0 w-full h-full object-cover"
            alt="before"
          />

          {/* OVERLAY = AFTER (Repaired) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={item.afterImg}
              className="w-full h-full object-cover"
              alt="after"
            />
          </div>

          {/* LINE */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${pos}%` }}
          />

          {/* LABELS */}
          <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
            Before (Repair)
          </span>
          <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded">
            After (Repaired)
          </span>
        </div>

        {/* CARD BODY */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <item.Icon className="h-4 w-4 text-brand" />
            <span className="text-xs font-semibold text-brand uppercase">
              {item.tag}
            </span>
          </div>

          <h3 className="text-foreground font-bold text-base">
            {item.label}
          </h3>

          <p className="text-muted-foreground text-sm mt-2">
            {item.desc}
          </p>

          <a
            href={waLink}
            target="_blank"
            className="inline-block mt-4 text-sm font-semibold text-brand"
          >
            Book Repair →
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── SECTION ─── */
export function BeforeAfter() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            See the <span className="text-brand">Transformation</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Drag to compare broken vs repaired toys
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item, i) => (
            <SliderCard key={i} item={item} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}