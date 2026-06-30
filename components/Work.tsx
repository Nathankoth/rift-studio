"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    client: "1708 Mattress",
    type: "Luxury Ecommerce",
    year: "2026",
    url: "https://1708-mattress.vercel.app/",
    description:
      "An Apple style scroll scrubbed canvas animation that turns a product page into a cinematic experience. Quiet luxury aesthetic with deep teal and gold.",
    tags: ["Vite", "GSAP", "Canvas"],
  },
  {
    number: "02",
    client: "SABI Restaurant",
    type: "Hospitality",
    year: "2026",
    url: "https://sabi-pi.vercel.app/",
    description:
      "Modern African cuisine restaurant landing page with warm editorial typography and full bleed food photography.",
    tags: ["Next.js", "Tailwind", "Sanity"],
  },
  {
    number: "03",
    client: "Nancy",
    type: "AI Infrastructure",
    year: "2026",
    url: "https://nancy-vert.vercel.app/",
    description:
      "A live AI receptionist for restaurants. Natural conversation, instant booking receipts, and manager follow up built in.",
    tags: ["Deepgram", "Next.js", "Edge"],
  },
  {
    number: "04",
    client: "Aso Ebi",
    type: "Bespoke Fashion",
    year: "2026",
    url: "https://aso-ebi-snowy.vercel.app/",
    description:
      "Ceremonial attire landing page with a scroll-scrubbed canvas walk, full-bleed heritage photography, and quiet gilded editorial typography.",
    tags: ["Vite", "GSAP", "Canvas"],
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.from(row, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 md:py-32 lg:py-48 container-rift"
    >
      <div className="work-heading mb-16 md:mb-24 lg:mb-32">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-px bg-accent" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
            Selected work
          </span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-huge leading-[0.92] tracking-tight max-w-4xl">
          Recent<br />
          <span className="italic font-serif font-normal">ruptures.</span>
        </h2>
      </div>

      <div className="border-t border-border">
        {projects.map((project) => (
          <a
            key={project.number}
            href={project.url ?? "#"}
            {...(project.url
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="work-row group block border-b border-border py-8 md:py-12 lg:py-14 md:hover:px-6 transition-all duration-500"
          >
            {/* Desktop layout — multi-column row */}
            <div className="hidden md:grid md:grid-cols-12 gap-6 items-baseline">
              <span className="md:col-span-1 font-display text-sm text-muted">
                {project.number}
              </span>

              <div className="md:col-span-4">
                <h3 className="font-display font-extrabold text-3xl lg:text-5xl leading-none group-hover:text-accent transition-colors">
                  {project.client}
                </h3>
              </div>

              <div className="md:col-span-2 text-xs lg:text-sm uppercase tracking-widest text-muted">
                {project.type}
              </div>

              <div className="md:col-span-3 text-muted text-sm leading-relaxed text-balance">
                {project.description}
              </div>

              <div className="md:col-span-1 text-sm text-muted">
                {project.year}
              </div>

              <div className="md:col-span-1 flex justify-end">
                <span className="w-10 h-10 rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-background flex items-center justify-center transition-all">
                  →
                </span>
              </div>
            </div>

            {/* Mobile layout — stacked card */}
            <div className="md:hidden">
              <div className="flex items-start justify-between mb-4">
                <span className="font-display text-xs text-muted">
                  {project.number} · {project.year}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  {project.type}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl leading-none mb-4 group-hover:text-accent transition-colors">
                {project.client}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-accent">
                View project
                <span className="w-8 h-px bg-accent" />
                <span>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
