import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { TgButton } from "./TgButton";
import { HeroPortrait } from "./HeroPortrait";
import { EASE, scrollToId } from "./Reveal";
import { tgWithText, CONTACTS } from "../../data/content";

const LINES = ["Фитнес", "без срывов", "и крайностей"];

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
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.2)} className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-300 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />Софи Рзаева · фитнес-наставник
          </motion.p>
          <h1 id="hero-title" className="mt-7 font-display uppercase leading-[0.98] tracking-[-0.02em] text-[2.05rem] sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]">
            {LINES.map((l, i) => <MaskLine key={l} text={l} i={i} />)}
          </h1>
          <motion.p {...fade(0.85)} className="mt-8 max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            Наставничество для женщин 25–60 лет — офисных сотрудниц и тех, кто только начинает. Мой подход: устойчивое снижение веса, меньше циклов «сорвалась — начала заново» и больше уверенности в себе.
          </motion.p>
          <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-5">
            <TgButton testId="hero-telegram-cta" label="Записаться в Telegram" href={tgWithText("Здравствуйте, Софи! Хочу записаться на консультацию.")} />
            <button onClick={() => scrollToId("about")} data-testid="hero-approach-link" className="group inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 group-hover:border-neon transition-colors"><ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" /></span>
              Узнать о подходе
            </button>
          </motion.div>
          <motion.dl {...fade(1.15)} className="mt-14 grid grid-cols-3 max-w-lg border-t border-white/10 pt-6 text-sm">
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Для кого</dt><dd className="mt-1 font-display text-lg">25–60</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Формат</dt><dd className="mt-1 font-display text-lg">1 : 1</dd></div>
            <div><dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Где</dt><dd className="mt-1 text-zinc-200 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-neon" />{CONTACTS.city}</dd></div>
          </motion.dl>
        </div>
        <div className="lg:col-span-5"><HeroPortrait /></div>
      </div>
    </section>
  );
};
