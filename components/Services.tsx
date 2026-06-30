"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    number: "01",
    title: "Foundation",
    body: "A one-time build: website, brand basics, Google Business Profile, and Analytics setup.",
  },
  {
    number: "02",
    title: "Growth",
    body: "A monthly retainer: content, Google Business Profile management, and a simple monthly report.",
  },
  {
    number: "03",
    title: "Voice agents",
    tag: "Add-on",
    body: "An AI voice agent that answers your calls and takes bookings around the clock.",
  },
  {
    number: "04",
    title: "Ads",
    tag: "Add-on",
    body: "Paid campaigns to put you in front of more customers.",
  },
];

const deliverables = [
  "A custom website that loads fast and works properly on mobile.",
  "Brand basics that give your site a clean, consistent look.",
  "Google Business Profile setup so you show up on Maps and Search.",
  "Google Analytics setup so you can track your visitors from day one.",
  "SEO-driven content that helps more customers find you on Google.",
  "A simple SEO checklist for your side.",
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
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

      gsap.from(".deliverable-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".deliverables-grid",
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
      <div className="services-heading mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-px bg-accent" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
            What we do
          </span>
        </div>
        <p className="max-w-3xl text-muted text-base md:text-lg leading-relaxed text-balance">
          We build your website, set up your Google presence, and keep improving
          how you show up in search. Most websites go live in 5 working days.
          When you&apos;re ready to grow, we add the tools that bring in more
          customers.
        </p>
      </div>

      <div className="mb-20 md:mb-28">
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-10">
          Packages
        </h3>
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <article
              key={pkg.number}
              className="service-card group relative bg-surface border border-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-accent transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <span className="font-display text-xs sm:text-sm tracking-widest text-muted">
                  {pkg.number}
                </span>
                {pkg.tag && (
                  <span className="text-[10px] uppercase tracking-widest text-accent">
                    {pkg.tag}
                  </span>
                )}
              </div>

              <h4 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">
                {pkg.title}
              </h4>
              <p className="text-sm sm:text-base text-muted leading-relaxed text-balance">
                {pkg.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-10">
          What you get
        </h3>
        <ul className="deliverables-grid grid md:grid-cols-2 gap-4 md:gap-6">
          {deliverables.map((item) => (
            <li
              key={item}
              className="deliverable-item flex gap-4 bg-surface border border-border rounded-2xl p-5 md:p-6"
            >
              <span className="text-accent font-display font-bold text-sm mt-0.5">
                ✦
              </span>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
