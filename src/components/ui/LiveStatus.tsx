import { FaSpotify } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { useTheme } from "../../context/ThemeContext";

type Activity = {
  name: string;
  type: number;
  details?: string;
  state?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
};

type SpotifyData = {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
};

export function LiveStatus({
  spotify,
  activities,
}: {
  spotify: SpotifyData | null;
  activities: Activity[];
}) {
  const { dark } = useTheme();
  
  const textMuted = dark ? "text-rose-200/50" : "text-[#7a6188]/80";

  const vsCodeActivity = activities.find(
    (act) => act.name === "Visual Studio Code"
  );

  if (!spotify && !vsCodeActivity) {
    return null; // Keep it clean if no active status!
  }

  return (
    <div className="mt-5 flex flex-col gap-2.5 sm:gap-3.5 text-left w-full max-w-xs mx-auto animate-fade-up">
      <style>{`
        @keyframes soundWave {
          0%, 100% { height: 3px; }
          50% { height: 13px; }
        }
        .wave-bar {
          width: 2px;
          border-radius: 1px;
          animation: soundWave 0.8s ease-in-out infinite;
        }
      `}</style>

      {/* VS Code Coding Activity */}
      {vsCodeActivity && (
        <div
          className={`flex items-center gap-2.5 rounded-full border p-2 px-3.5 transition-all duration-300 sm:rounded-[22px] sm:p-3 sm:gap-3.5 ${
            dark
              ? "border-sky-500/10 bg-sky-950/15"
              : "border-sky-100 bg-sky-50/30"
          }`}
        >
          <div className="flex h-6 w-6 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full sm:rounded-xl bg-sky-500/10 text-sky-500 text-sm sm:text-lg">
            <VscVscode />
          </div>
          <div className="flex-1 min-w-0">
            <p className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-sky-500">
              Active Workspace
            </p>
            <h4 className="hidden sm:block text-xs font-black text-rose-500 truncate mt-0.5">
              Visual Studio Code
            </h4>
            
            {/* Mobile Layout (inline) */}
            <p className="sm:hidden text-xs font-semibold truncate text-rose-500">
              <span className="text-sky-500 font-bold mr-1">VS Code:</span>
              <span className={dark ? "text-rose-100" : "text-[#4a3558]"}>
                {vsCodeActivity.details || "Coding"}
              </span>
            </p>

            {/* Desktop Layout */}
            <p className={`hidden sm:block text-xs mt-0.5 truncate ${textMuted}`}>
              {vsCodeActivity.details || "Editing files"}
            </p>
          </div>
        </div>
      )}

      {/* Spotify Music Activity */}
      {spotify && (
        <div
          className={`flex items-center gap-2.5 rounded-full border p-2 px-3.5 transition-all duration-300 sm:rounded-[22px] sm:p-3 sm:gap-3.5 ${
            dark
              ? "border-emerald-500/10 bg-emerald-950/15"
              : "border-emerald-100 bg-emerald-50/30"
          }`}
        >
          <div className="relative h-6 w-6 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-full sm:rounded-xl shadow-sm">
            <img
              src={spotify.album_art_url}
              alt={spotify.album}
              className="h-full w-full object-cover animate-[spin_12s_linear_infinite]"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center sm:hidden">
              <FaSpotify className="text-emerald-400 text-[10px]" />
            </div>
            <div className="absolute inset-0 bg-black/10 hidden sm:flex items-center justify-center">
              <FaSpotify className="text-emerald-400 text-base" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-emerald-500">
                Listening to Spotify
              </span>
              <span className="sm:hidden text-emerald-500 font-bold text-xs">Spotify:</span>
              
              {/* Sound Wave */}
              <div className="flex items-end gap-0.5 h-3 pb-0.5 shrink-0">
                <span className="wave-bar bg-emerald-400" style={{ animationDelay: "0s" }} />
                <span className="wave-bar bg-emerald-400" style={{ animationDelay: "0.15s" }} />
                <span className="wave-bar bg-emerald-400" style={{ animationDelay: "0.3s" }} />
                <span className="wave-bar bg-emerald-400" style={{ animationDelay: "0.1s" }} />
              </div>
            </div>

            {/* Desktop Layout */}
            <h4 className="hidden sm:block text-xs font-black text-rose-500 truncate mt-0.5">
              {spotify.song}
            </h4>
            <p className={`hidden sm:block text-xs mt-0.5 truncate ${textMuted}`}>
              by {spotify.artist}
            </p>

            {/* Mobile Layout (inline) */}
            <p className={`sm:hidden text-xs font-semibold truncate ${dark ? "text-rose-100" : "text-[#4a3558]"}`}>
              {spotify.song} <span className="text-[10px] opacity-60 font-normal">by {spotify.artist}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
