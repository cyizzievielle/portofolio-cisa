import { useTheme } from "../../context/ThemeContext";

type CertData = {
  title: string;
  desc: string;
  image: string;
};

type Props = {
  cert: CertData;
  onClose: () => void;
};

export function CertificateModal({ cert, onClose }: Props) {
  const { dark } = useTheme();
  const muted = dark ? "text-rose-200/70" : "text-[#5e4b6c]";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] grid place-items-center overflow-y-auto bg-slate-950/60 p-4 sm:p-6 backdrop-blur-md transition-all duration-300"
    >
      {/* Modal Card container - added my-auto for proper centering and scrolling */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`animate-modal-in my-auto w-full max-w-2xl overflow-hidden rounded-[28px] border transition-all duration-300 ${
          dark
            ? "border-violet-500/20 bg-violet-950/40 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(168,85,247,0.35)]"
            : "border-rose-200/50 bg-white/85 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(219,39,119,0.15)]"
        }`}
      >
        {/* Top Header - slightly more compact padding */}
        <div className="flex items-center justify-between border-b px-5 py-3.5 border-violet-500/10">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full">
              Achievement
            </span>
            <h3 className="mt-1 text-lg font-black bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent sm:text-xl">
              {cert.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 hover:rotate-90 ${
              dark
                ? "border-violet-500/20 bg-violet-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white"
                : "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
            }`}
          >
            ✕
          </button>
        </div>

        {/* Content Body - slightly more compact padding */}
        <div className="p-4 sm:p-5">
          {/* Certificate Image Frame - max-height constrained and transparent to avoid gray borders */}
          <div className="relative overflow-hidden rounded-2xl bg-transparent">
            <img
              src={cert.image}
              alt={cert.title}
              className="mx-auto max-h-[42vh] w-auto object-contain rounded-2xl shadow-md border border-violet-500/5"
            />
          </div>

          {/* Description Block */}
          <div
            className={`mt-4 rounded-2xl border p-4 ${
              dark
                ? "border-violet-500/10 bg-violet-500/5"
                : "border-rose-200/30 bg-rose-50/40"
            }`}
          >
            <p className={`text-sm leading-relaxed ${muted}`}>{cert.desc}</p>
          </div>

          {/* Footer Action Buttons */}
          <div className="mt-4 flex items-center justify-end gap-3 border-t border-violet-500/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`rounded-full px-5 py-2 text-xs font-bold transition duration-300 ${
                dark
                  ? "bg-violet-950/30 text-violet-300 border border-violet-500/15 hover:bg-violet-900/40 hover:text-white"
                  : "bg-rose-50 text-[#7a6188] border border-rose-200 hover:bg-rose-100"
              }`}
            >
              Close
            </button>
            <a
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-400 to-violet-500 px-5 py-2 text-xs font-bold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(236,72,153,0.3)]"
            >
              Open Full Quality ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
