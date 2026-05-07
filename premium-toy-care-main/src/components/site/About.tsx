import { ShieldCheck, Award } from "lucide-react";
import aboutImg from "@/assets/about-toy.png";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-brand opacity-20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-elegant">
              <img src={aboutImg} alt="MyToysCare technicians repairing ride-on toy cars and happy kids riding repaired toys" loading="lazy" className="w-full h-auto" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">About Us</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            We Want to Give You the <span className="text-gradient-brand">Best Service</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We have 10+ years of experience repairing kids' ride-on toys like cars, bikes, scooters, and RC vehicles.
            Our focus is on safe, reliable, and long-lasting service every parent can trust.
          </p>

          <div className="mt-8 space-y-5">
            {[
              { Icon: ShieldCheck, title: "Guaranteed Results", desc: "High-quality repairs with reliable performance and customer satisfaction on every service." },
              { Icon: Award, title: "Quality Services", desc: "Top-quality repair using genuine parts and expert techniques for long-lasting performance." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand border border-brand/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}