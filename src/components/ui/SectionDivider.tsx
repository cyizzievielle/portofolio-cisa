export function SectionDivider() {
  return (
    <div className="mx-auto my-14 flex items-center justify-center gap-3">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300/50" />
      <div className="h-2 w-2 rounded-full bg-gradient-to-br from-rose-400 to-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-300/50" />
    </div>
  );
}
