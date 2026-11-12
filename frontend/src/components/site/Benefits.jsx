import { Reveal, Eyebrow } from "./Reveal";
import { BENEFITS } from "../../data/content";

const Card = ({ b, i }) => (
  <Reveal delay={i * 0.08} className={`${b.span} h-full`}>
    <article
      data-testid={`benefit-card-${b.n}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="spot-card group relative h-full min-h-[260px] rounded-[24px] border border-white/10 bg-surface p-7 sm:p-10 flex flex-col justify-between overflow-hidden transition-[border-color,transform] duration-500 hover:border-neon/40 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-5xl sm:text-6xl text-outline group-hover:text-neon transition-colors duration-500">{b.n}</span>
        <span className="h-2.5 w-2.5 rounded-full bg-white/20 group-hover:bg-neon group-hover:shadow-[0_0_16px_#00FF9D] transition-[background-color,box-shadow] duration-500" />
      </div>
      <div className="relative mt-10">
        <h3 className="font-display uppercase text-xl sm:text-2xl">{b.title}</h3>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">{b.text}</p>
      </div>
    </article>
  </Reveal>
);

export const Benefits = () => (
  <section id="benefits" aria-labelledby="benefits-title" className="py-24 sm:py-32 bg-surface/40 border-y border-white/5">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <Reveal><Eyebrow index="02">Что вы получаете</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 id="benefits-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02] max-w-3xl">Фитнес, который <span className="text-neon">встраивается</span> в жизнь</h2></Reveal>
        </div>
        <Reveal delay={0.1}><p className="max-w-sm text-zinc-400">Без идеальных условий, без «с понедельника» — с учётом вашего дня и состояния.</p></Reveal>
      </div>
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-6 auto-rows-fr gap-5">
        {BENEFITS.map((b, i) => <Card key={b.n} b={b} i={i} />)}
      </div>
    </div>
  </section>
);
