import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, Eyebrow } from "./Reveal";

const PRINCIPLES = [
  { k: "Темп", v: "Нагрузка растёт постепенно — так, чтобы её можно было выдерживать в обычной жизни." },
  { k: "Привычки", v: "Фокус на действиях, которые остаются с вами, а не на разовом «марафоне»." },
  { k: "Поддержка", v: "Откаты обсуждаются без чувства вины — как часть процесса, а не провал." },
];

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Reveal className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10">
            <motion.img style={{ y, scale: 1.2 }} src="/img/about.jpg" alt="Гантель на тёмном фоне — атмосферное фото тренировочного пространства" loading="lazy" width="1200" height="748" className="absolute inset-0 h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300">[ Можно заменить на фото Софи с тренировки ]</p>
          </Reveal>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-8">
          <Reveal><Eyebrow index="01">Обо мне и подходе</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 id="about-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02] tracking-[-0.01em]">
              Не гонка за цифрой, <span className="text-zinc-400">а система, в которой</span> <span className="text-neon">можно жить</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              Меня зовут Софи Рзаева, я фитнес-наставник из Москвы. Я работаю с женщинами 25–60 лет — в том числе с теми, кто много времени проводит в офисе, и с теми, кто никогда раньше не тренировался.
            </p>
            <p className="mt-5 text-base text-zinc-400 leading-relaxed max-w-2xl">
              Мой подход — помогать двигаться к устойчивому снижению веса, сокращать циклы срывов и выстраивать уверенность в себе. Результат у каждой свой и зависит от многих факторов, поэтому я не обещаю быстрых цифр — я выстраиваю с вами процесс.
            </p>
            <p className="mt-5 font-mono text-xs text-zinc-400">[ Место для биографии, опыта и образования — заполняется Софи ]</p>
          </Reveal>
          <ul className="mt-12 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.k} delay={0.1 + i * 0.08} className="bg-ink p-6 group hover:bg-surface transition-colors duration-500">
                <p className="font-mono text-xs text-neon">0{i + 1}</p>
                <h3 className="mt-4 font-display uppercase text-xl">{p.k}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{p.v}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
