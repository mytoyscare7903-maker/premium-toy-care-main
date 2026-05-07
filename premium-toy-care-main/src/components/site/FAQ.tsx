import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import faqFamily from "@/assets/faq-family.png";

const faqs = [
  { q: "What if my toy is not working?", a: "Don't worry. Our expert technicians will diagnose the issue and provide a quick, reliable repair to get it running like new." },
  { q: "Do you use genuine parts?", a: "Yes — we use only genuine, high-quality spare parts to ensure safe, reliable, and long-lasting performance for every repair." },
  { q: "How much time is required?", a: "Repair time depends on the issue, but most repairs are completed within 1–3 days." },
  { q: "Do you offer doorstep pickup and drop?", a: "Yes, we offer doorstep pickup and drop. Transportation charges are included in the service cost." },
  { q: "Is there any warranty after repair?", a: "Yes, we offer a limited warranty on repairs. Warranty can be claimed by visiting our workshop." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-surface/30 border-y border-border">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">FAQ</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Have Any <span className="text-gradient-brand">Questions?</span>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-brand opacity-20 blur-3xl rounded-3xl" aria-hidden />
              <img
                src={faqFamily}
                alt="Concerned family with broken ride-on toys wondering about repair options"
                loading="lazy"
                className="relative rounded-3xl border border-border shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-gradient-card overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className="font-medium text-foreground">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 text-brand shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}