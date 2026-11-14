import { QUOTES } from "../../data/content";

const Row = ({ hidden }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {QUOTES.map((q) => (
      <li key={q} className="flex items-center whitespace-nowrap">
        <span className="px-8 sm:px-12 text-lg sm:text-2xl text-zinc-200 italic">«{q}»</span>
        <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_#00FF9D]" />
      </li>
    ))}
  </ul>
);

export const QuoteMarquee = () => (
  <section aria-label="Цитаты из отзывов клиенток" className="relative border-y border-white/10 py-7 sm:py-9 overflow-hidden bg-neon/[0.03]" data-testid="quotes-marquee">
    <div className="marquee marquee-slow flex w-max">
      <Row />
      <Row hidden />
    </div>
  </section>
);
