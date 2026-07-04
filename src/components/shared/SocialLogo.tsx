import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function SocialLogo({ name }: { name: string }) {
  const logos: Record<string, React.ReactNode> = {
    Email: <MdEmail />,
    Instagram: <FaInstagram />,
    GitHub: <FaGithub />,
    LinkedIn: <FaLinkedin />,
    Discord: <FaDiscord />,
  };

  return (
    <span className="grid h-10 w-10 place-items-center text-3xl text-rose-500">
      {logos[name] ?? <MdEmail />}
    </span>
  );
}
