export type Project = {
  title: string;
  category: string;
  year: string;
  desc: string;
  tech: string[];
  features: string[];
  image?: string;
  images?: string[];
  prefix?: string;
  github?: string;
  live?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Cyza Bot",
    category: "Discord Automation",
    year: "2025",
    desc: "A multi-functional, high-performance Discord automation bot engineered for server governance, advanced moderation, community interaction, and real-time system monitoring. Designed with modular architecture, custom embeds, role automation, and automated event triggers.",
    tech: ["Node.js", "Discord.js", "SQLite", "Automation", "REST API"],
    prefix: "c / Slash Commands",
    features: [
      "🧭 System Diagnostics — Real-time server latency ping, uptime statistics, and system resource monitors",
      "🪪 Member Identification — Dynamic custom community membership ID cards and automated role assignments",
      "🛡️ Server Protection — Anti-spam heuristics, chat blacklists, auto-moderation filters, and audit logs",
      "🎫 Support Ticket Portal — Multi-category ticket system for bug reports, staff inquiries, and partnerships",
      "🕯️ Community Utilities — AFK auto-replies, scheduled reminders, Truth or Dare party games, and polls",
      "🎉 Economy & Giveaways — Number guessing mini-games, automated raffle drawings, and reward counters",
      "📚 Knowledge Base — Searchable Q&A FAQ commands for fast community onboarding and announcements",
      "🔐 Admin Dashboard Controls — Role assignment panels, data backups, custom embeds, and webhook integrations"
    ],
    image: "/project/botcyza.png",
    images: [
      "/project/botcyza.png",
      "/project/botcyza-1.png",
      "/project/botcyza-2.png",
      "/project/botcyza-3.png",
      "/project/botcyza-4.png",
      "/project/botcyza-5.png"],
    github: "https://github.com/cyizzievielle/mystralassistant-bot",
    accent: "from-sky-300 via-pink-400 to-fuchsia-500",
  },
  {
    title: "Relovie Bot",
    category: "Interactive Bot",
    year: "2026",
    desc: "An interactive Discord relationship simulator and virtual economy engine featuring couple leaderboards, virtual career paths, item gifting, and customized wedding ceremonies.",
    tech: ["Node.js", "Discord.js", "JSON", "API"],
    prefix: "r / Slash Commands",
    features: [
      "💼 Virtual Economy — Choose careers, work shifts, earn daily salaries, and manage virtual wallet balances",
      "🛒 Item Shop — Purchase virtual gifts, special role items, vanity badges, and engagement rings",
      "💖 Relationship System — Interactive dating simulator, wedding proposals, and custom relationship cards",
      "🎁 Social Leaderboards — Exchange gifts to gain love points and compete on server-wide couple leaderboards",
      "📊 Daily Quests — Track partner milestones, relationship status anniversaries, and clear daily achievements"
    ],
    image: "/project/relovie.png",
    images: ["/project/relovie.png"],
    accent: "from-rose-300 via-pink-400 to-violet-500",
  },
  {
    title: "SIMTA",
    category: "Academic Information System",
    year: "2026",
    desc: "Sistem Informasi Manajemen Tugas Akhir for managing final project workflows, student data, submission progress, supervisor coordination, and structured academic documentation.",
    tech: ["PHP", "MySQL", "CodeIgniter 4", "Bootstrap"],
    features: ["Student data management", "Final project tracking", "Supervisor workflow", "Document submission", "Admin dashboard"],
    image: "/project/simta.png",
    github: "https://github.com/cyizzievielle/simta",
    live: "https://project-simta.my.id",
    accent: "from-cyan-300 via-pink-400 to-purple-500",
  },
  {
    title: "Mystral Academy",
    category: "Community Website",
    year: "2026",
    desc: "An interactive community website for Mystral Academy with a polished academy-themed interface, event archive, staff profiles, recruitment, rules, leaderboard, gallery, and member comments.",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    features: ["Responsive landing page", "Event archive", "Staff profiles", "Recruitment section", "Community gallery"],
    image: "/project/mystralweb.png",
    github: "https://github.com/cyizzievielle/mystralacademy-website",
    live: "https://mystralacademy.website/",
    accent: "from-violet-300 via-pink-400 to-amber-300",
  },
];
