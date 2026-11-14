import { Check } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { TgButton } from "./TgButton";
import { COACHING, CHANGES, COACHING_PRICE, LINKS, tgWithText, CTA_TEXT } from "../../data/content";

const Part = ({ c }) => (
  <li className="group border-t border-white/10 py-6 grid grid-cols-[auto_1fr] gap-5">
    <span className="font-mono text-xs text-neon pt-1.5">{c.n}</span>
    <div>
      <h4 className="font-display uppercase text-lg sm:text-xl group-hover:text-neon transition-colors duration-300">{c.title}</h4>
      <p className="mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed">{c.text}</p>
    </div>
  </li>
);

export const Coaching = () => (
  <section id="services" aria-labelledby="services-title" className="py-24 sm:py-32 lg:py-40">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <Reveal><Eyebrow index="03">Индивидуальное сопровождение</Eyebrow></Reveal>
      <Reveal delay={0.05}><h2 id="services-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02] max-w-4xl">Фигура, питание <span className="text-neon">и привычки</span> — в одной системе</h2></Reveal>
      <Reveal delay={0.1}><p className="mt-6 text-zinc-300 max-w-2xl leading-relaxed">Это комплексная работа с фигурой, питанием и привычками. Ты получаешь не просто план тренировок, а понятную систему и мою поддержку на каждом этапе.</p></Reveal>
      <Reveal delay={0.1} className="mt-14">
        <article data-testid="coaching-card" className="relative overflow-hidden rounded-[32px] border border-neon/40 bg-neon/[0.05] grid lg:grid-cols-12 shadow-[0_40px_120px_-50px_rgba(0,255,157,0.5)]">
          <div className="lg:col-span-7 p-7 sm:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon">В сопровождение входят</p>
            <ul className="mt-6 border-b border-white/10">{COACHING.map((c) => <Part key={c.n} c={c} />)}</ul>
          </div>
          <div className="lg:col-span-5 bg-ink/60 border-t lg:border-t-0 lg:border-l border-white/10 p-7 sm:p-12 flex flex-col">
            <h3 className="font-display uppercase text-xl">Что меняется в результате?</h3>
            <ul className="mt-6 space-y-4">
              {CHANGES.map((t) => <li key={t} className="flex gap-3 text-zinc-200"><Check className="h-5 w-5 text-neon shrink-0 mt-0.5" />{t}</li>)}
            </ul>
            <div className="mt-auto pt-10">
              <p className="border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Стоимость</p>
              <p className="mt-2 font-display text-3xl sm:text-4xl" data-testid="coaching-price">{COACHING_PRICE}</p>
              <p className="mt-3 text-sm text-zinc-300">Узнать стоимость можно в личных сообщениях в Telegram: <a href={LINKS.telegramDM} target="_blank" rel="noopener noreferrer" data-testid="coaching-price-dm-link" className="text-neon underline underline-offset-4 hover:text-white transition-colors">@sofi_rzaeva</a></p>
              <TgButton className="mt-6" label="Хочу на сопровождение" testId="coaching-telegram-cta" href={tgWithText(CTA_TEXT)} />
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  </section>
);
