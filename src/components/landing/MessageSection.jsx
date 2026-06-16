import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function MessageSection() {
  return (
    <section className="pt-0 pb-6 md:pt-0 md:pb-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="font-body text-2xl md:text-3xl leading-relaxed font-extrabold text-foreground/80">
          Tienen un{" "}
          <span style={{ color: "#F3944C" }}>mensaje muy importante</span>{" "}
          para escuchar
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center mt-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-[#0A0A0A]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}