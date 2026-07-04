import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { SectionTitle } from "./ui/SectionTitle";
import { experiences } from "../data/experiences";

export function Experience() {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";
  const softCard = dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60";

  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeItems, setActiveItems] = useState<boolean[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of scroll
      const totalHeight = rect.height;
      const startY = windowHeight * 0.85; // starts filling when top is 85% down screen
      const endY = windowHeight * 0.35;   // fully filled when bottom is 35% down screen
      
      const progressStart = startY;
      const progressEnd = endY - totalHeight;

      let percentage = (progressStart - rect.top) / (progressStart - progressEnd);
      percentage = Math.max(0, Math.min(100, percentage * 100));
      setLineHeight(percentage);

      // Determine active items based on screen position
      const items = containerRef.current.querySelectorAll(".timeline-item");
      const activeStates: boolean[] = [];
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        // Dot triggers when it reaches 70% of the viewport height
        activeStates[index] = itemRect.top < windowHeight * 0.7;
      });
      setActiveItems(activeStates);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Trigger initial calculation
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="reveal mx-auto max-w-6xl px-5 py-16">
      <SectionTitle label="Experience" title="Work & Organization" />

      {/* Timeline */}
      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {/* Background track line */}
        <div
          className={`absolute left-4 top-3 bottom-3 w-[2px] rounded-full ${
            dark ? "bg-violet-950/40" : "bg-rose-100"
          }`}
        />

        {/* Animated Progress Line */}
        <div
          className="absolute left-4 top-3 w-[2px] rounded-full bg-gradient-to-b from-rose-400 via-pink-500 to-violet-500 transition-all duration-300 ease-out origin-top shadow-[0_0_8px_rgba(236,72,153,0.4)]"
          style={{ height: `${lineHeight}%` }}
        />

        {experiences.map((item, i) => {
          const isActive = activeItems[i];

          return (
            <div
              key={item.title}
              className="timeline-item relative mb-10 last:mb-0 pl-12"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Timeline dot on the left */}
              <div
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 h-5 w-5 rounded-full border-[3px] -translate-x-[3px] transition-all duration-500 ease-out ${
                  isActive
                    ? dark
                      ? "border-pink-500 bg-violet-400 scale-110 shadow-[0_0_15px_#ec4899]"
                      : "border-rose-500 bg-pink-400 scale-110 shadow-[0_0_15px_#f43f5e]"
                    : dark
                      ? "border-violet-500/30 bg-[#0c0515]"
                      : "border-rose-300/40 bg-[#fdf8ff]"
                }`}
              />

              {/* Card - spans full width */}
              <div
                className={`animate-card-in rounded-[22px] border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(168,85,247,0.18)] ${softCard} ${
                  isActive
                    ? dark
                      ? "border-violet-400/30 bg-gradient-to-br from-violet-400/12 to-rose-400/5 shadow-[0_10px_30px_rgba(168,85,247,0.1)]"
                      : "border-rose-300 bg-gradient-to-br from-rose-50 to-violet-50/50 shadow-[0_10px_30px_rgba(244,63,94,0.06)]"
                    : ""
                }`}
              >
                {/* Year badge */}
                <span className="inline-flex rounded-full border border-violet-300/20 bg-gradient-to-r from-rose-400/10 to-violet-400/10 px-3 py-1 text-xs font-black text-rose-500">
                  {item.role}
                </span>

                <h3 className="mt-3 text-xl font-extrabold bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
                  {item.title}
                </h3>

                <p className={`mt-2 text-sm leading-7 ${muted}`}>{item.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs font-bold text-rose-500 ${softCard}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
