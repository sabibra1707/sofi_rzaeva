import { Reveal, Eyebrow } from "./Reveal";
import { ZoomGallery } from "./ZoomGallery";
import { TgButton } from "./TgButton";
import { RESULTS, tgWithText, CTA_TEXT } from "../../data/content";

export const ClientResults = () => (
  <section id="results" aria-labelledby="results-title" className="py-24 sm:py-32 border-t border-white/5">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-10">
      <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
        <Reveal><Eyebrow index="04">Результаты моих клиентов</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 id="results-title" className="mt-6 font-display uppercase text-3xl sm:text-[2.6rem] leading-[1.05]">Свой путь <span className="text-neon">у каждой</span></h2></Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-zinc-300 leading-relaxed">Здесь собраны реальные истории и отзывы девушек, которые уже начали свой путь. У каждой — своя отправная точка, свой темп и свои изменения.</p>
          <p className="mt-4 text-white font-semibold">Твой результат тоже начинается с первого шага.</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Сверху — до, снизу — после. Нажми, чтобы увеличить</p>
          <TgButton className="mt-8" size="sm" label="Хочу на сопровождение" testId="results-telegram-cta" href={tgWithText(CTA_TEXT)} />
        </Reveal>
      </div>
      <div className="lg:col-span-8">
        <ZoomGallery items={RESULTS} prefix="result" gridClass="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start" />
      </div>
    </div>
  </section>
);
