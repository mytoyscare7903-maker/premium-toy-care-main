import { useState } from "react";
import { MessageCircle, MapPin, User, Phone, FileText, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

export function BookContact() {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg]     = useState("");

  const book = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${name}%0APhone: ${phone}%0AProblem: ${msg}`;
    window.open(`https://wa.me/917903913346?text=${text}`, "_blank");
  };

  const perks = [
    "Free diagnosis & quote",
    "Transparent pricing",
    "Doorstep pickup included",
  ];

  return (
    <section id="contact" className="py-24 bg-surface/20 border-y border-border">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">

        {/* ── Left: form card ── */}
        <Reveal>
          <div className="rounded-3xl border border-border bg-white shadow-[0_4px_24px_-8px_oklch(0.02_0_0/0.10),0_2px_8px_-4px_oklch(0.02_0_0/0.05)] p-8">
            <div className="mb-7">
              <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-3">Book Service</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Get a Quote in <span className="text-gradient-brand">Minutes</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Fill in the form — we'll get back to you on WhatsApp with a clear estimate and timeline.
              </p>

              {/* Perk chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                    <CheckCircle2 className="h-3 w-3" /> {p}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={book} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  value={name} onChange={(e) => setName(e.target.value)} required
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-border bg-surface/50 pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/50 transition hover:border-border/80"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  value={phone} onChange={(e) => setPhone(e.target.value)} required
                  placeholder="Phone Number" type="tel"
                  className="w-full rounded-xl border border-border bg-surface/50 pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/50 transition hover:border-border/80"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <textarea
                  value={msg} onChange={(e) => setMsg(e.target.value)} required
                  placeholder="Describe the problem — e.g. RC car not turning on…" rows={4}
                  className="w-full rounded-xl border border-border bg-surface/50 pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand/50 transition hover:border-border/80 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-glow hover:scale-[1.015] active:scale-[0.99] transition-transform"
              >
                <MessageCircle className="h-4 w-4" /> Book on WhatsApp
              </button>
            </form>
          </div>
        </Reveal>

        {/* ── Right: map card ── */}
        <Reveal delay={0.1}>
          <div className="relative rounded-3xl border border-border bg-white shadow-[0_4px_24px_-8px_oklch(0.02_0_0/0.10),0_2px_8px_-4px_oklch(0.02_0_0/0.05)] overflow-hidden h-full min-h-[420px] flex flex-col">
            <div className="flex-1 min-h-[340px]">
              <iframe
                title="MyToysCare Location"
                src="https://maps.google.com/maps?q=Ramamurthy+Nagar+Bengaluru&output=embed"
                className="w-full h-full min-h-[340px] grayscale-[20%]"
                loading="lazy"
              />
            </div>
            {/* Address strip */}
            <div className="flex items-center gap-3 px-5 py-4 border-t border-border bg-white">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand border border-brand/15">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">MyToysCare Workshop</p>
                <a
                  href="https://maps.google.com/?q=Ramamurthy+Nagar+Bengaluru"
                  target="_blank" rel="noopener"
                  className="text-xs text-muted-foreground hover:text-brand transition"
                >
                  Ramamurthy Nagar, Bengaluru 560016 →
                </a>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
