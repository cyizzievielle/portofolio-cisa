import { useTheme } from "../../context/ThemeContext";
import type { Project } from "../../data/projects";

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const { dark } = useTheme();
  const softCard = dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`animate-modal-in relative my-auto mx-auto w-full max-w-4xl rounded-[32px] border p-5 shadow-[0_30px_90px_rgba(168,85,247,0.22)] sm:p-8 ${
          dark ? "border-violet-300/10 bg-[#0d0714]" : "border-rose-200/50 bg-white"
        }`}
      >
        {/* Close Button - Rotating Hover */}
        <button
          onClick={onClose}
          aria-label="Close project detail"
          className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-rose-300/25 bg-white/10 text-xl font-bold text-rose-500 shadow-md backdrop-blur transition-all duration-300 hover:rotate-90 hover:scale-105"
        >
          ✕
        </button>

        {/* Widescreen Banner Image */}
        <div className={`relative mb-8 overflow-hidden rounded-[24px] bg-gradient-to-br ${project.accent} shadow-md border border-violet-500/5 w-full aspect-[16/7] min-h-[160px] sm:min-h-[260px]`}>
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.22),transparent_35%,rgba(255,255,255,.16))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          
          {/* Floating Title Overlay */}
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 flex flex-col justify-end">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-300">
              {project.category}
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Section: Split Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          
          {/* Left Column: Case Study Text Details */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${
                dark ? "text-rose-300/80" : "text-rose-500"
              }`}>
                About the Project
              </h3>
              <p className={`mt-3 text-sm sm:text-base leading-relaxed sm:leading-loose ${
                dark ? "text-rose-100/85" : "text-[#4a3558]"
              }`}>
                {project.desc}
              </p>
            </div>

            {project.features && project.features.length > 0 && (
              <div>
                <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${
                  dark ? "text-rose-300/80" : "text-rose-500"
                }`}>
                  Key Features
                </h3>
                <ul className="mt-4 space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm sm:text-base">
                      <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-rose-400 to-violet-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                      <span className={dark ? "text-rose-200/90" : "text-[#7a6188] font-medium"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Case Study Metadata Sidebar */}
          <div className={`rounded-3xl border p-5 sm:p-6 space-y-6 ${softCard}`}>
            
            {/* Category & Year */}
            <div className="grid grid-cols-2 gap-4 border-b border-rose-200/20 dark:border-violet-500/10 pb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500/80">
                  Category
                </span>
                <p className={`mt-1 text-xs sm:text-sm font-bold ${dark ? "text-rose-100" : "text-[#4a3558]"}`}>
                  {project.category}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500/80">
                  Timeline
                </span>
                <p className={`mt-1 text-xs sm:text-sm font-bold ${dark ? "text-rose-100" : "text-[#4a3558]"}`}>
                  {project.year}
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="border-b border-rose-200/20 dark:border-violet-500/10 pb-5">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-500/80">
                Tech Stack
              </span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full border px-3 py-1 text-xs font-bold text-rose-500 ${
                      dark ? "border-violet-300/10 bg-violet-400/5" : "border-rose-200 bg-white"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {(project.github || project.live) && (
              <div className="flex flex-col gap-2.5">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(168,85,247,0.3)] transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                  >
                    Visit Live Project ✨
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-full border py-3 text-sm font-bold text-rose-500 transition hover:-translate-y-0.5 ${
                      dark ? "border-rose-200/10 hover:bg-white/5" : "border-rose-300/50 hover:bg-rose-50"
                    } active:scale-[0.98]`}
                  >
                    Open GitHub Repo
                  </a>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
