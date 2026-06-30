import VisibilityCheck from "@/components/VisibilityCheck";

export default function VisibilityCheckSection() {
  return (
    <section id="check" className="py-24 md:py-32 lg:py-40 container-rift scroll-mt-24">
      <div className="mb-12 md:mb-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-px bg-accent" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
            Visibility check
          </span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[0.92] tracking-tight mb-6">
          Find out where customers are slipping away
        </h2>
        <p className="text-base md:text-lg text-muted leading-relaxed text-balance">
          Answer six quick questions and get a score out of 100. It takes about two minutes
          and shows you where your online presence is strong and where you&apos;re losing
          sales.
        </p>
      </div>

      <VisibilityCheck />
    </section>
  );
}
