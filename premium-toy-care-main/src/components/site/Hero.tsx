import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Truck, Info, Wrench, Package, CalendarClock, HelpCircle, MessageSquare, MessageCircle, Hammer } from "lucide-react";
import heroImg from "@/assets/workshop-banner.png";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function Hero() {
  const [reviewCount, setReviewCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("hidden", false)
      .then(({ count }) => {
        if (count !== null) setReviewCount(count);
      });
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-white via-orange-50 to-gray-100">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand-glow/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
            Bangalore's #1 Toy Repair Workshop
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            We Bring Your <br />
            Kids' Toys <span className="text-gradient-brand">Back to Life</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Expert repair, genuine spare parts, and rental for ride-on cars,Hover board, RC hobby car, scooters and bikes — backed by 10+ years of experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/916204594205" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-105 transition-transform">
              Book Repair <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-surface-elevated transition">
              Our Services
            </a>
          </div>

          {/* Quick navigation tiles */}
          <div className="mt-8 grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {[
              { href: "#about", label: "About", Icon: Info },
              { href: "#services", label: "Services", Icon: Wrench },
              { href: "#assembly", label: "Assembly", Icon: Hammer },
              { href: "/catalog", label: "Catalog", Icon: Package },
              { href: "#rent", label: "Rent", Icon: CalendarClock },
              { href: "#reviews", label: "Reviews", Icon: MessageCircle },
              { href: "#faq", label: "FAQ", Icon: HelpCircle },
              { href: "#contact", label: "Contact", Icon: MessageSquare },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-orange-200 bg-gradient-to-br from-orange-100 via-white to-amber-100 shadow-md backdrop-blur-md px-2 py-3 text-center hover:border-orange-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold text-foreground">{label}</span>
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand text-brand" />)}</div>
              <span className="text-muted-foreground">
                <b className="text-foreground">4.9/5</b>
                {" · "}
                {reviewCount !== null ? reviewCount : "—"} Google Reviews
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border">
            <img src={heroImg} alt="Toys Repair workshop with ride-on car, bike and RC truck surrounded by tools" className="w-full h-auto" />
         
          </div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 shadow-card hidden sm:flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Warranty</div>
              <div className="text-sm font-semibold">Guaranteed</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-4 bottom-10 glass rounded-2xl px-4 py-3 shadow-card hidden sm:flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Doorstep</div>
              <div className="text-sm font-semibold">Pickup & Drop</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}