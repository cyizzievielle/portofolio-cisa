import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useCursorEffect } from "./hooks/useCursorEffect";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Services } from "./components/Services";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Certificates } from "./components/Certificates";
import { Hobbies } from "./components/Hobbies";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { SectionDivider } from "./components/ui/SectionDivider";

function Portfolio() {
  const { dark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useScrollReveal();
  useScrollSpy();
  useCursorEffect();

  const bg = dark ? "bg-[#0c0515] text-rose-50" : "bg-[#fdf8ff] text-[#2d1f3d]";

  return (
    <div className={`min-h-screen overflow-x-hidden transition duration-300 ${bg}`}>
      {/* Loading screen */}
      {loading && (
        <div
          className={`fixed inset-0 z-[9999] grid place-items-center transition ${
            dark ? "bg-[#0c0515]" : "bg-[#fdf8ff]"
          }`}
        >
          <div className="text-center">
            <div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-violet-100 border-t-violet-500 shadow-[0_0_45px_rgba(168,85,247,0.4)]" />
            <p className="font-bold tracking-[0.25em] bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
              LOADING PORTFOLIO
            </p>
          </div>
        </div>
      )}

      {/* Background gradients */}
      <div
        className={`fixed inset-0 -z-10 ${
          dark
            ? "bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,.2),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(88,28,135,.5),transparent_28%),linear-gradient(135deg,#0c0515,#1a0f28)]"
            : "bg-[radial-gradient(circle_at_15%_20%,rgba(251,191,36,.12),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(232,121,249,.2),transparent_24%),linear-gradient(135deg,#fdf8ff,#fdf2f8)]"
        }`}
      />

      {/* Floating blobs */}
      <div className="pointer-events-none fixed left-10 top-32 -z-10 h-56 w-56 rounded-full bg-violet-400/15 blur-3xl animate-soft-pulse" />
      <div className="pointer-events-none fixed bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-rose-400/15 blur-3xl animate-soft-pulse" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Certificates />
        <SectionDivider />
        <Hobbies />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />

      {/* Custom cursor */}
      <div id="cursorGlow" className="cursor-glow" />
      <div id="cursorLove" className="cursor-love" />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="animate-pulse-glow fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-rose-400 to-violet-500 font-bold text-white shadow-[0_15px_45px_rgba(168,85,247,0.3)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(168,85,247,0.45)] active:scale-95"
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
