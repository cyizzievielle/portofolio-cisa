import { useTheme } from "../context/ThemeContext";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { HiAcademicCap, HiCpuChip } from "react-icons/hi2";

const education = [
  {
    school: "SMK Bukit Asam",
    major: "Computer and Network Engineering (TKJ)",
    period: "2020 – 2023",
    icon: <HiCpuChip />,
    desc: "Studied the fundamentals of computer networking, hardware, operating systems, troubleshooting, software installation, and basic concepts of information technology.",
  },
  {
    school: "Universitas Sriwijaya",
    major: "Manajemen Informatika",
    period: "2023 – Now",
    icon: <HiAcademicCap />,
    desc: "Focused on information systems, web development, database management, system analysis and design, data management, and user-oriented application development.",
  },
];

export function Education() {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";

  return (
    <section id="education" className="reveal mx-auto max-w-6xl px-5 py-16">
      <SectionTitle label="Education" title="My Academic Journey" />
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <Card
            key={item.school}
            className="animate-card-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative flex h-full flex-col">
              {/* Top Row: Icon & Period Badge */}
              <div className="mb-5 flex items-center justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-2xl border text-2xl transition-all duration-300 shadow-sm ${
                  dark
                    ? "border-violet-500/25 bg-violet-500/10 text-rose-300 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                    : "border-rose-200 bg-rose-50 text-rose-500 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(244,63,94,0.25)]"
                }`}>
                  {item.icon}
                </div>
                <span className="inline-flex rounded-full border border-violet-300/20 bg-gradient-to-r from-rose-400/10 to-violet-400/10 px-3 py-1 text-xs font-black text-rose-500">
                  {item.period}
                </span>
              </div>

              {/* School Name */}
              <h3 className="text-xl font-extrabold bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
                {item.school}
              </h3>

              {/* Major */}
              <p className={`mt-1.5 text-sm font-bold ${
                dark ? "text-rose-100/90" : "text-[#4a3558]"
              }`}>
                {item.major}
              </p>

              {/* Description */}
              <p className={`mt-3 flex-1 text-sm leading-relaxed ${muted}`}>{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
