"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="contact" className="relative">
      <div className="container-rift py-24 md:py-32 lg:py-48">
        <div className="cta-content max-w-5xl">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="w-8 md:w-12 h-px bg-accent" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
              Start a project
            </span>
          </div>

          <h2 className="font-display font-extrabold text-[3.25rem] sm:text-7xl md:text-8xl lg:text-mega leading-[0.85] tracking-tight mb-8 md:mb-12">
            Let<span className="text-accent">'</span>s build<br />
            <span className="italic font-serif font-normal">something rare.</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl mb-8 md:mb-12 leading-relaxed text-balance">
            Currently booking projects for 2026. Tell us what you're working
            on and we'll get back within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="mailto:riftstudio@volarisgloba.com"
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-primary transition-colors"
            >
              riftstudio@volarisgloba.com
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="https://wa.me/2349169178313"
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-8 sm:py-5 border border-border rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:border-accent transition-colors"
            >
              WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="container-rift py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 md:mb-12">
            <div className="col-span-2">
              <a
                href="#"
                className="font-display font-extrabold text-2xl md:text-3xl tracking-tight"
              >
                RIFT<span className="text-accent">.</span>
              </a>
              <p className="text-muted text-sm mt-4 max-w-xs leading-relaxed">
                Digital studio building websites and voice agents from Lagos
                to the world.
              </p>
            </div>

            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted mb-3 md:mb-4">
                Studio
              </p>
              <ul className="space-y-2 text-sm">
                <li><a href="#work" className="hover:text-accent transition-colors">Work</a></li>
                <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
                <li><a href="#process" className="hover:text-accent transition-colors">Process</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted mb-3 md:mb-4">
                Elsewhere
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/thewrld.vs____/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-8 border-t border-border text-[10px] md:text-xs uppercase tracking-widest text-muted">
            <p>© 2026 RIFT Studio. All rights reserved.</p>
            <p>Lagos, Nigeria Available worldwide</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
