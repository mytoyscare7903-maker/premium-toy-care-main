import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoFallback from "@/assets/logo-icon.png";

const links = [
  { to: "/", label: "Home", hash: "#home" },
  { to: "/", label: "About", hash: "#about" },
  { to: "/", label: "Services", hash: "#services" },
  { to: "/catalog", label: "Spare Parts" },
  { to: "/catalog", label: "DIY Projects", hash: "#diy-projects" },
  { to: "/", label: "Rent", hash: "#rent" },
  { to: "/", label: "Reviews", hash: "#reviews" },
  { to: "/", label: "FAQ", hash: "#faq" },
  { to: "/", label: "Contact", hash: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  const isCatalog = location.pathname === "/catalog";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When scrolled on the white homepage: white frosted nav with dark text
  // All other states (not scrolled, or on catalog): semi-transparent dark nav with white text
  const isLightNav = scrolled && !isCatalog;

  const navContainerClass = isLightNav
    ? "bg-white/92 backdrop-blur-md shadow-sm border-slate-200/70"
    : "bg-black/18 backdrop-blur-md border-white/12";

  const linkClass = isLightNav
    ? "px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand transition-colors rounded-lg hover:bg-slate-100"
    : "px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10";

  const logoTextClass = isLightNav ? "text-slate-800" : "text-white";
  const menuIconClass = isLightNav ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 ${navContainerClass}`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="MyToysCare logo"
              width={52}
              height={52}
              onError={(e) => { e.currentTarget.src = logoFallback; }}
              className="h-13 w-13 object-contain drop-shadow-[0_0_16px_rgba(255,122,26,0.65)] group-hover:drop-shadow-[0_0_24px_rgba(255,122,26,0.90)] group-hover:scale-110 transition-all duration-300"
            />
            <span className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${logoTextClass}`}>
              MyToys<span className="text-gradient-brand">Care</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.label}>
                {l.hash && location.pathname === l.to ? (
                  <a href={l.hash} className={linkClass}>
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.to}
                    hash={l.hash?.replace("#", "")}
                    className={linkClass}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/916204594205"
            target="_blank"
            rel="noopener"
            className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-glow hover:scale-105 transition-transform"
          >
            Book Service
          </a>

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden rounded-lg p-2 transition-colors ${menuIconClass}`}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className={`lg:hidden mt-2 rounded-2xl p-4 ${isLightNav ? "bg-white shadow-elegant border border-slate-200/60" : "glass"}`}>
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.hash ? `${l.to}${l.hash}` : l.to}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isLightNav
                        ? "text-slate-600 hover:text-brand hover:bg-slate-100"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <a
                href="https://wa.me/916204594205"
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
