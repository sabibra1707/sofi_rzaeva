import { motion } from "framer-motion";
import { EASE } from "./Reveal";

export const HeroBadge = () => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
    animate={{ opacity: 1, rotate: 0, scale: 1 }}
    transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
    className="hidden md:block absolute right-8 lg:right-12 -top-2 h-32 w-32 lg:h-40 lg:w-40"
  >
    <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_18s_linear_infinite]">
      <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
      <text className="font-mono" fontSize="9.5" letterSpacing="2.6" fill="#F4F4F0"><textPath href="#circ">СВОЙ РИТМ · БЕЗ КРАЙНОСТЕЙ · </textPath></text>
    </svg>
    <span className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-neon shadow-[0_0_24px_#00FF9D]" />
  </motion.div>
);
