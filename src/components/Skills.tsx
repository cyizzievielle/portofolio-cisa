import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { SectionTitle } from "./ui/SectionTitle";
import { skillGroups } from "../data/skills";
import { PhysicsSkills } from "./ui/PhysicsSkills";

export function Skills() {
  const { dark } = useTheme();
  const [showPhysics, setShowPhysics] = useState(false);
  const softCard = dark
    ? "border-violet-500/15 bg-violet-400/5 hover:border-violet-400/30 hover:bg-violet-400/10"
    : "border-rose-200 bg-white hover:border-rose-300 hover:bg-rose-50/20";

  return (
    <section id="skills" className="reveal mx-auto max-w-6xl px-5 py-16">
      <SectionTitle label="Skills" title="Tools & Tech Stack" />

      {/* Toggle Physics Playground Button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setShowPhysics(!showPhysics)}
          className="rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 px-6 py-3 text-xs sm:text-sm font-black text-white shadow-[0_12px_30px_rgba(168,85,247,0.25)] transition hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          {showPhysics ? "📋 Show Standard List" : "🎮 Play with Tech Stack"}
        </button>
      </div>

      {showPhysics ? (
        <PhysicsSkills />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <div
            key={group.title}
            className={`animate-card-in rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(168,85,247,0.18)] ${dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60"
              }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Category Header */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">{group.emoji}</span>
              <h3 className="text-lg font-bold bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
                {group.title}
              </h3>
            </div>

            {/* Marquee Wrapper - Hidden overflow on mobile, normal on desktop */}
            <div className="relative w-full overflow-hidden no-scrollbar">
              <div className="flex gap-2.5 w-max animate-marquee sm:animate-none sm:w-auto sm:flex-wrap sm:overflow-x-visible">

                {/* Original Items */}
                {group.items.map((skill) => (
                  <div
                    key={`${skill.name}-orig`}
                    className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(168,85,247,0.12)] shrink-0 ${softCard}`}
                  >
                    <span className="shrink-0 text-lg" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span
                      className={`text-xs font-bold ${dark ? "text-rose-200/90" : "text-[#4a3558]"
                        }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}

                {/* Duplicate Items for Seamless Mobile Loop (Hidden on Desktop) */}
                {group.items.map((skill) => (
                  <div
                    key={`${skill.name}-dup`}
                    className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(168,85,247,0.12)] shrink-0 sm:hidden ${softCard}`}
                  >
                    <span className="shrink-0 text-lg" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span
                      className={`text-xs font-bold ${dark ? "text-rose-200/90" : "text-[#4a3558]"
                        }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        ))}
      </div>
      )}
    </section>
  );
}
