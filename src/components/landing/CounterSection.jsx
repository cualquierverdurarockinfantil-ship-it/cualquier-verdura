import { motion } from "framer-motion";
import { useWaitingCount } from "@/hooks/useWaitingCounter";

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
          className="font-mono leading-none font-bold tabular-nums"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 11rem)",
            color: "#93C121",
          }}
        >
          {(currentCount ?? 0).toLocaleString("es-AR")}
        </p>
      </motion.div>
    </section>
  );
}
