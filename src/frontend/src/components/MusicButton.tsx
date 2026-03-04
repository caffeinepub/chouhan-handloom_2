import { Music, Music2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function MusicButton() {
  const { musicPlaying, setMusicPlaying } = useAppContext();

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      {/* Tooltip */}
      <div className="absolute bottom-full left-0 mb-2 pointer-events-none">
        <div
          className={`bg-jet text-ivory text-xs font-body px-3 py-2 rounded-sm whitespace-nowrap border border-gold/20 transition-all duration-200 ${
            musicPlaying
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {musicPlaying
            ? "Traditional Instrumental ♪"
            : "Play Traditional Music"}
          <div className="absolute bottom-0 left-4 translate-y-full border-4 border-transparent border-t-jet" />
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={() => {
          setMusicPlaying(!musicPlaying);
          if (!musicPlaying) {
            // Toast message since audio autoplay is restricted
            import("sonner").then(({ toast }) => {
              toast("🎵 Music will play on your next interaction", {
                description: "Traditional Maheshwari instrumental",
                duration: 3000,
              });
            });
          }
        }}
        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
          musicPlaying
            ? "bg-maroon border-gold text-gold music-playing"
            : "bg-jet-dark/90 border-gold/30 text-ivory/60 hover:border-gold hover:text-gold"
        }`}
        aria-label={musicPlaying ? "Pause music" : "Play traditional music"}
      >
        {musicPlaying ? <Music size={20} /> : <Music2 size={20} />}
      </button>

      {/* Sound waves visual (when playing) */}
      {musicPlaying && (
        <div className="absolute inset-0 -z-10 rounded-full" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute inset-0 rounded-full border border-gold/20 animate-ping"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
