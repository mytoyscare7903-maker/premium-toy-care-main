import { Wrench, BatteryCharging, Settings2, Truck, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  { Icon: Wrench, title: "Toy & Hover board Repair", desc: "Full repair for ride-on cars, RC toys, bikes and scooters & hover board of all brands." },
  { Icon: BatteryCharging, title: "Battery Replacement", desc: "Replace old batteries with reliable, child-safe power solutions." },
  { Icon: Settings2, title: "Maintenance", desc: "Regular servicing for longer life and consistently better performance." },
  { Icon: Truck, title: "Pickup & Drop", desc: "Convenient doorstep pickup and drop service across Bangalore." },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Our Services</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Everything Your Kid's Toy <span className="text-gradient-brand">Needs</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Professional service from diagnosis to delivery — all under one roof.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative h-full rounded-3xl border border-border bg-gradient-card p-6 shadow-card hover:border-brand/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand border border-brand/20 mb-5 group-hover:bg-gradient-brand group-hover:text-brand-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-brand transition-all" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}