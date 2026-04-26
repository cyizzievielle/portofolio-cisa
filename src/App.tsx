import { useEffect, useRef, useState } from "react";

type CardProps = {
  children: React.ReactNode;
  dark: boolean;
  className?: string;
};

function Card({ children, dark, className = "" }: CardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border p-6 transition-all duration-300 hover:-translate-y-2 ${
        dark
          ? "border-pink-300/20 bg-[#220f19]/80 shadow-[0_25px_80px_rgba(255,79,164,0.12)]"
          : "border-pink-200/80 bg-white/75 shadow-[0_25px_80px_rgba(232,121,176,0.24)]"
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-400/20 blur-3xl transition duration-300 group-hover:bg-pink-400/35" />
      {children}
    </div>
  );
}

function SectionTitle({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-10 text-center animate-fade-up">
      <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-pink-500">
        {label}
      </span>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navAreaRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<null | {
  title: string;
  desc: string;
  image: string;
}>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
    }, []);
      const [toast, setToast] = useState("");
    const [selectedProject, setSelectedProject] = useState<null | {
      icon: string;
      title: string;
      desc: string;
      tech: string[];
      features: string[];
    }>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    if (
      open &&
      navAreaRef.current &&
      !navAreaRef.current.contains(e.target as Node)
    ) {
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

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      open &&
      navRef.current &&
      !navRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  // biar section yang sudah kelihatan di awal langsung muncul
  setTimeout(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("active");
      }
    });
  }, 100);

  return () => {
    revealElements.forEach((el) => {
      observer.unobserve(el);
    });
  };
}, []);

useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      if (
        sec.offsetTop <= scrollPos &&
        sec.offsetTop + sec.offsetHeight > scrollPos
      ) {
        const id = sec.getAttribute("id");

        document.querySelectorAll("nav a").forEach((a) => {
          a.classList.remove("text-pink-500");

          if (a.getAttribute("href") === `#${id}`) {
            a.classList.add("text-pink-500");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}, []);

useEffect(() => {
  const love = document.getElementById("cursorLove") as HTMLDivElement | null;
  const glow = document.getElementById("cursorGlow") as HTMLDivElement | null;

  if (!love || !glow) return;

  let rafId = 0;
  let lastSpawn = 0;

  const move = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    love.style.left = x + "px";
    love.style.top = y + "px";

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      glow.style.left = x + "px";
      glow.style.top = y + "px";
    });

    spawnSparkle(x, y);
  };

  function spawnSparkle(x: number, y: number) {
    const now = performance.now();
    if (now - lastSpawn < 18) return;
    lastSpawn = now;

    const s = document.createElement("div");
    s.className = "sparkle";

    const ox = (Math.random() - 0.5) * 16;
    const oy = (Math.random() - 0.5) * 16;

    s.style.left = x + ox + "px";
    s.style.top = y + oy + "px";

    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }

  window.addEventListener("mousemove", move);

  return () => {
    window.removeEventListener("mousemove", move);
    cancelAnimationFrame(rafId);
  };
}, []);

const showToast = (message: string) => {
  setToast(message);
  setTimeout(() => setToast(""), 2200);
};
  const bg = dark ? "bg-[#12070d] text-pink-50" : "bg-[#fff7fb] text-[#3b2430]";
  const muted = dark ? "text-pink-200/80" : "text-[#7d5b69]";
  const softCard = dark
    ? "border-pink-300/20 bg-pink-300/10"
    : "border-pink-200 bg-pink-50/80";

const navLinks = [
  "About",
  "Education",
  "Experience",
  "Services",
  "Skills",
  "Projects",
  "Certificates",
  "Hobbies",
  "Contact",
];

  const skills = [
    "PHP",
    "HTML",
    "CSS",
    "JavaScript",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Vite",
    "MySQL",
    "MariaDB",
    "Laravel",
    "CodeIgniter 4",
    "Bootstrap",
    "Tailwind",
    "React",
    "JSON",
    "GitHub",
    "Pterodactyl",
    "System Design",
    "Discord Bot",
    "Database Design",
    "UI/UX Basic",
    "Figma",
    "Canva",
  ];

  const experiences = [
    {
      title: "PT Bukit Asam",
      role: "Intern • 2025",
      desc: "Assisted in analyzing data workflows and supporting system development processes, including gathering user requirements, structuring data flow, and understanding how information systems are implemented in a professional work environment.",
      tags: ["System Analysis", "Data Workflow", "Documentation"],
    },
    {
      title: "BEM Seni Budaya",
      role: "Organization & Event • 2024",
      desc: "Actively participated in organizational activities, coordinating events, managing team communication, and contributing to event planning to ensure smooth and well-organized execution.",
      tags: ["Teamwork", "Event Planning", "Communication"],
    },
    {
      title: "Kelurahan Tanjung Enim",
      role: "Administration & Data • 2022",
      desc: "Supported administrative processes, document management, data entry, and information verification, ensuring data is organized, accurate, and easily accessible for public service needs.",
      tags: ["Data Entry", "Administration", "Data Management"],
    },
  ];

