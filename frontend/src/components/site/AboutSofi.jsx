import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ACHIEVEMENTS } from "../../data/content";

const STORY = [
  "Я знаю, каково это — постоянно худеть, срываться и начинать всё заново.",
  "В спортивной аэробике, где худоба была частью профессии, я годами жила в цикле диет, ограничений и набора веса. Я мечтала однажды перестать бороться с едой и наконец обрести форму, в которой мне будет комфортно.",
  "Поступив в спортивный университет и став глубже изучать тренировки и питание, я поняла главное: дело не только в том, что мы едим и сколько тренируемся. На наши решения влияют усталость, тревога, скука, грусть и другие эмоции.",
  "Когда я научилась работать с этими привычками и своим состоянием, мне удалось прийти к желаемой форме и сохранить её.",
  "Теперь я помогаю другим женщинам пройти этот путь — без крайностей, чувства вины и постоянного начинания с понедельника.",
];

const Photo = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[24px] border border-white/10 bg-[#e9e8e4]">
      <motion.img style={{ y, scale: 1.12 }} src="/img/sofi-about.webp" alt="София Рзаева в спортивной форме улыбается на светлом фоне" loading="lazy" width="1000" height="1778" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
      <span className="absolute left-4 bottom-4 rounded-full bg-ink/80 backdrop-blur px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neon">София Рзаева</span>
    </div>
  );
};

export const AboutSofi = () => (
  <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32 lg:py-40">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-14 lg:gap-10">
      <div className="lg:col-span-5 lg:sticky lg:top-28 self-start"><Reveal><Photo /></Reveal></div>
      <div className="lg:col-span-7 lg:pl-8">
        <Reveal><Eyebrow index="01">Обо мне</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 id="about-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Меня зовут <span className="text-neon">София Рзаева</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-base sm:text-lg text-zinc-200 leading-relaxed">Со временем я поняла: для устойчивых изменений недостаточно просто знать, что есть и как тренироваться. Важно разобраться с привычками, эмоциями и причинами, которые мешают действовать регулярно.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400">Почему мне доверяют</h3>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3" data-testid="achievements-list">
            {ACHIEVEMENTS.map((a, i) => (
              <li key={a} className={`group flex items-start gap-4 rounded-2xl border border-white/10 bg-surface p-5 hover:border-neon/40 transition-colors duration-500 ${i === ACHIEVEMENTS.length - 1 ? "sm:col-span-2" : ""}`}>
                <Trophy className="h-5 w-5 text-neon shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-zinc-100">{a}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-14">
          <Reveal><h3 className="font-display uppercase text-2xl">Моя история</h3></Reveal>
          <div className="mt-6 space-y-5 border-l border-neon/40 pl-6">
            {STORY.map((p, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <p className={i === 0 ? "text-lg text-white font-semibold leading-relaxed" : "text-zinc-300 leading-relaxed"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
