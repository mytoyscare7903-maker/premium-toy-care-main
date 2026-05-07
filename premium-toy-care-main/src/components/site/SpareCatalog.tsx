import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const catalogImages = import.meta.glob("../../assets/catalog/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const image = (file: string) => catalogImages[`../../assets/catalog/${file}`];

const items = [
  { name: "Big Motherboard", img: image("big_mb1.jpg") },
  { name: "Small Motherboard", img: image("small_mb.jpg") },
  { name: "Motherboard with Remote", img: image("Mb_remote1.jpg") },
  { name: "Multifunctional Board", img: image("multifunctional_board.jpg") },
  { name: "Remote Controller", img: image("remote1.jpg") },
  { name: "Music Board", img: image("music_board.jpg") },
  { name: "Round Music Board", img: image("roundmusic_board5.jpg") },
  { name: "Hand Accelerator", img: image("hand_accelarator.jpg") },
  { name: "Steering Motor", img: image("stearing_motor.jpg") },
  { name: "Speaker", img: image("big_speaker.jpg") },
  { name: "12V Charger", img: image("12v_charger.jpg") },
  { name: "Key Set", img: image("key_set1.jpg") },
];

export function SpareCatalog() {
  return (
    <section id="catalog-preview" className="py-24 bg-surface/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Spare Parts</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Genuine <span className="text-gradient-brand">Spare Parts</span> Catalog
            </h2>
            <p className="mt-4 text-muted-foreground">
              Original parts for motherboards, remotes, batteries, gearboxes and more.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative bg-surface/40 py-2">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="catalog-marquee-track">
          {[0, 1].map((group) => (
            <div className="catalog-marquee-group" key={group} aria-hidden={group === 1}>
              {items.map((item, i) => (
                <div key={`${group}-${item.name}`} className="w-56 shrink-0 rounded-2xl border border-border bg-gradient-card p-3 shadow-card">
                  <div className="aspect-square rounded-xl overflow-hidden bg-surface-elevated">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading={group === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={group === 0 && i < 4 ? "high" : "auto"}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                  <div className="px-1 pt-3 pb-1 text-sm font-medium">{item.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/catalog" className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-105 transition-transform">
          Explore Full Catalog <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}