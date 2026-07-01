"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

const CONTACT_EMAIL = "RiftDigitalStudio@volarisglobal.com";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || menuOpen ? "py-3 md:py-4 bg-background/80 backdrop-blur-md" : "py-5 md:py-6"
        )}
      >
        <div className="container-rift flex items-center justify-between gap-3 min-w-0">
          <a
            href="/"
            className="font-display font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight relative z-50 min-w-0 shrink"
            onClick={() => setMenuOpen(false)}
            aria-label="RIFT Digital Solution"
          >
            <span className="md:hidden text-accent">RIFT</span>
            <span className="hidden md:inline">
              <span className="text-accent">RIFT</span> Digital Solution
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 xl:gap-10 shrink-0">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-widest text-muted hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/#check"
            className="hidden lg:inline-flex group items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full border border-border hover:border-accent hover:bg-accent hover:text-background transition-all duration-300 shrink-0"
          >
            <span className="text-xs xl:text-sm uppercase tracking-widest whitespace-nowrap">
              Check my visibility
            </span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={clsx(
                "block h-px bg-primary transition-all duration-300",
                menuOpen ? "w-6 rotate-45 translate-y-[3px]" : "w-6"
              )}
            />
            <span
              className={clsx(
                "block h-px bg-primary transition-all duration-300",
                menuOpen ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4 ml-auto"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden",
          menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="container-rift h-full flex flex-col justify-center pt-20 pb-12">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "font-display font-extrabold text-5xl sm:text-6xl uppercase tracking-tight hover:text-accent transition-all duration-500",
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: menuOpen ? `${i * 80 + 200}ms` : "0ms" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-12 pt-12 border-t border-border">
            <a
              href="/#check"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-sm"
            >
              Get my free score
              <span>→</span>
            </a>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted break-all">
              {CONTACT_EMAIL}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">
              Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
