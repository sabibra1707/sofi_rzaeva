import { useState } from "react";
import { QUOTES, REVIEWS } from "../../data/content";
import { Lightbox } from "./Lightbox";

const Row = ({ hidden, onOpen }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {QUOTES.map((q, i) => (
      <li key={q.text} className="flex items-center whitespace-nowrap">
        <button
          type="button"
          tabIndex={hidden ? -1 : 0}
          onClick={() => onOpen(q.review)}
          data-testid={hidden ? undefined : `quote-${i}`}
          aria-label={`Открыть полный отзыв: «${q.text}»`}
          className="mx-4 sm:mx-6 rounded-full px-4 sm:px-6 py-2 text-lg sm:text-2xl text-zinc-200 italic transition-colors duration-300 hover:text-ink hover:bg-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
        >
          «{q.text}»
        </button>
        <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_#00FF9D]" />
      </li>
    ))}
  </ul>
);

export const QuoteMarquee = () => {
  const [idx, setIdx] = useState(null);
  const open = (src) => {
    const i = REVIEWS.findIndex((r) => r.src === src);
    if (i >= 0) setIdx(i);
  };
  return (
    <section aria-label="Цитаты из отзывов клиенток — нажми, чтобы открыть отзыв" className="relative border-y border-white/10 py-6 sm:py-8 overflow-hidden bg-neon/[0.03]" data-testid="quotes-marquee">
      <div className="marquee marquee-slow flex w-max">
        <Row onOpen={open} />
        <Row hidden onOpen={open} />
      </div>
      <Lightbox items={REVIEWS} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </section>
  );
};
