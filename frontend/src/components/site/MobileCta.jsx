import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { tgWithText, CTA_TEXT } from "../../data/content";

export const MobileCta = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="lg:hidden fixed inset-x-0 bottom-0 z-[60] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-gradient-to-t from-ink via-ink/90 to-transparent">
          <a href={tgWithText(CTA_TEXT)} target="_blank" rel="noopener noreferrer" data-testid="mobile-sticky-cta" className="flex w-full items-center justify-center gap-2 rounded-full bg-neon py-4 text-ink font-semibold shadow-[0_10px_40px_-10px_rgba(0,255,157,0.6)] active:scale-[0.98] transition-transform">
            <Send className="h-4 w-4" />Хочу на сопровождение
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
