import { useTheme } from "../context/ThemeContext";
import { footerSocials } from "../data/socials";
import { FaGithub, FaInstagram, FaLinkedinIn, FaDiscord } from "react-icons/fa";

export function Footer() {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "github":
        return <FaGithub />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "discord":
        return <FaDiscord />;
      default:
        return null;
    }
  };

  return (
    <footer
      className={`mt-16 rounded-t-[32px] border-t px-6 py-12 shadow-[0_-15px_50px_rgba(168,85,247,0.05)] ${
        dark
          ? "border-violet-500/10 bg-gradient-to-b from-[#0d0714] to-[#08030d] text-rose-100/90"
          : "border-rose-200/50 bg-gradient-to-b from-[#fdf8ff] to-[#f8edf9] text-[#4a3558]"
      }`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_0.8fr_0.7fr]">
        {/* Left Column: Logo & Description */}
        <div className="space-y-4">
          <a href="#" className="text-2xl font-black tracking-wide">
            <span className="bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
              Cisa
            </span>
          </a>
          <p className={`max-w-md text-sm leading-relaxed ${muted}`}>
            A developer enthusiast dedicated to crafting clean code, soft aesthetic user interfaces,
            and reliable system integrations.
          </p>
        </div>

        {/* Center Column: Quick Links */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-4">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2.5 text-sm font-semibold">
            {["About", "Skills", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`transition-all duration-300 hover:translate-x-1 hover:text-rose-500 ${
                  dark ? "text-rose-200/60" : "text-[#7a6188]"
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Connect Socials */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-4">
            Connect
          </h4>
          <div className="flex flex-wrap gap-3">
            {footerSocials.map((link) => {
              const icon = getIcon(link.title);
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target={link.href === "#" ? undefined : "_blank"}
                  rel={link.href === "#" ? undefined : "noopener noreferrer"}
                  title={link.title}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    dark
                      ? "border-violet-500/20 bg-violet-500/5 text-rose-200/60 hover:border-violet-400/50 hover:bg-violet-400/15 hover:text-rose-300"
                      : "border-rose-200 bg-white text-[#7a6188] hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copyright Divider */}
      <div
        className={`mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t pt-6 text-xs sm:flex-row sm:justify-between ${
          dark ? "border-violet-500/10 text-rose-200/40" : "border-rose-200/40 text-[#7a6188]/70"
        }`}
      >
        <span>© 2026 Cisa Livia Virnandyka. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Built with <span className="text-rose-500">❤️</span> using React & Tailwind
        </span>
      </div>
    </footer>
  );
}
