"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.8 })
        .from(
          ".hero-line",
          { y: 80, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.4"
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-meta", { opacity: 0, duration: 0.8 }, "-=0.3");
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-end pb-24 md:pb-32 pt-32"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
          poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/35 to-background" />
      </div>

      {/* Content */}
      <div className="container-rift relative z-10 w-full">
        <div className="hero-eyebrow flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-8 md:w-12 h-px bg-accent" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
            Lagos / Worldwide Est. 2026
          </span>
        </div>

        <h1 className="font-display font-extrabold text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[13rem] leading-[0.85] tracking-tight mb-6 md:mb-8">
          <span className="hero-line block">We build</span>
          <span className="hero-line block">
            what others can<span className="text-accent">'</span>t
          </span>
          <span className="hero-line block italic font-serif font-normal">
            imagine<span className="text-accent">.</span>
          </span>
        </h1>

        <div className="hero-sub max-w-xl mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-muted leading-relaxed text-balance">
            Websites and voice agents for businesses that refuse to look like
            everyone else.
          </p>
        </div>

        <div className="hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-primary transition-colors"
          >
            Book a project
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest text-muted hover:text-primary transition-colors"
          >
            <span className="w-8 h-px bg-current" />
            See the work
          </a>
        </div>
      </div>

      {/* Bottom meta strip — desktop only */}
      <div className="hero-meta absolute bottom-6 left-0 right-0 container-rift hidden md:flex items-end justify-between text-xs uppercase tracking-[0.3em] text-muted">
        <span>Currently booking 2026</span>
        <span className="flex items-center gap-2">
          Scroll
          <span className="w-px h-8 bg-muted animate-pulse" />
        </span>
      </div>
    </section>
  );
}
