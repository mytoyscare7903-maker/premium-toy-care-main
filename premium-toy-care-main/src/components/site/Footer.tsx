import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoFallback from "@/assets/logo-icon.png";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="MyToysCare logo" width={52} height={52} loading="lazy" onError={(e) => { e.currentTarget.src = logoFallback; }} className="h-13 w-13 object-contain drop-shadow-[0_0_16px_rgba(255,122,26,0.65)]" />
              <span className="font-display text-lg font-bold">
                MyToys<span className="text-gradient-brand">Care</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional Toy & Hover board Repair & Rental Service in Bangalore for kids bikes, ride-ons, RC hobby cars ,  Hover board and more.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-brand mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#home" className="text-muted-foreground hover:text-brand transition">Home</a></li>
              <li><a href="/#services" className="text-muted-foreground hover:text-brand transition">Services</a></li>
              <li><Link to="/catalog" className="text-muted-foreground hover:text-brand transition">Spare Parts</Link></li>
              <li><a href="/#rent" className="text-muted-foreground hover:text-brand transition">Toys for Rent</a></li>
              <li><a href="/#faq" className="text-muted-foreground hover:text-brand transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-brand mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="tel:+917903913346" className="flex items-start gap-2 text-muted-foreground hover:text-brand transition">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" /> +91 7903913346
              </a></li>
              <li><a href="https://maps.google.com/?q=Ramamurthy+Nagar+Bengaluru" target="_blank" rel="noopener" className="flex items-start gap-2 text-muted-foreground hover:text-brand transition">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Ramamurthy Nagar, Bengaluru 560016
              </a></li>
              <li><a href="mailto:info@mytoyscare.com" className="flex items-start gap-2 text-muted-foreground hover:text-brand transition">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" /> info@mytoyscare.com
              </a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-brand mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                {
                  Icon: Instagram,
                  href: "https://instagram.com/nitin562560",
                  label: "Instagram",
                  bg: "bg-[linear-gradient(45deg,#feda75,#fa7e1e_25%,#d62976_50%,#962fbf_75%,#4f5bd5)]",
                },
                {
                  Icon: Facebook,
                  href: "https://facebook.com/yourpage",
                  label: "Facebook",
                  bg: "bg-[#1877F2]",
                },
                {
                  Icon: Youtube,
                  href: "https://youtube.com/@yourchannel",
                  label: "Youtube",
                  bg: "bg-[#FF0000]",
                },
              ].map(({ Icon, href, label, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-xl ${bg} text-white shadow-card border border-white/10 hover:-translate-y-1 hover:shadow-glow transition-all duration-300`}
                >
                  <Icon className="h-5 w-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {CURRENT_YEAR} MyToysCare. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}