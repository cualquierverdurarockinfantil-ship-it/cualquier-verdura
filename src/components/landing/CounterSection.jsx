import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useWaitingCount } from "@/hooks/useWaitingCounter";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("es-AR")}
    </span>
  );
}

export default function CounterSection() {
  const { data: currentCount } = useWaitingCount();

  return (
    <section className="pb-8 md:pb-14 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
        role="status"
        aria-live="polite"
      >
        <p className="font-body text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground mb-5 font-semibold">
          Personas esperando el mensaje
        </p>
        <p
          className="font-mono leading-none font-bold"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 11rem)",
            color: "#93C121",
          }}
        >
          <AnimatedNumber value={currentCount ?? 0} />
        </p>
      </motion.div>
    </section>
  );
}
