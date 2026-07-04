import { useTheme } from "../context/ThemeContext";
import { SectionTitle } from "./ui/SectionTitle";
import { HiCommandLine, HiServerStack, HiCpuChip } from "react-icons/hi2";

const services = [
  {
    icon: <HiCommandLine />,
    title: "Web Development",
    desc: "Building clean, responsive, and aesthetic web applications tailored to user needs.",
  },
  {
    icon: <HiServerStack />,
    title: "System Development",
    desc: "Designing structured backend systems with efficient data workflows and secure databases.",
  },
  {
    icon: <HiCpuChip />,
    title: "Bot Automation",
    desc: "Creating custom integration and automation bots for platforms like Discord.",
  },
];

export function Services() {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";

  return (
    <section id="services" className="reveal mx-auto max-w-6xl px-5 py-20">
      <SectionTitle label="Services" title="What I Do & How I Work" />
      <p className={`mx-auto -mt-6 mb-16 max-w-2xl text-center text-sm sm:text-base leading-7 ${muted}`}>
        I specialize in building end-to-end digital solutions, following a structured workflow
        from clean interfaces to robust backends and automation.
      </p>

      <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {/* Desktop horizontal connecting line */}
        <div className="absolute top-7 left-[15%] right-[15%] hidden h-[2px] bg-gradient-to-r from-rose-400/20 via-pink-500/20 to-violet-500/20 md:block -z-10" />

        {/* Mobile vertical connecting line */}
        <div className="absolute left-7 top-10 bottom-10 w-[2px] bg-gradient-to-b from-rose-400/20 via-pink-500/20 to-violet-500/20 md:hidden -z-10" />

        {services.map((item, i) => (
          <div
            key={item.title}
            className="group relative flex gap-6 md:flex-col md:items-center md:text-center md:gap-0"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Step Icon & Number Badge */}
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border text-2xl transition-all duration-300 shadow-sm relative z-10 ${dark
                ? "border-violet-500/25 bg-[#120a21] text-rose-300 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                : "border-rose-200 bg-white text-rose-500 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(244,63,94,0.25)]"
              }`}>
              {item.icon}

              {/* Tiny floating step number */}
              <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-violet-500 text-[10px] font-black text-white shadow-md">
                {i + 1}
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex-1 md:mt-6">
              <h3 className={`text-lg font-bold transition-colors duration-300 ${dark ? "text-rose-100 group-hover:text-pink-400" : "text-[#4a3558] group-hover:text-rose-600"
                }`}>
                {item.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
