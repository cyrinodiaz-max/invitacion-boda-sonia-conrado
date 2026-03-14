import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingContent } from "./lib/content";
import IntroOverlay from "./components/IntroOverlay";
import Hero from "./components/Hero";
import CountdownSection from "./components/CountdownSection";
import EventSection from "./components/EventSection";
import DressCodeSection from "./components/DressCodeSection";
import RSVPSection from "./components/RSVPSection";
import Footer from "./components/Footer";
import MusicControl from "./components/MusicControl";
import StarField from "./components/StarField";
import { Church, GlassWater } from "lucide-react";

export default function App() {
  const audioRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);
    const handleEnded = () => setIsMusicPlaying(false);
    const handleVolumeChange = () => setIsMuted(audio.muted);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

const handleOpenInvitation = async () => {
  const audio = audioRef.current;

  if (audio) {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 0.85;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        await playPromise;
        setIsMusicPlaying(true);
        setIsMuted(false);
      }
    } catch (error) {
      console.error("No se pudo iniciar la música automáticamente:", error);
      setIsMusicPlaying(false);
    }
  }

  setOpened(true);
};

  const handlePlayPauseMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsMusicPlaying(true);
      } else {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    } catch (error) {
      console.error("Error al controlar la música:", error);
    }
  };

  const handleMuteToggle = () => {
    if (!audioRef.current) return;

    const nextMuted = !audioRef.current.muted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
<audio
  ref={audioRef}
  src="/audio/hasta-mi-final.mp3"
  preload="auto"
  playsInline
  onPlay={() => setIsMusicPlaying(true)}
  onPause={() => setIsMusicPlaying(false)}
/>

      <StarField />

      <div className="min-h-screen bg-stars text-ink relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!opened && (
            <motion.div
              key="intro"
              initial={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -18 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20"
            >
              <IntroOverlay onOpen={handleOpenInvitation} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.main
              key="main-content"
              initial={{ opacity: 0, y: 26, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Hero />
              <CountdownSection target={weddingContent.countdown.target} />

              <section className="section-shell event-grid section-spacing">
                <EventSection
                  icon={Church}
                  event={weddingContent.events.ceremony}
                />
                <EventSection
                  icon={GlassWater}
                  event={weddingContent.events.reception}
                />
              </section>

              <DressCodeSection />
              <RSVPSection />
              <Footer />
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      {opened && (
        <MusicControl
          isPlaying={isMusicPlaying}
          isMuted={isMuted}
          onPlayPause={handlePlayPauseMusic}
          onMuteToggle={handleMuteToggle}
        />
      )}
    </>
  );
}