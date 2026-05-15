import { ShieldCheck, Wrench, Truck, Award, Clock, Users, IndianRupee, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const badges = [
  { Icon: Award, label: "10+ Years Experience" },
  { Icon: Users, label: "5,000+ Happy Customers" },
  { Icon: ShieldCheck, label: "Genuine Parts Only" },
  { Icon: Wrench, label: "Expert Technicians" },
  { Icon: Truck, label: "Doorstep Pickup" },
  { Icon: Clock, label: "Fast Service" },
];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-border bg-surface/30">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Trusted by parents across Bangalore
          </p>
          {/* Featured promise tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { Icon: ShieldCheck, title: "Guaranteed Warranty", desc: "Every repair backed by a service warranty" },
              { Icon: Truck, title: "Doorstep Pickup & Drop", desc: "Safe and Reliable Delivery Support" },
              { Icon: IndianRupee, title: "Best Price Guarantee", desc: "Competitive pricing with no hidden charges" },
              { Icon: BadgeCheck, title: "Warranty on Repair", desc: "Quality assured on every repair job" },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-brand-glow/5 backdrop-blur-md px-5 py-4 shadow-card"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-brand border border-brand/30">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-foreground">{title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {badges.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-elevated border border-border text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}