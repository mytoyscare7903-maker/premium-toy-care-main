import { Bike, Car, Truck, Gauge, Zap, MessageCircle, PackageOpen, CheckCircle2, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";

import bikeAfterImg from "@/assets/bike_assemble.jpeg";
import carAfterImg from "@/assets/car_assemble.jpeg";
import jeepAfterImg from "@/assets/jeep_assemble.jpeg";

import bikeBeforeImg from "@/assets/bike_deassemble.jpeg";
import carBeforeImg from "@/assets/car_deassemble.jpeg";
import jeepBeforeImg from "@/assets/jeep_deassemble.jpeg";

/* ─── Service Cards Data ─────────────────────────────────── */
const ASSEMBLY_SERVICES = [
  {
    Icon: Bike,
    title: "Kids Electric Bike Assembly",
    desc: "Complete unboxing, wheel fitting, handlebar alignment, battery connection and full safety check.",
    accent: "from-orange-500/16 to-amber-400/8",
    iconBg: "from-orange-500/20 to-amber-400/12",
    iconBorder: "border-orange-400/20",
    iconColor: "text-orange-500",
    wa: "Kids Electric Bike Assembly",
  },
  {
    Icon: Car,
    title: "Ride-on Car Assembly",
    desc: "Door fitting, seat installation, steering wheel setup, battery wiring and final test drive.",
    accent: "from-blue-500/14 to-sky-400/8",
    iconBg: "from-blue-500/18 to-sky-400/10",
    iconBorder: "border-blue-400/20",
    iconColor: "text-blue-500",
    wa: "Ride-on Car Assembly",
  },
  {
    Icon: Truck,
    title: "Jeep Assembly",
    desc: "Full frame build, body panel installation, roof canopy fitting, wheel mounting and drive test.",
    accent: "from-emerald-500/14 to-green-400/8",
    iconBg: "from-emerald-500/18 to-green-400/10",
    iconBorder: "border-emerald-400/20",
    iconColor: "text-emerald-600",
    wa: "Jeep Assembly",
  },
  {
    Icon: Gauge,
    title: "Scooter Setup",
    desc: "Handlebar stem fitting, footboard assembly, kickstand setup, motor wiring and speed calibration.",
    accent: "from-purple-500/14 to-violet-400/8",
    iconBg: "from-purple-500/18 to-violet-400/10",
    iconBorder: "border-purple-400/20",
    iconColor: "text-purple-600",
    wa: "Scooter Setup",
  },
  {
    Icon: Zap,
    title: "Battery & Wiring Setup",
    desc: "Safe battery installation, connector crimping, fuse fitting and full electrical continuity test.",
    accent: "from-yellow-500/14 to-amber-400/8",
    iconBg: "from-yellow-500/18 to-amber-400/10",
    iconBorder: "border-yellow-400/20",
    iconColor: "text-yellow-600",
    wa: "Battery and Wiring Setup",
  },
];

/* ─── Showcase Data ──────────────────────────────────────── */
const SHOWCASE = [
  {
    beforeImg: bikeBeforeImg,
    afterImg: bikeAfterImg,
    label: "Kids Electric Bike",
    beforeLabel: "Open Box — Unassembled",
    afterLabel: "Professionally Assembled",
  },
  {
    beforeImg: carBeforeImg,
    afterImg: carAfterImg,
    label: "Ride-on Car",
    beforeLabel: "Open Box — Unassembled",
    afterLabel: "Professionally Assembled",
  },
  {
    beforeImg: jeepBeforeImg,
    afterImg: jeepAfterImg,
    label: "Kids Jeep",
    beforeLabel: "Open Box — Unassembled",
    afterLabel: "Professionally Assembled",
  },
];

/* ─── Service Card ───────────────────────────────────────── */
function AssemblyCard({
  Icon, title, desc, accent, iconBg, iconBorder, iconColor, wa, index,
}: typeof ASSEMBLY_SERVICES[0] & { index: number }) {
  const waLink = `https://wa.me/916204594205?text=${encodeURIComponent(`Hi MyToysCare, I need ${wa} service.`)}`;
  return (
    <Reveal delay={index * 0.08}>
      <div className={`group relative h-full rounded-3xl border border-border bg-gradient-to-br ${accent} p-7 shadow-[0_2px_14px_-4px_oklch(0.02_0_0/0.08)] hover:shadow-[0_12px_40px_-12px_oklch(0.02_0_0/0.18)] hover:-translate-y-2 hover:border-border/40 transition-all duration-300 overflow-hidden flex flex-col`}>

        <div className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

        <span className="absolute top-5 right-5 text-[11px] font-bold text-muted-foreground/25 font-display select-none">
          0{index + 1}
        </span>

        <div className={`relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} ${iconColor} border ${iconBorder} mb-5 shadow-sm group-hover:shadow-md transition-shadow`}>
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="font-display font-bold text-[1.05rem] text-foreground mb-2">{title}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed flex-1">{desc}</p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex items-center gap-2 rounded-xl border ${iconBorder} bg-gradient-to-br ${iconBg} ${iconColor} px-4 py-2.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-md`}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Book Assembly
        </a>
      </div>
    </Reveal>
  );
}

/* ─── Showcase Card ──────────────────────────────────────── */
function ShowcaseCard({ item, index }: { item: typeof SHOWCASE[0]; index: number }) {
  return (
    <Reveal delay={index * 0.12}>
      <div className="group relative rounded-3xl overflow-hidden border border-border shadow-[0_4px_24px_-8px_oklch(0.02_0_0/0.15)] hover:shadow-[0_16px_48px_-12px_oklch(0.02_0_0/0.22)] transition-all duration-500 hover:-translate-y-1.5 bg-slate-900">

        {/* BEFORE (top half) */}
        <div className="relative h-52 overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src={item.beforeImg}
            alt={`${item.label} before assembly`}
            className="w-full h-full object-contain brightness-80 group-hover:brightness-70 transition-all duration-500 p-2"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-xl bg-black/65 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[11px] font-bold text-amber-300 tracking-wide">
            <PackageOpen className="h-3.5 w-3.5" />
            Before Assembly
          </span>
        </div>

        {/* DIVIDER BADGE */}
        <div className="relative flex items-center justify-center py-3 bg-slate-900 border-y border-white/5">
          <div className="flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5">
            <Wrench className="h-3.5 w-3.5 text-brand animate-[spin_3s_linear_infinite]" />
            <span className="text-[11px] font-bold text-brand tracking-wider uppercase">Professional Assembly</span>
            <Wrench className="h-3.5 w-3.5 text-brand animate-[spin_3s_linear_infinite_reverse]" />
          </div>
        </div>

        {/* AFTER (bottom half) */}
        <div className="relative h-56 overflow-hidden bg-slate-900">
          <img
            src={item.afterImg}
            alt={`${item.label} after assembly`}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/85 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold text-white tracking-wide">
            <CheckCircle2 className="h-3.5 w-3.5" />
            After Professional Assembly
          </span>
        </div>

        {/* CARD FOOTER */}
        <div className="bg-slate-900 px-5 py-4 flex items-center justify-between border-t border-white/5">
          <span className="font-bold text-sm text-white">{item.label}</span>
          <a
            href={`https://wa.me/916204594205?text=${encodeURIComponent(`Hi, I need assembly service for ${item.label}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 px-3 py-1.5 text-[11px] font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export function Assembly() {
  return (
    <section id="assembly" className="py-24 relative overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">

        {/* ── Section Header ── */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">
              Assembly Service
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Toy Assembly &amp;{" "}
              <span className="text-gradient-brand">Installation Service</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We professionally assemble kids electric bikes, cars, jeeps, scooters — straight from the box to ride-ready in hours.
            </p>
          </div>
        </Reveal>

        {/* ── Service Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20">
          {ASSEMBLY_SERVICES.map((s, i) => (
            <AssemblyCard key={s.title} {...s} index={i} />
          ))}
        </div>

        {/* ── Before / After Showcase Header ── */}
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/8 px-4 py-1.5 text-xs font-semibold text-brand mb-4 uppercase tracking-widest">
              <PackageOpen className="h-3.5 w-3.5" />
              Assembly Showcase
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              From Open Box to{" "}
              <span className="text-gradient-brand">Ride-Ready</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              See the difference a professional assembly makes — unboxed to finished in one visit.
            </p>
          </div>
        </Reveal>

        {/* ── Showcase Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE.map((item, i) => (
            <ShowcaseCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <Reveal>
          <div className="mt-14 text-center">
            <p className="text-sm text-muted-foreground mb-5">
              Got a new toy that needs assembly? We come to your doorstep.
            </p>
            <a
              href={`https://wa.me/916204594205?text=${encodeURIComponent("Hi MyToysCare, I need a toy assembly service at my home.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.04] transition-transform"
            >
              <MessageCircle className="h-4 w-4" />
              Book Home Assembly Service
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
