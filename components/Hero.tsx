"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      // Some browsers block autoplay until user interaction.
    });
  }, []);

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
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/30 to-transparent" />
      </div>

      <div className="container-rift relative z-10 w-full">
        <div className="hero-eyebrow flex flex-wrap items-center gap-3 mb-6 md:mb-8">
          <span className="w-8 md:w-12 h-px bg-accent shrink-0" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted">
            RIFT Digital Solution, Lagos
          </span>
        </div>

        <h1 className="font-display font-extrabold text-[2.75rem] min-[400px]:text-[3rem] sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] leading-[0.92] sm:leading-[0.9] tracking-tight mb-6 md:mb-8 max-w-5xl">
          <span className="hero-line block">Get found.</span>
          <span className="hero-line block">Look credible.</span>
          <span className="hero-line block italic font-serif font-normal">
            Win more customers<span className="text-accent">.</span>
          </span>
        </h1>

        <div className="hero-sub max-w-2xl mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-muted leading-relaxed text-balance">
            RIFT Digital Solution builds fast, custom websites and AI tools for
            Lagos businesses, then gets you showing up where your customers are
            already looking.
          </p>
        </div>

        <div className="hero-cta flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
          <a
            href="#check"
            className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-primary transition-colors w-full sm:w-auto"
          >
            Get my free score
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#services"
            className="group inline-flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm uppercase tracking-widest text-muted hover:text-primary transition-colors w-full sm:w-auto py-2 sm:py-0"
          >
            <span className="w-8 h-px bg-current" />
            See what we do
          </a>
        </div>
      </div>

      <div className="hero-meta absolute bottom-6 left-0 right-0 container-rift hidden md:flex items-end justify-between text-xs uppercase tracking-[0.3em] text-muted">
        <span>Free visibility check</span>
        <span className="flex items-center gap-2">
          Scroll
          <span className="w-px h-8 bg-muted animate-pulse" />
        </span>
      </div>
    </section>
  );
}
