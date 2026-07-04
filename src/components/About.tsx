import { useTheme } from "../context/ThemeContext";

export function About() {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";

  return (
    <section id="about" className="reveal mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] items-start">
        {/* Left Side: Large Typographic Text */}
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-rose-500">
            About Me
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
            A Journey of Coding, Automation, & System Design.
          </h2>
        </div>

        {/* Right Side: Paragraph with vertical accent bar */}
        <div className="flex gap-5">
          <div className="shrink-0 w-1.5 rounded-full bg-gradient-to-b from-rose-400 to-violet-500" />
          <p className={`text-base sm:text-lg leading-relaxed ${muted}`}>
            I am passionate about technology, especially website development, information systems,
            database management, and automation. I enjoy learning how systems work from requirement planning,
            database structure, CRUD processes, data management, and user-friendly interface design.
          </p>
        </div>
      </div>
    </section>
  );
}
