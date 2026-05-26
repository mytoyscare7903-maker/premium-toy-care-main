import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, X } from "lucide-react";

const waLink = `https://wa.me/916204594205?text=${encodeURIComponent(
  "Hi MyToysCare, I need a toy assembly service at my home."
)}`;

export function AssemblyFloat() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const section = document.getElementById("assembly");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDismissed(false);
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="assembly-float"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 left-5 z-50 sm:left-6"
        >
          <div className="relative flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 shadow-[0_8px_32px_-4px_oklch(0.65_0.22_50/0.55)] text-white">
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-md"
            >
              <X className="h-3 w-3" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 shrink-0">
              <Hammer className="h-4.5 w-4.5" />
            </div>

            <div className="flex flex-col leading-snug mr-1">
              <span className="text-[11px] font-semibold opacity-80 uppercase tracking-wider">
                Assembly Service
              </span>
              <span className="text-sm font-bold">Book at Home</span>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded-xl bg-white px-3 py-1.5 text-[12px] font-bold text-orange-600 hover:bg-orange-50 transition-colors shadow-sm whitespace-nowrap"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
