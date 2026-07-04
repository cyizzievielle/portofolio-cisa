import {
  HiAcademicCap, HiBriefcase, HiCodeBracket, HiEnvelope, HiHeart,
  HiIdentification, HiSparkles, HiSquares2X2, HiWrenchScrewdriver,
} from "react-icons/hi2";

const iconMap: Record<string, React.ReactNode> = {
  About: <HiIdentification />,
  Education: <HiAcademicCap />,
  Experience: <HiBriefcase />,
  Services: <HiWrenchScrewdriver />,
  Skills: <HiCodeBracket />,
  Projects: <HiSquares2X2 />,
  Certificates: <HiSparkles />,
  Hobbies: <HiHeart />,
  Contact: <HiEnvelope />,
};

export function NavBadge({ label, iconOnly }: { label: string; iconOnly?: boolean }) {
  const icon = iconMap[label] ?? <HiSparkles />;
  if (iconOnly) return <>{icon}</>;
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-100 to-violet-100 text-lg text-rose-500 shadow-md">
      {icon}
    </span>
  );
}

