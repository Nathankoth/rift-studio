export default function Marquee() {
  const items = [
    "Web Design",
    "Voice Agents",
    "Brand Identity",
    "Web Development",
    "Motion Design",
    "Strategy",
  ];

  const loop = [...items, ...items];

  return (
    <section
      className="border-y border-border py-6 md:py-8 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-8 px-6 md:px-8">
            <span className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {item}
            </span>
            <span className="text-accent text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
