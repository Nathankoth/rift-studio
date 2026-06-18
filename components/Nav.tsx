"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

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
        <div className="container-rift flex items-center justify-between">
          <a
            href="#"
            className="font-display font-extrabold text-xl md:text-2xl tracking-tight relative z-50"
            onClick={() => setMenuOpen(false)}
          >
            RIFT<span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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
            href="#contact"
            className="hidden md:inline-flex group items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-accent hover:bg-accent hover:text-background transition-all duration-300"
          >
            <span className="text-sm uppercase tracking-widest">Start a project</span>
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
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-3 px-6 py-4 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-sm"
            >
              Start a project
              <span>→</span>
            </a>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted">
              riftstudio@volarisgloba.com
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
