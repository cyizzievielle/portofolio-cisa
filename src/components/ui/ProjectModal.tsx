import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import type { Project } from "../../data/projects";

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const { dark } = useTheme();
  const softCard = dark ? "border-violet-300/15 bg-violet-400/8" : "border-rose-200/50 bg-rose-50/60";

  // Build image list (prefer images array if present, fallback to single image)
  const imageList = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const [activeImage, setActiveImage] = useState<string | undefined>(imageList[0]);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex overflow-y-auto bg-black/80 p-3 sm:p-6 backdrop-blur-md"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`animate-modal-in relative my-auto mx-auto w-full max-w-4xl rounded-[32px] border p-5 shadow-[0_30px_90px_rgba(168,85,247,0.25)] sm:p-8 ${
            dark ? "border-violet-300/10 bg-[#0d0714]" : "border-rose-200/50 bg-white"
          }`}
        >
          {/* Top Header Section */}
          <div className="mb-5 flex items-start justify-between gap-4 pr-12">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-rose-500">
                {project.category}
              </span>
              <h2 className="mt-1 text-2xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                {project.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project detail"
              className="absolute right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-rose-300/25 bg-white/10 text-xl font-bold text-rose-500 shadow-md backdrop-blur transition-all duration-300 hover:rotate-90 hover:scale-105"
            >
              ✕
            </button>
          </div>

          {/* Screenshot Preview Container (Uncropped Full Image View) */}
          <div
            onClick={() => activeImage && setIsZoomed(true)}
            className="group relative overflow-hidden rounded-[24px] bg-[#07040d] border border-violet-500/20 shadow-inner w-full aspect-[16/9] max-h-[440px] flex items-center justify-center cursor-zoom-in"
          >
            {activeImage ? (
              <img
                src={activeImage}
                alt={`${project.title} preview`}
                className="h-full w-full object-contain p-1 transition-all duration-300 group-hover:scale-[1.01]"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.05),transparent_35%)]" />
            )}

            <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-rose-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
              🔍 Click to enlarge screenshot
            </div>
          </div>

          {/* Interactive Screenshot Gallery Thumbnails */}
          {imageList.length > 1 && (
            <div className="mt-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-500/80 mb-2 block">
                Feature Screenshots Gallery ({imageList.length})
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`group relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 bg-[#07040d] ${
                      activeImage === img
                        ? "border-rose-400 scale-105 shadow-md shadow-rose-500/30 ring-2 ring-rose-400/50 opacity-100"
                        : "border-violet-500/15 opacity-60 hover:opacity-100 hover:border-violet-400/50"
                    }`}
                  >
                    <img src={img} alt={`Screenshot ${idx + 1}`} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Section: Split Layout */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
            
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
                    Key Features & Capabilities
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
              
              {/* Category & Year & Bot Prefix */}
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
                {project.prefix && (
                  <div className="col-span-2 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-500/80">
                      Bot Prefix / Trigger
                    </span>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-mono font-bold text-violet-300 shadow-inner">
                        {project.prefix}
                      </span>
                    </div>
                  </div>
                )}
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

      {/* Fullscreen Lightbox Image Viewer */}
      {isZoomed && activeImage && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg cursor-zoom-out"
        >
          <img
            src={activeImage}
            alt="Full screenshot view"
            className="max-h-[92vh] max-w-[95vw] object-contain rounded-2xl border border-white/20 shadow-2xl"
          />
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white backdrop-blur hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
