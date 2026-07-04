export function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <span className="animate-badge-pop inline-flex rounded-full border border-violet-300/30 bg-gradient-to-r from-rose-100/60 to-violet-100/60 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-rose-500 shadow-[0_10px_35px_rgba(219,39,119,0.12)]">
        {label}
      </span>
      <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
        <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
    </div>
  );
}
