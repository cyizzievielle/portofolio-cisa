import {
  SiHtml5, SiCss as SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiPhp, SiLaravel, SiCodeigniter, SiNodedotjs,
  SiMysql, SiMariadb, SiSqlite,
  SiGithub, SiDiscord,
  SiTypescript, SiNextdotjs, SiAngular, SiVite,
  SiGit, SiFigma, SiPostman, SiDocker, SiNpm,
  SiVercel, SiCpanel, SiDiagramsdotnet
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { HiServerStack } from "react-icons/hi2";

export type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

export type SkillGroup = {
  title: string;
  emoji: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Tools",
    emoji: "🔧",
    items: [
      { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#6e5494" },
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "npm", icon: <SiNpm />, color: "#CB3837" },
      { name: "Vercel", icon: <SiVercel />, color: "#000000" },
      { name: "cPanel", icon: <SiCpanel />, color: "#FF6C2C" },
      { name: "draw.io", icon: <SiDiagramsdotnet />, color: "#F08705" },
      { name: "Pterodactyl", icon: <HiServerStack />, color: "#4f8fff" },
      { name: "Discord Bot", icon: <SiDiscord />, color: "#5865F2" },
    ],
  },
  {
    title: "Frontend",
    emoji: "🎨",
    items: [
      { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572B6" },
      { name: "JavaScript (ES6+)", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "React.js", icon: <SiReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
      { name: "Angular", icon: <SiAngular />, color: "#DD0031" },
      { name: "Vite", icon: <SiVite />, color: "#646CFF" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    items: [
      { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
      { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
      { name: "CodeIgniter 4", icon: <SiCodeigniter />, color: "#EF4223" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    ],
  },
  {
    title: "Database",
    emoji: "🗄️",
    items: [
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "MariaDB", icon: <SiMariadb />, color: "#003545" },
      { name: "SQLite", icon: <SiSqlite />, color: "#003B57" },
    ],
  },
];
