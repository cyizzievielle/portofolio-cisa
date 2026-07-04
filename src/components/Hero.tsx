import { useTheme } from "../context/ThemeContext";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { Card } from "./ui/Card";
import { LiveStatus } from "./ui/LiveStatus";
import { useLanyard } from "../hooks/useLanyard";
import { DISCORD_USER_ID } from "../data/socials";

const roles = ["Web Developer", "System Builder", "Bot Creator"];

export function Hero() {
  const { dark } = useTheme();
  const typedRole = useTypingEffect(roles, 90, 50, 2000);
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";
  const softCard = dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60";

  const { data: lanyardData } = useLanyard(DISCORD_USER_ID);
  const status = lanyardData?.discord_status || "offline";

  const statusColors = {
    online: "bg-green-500 shadow-[0_0_14px_#22c55e]",
    idle: "bg-amber-500 shadow-[0_0_14px_#f59e0b]",
    dnd: "bg-red-500 shadow-[0_0_14px_#ef4444]",
    offline: "bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.4)]",
  };

  const ProfileCardComponent = (
    <Card className="animate-[float_4.5s_ease-in-out_infinite] text-center">
      <div className="relative mx-auto mb-6 h-36 w-36 sm:h-40 sm:w-40">
        <div className="h-full w-full overflow-hidden rounded-full shadow-[0_0_55px_rgba(168,85,247,0.3)] ring-4 ring-violet-200/40">
          <img
            src="/profile.jpg"
            alt="Cisa Profile"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Discord Live Status Dot */}
        <span
          className={`absolute bottom-1 right-2 h-5 w-5 rounded-full border-4 ${
            dark ? "border-[#150a1d]" : "border-white"
          } ${statusColors[status]} transition-all duration-500`}
          title={`Discord Status: ${status}`}
        />
      </div>

      <h3 className="text-xl font-extrabold sm:text-2xl">
        Cisa Livia Virnandyka
      </h3>

      <p className={`hidden sm:block mt-3 text-sm leading-7 sm:text-base ${muted}`}>
        Web Developer focused on clean UI, efficient databases, and automation
        solutions.
      </p>

      <LiveStatus
        spotify={lanyardData?.spotify || null}
        activities={lanyardData?.activities || []}
      />
    </Card>
  );

  return (
    <section className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-5 pb-10 pt-28 sm:gap-10 sm:pt-32 lg:grid-cols-[1.15fr_.85fr]">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="animate-fade-up text-center lg:text-left">
        <div
          className={`mb-5 inline-flex animate-badge-pop rounded-full border px-5 py-2.5 text-sm font-bold shadow-lg ${softCard}`}
        >
          <span className="bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
            Portfolio • Developer • System Enthusiast
          </span>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 bg-clip-text text-transparent animate-gradient-x">
            Cisa Livia Virnandyka
          </span>
        </h1>

        {/* Typing effect */}
        <div className="mt-4 flex h-10 items-center justify-center lg:justify-start">
          <span className={`text-lg font-bold sm:text-xl ${muted}`}>
            I'm a{" "}
            <span className="text-rose-500">{typedRole}</span>
            <span className="animate-blink ml-0.5 text-rose-500">|</span>
          </span>
        </div>

        {/* Profile Card on Mobile only (directly below typing effect) */}
        <div className="my-6 mx-auto w-full max-w-xs sm:max-w-sm lg:hidden">
          {ProfileCardComponent}
        </div>

        <p
          className={`mx-auto mt-3 max-w-2xl text-sm leading-8 sm:text-base lg:mx-0 ${muted}`}
        >
          Information Systems student at Sriwijaya University with a strong interest
          in system development, user interface design, database management, automation,
          and bot development.
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 lg:justify-start">
          {[
            ["8+", "Projects"],
            ["2+", "Years Coding"],
            ["3+", "Experience"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
                {value}
              </p>
              <p className={`text-xs font-semibold ${muted}`}>{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-row gap-3 justify-center lg:justify-start">
          <a
            href="#projects"
            className="group flex-1 max-w-[170px] sm:max-w-none inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 px-4 py-3.5 text-sm sm:text-base sm:px-7 font-bold text-white shadow-[0_14px_35px_rgba(168,85,247,0.3)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(168,85,247,0.45)] active:scale-[0.97]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className={`flex-1 max-w-[170px] sm:max-w-none inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3.5 text-sm sm:text-base sm:px-7 font-bold text-rose-500 transition hover:-translate-y-1 active:scale-[0.97] ${softCard}`}
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xs animate-slide-in-right sm:max-w-sm lg:max-w-full hidden lg:block">
        {ProfileCardComponent}
      </div>
    </section>
  );
}
