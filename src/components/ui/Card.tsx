import { useTheme } from "../../context/ThemeContext";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Card({ children, className = "", style }: CardProps) {
  const { dark } = useTheme();

  return (
    <div
      style={style}
      className={`group relative overflow-hidden rounded-[28px] border p-6 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.012] ${
        dark
          ? "border-violet-300/15 bg-[#1a0f28]/80 shadow-[0_25px_80px_rgba(168,85,247,0.12)] hover:shadow-[0_35px_110px_rgba(168,85,247,0.22)]"
          : "border-rose-200/50 bg-white/80 shadow-[0_25px_80px_rgba(219,39,119,0.15)] hover:shadow-[0_35px_110px_rgba(219,39,119,0.28)]"
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-400/20 blur-3xl transition duration-500 group-hover:scale-125 group-hover:bg-violet-400/35" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:animate-[shineMove_1s_ease] group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
