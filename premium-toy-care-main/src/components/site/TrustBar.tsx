import { ShieldCheck, Wrench, Truck, Award, Clock, Users, IndianRupee, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const badges = [
  { Icon: Award,       label: "10+ Years Experience" },
  { Icon: Users,       label: "5,000+ Happy Customers" },
  { Icon: ShieldCheck, label: "Genuine Parts Only" },
  { Icon: Wrench,      label: "Expert Technicians" },
  { Icon: Truck,       label: "Doorstep Pickup" },
  { Icon: Clock,       label: "Fast Service" },
];

const promises = [
  { Icon: ShieldCheck,   title: "Guaranteed Warranty",     desc: "Every repair backed by a service warranty" },
  { Icon: Truck,         title: "Doorstep Pickup & Drop",  desc: "Safe and reliable delivery support" },
  { Icon: IndianRupee,   title: "Best Price Guarantee",    desc: "Competitive pricing, no hidden charges" },
  { Icon: BadgeCheck,    title: "Warranty on Repair",      desc: "Quality assured on every repair job" },
];

export function TrustBar() {
  return (
    <section className="py-14 border-y border-border bg-surface/20">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Trusted by parents across Bangalore
          </p>

          {/* ── Promise cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {promises.map(({ Icon, title, desc }) => (
              <div
                key={title}
               className="group relative flex items-start gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/15 via-pink-500/10 to-purple-500/15 backdrop-blur-xl px-5 py-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] hover:scale-[1.03] hover:border-orange-300/30 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle top-left glow accent */}
                <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-brand/10 blur-2xl pointer-events-none" />

                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand/8 text-brand border border-brand/15 group-hover:from-brand/28 group-hover:to-brand/12 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="relative">
                  <div className="text-sm font-bold text-foreground leading-tight">{title}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Trust badge pills ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {badges.map(({ Icon, label }) => (
              <div
                key={label}
                className="group flex flex-col items-center text-center gap-2.5 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-3 py-4 shadow-xl hover:scale-105 hover:border-orange-300/30 transition-all duration-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand/5 text-brand border border-brand/12 group-hover:from-brand/22 group-hover:to-brand/10 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-white/85 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
