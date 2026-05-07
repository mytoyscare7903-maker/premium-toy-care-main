import { useState } from "react";
import { MessageCircle, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";

export function BookContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const book = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${name}%0APhone: ${phone}%0AProblem: ${msg}`;
    window.open(`https://wa.me/917903913346?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-surface/30 border-y border-border">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Book Service</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Get a Quote in <span className="text-gradient-brand">Minutes</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fill in the form — we'll get back to you on WhatsApp with a clear estimate and timeline.
          </p>

          <form onSubmit={book} className="mt-8 space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your Name"
              className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone Number" type="tel"
              className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand" />
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} required placeholder="Describe the problem..." rows={4}
              className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand resize-none" />
            <button type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-[1.02] transition-transform">
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border overflow-hidden shadow-elegant h-full min-h-[400px]">
            <iframe
              title="MyToysCare Location"
              src="https://maps.google.com/maps?q=Ramamurthy+Nagar+Bengaluru&output=embed"
              className="w-full h-full min-h-[400px] grayscale-[30%]"
              loading="lazy"
            />
          </div>
          <a href="https://maps.google.com/?q=Ramamurthy+Nagar+Bengaluru" target="_blank" rel="noopener"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition">
            <MapPin className="h-4 w-4" /> Ramamurthy Nagar, Bengaluru 560016
          </a>
        </Reveal>
      </div>
    </section>
  );
}