import { motion } from "framer-motion";
import { useState } from "react";
import { useIncrementWaitingCount } from "@/hooks/useWaitingCounter";

const ACCENT_COLORS = ["#E6302B", "#93C121", "#F3944C", "#92338A", "#FFED00"];

export default function CTASection() {
  const [clicked, setClicked] = useState(false);
  const [hoverColor, setHoverColor] = useState("#E6302B");
  const [isHovered, setIsHovered] = useState(false);

  const incrementMutation = useIncrementWaitingCount();

  const handleClick = () => {
    if (clicked) return;
    incrementMutation.mutate(undefined, {
      onSuccess: () => setClicked(true),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverColor(ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]);
  };

  return (
    <section className="py-12 md:py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
      >
        <motion.button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={clicked}
          className="relative min-h-[56px] px-8 py-4 text-lg md:text-xl font-body font-extrabold rounded-full border-[3px] transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-offset-4 disabled:opacity-60 disabled:cursor-default"
          style={{
            backgroundColor: isHovered && !clicked ? hoverColor : "transparent",
            color: isHovered && !clicked ? (hoverColor === "#FFED00" ? "#0A0A0A" : "#FFFFFF") : "#0A0A0A",
            borderColor: isHovered && !clicked ? hoverColor : "#0A0A0A",
            focusRingColor: "#92338A",
          }}
        >
          {clicked ? "🎸 ¡Ya estás en la lista!" : "🙋 Yo también estoy esperando"}
        </motion.button>
      </motion.div>
    </section>
  );
}