const projects = [
  {
    icon: "🤖",
    title: "Cyza Bot",
    desc: "A Discord bot designed to support server management, moderation, automation, role management, logging system, welcome messages, auto responses, and utility commands.",
    tech: ["Node.js", "Discord.js", "Automation", "JSON"],
    features: ["Moderation tools", "Role management", "Auto response", "Server logs", "Welcome message"],
  },
  {
    icon: "💗",
    title: "Relovie Bot",
    desc: "An interactive Discord bot with relationship features, pairing system, entertainment commands, data storage, API integration, and user interaction features.",
    tech: ["Node.js", "API", "Discord.js", "Data Storage"],
    features: ["Pairing system", "Interactive commands", "User profiles", "Fun commands", "Backup data"],
  },
  {
    icon: "💻",
    title: "Web Systems",
    desc: "Web-based systems built with PHP and MySQL, including CRUD features, multi-role login, dashboard management, form validation, database relations, and clean admin interfaces.",
    tech: ["PHP", "MySQL", "CodeIgniter", "Laravel"],
    features: ["CRUD system", "Multi-role login", "Admin dashboard", "Database relation", "Validation form"],
  },
];

const certificates = [
  {
    title: "Internship Certificate",
    desc: "Certificate of internship completion at PT Bukit Asam Tbk as an active student intern in Application Development & Services / EIS Department.",
    image: "/certificates/certificate-1.jpg",
  },
  {
    title: "BEM Seni Budaya Certificate",
    desc: "Certificate of appreciation as Staff of Seni dan Budaya in BEM KM Fakultas Ilmu Komputer Universitas Sriwijaya.",
    image: "/certificates/certificate-2.jpg",
  },
];

  const hobbies = [
    {
      icon: "💻",
      title: "Coding",
      desc: "Building websites, bots, CRUD systems, and exploring new technologies to improve my development skills.",
    },
    {
      icon: "🎨",
      title: "Design",
      desc: "Creating clean, aesthetic, and user-friendly interfaces with a soft and modern visual style.",
    },
    {
      icon: "🎧",
      title: "Music",
      desc: "Listening to music to stay focused, relaxed, and inspired while working on creative projects.",
    },
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden transition duration-300 ${bg}`}>
      {loading && (
        <div
          className={`fixed inset-0 z-[9999] grid place-items-center transition ${
            dark ? "bg-[#12070d]" : "bg-[#fff7fb]"
          }`}
        >
          <div className="text-center">
            <div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-pink-100 border-t-pink-500 shadow-[0_0_45px_rgba(236,72,153,0.45)]" />
            <p className="font-bold tracking-[0.25em] text-pink-500">
              LOADING PORTFOLIO
            </p>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 -z-10 ${
          dark
            ? "bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,164,.28),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(95,20,55,.7),transparent_28%),linear-gradient(135deg,#12070d,#210b17)]"
            : "bg-[radial-gradient(circle_at_15%_20%,rgba(255,182,213,.55),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(255,214,232,.75),transparent_24%),linear-gradient(135deg,#fff7fb,#ffeef6)]"
        }`}
      />

      <div className="pointer-events-none fixed left-10 top-32 -z-10 h-56 w-56 rounded-full bg-pink-400/20 blur-3xl animate-soft-pulse" />
      <div className="pointer-events-none fixed bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl animate-soft-pulse" />

