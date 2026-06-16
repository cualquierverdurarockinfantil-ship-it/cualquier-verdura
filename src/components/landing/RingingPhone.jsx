import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const PHONE_VIDEO = "/assets/video-silent.mp4";
const RING_AUDIO = "/assets/audio-only.m4a";

const videoStyle = {
  display: "block",
  width: "100%",
  height: "auto",
  border: "0px none transparent",
  outline: "0px none transparent",
  boxShadow: "none",
  background: "transparent",
  WebkitTapHighlightColor: "transparent",
  borderRadius: 0,
};

export default function RingingPhone() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const audioEnabledRef = useRef(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Loop manual: en vez de usar el atributo `loop` nativo (que en Chrome dispara
  // un "seeked" interno con un glitch visual de un frame en el borde del video),
  // reiniciamos manualmente al terminar. Esto es indistinguible para el ojo pero
  // evita el parpadeo del navegador.
  const restartCycle = useCallback(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    if (audio && audioEnabledRef.current) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("ended", restartCycle);
    return () => video.removeEventListener("ended", restartCycle);
  }, [restartCycle]);

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const next = !prev;
      audioEnabledRef.current = next;
      const audio = audioRef.current;
      const video = videoRef.current;
      if (audio) {
        if (next) {
          audio.currentTime = video ? video.currentTime : 0;
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
      }
      return next;
    });
  };

  return (
    <section className="pt-4 pb-0 md:pt-6 md:pb-4 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[min(340px,78vw)] md:w-[min(440px,55vw)] lg:w-[min(560px,42vw)]"
      >
        <video
          ref={videoRef}
          src={PHONE_VIDEO}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          style={videoStyle}
        />

        {/* Audio independiente del teléfono sonando, sincronizado con el video */}
        <audio
          ref={audioRef}
          src={RING_AUDIO}
          preload="auto"
          style={{ display: "none" }}
        />

        {/* Audio toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={toggleAudio}
          className="absolute top-2 right-2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 transition-colors shadow-sm"
          title={audioEnabled ? "Silenciar" : "Activar sonido"}
        >
          {audioEnabled ? (
            <Volume2 className="w-4 h-4 text-foreground/50" />
          ) : (
            <VolumeX className="w-4 h-4 text-foreground/40" />
          )}
        </motion.button>
      </motion.div>
    </section>
  );
}
