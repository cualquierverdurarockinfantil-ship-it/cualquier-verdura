import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-6 md:pt-16 md:pb-10 relative">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-center max-w-[95vw] uppercase"
        style={{
          fontSize: "clamp(3.2rem, 14vw, 9rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.03em",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.10)) drop-shadow(0 2px 3px rgba(0,0,0,0.08))",
        }}
      >
        <span className="block text-foreground">ESPERANDO QUE</span>
        <span
          className="block relative"
          style={{
            color: "#E6302B",
            marginTop: "-0.04em",
            marginBottom: "-0.04em",
            zIndex: 2,
          }}
        >
          LAS VERDURAS
        </span>
        <span className="block text-foreground">ATIENDAN</span>
      </motion.h1>
    </section>
  );
}