import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { EASE } from "./Reveal";

export const HeroPortrait = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 70]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <div className="relative mx-auto w-full max-w-[460px] [perspective:1200px]" onMouseMove={onMove} onMouseLeave={reset}>
      <motion.figure
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }}
        animate={{ clipPath: "inset(0% 0 0 0 round 28px)" }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
        className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-surface border border-white/10"
        data-testid="hero-portrait-placeholder"
      >
        <motion.img style={{ y: imgY, scale: 1.15 }} src="/img/hero.jpg" alt="Временное атмосферное фото: силуэт женщины в луче света. Будет заменено на фото Софи Рзаевой" className="absolute inset-0 h-full w-full object-cover grayscale contrast-125" loading="eager" fetchPriority="high" width="1200" height="1798" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_20%,rgba(8,9,12,0.85)_75%)]" />
        <div className="absolute inset-0 mix-blend-color bg-neon/20" />
        <figcaption style={{ transform: "translateZ(40px)" }} className="absolute left-4 right-4 bottom-4 rounded-2xl border border-dashed border-neon/50 bg-ink/70 backdrop-blur-md p-4">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neon"><ImageIcon className="h-3.5 w-3.5" />Место для фото</p>
          <p className="mt-1 text-sm text-zinc-200">Здесь будет портрет Софи Рзаевой. Сейчас — временное изображение.</p>
        </figcaption>
      </motion.figure>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1.2 }}
        className="absolute -left-6 -top-6 sm:-left-10 sm:-top-8 h-24 w-24 sm:h-28 sm:w-28"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_18s_linear_infinite]">
          <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
          <text className="font-mono" fontSize="9.5" letterSpacing="2.6" fill="#F4F4F0"><textPath href="#circ">СВОЙ РИТМ · БЕЗ КРАЙНОСТЕЙ · </textPath></text>
        </svg>
        <span className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-neon shadow-[0_0_20px_#00FF9D]" />
      </motion.div>
    </div>
  );
};
