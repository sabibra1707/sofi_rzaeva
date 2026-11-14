import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { TgButton } from "./TgButton";
import { HeroBadge } from "./HeroBadge";
import { EASE, scrollToId } from "./Reveal";
import { tgWithText, CONTACTS, CTA_TEXT } from "../../data/content";

const LINES = ["Красивая фигура", "без диет, запретов", "и борьбы с собой"];

const MaskLine = ({ text, i }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span
      className={`block ${i === 1 ? "text-neon" : ""}`}
      initial={{ y: "105%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.13 }}
    >
      {text}
    </motion.span>
  </span>
);

const fade = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });

export const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 220]);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative min-h-[100svh] overflow-hidden pt-[110px] pb-16 lg:pt-[130px]">
      <motion.p style={{ y: bgY }} aria-hidden="true" className="ghost-word pointer-events-none absolute -bottom-[0.18em] left-0 right-0 text-center font-display uppercase leading-none select-none">Sofi</motion.p>
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <HeroBadge />
        <div>
          <motion.p {...fade(0.2)} className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-300 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />София Рзаева · фитнес-наставник
          </motion.p>
          <h1 id="hero-title" className="mt-7 font-display uppercase leading-[0.98] tracking-[-0.02em] text-[1.7rem] sm:text-5xl lg:text-[4.2rem] xl:text-[5rem]">
            {LINES.map((l, i) => <MaskLine key={l} text={l} i={i} />)}
          </h1>
        </div>
        <div className="mt-10 lg:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.85)} className="max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            Помогаю женщинам менять фигуру, налаживать питание и выстраивать привычки, которые позволяют сохранять результат без постоянных ограничений
          </motion.p>
          <motion.p {...fade(0.95)} className="mt-4 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
            Твоя цель — не просто похудеть. А чувствовать себя уверенно и комфортно в своём теле.
          </motion.p>
          <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-5">
            <TgButton testId="hero-telegram-cta" label="Хочу на сопровождение" href={tgWithText(CTA_TEXT)} />
            <button onClick={() => scrollToId("about")} data-testid="hero-approach-link" className="group inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 group-hover:border-neon transition-colors"><ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" /></span>
              Обо мне
            </button>
          </motion.div>
        </div>
        <div className="lg:col-span-5">
          <motion.dl {...fade(1.15)} className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 text-sm">
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Спорт</dt><dd className="mt-1 text-zinc-200 pr-2">Многократная чемпионка России</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Формат</dt><dd className="mt-1 text-zinc-200">Индивидуально, онлайн</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Где</dt><dd className="mt-1 text-zinc-200 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-neon" />{CONTACTS.city}</dd></div>
          </motion.dl>
        </div>
        </div>
      </div>
    </section>
  );
};