<header
  className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
    dark
      ? "bg-[#12070d] border-pink-300/20"
      : "bg-[#fff7fb] border-pink-200"
  } ${
    scrolled
      ? "shadow-[0_10px_35px_rgba(236,72,153,0.18)]"
      : "shadow-[0_4px_18px_rgba(236,72,153,0.10)]"
  }`}
>
  {/* TOP GRADIENT LINE */}
  <div
    className={`h-1 bg-gradient-to-r from-pink-300 via-pink-500 to-fuchsia-400 transition-all duration-300 ${
      scrolled ? "opacity-100" : "opacity-0"
    }`}
  />

  <nav
    className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
      dark ? "bg-[#12070d]" : "bg-[#fff7fb]"
    } ${scrolled ? "py-3" : "py-5"}`}
  >
    {/* LOGO */}
    <a
      href="#"
      className={`font-extrabold tracking-wide text-pink-500 transition-all duration-300 ${
        scrolled ? "text-lg" : "text-xl"
      }`}
    >
      Cisa.dev
    </a>

    {/* DESKTOP MENU */}
    <div className="hidden gap-6 lg:flex">
      {navLinks.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          className={`text-sm font-semibold transition duration-300 hover:text-pink-500 ${muted}`}
        >
          {link}
        </a>
      ))}
    </div>

    {/* RIGHT BUTTON */}
<div ref={navAreaRef} className="relative flex items-center gap-3">
  <button
    onClick={() => setDark((prev) => !prev)}
    className={`grid place-items-center rounded-full border shadow-[0_0_25px_rgba(236,72,153,0.25)] transition-all duration-300 hover:-translate-y-1 ${softCard} ${
      scrolled ? "h-10 w-10" : "h-11 w-11"
    }`}
  >
    {dark ? "☀️" : "🌙"}
  </button>

  <button
    onClick={() => setOpen((prev) => !prev)}
    className={`grid place-items-center rounded-full border lg:hidden transition-all duration-300 ${softCard} ${
      scrolled ? "h-10 w-10" : "h-11 w-11"
    }`}
  >
    {open ? "✕" : "☰"}
  </button>

  {open && (
    <div
      className={`absolute right-0 top-14 z-50 grid w-64 gap-4 rounded-3xl border p-5 shadow-2xl lg:hidden ${
        dark
          ? "bg-[#12070d] border-pink-300/20"
          : "bg-white border-pink-200"
      }`}
    >
      {navLinks.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          onClick={() => setOpen(false)}
          className={`font-bold transition hover:text-pink-500 ${muted}`}
        >
          {link}
        </a>
      ))}
    </div>
  )}
  </div>
    </nav>
