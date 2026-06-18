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
              About RIFT
            </span>
          </div>

          <div className="aspect-[4/5] bg-surface border border-border rounded-2xl md:rounded-3xl overflow-hidden relative max-w-md md:max-w-none mx-auto md:mx-0">
            <Image
              src="/images/founder.png"
              alt="Nathan, founder of RIFT Studio"
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          <div className="mt-6 text-sm">
            <p className="font-display font-bold text-lg">Nathan</p>
            <p className="text-muted">Founder, RIFT Studio</p>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8 lg:pl-12">
          <h2 className="about-line font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8 md:mb-10">
            <span className="about-line block">A studio for businesses</span>
            <span className="about-line block">that want their digital</span>
            <span className="about-line block italic font-serif font-normal">
              presence to lead<span className="text-accent">,</span> not follow.
            </span>
          </h2>

          <div className="space-y-5 md:space-y-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            <p className="about-line">
              RIFT was started to fix a gap I kept seeing: brilliant Nigerian
              businesses with digital presences that didn't match their ambition.
              Generic templates. Slow load times. AI that nobody had figured out
              how to use yet.
            </p>
            <p className="about-line">
              I build websites that load in under a second, designs that earn
              attention, and voice agents that actually work for businesses
              ready to look as serious as they are.
            </p>
          </div>

          <div className="about-stats grid grid-cols-3 gap-4 sm:gap-8 mt-12 md:mt-16 pt-10 md:pt-12 border-t border-border">
            <div className="about-stat">
              <p className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-accent">
                &lt;1s
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted mt-2">
                Load times
              </p>
            </div>
            <div className="about-stat">
              <p className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-accent">
                100%
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted mt-2">
                Custom built
              </p>
            </div>
            <div className="about-stat">
              <p className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-accent">
                24/7
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted mt-2">
                AI uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
