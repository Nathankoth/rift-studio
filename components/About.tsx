"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-line", {
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

      gsap.from(".about-stat", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 lg:py-48 container-rift"
    >
      <div className="grid md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-px bg-accent" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
              Why RIFT
            </span>
          </div>

          <div className="aspect-[4/5] bg-surface border border-border rounded-2xl md:rounded-3xl overflow-hidden relative max-w-md md:max-w-none mx-auto md:mx-0">
            <Image
              src="/images/founder.png"
              alt="Nathan, founder of RIFT Digital Solution"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div className="mt-6 text-sm">
            <p className="font-display font-bold text-lg">Nathan</p>
            <p className="text-muted">Founder, RIFT Digital Solution</p>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8 lg:pl-12">
          <h2 className="about-line font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight mb-8 md:mb-10">
            <span className="about-line block">We plug the leaks</span>
            <span className="about-line block italic font-serif font-normal">
              so customers stick<span className="text-accent">.</span>
            </span>
          </h2>

          <div className="space-y-5 md:space-y-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            <p className="about-line">
              Most Lagos businesses lose customers in three places. They&apos;re
              hard to find on Google, they hand a big cut to delivery apps, and
              they miss calls during the rush. We plug those leaks, so the
              attention you&apos;re already earning turns into paying customers.
            </p>
          </div>

          <div className="about-stats grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 pt-10 md:pt-12 border-t border-border">
            <div className="about-stat">
              <p className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-accent leading-snug">
                Hard to find on Google
              </p>
            </div>
            <div className="about-stat">
              <p className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-accent leading-snug">
                Big cuts to delivery apps
              </p>
            </div>
            <div className="about-stat">
              <p className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-accent leading-snug">
                Missed calls in the rush
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
