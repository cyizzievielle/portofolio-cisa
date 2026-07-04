import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { ProjectModal } from "./ui/ProjectModal";
import { projects, type Project } from "../data/projects";

export function Projects() {
  const { dark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";
  const softCard = dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60";

  return (
    <>
      <section id="projects" className="reveal mx-auto max-w-6xl px-5 py-16">
        <SectionTitle label="Projects" title="Selected Works" />
        <p className={`mx-auto -mt-5 mb-10 max-w-2xl text-center text-sm sm:text-base leading-7 ${muted}`}>
          A few projects I have built, from Discord automation to full web systems with
          live demos.
        </p>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 gap-2 sm:gap-4">
          {[
            ["8+", "Featured builds"],
            ["Full-stack", "Web systems"],
            ["Live", "Ready to explore"],
          ].map(([value, label]) => (
            <div
              key={label}
              className={`rounded-2xl border px-2 py-3.5 sm:px-5 sm:py-4 text-center shadow-md transition duration-300 hover:-translate-y-1 ${softCard}`}
            >
              <p className="text-base sm:text-2xl font-black bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
                {value}
              </p>
              <p className={`mt-1 text-[10px] sm:text-sm font-bold leading-tight ${muted}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Unified Projects Grid (Balanced 2-Columns for 4 items) */}
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="h-full animate-card-in p-4 flex flex-col justify-between"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div>
                {/* Small Image Cover */}
                <div
                  className={`relative mb-4 h-36 overflow-hidden rounded-[18px] bg-gradient-to-br ${project.accent} text-white shadow-sm border border-violet-500/5`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.22),transparent_35%,rgba(255,255,255,.16))]" />
                  )}
                </div>

                {/* Info Text */}
                <div className="px-1">
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-rose-500">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className={`mt-1.5 text-lg font-extrabold transition-colors duration-300 ${
                    dark ? "text-rose-100 group-hover:text-pink-400" : "text-[#4a3558] group-hover:text-rose-600"
                  }`}>
                    {project.title}
                  </h3>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold text-rose-500 ${softCard}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap gap-2 px-1">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
                >
                  Details
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border px-4 py-2 text-center text-xs font-bold text-rose-500 transition hover:-translate-y-0.5 ${softCard}`}
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border px-4 py-2 text-center text-xs font-bold text-rose-500 transition hover:-translate-y-0.5 ${softCard}`}
                  >
                    Live
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
