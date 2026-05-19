import { Wrench, BatteryCharging, Settings2, Truck, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  {
    Icon: Wrench,
    title: "Toy Repair",
    desc: "Full repair for ride-on cars & jeep , RC toys, bikes and scooters & hover board of all brands.",
    accent: "from-orange-500/18 to-amber-400/10",
    iconBg: "from-orange-500/20 to-amber-400/12",
    iconBorder: "border-orange-400/20",
    iconColor: "text-orange-500",
  },
  {
    Icon: BatteryCharging,
    title: "Battery Replacement",
    desc: "Replace old batteries with reliable, child-safe power solutions.",
    accent: "from-green-500/15 to-emerald-400/8",
    iconBg: "from-green-500/18 to-emerald-400/10",
    iconBorder: "border-green-400/20",
    iconColor: "text-green-600",
  },
  {
    Icon: Settings2,
    title: "Maintenance",
    desc: "Regular servicing for longer life and consistently better performance.",
    accent: "from-blue-500/15 to-sky-400/8",
    iconBg: "from-blue-500/18 to-sky-400/10",
    iconBorder: "border-blue-400/20",
    iconColor: "text-blue-600",
  },
  {
    Icon: Truck,
    title: "Pickup & Drop",
    desc: "Convenient doorstep pickup and drop service across Bangalore.",
    accent: "from-purple-500/15 to-violet-400/8",
    iconBg: "from-purple-500/18 to-violet-400/10",
    iconBorder: "border-purple-400/20",
    iconColor: "text-purple-600",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">
              Our Services
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Everything Your Kid's Toy{" "}
              <span className="text-gradient-brand">Needs</span>
            </h2>

            <p className="mt-4 text-muted-foreground">
              Professional service from diagnosis to delivery — all under one roof.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(
            ({ Icon, title, desc, accent, iconBg, iconBorder, iconColor }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className={`group relative h-full rounded-3xl border border-border bg-gradient-to-br ${accent} p-7 shadow-[0_2px_14px_-4px_oklch(0.02_0_0/0.08),0_1px_4px_-2px_oklch(0.02_0_0/0.04)] hover:shadow-[0_12px_40px_-12px_oklch(0.02_0_0/0.14),0_4px_16px_-6px_oklch(0.02_0_0/0.06)] hover:-translate-y-1.5 hover:border-border/40 transition-all duration-300 overflow-hidden`}>

                  <div
                    className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100`}
                  />

                  <span className="absolute top-5 right-5 text-[11px] font-bold text-muted-foreground/30 font-display select-none">
                    0{i + 1}
                  </span>

                  <div
                    className={`relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} ${iconColor} border ${iconBorder} mb-5 shadow-sm group-hover:shadow-md transition-shadow`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-display font-bold text-[1.05rem] text-foreground mb-2">
                    {title}
                  </h3>

                  <p className="text-sm text-foreground leading-relaxed">
                    {desc}
                  </p>

                  <ArrowUpRight
                    className={`absolute bottom-6 right-6 h-4 w-4 opacity-0 group-hover:opacity-100 ${iconColor} transition-all duration-300 translate-y-1 group-hover:translate-y-0`}
                  />
                </div>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}