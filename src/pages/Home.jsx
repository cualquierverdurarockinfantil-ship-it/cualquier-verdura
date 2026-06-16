import { motion } from "framer-motion";
import HeroSection from "@/components/landing/HeroSection";
import RingingPhone from "@/components/landing/RingingPhone";
import MessageSection from "@/components/landing/MessageSection";
import CTASection from "@/components/landing/CTASection";
import CounterSection from "@/components/landing/CounterSection";
import ClosingSection from "@/components/landing/ClosingSection";

export default function Home() {
  return (
    <main className="bg-background overflow-x-hidden selection:bg-rock-red/20 selection:text-rock-red">
      <HeroSection />
      <RingingPhone />
      <MessageSection />
      <CTASection />
      <CounterSection />
      <ClosingSection />

      {/* Logo bottom-center */}
      <div className="flex justify-center pb-12 px-6">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          src="/assets/logo-sticker.png"
          alt="Cualquier Verdura"
          className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-70 hover:opacity-100 transition-opacity"
        />
      </div>
    </main>
  );
}