import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import faqFamily from "@/assets/faq-family.png";

const faqs = [
  { q: "What if my toy is not working?", a: "Don't worry. Our expert technicians will diagnose the issue and provide a quick, reliable repair to get it running like new." },
  { q: "Do you use genuine parts?", a: "Yes — we use only genuine, high-quality spare parts to ensure safe, reliable, and long-lasting performance for every repair." },
  { q: "How much time is required?", a: "Repair time depends on the issue, but most repairs are completed within same time." },
  { q: "Do you offer doorstep pickup and drop?", a: "Yes, we offer doorstep pickup and drop. Transportation charges are included in the service cost." },
  { q: "Is there any warranty after repair?", a: "Yes, we offer a limited warranty on repairs. Warranty can be claimed by visiting our workshop." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-surface/20 border-y border-border">
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
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div
                    className={`rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden shadow-[0_10px_40px_-12px_rgba(15,23,42,0.45)] transition-all duration-300 ${
                      isOpen
                        ? "border-brand/30 shadow-[0_6px_24px_-6px_oklch(0.74_0.18_55/0.18)]"
                        : "border-border hover:border-border/60 hover:shadow-[0_4px_16px_-6px_oklch(0.02_0_0/0.10)]"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        {/* Number badge */}
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold transition-colors ${
                          isOpen ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-200"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-semibold text-sm leading-snug transition-colors ${isOpen ? "text-orange-300" : "text-slate-100"}`}>
                          {f.q}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-brand" : "text-muted-foreground"}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/10 ml-5 mr-5 mb-0 pt-3">
                            {f.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
