import { ImagePlus } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { CASES } from "../../data/content";

const CaseCard = ({ c, i }) => (
  <Reveal delay={(i % 3) * 0.08}>
    <figure data-testid={`case-placeholder-${c.id}`} className="group relative overflow-hidden rounded-[22px] border border-dashed border-white/20 bg-surface hover:border-neon/50 transition-colors duration-500">
      <div className="relative aspect-[4/5] grid grid-cols-2" role="img" aria-label={`Место для фото «до и после» клиентки, кейс ${c.id}. Фото пока не добавлено`}>
        {["До", "После"].map((t, k) => (
          <div key={t} className={`relative grid place-items-center stripes ${k ? "border-l border-dashed border-white/15" : ""}`}>
            <ImagePlus className="h-6 w-6 text-zinc-400 group-hover:text-neon transition-colors duration-500" aria-hidden="true" />
            <span className="absolute top-3 left-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300">{t}</span>
          </div>
        ))}
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon">Кейс {c.id} · заглушка</p>
        <p className="mt-2 text-sm text-zinc-200">Цель: {c.goal}</p>
        <p className="text-sm text-zinc-400">Срок: {c.term}</p>
      </figcaption>
    </figure>
  </Reveal>
);

export const Results = () => (
  <section id="results" aria-labelledby="results-title" className="py-24 sm:py-32 border-t border-white/5">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <Reveal><Eyebrow index="04">Результаты клиенток</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 id="results-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Истории, <span className="text-outline">которые</span> <span className="text-neon">появятся здесь</span></h2></Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-4">
          <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-neon pl-5">Раздел подготовлен для реальных кейсов. Фото и истории публикуются только с согласия клиенток. Индивидуальные результаты различаются.</p>
        </Reveal>
      </div>
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CASES.map((c, i) => <CaseCard key={c.id} c={c} i={i} />)}
      </div>
    </div>
  </section>
);
