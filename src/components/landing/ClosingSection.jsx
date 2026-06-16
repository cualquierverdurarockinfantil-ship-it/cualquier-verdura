import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <section className="pb-10 md:pb-16 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center"
      >
        <p
          className="font-body leading-relaxed font-extrabold"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 3rem)",
            color: "#0A0A0A",
            opacity: 1,
          }}
        >
          Falta muy poco...
          <br />
          seguro antes del Día del Niño haya noticias...
        </p>
      </motion.div>
    </section>
  );
}