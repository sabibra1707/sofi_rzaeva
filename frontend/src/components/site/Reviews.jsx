import { MessageSquareQuote, Send, MessageCircle } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ZoomGallery } from "./ZoomGallery";
import { REVIEWS, CLIENTS_COUNT, LINKS } from "../../data/content";
import { CountUp } from "./CountUp";

const Empty = () => (
  <div data-testid="reviews-placeholder" className="rounded-[24px] border border-dashed border-white/20 stripes p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-neon/50 text-neon"><MessageSquareQuote className="h-6 w-6" /></span>
    <div>
      <p className="font-display uppercase text-xl">Скриншоты отзывов появятся здесь</p>
      <p className="mt-2 text-sm text-zinc-400">Раздел готов: после добавления изображений их можно будет листать и увеличивать по нажатию.</p>
    </div>
  </div>
);

export const Reviews = () => (
  <section id="reviews" aria-labelledby="reviews-title" className="py-24 sm:py-32 bg-surface/40 border-y border-white/5">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <Reveal><Eyebrow index="05">Отзывы</Eyebrow></Reveal>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div>
          <Reveal delay={0.05}><h2 id="reviews-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Слова <span className="text-neon">клиенток</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">Нажми на отзыв, чтобы увеличить</p></Reveal>
        </div>
        <Reveal delay={0.15}>
          <div data-testid="clients-counter" className="flex items-center gap-4 rounded-2xl border border-neon/40 bg-neon/[0.06] px-6 py-4">
            <CountUp to={CLIENTS_COUNT} suffix="+" className="font-display text-4xl sm:text-5xl text-neon leading-none tabular-nums min-w-[4ch]" />
            <span className="text-sm text-zinc-200 leading-snug">клиентов уже прошли<br />сопровождение</span>
          </div>
        </Reveal>
      </div>
      <div className="mb-12" />
      {REVIEWS.length ? (
        <ZoomGallery items={REVIEWS} prefix="review" gridClass="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>li]:mb-5 [&>li]:break-inside-avoid" />
      ) : <Reveal><Empty /></Reveal>}
      <Reveal className="mt-12">
        <div data-testid="reviews-more-info" className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-t border-white/10 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-300">Больше информации:</p>
          <div className="flex flex-wrap gap-3">
            <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer" data-testid="reviews-telegram-link" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold hover:border-neon hover:text-neon transition-colors"><Send className="h-4 w-4" />Telegram</a>
            <a href={LINKS.max} target="_blank" rel="noopener noreferrer" data-testid="reviews-max-link" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold hover:border-neon hover:text-neon transition-colors"><MessageCircle className="h-4 w-4" />MAX</a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
