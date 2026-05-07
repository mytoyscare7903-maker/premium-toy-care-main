import { MessageCircle } from "lucide-react";
import bike from "@/assets/rent-bike.jpg";
import rc from "@/assets/rent-rc.jpg";
import scooter from "@/assets/rent-scooter.jpg";
import { Reveal } from "./Reveal";

const items = [
  { img: bike, title: "Kids Electric Bike", price: "₹499", text: "Kids%20Electric%20Bike" },
  { img: rc, title: "RC Racing Car", price: "₹299", text: "RC%20Racing%20Car" },
  { img: scooter, title: "Baby Scooter", price: "₹399", text: "Baby%20Scooter" },
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
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group rounded-3xl border border-border bg-gradient-card p-5 shadow-card hover:-translate-y-2 hover:border-brand/40 transition-all duration-300 h-full flex flex-col">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                  <div className="text-brand font-bold">{item.price}<span className="text-xs text-muted-foreground font-normal">/day</span></div>
                </div>
                <a href={`https://wa.me/917903913346?text=Hello%20MyToysCare,%20I%20want%20to%20rent%20${item.text}`}
                  target="_blank" rel="noopener"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.02] transition-transform">
                  <MessageCircle className="h-4 w-4" /> Rent Now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}