import { useCountUp } from "../../hooks/useCountUp";
import { useTheme } from "../../context/ThemeContext";

type StatItem = {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
};

function StatCounter({ target, suffix = "", label, duration = 1800 }: StatItem) {
  const { dark } = useTheme();
  const { count, ref } = useCountUp(target, duration);
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl font-black bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent tabular-nums">
        {count}{suffix}
      </p>
      <p className={`text-xs font-semibold mt-0.5 ${muted}`}>{label}</p>
    </div>
  );
}

const stats: StatItem[] = [
  { target: 8, suffix: "+", label: "Projects", duration: 1600 },
  { target: 3, suffix: "+", label: "Years Coding", duration: 1200 },
  { target: 3, suffix: "+", label: "Experience", duration: 1400 },
];

export function AnimatedStats() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-6 lg:justify-start">
      {stats.map((stat) => (
        <StatCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
}