</header>

      <main>
        <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 pt-32 lg:grid-cols-[1.15fr_.85fr]">
          <div className="animate-fade-up text-center lg:text-left">
            <div className={`mb-6 inline-flex rounded-full border px-5 py-3 text-sm font-bold text-pink-500 shadow-lg ${softCard}`}>
              Portfolio • Developer • System Enthusiast
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
              Hi, I’m <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">Cisa Livia Virnandyka</span>
            </h1>

            <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 lg:mx-0 ${muted}`}>
              I am an Information Systems student at Sriwijaya University with a strong interest in system development,
              user interface design, database management, automation, and bot development.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#projects" className="rounded-full bg-gradient-to-r from-pink-300 to-pink-500 px-6 py-3 font-bold text-white shadow-[0_14px_35px_rgba(236,72,153,0.35)] transition hover:-translate-y-1">
                View Projects
              </a>
              <a href="#contact" className={`rounded-full border px-6 py-3 font-bold text-pink-500 transition hover:-translate-y-1 ${softCard}`}>
                Contact Me
              </a>
            </div>
          </div>

<Card
  dark={dark}
  className="mx-auto w-full max-w-sm animate-[float_4s_ease-in-out_infinite] text-center"
>
  <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full shadow-[0_0_55px_rgba(236,72,153,0.35)]">
    <img
      src="/profile.jpg"
      alt="Cisa Profile"
      className="h-full w-full object-cover"
    />
  </div> {/* ✅ ini yang tadi kurang */}

  <h3 className="text-2xl font-extrabold">
    Cisa Livia Virnandyka
  </h3>

  <p className={`mt-3 leading-7 ${muted}`}>
    Web Developer focused on clean UI, efficient databases, and automation solutions.
  </p>
</Card>
        </section>
        <section id="about" className="reveal mx-auto max-w-6xl px-5 py-16">
          <SectionTitle label="About Me" title="A Little About Me" />
          <Card dark={dark}>
            <p className={`leading-8 ${muted}`}>
              I am passionate about technology, especially website development, information systems,
              database management, and automation. I enjoy learning how systems work from requirement planning,
              database structure, CRUD processes, data management, and user-friendly interface design.
            </p>
          </Card>
        </section>

        <section id="education" className="reveal mx-auto max-w-6xl px-5 py-16">
          <SectionTitle label="Education" title="My Academic Journey" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card dark={dark}>
              <h3 className="text-xl font-extrabold text-pink-500">SMK Bukit Asam</h3>
              <p className={`mt-1 font-bold ${muted}`}>Computer and Network Engineering (TKJ) • 2020 – 2023</p>
              <p className={`mt-4 leading-7 ${muted}`}>
                Studied the fundamentals of computer networking, hardware, operating systems, troubleshooting,
                software installation, and basic concepts of information technology.
              </p>
            </Card>

            <Card dark={dark}>
              <h3 className="text-xl font-extrabold text-pink-500">Universitas Sriwijaya</h3>
              <p className={`mt-1 font-bold ${muted}`}>Manajemen Informatika • 2023 – Now</p>
              <p className={`mt-4 leading-7 ${muted}`}>
                Focused on information systems, web development, database management, system analysis and design,
                data management, and user-oriented application development.
              </p>
            </Card>
          </div>
        </section>

        <section id="experience" className="reveal mx-auto max-w-6xl px-5 py-16">
          <SectionTitle label="Experience" title="Work & Organization" />
          <div className="grid gap-6 lg:grid-cols-3">
            {experiences.map((item) => (
              <Card key={item.title} dark={dark}>
                <h3 className="text-xl font-extrabold text-pink-500">{item.title}</h3>
                <p className={`mt-1 font-bold ${muted}`}>{item.role}</p>
                <p className={`mt-4 leading-7 ${muted}`}>{item.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-bold text-pink-500 ${softCard}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="services" className="reveal mx-auto max-w-6xl px-5 py-16">
  <SectionTitle label="Services" title="What I Can Do" />

  <div className="grid gap-6 lg:grid-cols-3">
    {[
      {
        icon: "🌐",
        title: "Web Development",
        desc: "Building responsive websites and web-based systems with clean UI, structured layout, and functional features.",
      },
      {
        icon: "🗂️",
        title: "System Development",
        desc: "Creating structured information systems with database design, authentication, CRUD, and dashboard management.",
      },
      {
        icon: "🤖",
        title: "Bot Automation",
        desc: "Developing Discord bots for automation, moderation, role management, and interactive community features.",
      },
    ].map((service) => (
      <Card key={service.title} dark={dark} className="text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-200 to-pink-500 text-3xl shadow-[0_0_35px_rgba(236,72,153,0.25)]">
          {service.icon}
        </div>
        <h3 className="text-xl font-extrabold text-pink-500">{service.title}</h3>
        <p className={`mt-3 leading-7 ${muted}`}>{service.desc}</p>
      </Card>
    ))}
  </div>
</section>

        <section id="skills" className="reveal mx-auto max-w-6xl px-5 py-16">
          <SectionTitle label="Skills" title="Tools & Tech Stack" />
          <Card dark={dark}>
          <div className="skill-scroll flex gap-3 overflow-x-auto pb-3 md:flex-wrap md:overflow-visible">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold text-pink-500 transition hover:-translate-y-1 ${softCard}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </section>

        <section id="projects" className="reveal mx-auto max-w-6xl px-5 py-16">
          <SectionTitle label="Projects" title="Selected Works" />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} dark={dark}>
                <div className="mb-5 grid h-36 place-items-center rounded-2xl bg-gradient-to-br from-pink-100 to-pink-400 text-5xl text-white shadow-[0_0_35px_rgba(236,72,153,0.25)]">
                  {project.icon}
                </div>
                <h3 className="text-xl font-extrabold text-pink-500">{project.title}</h3>
                <p className={`mt-4 leading-7 ${muted}`}>{project.desc}</p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-5 inline-block rounded-full bg-gradient-to-r from-pink-300 to-pink-500 px-5 py-2 font-bold text-white transition hover:-translate-y-1"
                >
                  View Details
                </button>
              </Card>
            ))}
          </div>
        </section>

<section id="certificates" className="reveal mx-auto max-w-6xl px-5 py-16">
  <SectionTitle label="Certificates" title="Certificates & Achievements" />

  <div className="grid gap-6 md:grid-cols-2">
    {certificates.map((cert) => (
      <button
        key={cert.title}
        onClick={() => setSelectedCert(cert)}
        className={`group overflow-hidden rounded-[28px] border p-4 text-left transition duration-300 hover:-translate-y-2 ${
          dark
            ? "border-pink-300/20 bg-[#220f19]/80 shadow-[0_25px_80px_rgba(255,79,164,0.14)]"
            : "border-pink-200/80 bg-white/80 shadow-[0_25px_80px_rgba(232,121,176,0.25)]"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={cert.image}
            alt={cert.title}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-pink-600/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-pink-500 shadow-lg">
            Click to view ✨
          </span>
        </div>

        <h3 className="mt-5 text-xl font-extrabold text-pink-500">
          {cert.title}
        </h3>

        <p className={`mt-3 leading-7 ${muted}`}>
          {cert.desc}
        </p>
      </button>
    ))}
  </div>
