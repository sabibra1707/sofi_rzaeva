import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";
import { STEPS } from "../../data/content";

export const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="process" aria-labelledby="process-title" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <img src="/img/gym.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <Reveal><Eyebrow index="05">Как мы работаем</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 id="process-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Четыре шага <span className="text-neon">к своему ритму</span></h2></Reveal>
        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" aria-hidden="true">
            <motion.div style={{ scaleY: progress }} className="lg:hidden absolute inset-0 origin-top bg-neon" />
            <motion.div style={{ scaleX: progress }} className="hidden lg:block absolute inset-0 origin-left bg-neon" />
          </div>
          <ol className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.1} className="relative pl-16 lg:pl-0 lg:pt-16 group" >
                <span data-testid={`process-step-${s.n}`} className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-neon/60 bg-ink font-mono text-xs text-neon group-hover:bg-neon group-hover:text-ink transition-colors duration-500">{s.n}</span>
                <h3 className="font-display uppercase text-xl sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed text-sm sm:text-base max-w-xs">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
