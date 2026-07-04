export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-badge-pop rounded-full bg-gradient-to-r from-rose-400 to-violet-500 px-5 py-3 font-bold text-white shadow-[0_15px_45px_rgba(168,85,247,0.4)]">
      {message}
    </div>
  );
}