</section>

        <section id="hobbies" className="reveal mx-auto max-w-6xl px-5 py-16">
          <SectionTitle label="Hobbies" title="Things I Love" />
          <div className="grid gap-6 md:grid-cols-3">
            {hobbies.map((hobby) => (
              <Card key={hobby.title} dark={dark} className="text-center">
                <div className="mb-3 text-5xl">{hobby.icon}</div>
                <h3 className="text-xl font-extrabold text-pink-500">{hobby.title}</h3>
                <p className={`mt-3 leading-7 ${muted}`}>{hobby.desc}</p>
              </Card>
            ))}
          </div>
        </section>

<section id="contact" className="reveal mx-auto max-w-6xl px-5 py-20">
  <SectionTitle label="Contact" title="Let’s Connect" />

  <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
    {[
      {
        icon: "📧",
        title: "Email",
        value: "cisalivia@gmail.com",
        href: "mailto:cisalivia@gmail.com",
      },
      {
        icon: "📸",
        title: "Instagram",
        value: "@cisalvrk",
        href: "https://instagram.com/cisalvrk",
      },
      {
        icon: "💻",
        title: "GitHub",
        value: "cyizzievielle",
        href: "https://github.com/cyizzievielle",
      },
      {
        icon: "💼",
        title: "LinkedIn",
        value: "View Profile",
        href: "https://www.linkedin.com/in/cisa-livia-virnandyka",
      },
    ].map((item) => (
      <a
        key={item.title}
        href={item.href}
        target={item.title === "Email" ? undefined : "_blank"}
        rel={item.title === "Email" ? undefined : "noopener noreferrer"}
        className={`group relative overflow-hidden rounded-3xl border p-6 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(236,72,153,0.25)] ${softCard}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="relative mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-pink-100 text-2xl shadow-md">
          {item.icon}
        </div>
        <h3 className="relative font-extrabold text-pink-500">{item.title}</h3>
        <p className={`relative mt-1 text-xs ${muted}`}>{item.value}</p>
      </a>
    ))}

    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText("@2cyi");
        showToast("Discord username copied ✨");
      }}
      className={`group relative overflow-hidden rounded-3xl border p-6 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(236,72,153,0.25)] ${softCard}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-pink-100 text-2xl shadow-md">
        🎮
      </div>
      <h3 className="relative font-extrabold text-pink-500">Discord</h3>
      <p className={`relative mt-1 text-xs ${muted}`}>@2cyi • click to copy</p>
    </button>
  </div>

  <Card dark={dark} className="mx-auto max-w-5xl">
    <div className="mb-7">
      <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-pink-500">
        Message
      </span>
      <h3 className="mt-2 text-2xl font-extrabold text-pink-500">
        Send Message
      </h3>
      <p className={`mt-2 ${muted}`}>
        Feel free to send a message for collaboration, project discussion, or networking.
      </p>
    </div>

    <form className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <input
          className={`rounded-2xl border p-4 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-300/20 ${softCard}`}
          placeholder="Your Name"
        />

        <input
          className={`rounded-2xl border p-4 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-300/20 ${softCard}`}
          placeholder="Your Email"
        />
      </div>

      <textarea
        className={`min-h-40 rounded-2xl border p-4 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-300/20 ${softCard}`}
        placeholder="Write your message..."
      />

      <button className="w-fit rounded-full bg-gradient-to-r from-pink-300 to-pink-500 px-8 py-3 font-bold text-white shadow-[0_14px_35px_rgba(236,72,153,0.35)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(236,72,153,0.45)]">
        Send Message
      </button>
    </form>
  </Card>
</section>

      </main>
{selectedCert && (
  <div
    onPointerDown={() => setSelectedCert(null)}
    className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
  >
    <div
      className={`relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[30px] border p-4 shadow-[0_30px_100px_rgba(236,72,153,0.35)] ${
        dark
          ? "border-pink-300/20 bg-[#1a0b12]"
          : "border-pink-200 bg-white"
      }`}
    >
      <button
        onClick={() => setSelectedCert(null)}
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-pink-500 font-bold text-white shadow-lg"
      >
        ✕
      </button>

      <img
        src={selectedCert.image}
        alt={selectedCert.title}
        className="max-h-[72vh] w-full rounded-2xl object-contain"
      />

      <div className="p-4">
        <h3 className="text-2xl font-extrabold text-pink-500">
          {selectedCert.title}
        </h3>
        <p className={`mt-2 leading-7 ${muted}`}>
          {selectedCert.desc}
        </p>
      </div>
    </div>
  </div>
)}

      <footer className="mt-16 rounded-t-[32px] bg-gradient-to-br from-pink-400 to-pink-600 px-5 py-12 text-white shadow-[0_-25px_80px_rgba(236,72,153,0.28)]">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_.7fr_.7fr]">
          <div>
            <h3 className="text-2xl font-extrabold">Cisa Livia Virnandyka</h3>
            <p className="mt-3 max-w-md leading-7 text-white/85">
              Developer enthusiast who loves building clean web systems, soft aesthetic interfaces,
              structured databases, Discord bot automation, and useful digital products.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-extrabold">Quick Links</h4>
            <div className="grid gap-2 text-white/85">
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-extrabold">Developer Vibes</h4>
            <div className="grid gap-2 text-white/85">
              {["GitHub", "Instagram", "LinkedIn", "Discord"].map((link) => (
                <a key={link} href="#" className="hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-white/25 pt-5 text-sm text-white/85 md:flex-row md:justify-between">
          <span>© 2026 Cisa Livia Virnandyka</span>
          <span>Built with ❤️ using React & Tailwind</span>
        </div>
      </footer>

{selectedProject && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
    <div
      className={`relative w-full max-w-3xl rounded-[32px] border p-6 shadow-[0_30px_100px_rgba(236,72,153,0.35)] ${
        dark ? "border-pink-300/20 bg-[#1a0b12]" : "border-pink-200 bg-white"
      }`}
    >
      <button
        onClick={() => setSelectedProject(null)}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-pink-500 font-bold text-white"
      >
        ✕
      </button>

      <div className="mb-5 text-6xl">{selectedProject.icon}</div>
      <h3 className="text-3xl font-extrabold text-pink-500">
        {selectedProject.title}
      </h3>

      <p className={`mt-4 leading-8 ${muted}`}>
        {selectedProject.desc}
      </p>

      <h4 className="mt-6 font-extrabold text-pink-500">Main Features</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedProject.features.map((feature) => (
          <span key={feature} className={`rounded-full border px-3 py-1 text-sm font-bold text-pink-500 ${softCard}`}>
            {feature}
          </span>
        ))}
      </div>

      <h4 className="mt-6 font-extrabold text-pink-500">Tech Stack</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedProject.tech.map((tech) => (
          <span key={tech} className="rounded-full bg-pink-500 px-3 py-1 text-sm font-bold text-white">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
)}

{toast && (
  <div className="fixed bottom-6 right-6 z-[9999] rounded-full bg-pink-500 px-5 py-3 font-bold text-white shadow-[0_15px_45px_rgba(236,72,153,0.4)]">
    {toast}
  </div>
)}

<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-pink-300 to-pink-500 font-bold text-white shadow-[0_15px_45px_rgba(236,72,153,0.35)] transition hover:-translate-y-1"
>
  ↑
</button>
<div id="cursorGlow" className="cursor-glow"></div>
<div id="cursorLove" className="cursor-love"></div>
    </div>
    
  );
}