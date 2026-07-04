import { useTheme } from "../context/ThemeContext";
import { SectionTitle } from "./ui/SectionTitle";
import { hobbies } from "../data/hobbies";

export function Hobbies() {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";

  return (
    <section id="hobbies" className="reveal mx-auto max-w-6xl px-5 py-16">
      <SectionTitle label="Hobbies" title="Things I Love" />
      
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="-mx-5 flex gap-6 overflow-x-auto px-5 pb-6 no-scrollbar snap-x snap-mandatory sm:mx-0 sm:grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:pb-0 sm:overflow-x-visible sm:px-0">
        {hobbies.map((hobby, index) => (
          <div
            key={hobby.title}
            className={`group relative flex flex-col items-center text-center p-5 rounded-[28px] border transition-all duration-300 min-w-[270px] max-w-[270px] snap-center 
              ${dark 
                ? "border-violet-500/10 bg-violet-950/20" 
                : "border-rose-100 bg-rose-50/30"
              } 
              sm:min-w-0 sm:max-w-none sm:border-0 sm:bg-transparent sm:p-2`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Glowing Icon Container */}
            <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
              {/* Outer soft glowing blur circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 to-violet-500 opacity-0 blur-md transition-all duration-300 group-hover:opacity-40 group-hover:scale-110" />
              
              {/* Icon Circle Border */}
              <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border text-2xl transition-all duration-500 shadow-sm ${
                dark
                  ? "border-violet-500/20 bg-violet-500/5 text-rose-300 group-hover:border-violet-400 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-violet-500 group-hover:text-white"
                  : "border-rose-200 bg-rose-50/50 text-rose-500 group-hover:border-rose-300 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-violet-500 group-hover:text-white"
              }`}>
                {hobby.iconElement}
              </div>
            </div>

            {/* Hobby Title */}
            <h3 className={`text-lg font-extrabold transition-colors duration-300 ${
              dark ? "text-rose-100 group-hover:text-pink-400" : "text-[#4a3558] group-hover:text-rose-600"
            }`}>
              {hobby.title}
            </h3>

            {/* Simple Underline Expansion */}
            <div className="mt-1.5 h-0.5 w-6 rounded-full bg-gradient-to-r from-rose-400 to-violet-500 opacity-20 transition-all duration-300 group-hover:w-12 group-hover:opacity-100" />

            {/* Description */}
            <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${muted}`}>
              {hobby.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
