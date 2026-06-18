"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Web & Digital",
    tagline: "Sites that put you ahead.",
    body: "High performance landing pages, web apps, and brand sites built on modern stacks. Designed to load fast, rank well, and convert.",
    deliverables: ["Brand sites", "Landing pages", "Web apps", "Ecommerce"],
  },
  {
    number: "02",
    title: "Voice Agents",
    tagline: "Never miss a call again.",
    body: "Custom AI receptionists that handle calls, book appointments, and qualify leads 24/7. Deployed per business with your tone, your data.",
    deliverables: ["Web voice widgets", "Lead capture", "Appointment booking", "Custom training"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".services-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 lg:py-48 container-rift"
    >
      <div className="services-heading mb-16 md:mb-24 lg:mb-32">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-px bg-accent" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
            What we do
          </span>
        </div>
        <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-huge leading-[0.9] tracking-tight max-w-4xl">
          Two lanes.<br />
          <span className="italic font-serif font-normal text-muted">
            One outcome.
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-10">
        {services.map((service) => (
          <article
            key={service.number}
            className="service-card group relative bg-surface border border-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 hover:border-accent transition-colors duration-500"
          >
            <div className="mb-8 md:mb-12">
              <span className="font-display text-xs sm:text-sm tracking-widest text-muted">
                {service.number}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
              {service.title}
            </h3>
            <p className="font-serif italic text-xl sm:text-2xl text-accent mb-6 md:mb-8">
              {service.tagline}
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-8 md:mb-10 text-balance">
              {service.body}
            </p>

            <ul className="flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1.5 border border-border rounded-full text-muted"
                >
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
