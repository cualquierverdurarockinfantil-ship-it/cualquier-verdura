import { motion } from "framer-motion";

const VIDEO_URL = "/assets/video.mp4";

export default function VideoSection() {
  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-16 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
        style={{ maxWidth: "min(340px, 80vw)" }}
      >
        <div
          className="relative rounded-[1.6rem] overflow-hidden"
          style={{ aspectRatio: "4 / 3" }}
        >
          <video
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-1/2 w-full h-auto"
            style={{
              objectFit: "contain",
              clipPath: "inset(2px 0 2px 0)",
              transform: "translateY(-50%) scale(0.80)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}