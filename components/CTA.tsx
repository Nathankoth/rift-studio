"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "RiftDigitalStudio@volarisglobal.com";
const CONTACT_PHONE = "+234 811 699 9112";

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
              Get started
            </span>
          </div>

          <h2 className="font-display font-extrabold text-[2.75rem] min-[400px]:text-[3.25rem] sm:text-7xl md:text-8xl lg:text-mega leading-[0.9] tracking-tight mb-8 md:mb-12">
            Ready to get found<span className="text-accent">?</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl mb-8 md:mb-12 leading-relaxed text-balance">
            Take the free visibility check and we&apos;ll show you where customers are
            slipping away, and how to win them back.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#check"
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-primary transition-colors w-full sm:w-auto"
            >
              Get my free score
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="https://wa.me/2348116999112"
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-8 sm:py-5 border border-border rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:border-accent transition-colors w-full sm:w-auto"
            >
              WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="container-rift py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-12">
            <div className="sm:col-span-2">
              <a
                href="/"
                className="font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight leading-tight inline-block"
              >
                <span className="text-accent">RIFT</span> Digital Solution
              </a>
              <p className="text-muted text-sm mt-4 max-w-sm leading-relaxed">
                Fast websites, Google presence, and AI tools for Lagos
                businesses.
              </p>
            </div>

            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted mb-3 md:mb-4">
                Navigate
              </p>
              <ul className="space-y-2 text-sm">
                <li><a href="/#work" className="hover:text-accent transition-colors">Work</a></li>
                <li><a href="/#services" className="hover:text-accent transition-colors">Services</a></li>
                <li><a href="/#process" className="hover:text-accent transition-colors">Process</a></li>
                <li><a href="/#about" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-accent transition-colors">Insights</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted mb-3 md:mb-4">
                Contact
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-accent transition-colors break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2348116999112"
                    className="hover:text-accent transition-colors"
                  >
                    {CONTACT_PHONE}
                  </a>
                </li>
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

          <div className="pt-8 border-t border-border text-[10px] md:text-xs uppercase tracking-widest text-muted space-y-2">
            <p className="leading-relaxed break-words">
              RIFT Digital Solution, Lagos, Nigeria
            </p>
            <p className="leading-relaxed break-all">{CONTACT_EMAIL}</p>
            <p>{CONTACT_PHONE}</p>
            <p className="pt-2 normal-case tracking-normal text-muted/80">
              © 2026 RIFT Digital Solution. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
