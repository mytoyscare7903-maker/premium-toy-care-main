import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const links = [
  { to: "/", label: "Home", hash: "#home" },
  { to: "/", label: "About", hash: "#about" },
  { to: "/", label: "Services", hash: "#services" },
  { to: "/catalog", label: "Spare Parts" },
  { to: "/catalog", label: "DIY Projects", hash: "#diy-projects" },
  { to: "/", label: "Rent", hash: "#rent" },
  { to: "/", label: "FAQ", hash: "#faq" },
  { to: "/", label: "Contact", hash: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl border border-border px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-elegant" : "bg-surface/40 backdrop-blur-md"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoIcon}
              alt="MyToysCare logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(255,122,26,0.35)] group-hover:scale-110 transition-transform"
            />
            <span className="font-display text-lg font-bold tracking-tight">
              MyToys<span className="text-gradient-brand">Care</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.label}>
                {l.hash && location.pathname === l.to ? (
                  <a
                    href={l.hash}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors rounded-lg hover:bg-surface-elevated"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.to}
                    hash={l.hash?.replace("#", "")}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors rounded-lg hover:bg-surface-elevated"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/917903913346"
            target="_blank"
            rel="noopener"
            className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-105 transition-transform"
          >
            Book Service
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-lg p-2 text-foreground hover:bg-surface-elevated"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.hash ? `${l.to}${l.hash}` : l.to}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-brand hover:bg-surface-elevated rounded-lg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <a
                href="https://wa.me/917903913346"
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex justify-center items-center rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground"
              >
                Book Service
              </a>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}