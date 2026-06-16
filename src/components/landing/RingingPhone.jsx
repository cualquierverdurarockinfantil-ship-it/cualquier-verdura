import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const PHONE_VIDEO = "/assets/video.mp4";

export default function RingingPhone() {
  const videoRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = !next;
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
        {/* Audio toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={toggleAudio}
          className="absolute top-0 right-0 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-white/90 transition-colors shadow-sm"
          style={{ transform: "translate(30%, -30%)" }}
          title={audioEnabled ? "Silenciar" : "Activar sonido"}
        >
          {audioEnabled ? (
            <Volume2 className="w-4 h-4 text-foreground/50" />
          ) : (
            <VolumeX className="w-4 h-4 text-foreground/40" />
          )}
        </motion.button>

        <video
          ref={videoRef}
          src={PHONE_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          className="block w-full h-auto"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
            outline: "none",
            border: "none",
            background: "transparent",
          }}
        />
      </motion.div>
    </section>
  );
}
