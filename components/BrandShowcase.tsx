"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Each card defines its content and position. Positions use percentages so
// they scale with the viewport. Rotation is reduced on smaller screens via CSS.
const cards = [
  {
    id: 1,
    type: "brand",
    className: "top-[2%] left-[2%] w-[22%] rotate-[-6deg]",
    content: (
      <div className="w-full h-full bg-[#1a1916] text-[#F5F0EB] p-6 flex flex-col justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#7a7672]">
          Brand · 2026
        </div>
        <div className="font-serif text-3xl md:text-5xl">Noir</div>
        <div className="text-[10px] text-[#7a7672]">Fashion / Identity</div>
      </div>
    ),
  },
  {
    id: 2,
    type: "stat",
    className: "top-[5%] right-[3%] w-[18%] rotate-[8deg]",
    content: (
      <div className="w-full h-full bg-[#F5F0EB] text-[#0f0e0d] p-6 flex flex-col justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#7a7672]">
          Conversion
        </div>
        <div className="font-display font-extrabold text-4xl md:text-6xl leading-none">
          +312<span className="text-[#FF4D00]">%</span>
        </div>
        <div className="text-xs leading-tight">
          Increase in qualified leads after rebuild.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    type: "editorial",
    className: "top-[28%] left-[4%] w-[20%] rotate-[5deg]",
    content: (
      <div className="w-full h-full bg-[#0f0e0d] text-[#F5F0EB] p-5 flex flex-col justify-between">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-[#7a7672]">
          <span>Editorial</span>
          <span>01</span>
        </div>
        <div>
          <div className="font-display font-extrabold text-xl md:text-2xl leading-tight">
            Architectural Dialogues
          </div>
          <div className="mt-2 font-serif italic text-xs text-[#FF4D00]">
            on form & function
          </div>
        </div>
        <div className="w-full h-px bg-[#2a2825]" />
      </div>
    ),
  },
  {
    id: 4,
    type: "service",
    className: "top-[32%] right-[5%] w-[22%] rotate-[-7deg]",
    content: (
      <div className="w-full h-full bg-[#FF4D00] text-[#0f0e0d] p-6 flex flex-col justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em]">
          Voice Agent
        </div>
        <div className="font-display font-extrabold text-2xl md:text-3xl leading-tight">
          24/7<br />intake.<br />Zero<br />missed<br />calls.
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
          <span className="w-6 h-px bg-[#0f0e0d]" />
          Live
        </div>
      </div>
    ),
  },
  {
    id: 5,
    type: "quote",
    className: "bottom-[8%] left-[8%] w-[24%] rotate-[-4deg]",
    content: (
      <div className="w-full h-full bg-[#F5F0EB] text-[#0f0e0d] p-6 flex flex-col justify-between">
        <div className="font-display text-3xl md:text-4xl text-[#FF4D00] leading-none">
          "
        </div>
        <div className="font-serif italic text-sm md:text-base leading-snug">
          Design is how it works. Not how it looks.
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#7a7672]">
          Studio Principle
        </div>
      </div>
    ),
  },
  {
    id: 6,
    type: "product",
    className: "bottom-[10%] right-[6%] w-[20%] rotate-[6deg]",
    content: (
      <div className="w-full h-full bg-[#1a1916] text-[#F5F0EB] p-5 flex flex-col justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#7a7672]">
          Ecommerce
        </div>
        <div>
          <div className="font-serif text-2xl md:text-3xl">Aether</div>
          <div className="text-[10px] text-[#7a7672] mt-1">Skincare line</div>
        </div>
        <div className="flex justify-between items-end text-[10px]">
          <span className="text-[#FF4D00]">In stock</span>
          <span className="font-display font-bold text-base">$48</span>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    type: "process",
    className: "bottom-[2%] left-[40%] w-[20%] rotate-[3deg]",
    content: (
      <div className="w-full h-full bg-[#F5F0EB] text-[#0f0e0d] p-5 flex flex-col justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#7a7672]">
          Process · 05 weeks
        </div>
        <div className="flex items-center justify-between gap-2 text-[9px] uppercase tracking-widest">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full border border-[#2a2825] flex items-center justify-center">
              ◇
            </div>
            <span>Discover</span>
          </div>
          <div className="flex-1 h-px bg-[#2a2825]" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-[#FF4D00] flex items-center justify-center">
              ▲
            </div>
            <span>Build</span>
          </div>
          <div className="flex-1 h-px bg-[#2a2825]" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full border border-[#2a2825] flex items-center justify-center">
              ●
            </div>
            <span>Ship</span>
          </div>
        </div>
        <div className="text-[10px] text-[#7a7672]">
          From kickoff to launch.
        </div>
      </div>
    ),
  },
];

export default function BrandShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Headline reveal
      gsap.from(".showcase-line", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.from(".showcase-meta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Floating cards reveal — desktop only (mobile uses stacked grid)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.from(".showcase-card", {
          y: 80,
          opacity: 0,
          scale: 0.92,
          duration: 1,
          stagger: { each: 0.08, from: "random" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });

        // Subtle parallax on scroll
        gsap.utils.toArray<HTMLElement>(".showcase-card").forEach((card, i) => {
          const speed = (i % 3) - 1; // -1, 0, 1
          if (speed === 0) return;
          gsap.to(card, {
            y: speed * 60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });

      // Mobile: simpler card reveal
      mm.add("(max-width: 767px)", () => {
        gsap.from(".showcase-card", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".showcase-mobile-grid",
            start: "top 80%",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F0EB] text-[#0f0e0d] overflow-hidden"
    >
      {/* DESKTOP / TABLET — scattered layout */}
      <div className="hidden md:block relative min-h-[140vh] py-32">
        {/* Floating cards */}
        {cards.map((card) => (
          <div
            key={card.id}
            className={`showcase-card absolute z-0 aspect-[4/5] shadow-2xl rounded-lg overflow-hidden ${card.className}`}
            style={{ transformOrigin: "center" }}
          >
            {card.content}
          </div>
        ))}

        {/* Centered headline — blend inverts over cards beneath */}
        <div className="container-rift flex flex-col items-center justify-center min-h-[140vh] text-center px-6">
          <div className="showcase-meta flex items-center gap-3 mb-8 relative z-10">
            <span className="w-12 h-px bg-[#FF4D00]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#7a7672]">
              The work in motion
            </span>
            <span className="w-12 h-px bg-[#FF4D00]" />
          </div>
          <h2 className="font-display font-extrabold leading-[0.9] tracking-tight text-balance mix-blend-difference text-[#F5F0EB] relative z-20 pointer-events-none">
            <span className="showcase-line block text-5xl md:text-7xl lg:text-[7rem]">
              Digital identities
            </span>
            <span className="showcase-line block text-5xl md:text-7xl lg:text-[7rem]">
              for ambitious
            </span>
            <span className="showcase-line block text-5xl md:text-7xl lg:text-[7rem] italic font-serif font-normal">
              brands<span className="text-[#FF4D00]">.</span>
            </span>
          </h2>
          <p className="showcase-meta mt-10 max-w-xl text-base md:text-lg text-[#7a7672] leading-relaxed relative z-10">
            We don't sell templates. We build digital systems that look the way
            ambitious businesses actually feel sharp, fast, and unmistakably
            theirs.
          </p>
        </div>
      </div>

      {/* MOBILE — stacked layout (cards in a clean grid below the headline) */}
      <div className="md:hidden py-20 px-6">
        <div className="text-center mb-16">
          <div className="showcase-meta flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#FF4D00]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a7672]">
              The work in motion
            </span>
            <span className="w-8 h-px bg-[#FF4D00]" />
          </div>
          <h2 className="font-display font-extrabold leading-[0.9] tracking-tight text-balance">
            <span className="showcase-line block text-[2.75rem] sm:text-6xl">
              Digital identities
            </span>
            <span className="showcase-line block text-[2.75rem] sm:text-6xl">
              for ambitious
            </span>
            <span className="showcase-line block text-[2.75rem] sm:text-6xl italic font-serif font-normal">
              brands<span className="text-[#FF4D00]">.</span>
            </span>
          </h2>
          <p className="showcase-meta mt-8 text-base text-[#7a7672] leading-relaxed text-balance">
            We don't sell templates. We build digital systems that look the way
            ambitious businesses actually feel.
          </p>
        </div>

        <div className="showcase-mobile-grid grid grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={`showcase-card aspect-[4/5] rounded-lg overflow-hidden shadow-xl ${
                i === 3 || i === 6 ? "col-span-2 aspect-[8/5]" : ""
              }`}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
