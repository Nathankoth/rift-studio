"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "Day 1",
    description:
      "We dig into your business, your customers, and your competition. You get a written brief and wireframe sketches. You sign off before we code anything.",
  },
  {
    number: "02",
    title: "Build",
    duration: "Day 2 to 10",
    description:
      "We build on Next.js and ship to Vercel. The site loads fast, works on mobile, ranks in search. You see it live as we build.",
  },
  {
    number: "03",
    title: "Review",
    duration: "Day 10 to 13",
    description:
      "Two rounds of changes included. We ship refinements same day.",
  },
  {
    number: "04",
    title: "Launch",
    duration: "Day 14",
    description:
      "Site goes live. We set up analytics, hand over the code, and I'm on call for 30 days. You own everything.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".process-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".process-step", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 md:py-32 lg:py-48 bg-surface border-y border-border"
    >
      <div className="container-rift">
        <div className="process-heading mb-16 md:mb-24 lg:mb-32">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-px bg-accent" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
              How we work
            </span>
          </div>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-huge leading-[0.9] tracking-tight max-w-4xl">
            Two weeks.<br />
            <span className="italic font-serif font-normal text-muted">
              No surprises.
            </span>
          </h2>
          <p className="mt-6 md:mt-8 max-w-xl text-muted text-base md:text-lg leading-relaxed">
            A clear, fixed process so you know exactly what happens, when, and
            what you get. No agency theatre.
          </p>
        </div>

        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-step relative bg-background border border-border rounded-2xl p-6 sm:p-7 md:p-8"
            >
              <div className="flex items-baseline justify-between mb-6 md:mb-8">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-accent">
                  {step.number}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted">
                  {step.duration}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-3 md:mb-4">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
