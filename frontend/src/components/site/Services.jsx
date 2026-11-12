import { Check } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { TgButton } from "./TgButton";
import { SERVICES, tgWithText } from "../../data/content";

const Card = ({ s, i }) => (
  <Reveal delay={i * 0.1} className="h-full">
    <article
      data-testid={`service-card-${i}`}
      className={`group relative h-full rounded-[28px] p-7 sm:p-9 flex flex-col border transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-2 ${s.featured ? "bg-neon/[0.06] border-neon/40 hover:shadow-[0_30px_80px_-30px_rgba(0,255,157,0.45)]" : "bg-surface border-white/10 hover:border-white/30"}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon">{s.tag}</span>
        {s.featured && <span className="rounded-full bg-neon text-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">Основной</span>}
      </div>
      <h3 className="mt-8 font-display uppercase text-[1.3rem] sm:text-2xl lg:text-[1.4rem] xl:text-[1.6rem] leading-tight [overflow-wrap:anywhere]">{s.title}</h3>
      <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{s.text}</p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-300">
        {["[пункт 1]", "[пункт 2]", "[пункт 3]"].map((x) => (
          <li key={x} className="flex items-center gap-3"><Check className="h-4 w-4 text-neon shrink-0" />{x}</li>
        ))}
      </ul>
      <div className="mt-auto pt-10">
        <p className="flex items-baseline gap-2 border-t border-white/10 pt-6" data-testid={`service-price-${i}`}>
          <span className="font-display text-3xl">{s.price}</span><span className="text-sm text-zinc-400">{s.per}</span>
        </p>
        <TgButton size="sm" className="mt-6" label="Узнать подробнее" testId={`service-cta-${i}`} href={tgWithText(`Здравствуйте, Софи! Интересует формат «${s.title}».`)} />
      </div>
    </article>
  </Reveal>
);

export const Services = () => (
  <section id="services" aria-labelledby="services-title" className="py-24 sm:py-32 lg:py-40">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <Reveal><Eyebrow index="03">Форматы работы</Eyebrow></Reveal>
      <Reveal delay={0.05}><h2 id="services-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02] max-w-3xl">Выберите, как <span className="text-neon">начать</span></h2></Reveal>
      <Reveal delay={0.1}><p className="mt-6 text-zinc-400 max-w-xl">Стоимость и состав форматов уточняйте у Софи в Telegram.</p></Reveal>
      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => <Card key={s.title} s={s} i={i} />)}
      </div>
    </div>
  </section>
);
