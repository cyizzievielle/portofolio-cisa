import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiX, FiMenu, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { navLinks } from "../data/navLinks";
import { NavBadge } from "./shared/NavBadge";

export function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navAreaRef = useRef<HTMLDivElement>(null);

  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";
  const softCard = dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section for sidebar highlight
      const sections = navLinks.map((l) => l.toLowerCase());
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (open && navAreaRef.current && !navAreaRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com/cyizzievielle", label: "GitHub" },
    { icon: <FiInstagram />, href: "https://instagram.com/cisalvrk", label: "Instagram" },
    { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/cisa-livia-virnandyka", label: "LinkedIn" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-xl ${
          dark ? "bg-[#0c0515]/95 border-violet-300/15" : "bg-[#fdf8ff]/95 border-rose-200/40"
        } ${scrolled ? "shadow-[0_10px_35px_rgba(168,85,247,0.15)]" : "shadow-[0_4px_18px_rgba(168,85,247,0.08)]"}`}
      >
        {/* Top gradient accent */}
        <div
          className={`h-[3px] bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 transition-all duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <a
            href="#"
            className={`font-extrabold tracking-wide transition-all duration-300 ${
              scrolled ? "text-lg" : "text-xl"
            }`}
          >
            <span className="bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
              Cisa
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative text-sm font-semibold transition duration-300 hover:text-rose-500 ${muted}`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Buttons */}
          <div ref={navAreaRef} className="relative flex items-center gap-3">
            <button
              onClick={toggle}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
              className={`inline-flex shrink-0 items-center justify-center rounded-full border shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1 ${softCard} ${
                scrolled ? "h-10 w-10" : "h-11 w-11"
              }`}
            >
              {dark ? (
                <FiSun className="h-5 w-5 text-amber-400 transition-transform duration-500 hover:rotate-90" />
              ) : (
                <FiMoon className="h-5 w-5 text-violet-400 transition-transform duration-500 hover:-rotate-12" />
              )}
              <span className="sr-only">
                {dark ? "Switch to light mode" : "Switch to dark mode"}
              </span>
            </button>

            <button
              onClick={() => setOpen((prev) => !prev)}
              title={open ? "Close menu" : "Open menu"}
              className={`inline-flex shrink-0 items-center justify-center rounded-full border text-rose-500 lg:hidden transition-all duration-300 ${softCard} ${
                scrolled ? "h-10 w-10" : "h-11 w-11"
              }`}
            >
              {open ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(82vw,340px)] flex-col transition-transform duration-300 ease-out lg:hidden ${
          dark ? "bg-[#0c0515]" : "bg-[#fdf8ff]"
        } ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "-20px 0 60px rgba(168,85,247,0.15)" }}
      >
        {/* Decorative gradient bar at top */}
        <div className="h-1 w-full bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 shrink-0" />

        {/* Header */}
        <div className={`flex items-center justify-between border-b px-6 py-5 ${dark ? "border-violet-300/15" : "border-rose-200/40"}`}>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
              Navigation
            </p>
            <h2 className="mt-0.5 text-xl font-extrabold bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
              Cisa
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:bg-rose-500/10 ${softCard}`}
          >
            <FiX className="h-4 w-4 text-rose-500" />
          </button>
        </div>

        {/* Profile Mini Card */}
        <div className={`mx-5 mt-5 flex items-center gap-3.5 rounded-2xl border p-3.5 ${softCard}`}>
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl shadow-md ring-2 ring-violet-300/30">
            <img src="/profile.jpg" alt="Cisa" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold">Cisa Livia Virnandyka</p>
            <p className={`truncate text-xs mt-0.5 ${muted}`}>Web Developer · System Builder</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="mt-4 flex-1 overflow-y-auto px-4 pb-4">
          <p className={`mb-2 px-2 text-[10px] font-black uppercase tracking-widest ${muted}`}>Menu</p>
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={`group flex items-center gap-3.5 rounded-2xl px-3 py-3 font-bold transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? dark
                        ? "bg-violet-500/15 text-rose-400"
                        : "bg-rose-50 text-rose-500"
                      : `hover:${dark ? "bg-violet-500/10" : "bg-rose-50/70"} hover:text-rose-500 ${muted}`
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-br from-rose-400 to-violet-500 text-white shadow-lg"
                        : dark
                        ? "bg-violet-500/10 text-violet-400"
                        : "bg-rose-100/70 text-rose-400"
                    }`}
                  >
                    <NavBadge label={link} />
                  </span>
                  <span className="text-sm">{link}</span>
                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-rose-400 to-violet-500" />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Footer: socials + dark mode */}
        <div className={`shrink-0 border-t px-5 py-5 ${dark ? "border-violet-300/15" : "border-rose-200/40"}`}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border text-base transition hover:-translate-y-1 hover:text-rose-500 ${softCard} ${muted}`}
                >
                  {icon}
                </a>
              ))}
            </div>

            <button
              onClick={toggle}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition hover:-translate-y-1 ${softCard}`}
            >
              {dark ? (
                <FiSun className="h-4 w-4 text-amber-400" />
              ) : (
                <FiMoon className="h-4 w-4 text-violet-400" />
              )}
            </button>
          </div>
          <p className={`mt-3 text-center text-[10px] ${muted}`}>
            © {new Date().getFullYear()} Cisa Livia Virnandyka
          </p>
        </div>
      </aside>
    </>
  );
}
