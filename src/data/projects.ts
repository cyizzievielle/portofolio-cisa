export type Project = {
  title: string;
  category: string;
  year: string;
  desc: string;
  tech: string[];
  features: string[];
  image?: string;
  github?: string;
  live?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Cyza Bot",
    category: "Discord Automation",
    year: "2025",
    desc: "A smart Discord assistant for server automation, safety, and community interaction.",
    tech: ["Node.js", "Discord.js", "SQLite", "Automation"],
    features: [
      "🧭 Status checkups, network latency ping, and utility calculator",
      "🪞 Member profile details, server stats, and chat activity logs",
      "🪪 Custom community membership ID card generation and role sorting",
      "🕯️ AFK status tracker, event reminders, and Truth or Dare games",
      "🎉 Number-guessing mini-games and automated giveaway raffles",
      "🎫 Support ticket channels for bug reports and server partnerships",
      "📚 Central Q&A knowledge base for new community members",
      "🛡️ Anti-spam filters, chat blacklists, and member warnings",
      "🔐 Role assignment panels, data backups, and custom embed messages"
    ],
    image: "/project/botcyza.png",
    github: "https://github.com/cyizzievielle/mystralassistant-bot",
    accent: "from-sky-300 via-pink-400 to-fuchsia-500",
  },
  {
    title: "Relovie Bot",
    category: "Interactive Bot",
    year: "2026",
    desc: "An interactive Discord relationship simulator with a virtual economy and couples leaderboards.",
    tech: ["Node.js", "Discord.js", "JSON", "API"],
    features: [
      "💼 Choose virtual jobs, work shifts, and collect daily coins",
      "🛒 Buy gifts, special role items, and engagement rings",
      "💖 Go on virtual dates, propose with rings, and host weddings",
      "🎁 Swap gifts to gain love points and climb couple leaderboards",
      "📊 Track couple profiles, relation status, and clear daily quests"
    ],
    image: "/project/relovie.png",
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
