import { MessageCircle, AlertCircle, Clock } from "lucide-react";
import bike from "@/assets/rent-bike.png";
import car from "@/assets/rent-car.png";
import jeep from "@/assets/rent-jeep.png";
import { Reveal } from "./Reveal";

const items = [
  { img: bike,    title: "Kids Electric Bike", price: "₹99", text: "Kids%20Electric%20Bike",  tag: "Most Popular" },
  { img: car,      title: "Kids rideon Car",       price: "₹99", text: "RC%20Racing%20Car",        tag: "Fun & Fast" },
  { img: jeep, title: "kid's jeep",        price: "₹99", text: "Baby%20Scooter",           tag: "Easy Ride" },
];

export function Rent() {
  return (
    <section id="rent" className="py-24">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Rentals</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Toys for <span className="text-gradient-brand">Rent</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Premium ride-on toys delivered to your door — try before you buy.</p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              Service Temporarily Unavailable
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group relative rounded-3xl border border-border bg-white shadow-[0_2px_14px_-4px_oklch(0.02_0_0/0.08),0_1px_4px_-2px_oklch(0.02_0_0/0.04)] transition-all duration-300 h-full flex flex-col overflow-hidden">

                {/* Image area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-surface/40">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Tag badge top-left */}
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 px-3 py-1 text-[11px] font-bold text-foreground shadow-sm">
                    {item.tag}
                  </span>

                  {/* Price badge bottom-right */}
                  <div className="absolute bottom-3 right-3 flex items-baseline gap-1 rounded-xl bg-white/90 backdrop-blur-sm border border-white/60 px-3 py-1.5 shadow-sm">
                    <span className="text-base font-bold text-foreground">{item.price}</span>
                    <span className="text-[11px] text-muted-foreground font-normal">/day</span>
                  </div>

                  {/* Unavailable overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
                    <div className="flex items-center gap-2 rounded-xl bg-white/85 border border-border px-4 py-2 shadow-md">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-semibold text-foreground">Coming Soon</span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Doorstep delivery · All accessories included</p>

                  <div className="mt-auto pt-4">
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed select-none opacity-60"
                    >
                      <MessageCircle className="h-4 w-4" /> Currently Unavailable
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
