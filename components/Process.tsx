"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Audit",
    description:
      "We score your online presence and show you where customers are slipping away.",
  },
  {
    number: "02",
    title: "Agreement",
    description:
      "We confirm the scope and you secure your slot with a deposit.",
  },
  {
    number: "03",
    title: "Onboarding",
    description:
      "You send your assets and access, and we set up the project.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "We design and build your website in 5 working days.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "We take you live and set up your Google Business Profile and Analytics.",
  },
  {
    number: "06",
    title: "Growth",
    description:
      "We keep improving your visibility and bookings every month.",
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
              How it works
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-huge leading-[0.92] tracking-tight max-w-4xl">
            5 working days.<br />
            <span className="italic font-serif font-normal text-muted">
              Clear steps.
            </span>
          </h2>
          <p className="mt-6 md:mt-8 max-w-xl text-muted text-base md:text-lg leading-relaxed">
            You know what happens, when it happens, and what you get at each
            stage. No guesswork.
          </p>
        </div>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-step relative bg-background border border-border rounded-2xl p-6 sm:p-7 md:p-8"
            >
              <div className="mb-6 md:mb-8">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-accent">
                  {step.number}
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
