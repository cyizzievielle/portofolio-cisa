import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { CertificateModal } from "./ui/CertificateModal";
import { certificates } from "../data/certificates";

export function Certificates() {
  const { dark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(
    null
  );

  return (
    <>
      <section id="certificates" className="reveal mx-auto max-w-6xl px-5 py-16">
        <SectionTitle label="Certificates" title="Certificates & Achievements" />
        
        {/* Compact Centered Grid to keep certificates small and aesthetic */}
        <div className="mx-auto max-w-3xl grid gap-6 sm:grid-cols-2">
          {certificates.map((cert) => (
            <button
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              className="group text-left focus:outline-none w-full"
            >
              <Card className="h-full p-3.5 flex flex-col gap-4 hover:shadow-[0_15px_35px_rgba(168,85,247,0.15)]">
                {/* Certificate Image Preview - Set to standard A4 ratio (1.414) */}
                <div className="relative overflow-hidden rounded-[14px] border border-violet-500/10 bg-slate-950/5 shadow-sm aspect-[1.414] w-full">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  
                  {/* Glassmorphic Hover Click Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="rounded-full bg-white/20 border border-white/30 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-lg backdrop-blur-md scale-90 group-hover:scale-100 transition-transform duration-300">
                      Click to View 🔍
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="px-1">
                  <h3 className={`text-sm sm:text-base font-extrabold transition-colors duration-300 ${
                    dark ? "text-rose-100 group-hover:text-pink-400" : "text-[#4a3558] group-hover:text-rose-600"
                  }`}>
                    {cert.title}
                  </h3>

                  {/* Micro Action Footer */}
                  <div className="mt-3 flex items-center justify-between border-t border-rose-200/20 dark:border-violet-500/10 pt-2.5 text-[10px] font-black uppercase tracking-wider text-rose-500/60 group-hover:text-rose-500 transition-colors duration-300">
                    <span>Credential</span>
                    <span className="flex items-center gap-1">
                      Click to view <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </section>

      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </>
  );
}
