import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function MusicControl({
  isPlaying,
  isMuted,
  onPlayPause,
  onMuteToggle,
}) {
  return (
    <div className="fixed bottom-4 left-4 z-[999] flex items-center gap-2 rounded-full border border-amber-300/30 bg-slate-950/70 px-3 py-2 backdrop-blur-md shadow-lg">
      <button
        type="button"
        onClick={onPlayPause}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/20 bg-slate-900/70 text-amber-200 transition hover:scale-105 hover:border-amber-300/40"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <button
        type="button"
        onClick={onMuteToggle}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/20 bg-slate-900/70 text-amber-200 transition hover:scale-105 hover:border-amber-300/40"
        aria-label={isMuted ? "Activar sonido" : "Silenciar música"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}