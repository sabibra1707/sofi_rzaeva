import { MARQUEE } from "../../data/content";

const Row = ({ hidden }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {MARQUEE.map((w) => (
      <li key={w} className="flex items-center font-display uppercase text-3xl sm:text-5xl lg:text-6xl whitespace-nowrap">
        <span className="px-6 sm:px-10 odd:text-white even:text-outline">{w}</span>
        <span className="text-neon text-2xl sm:text-4xl">✦</span>
      </li>
    ))}
  </ul>
);

export const Marquee = () => (
  <section aria-label="Принципы подхода" className="relative border-y border-white/10 py-8 sm:py-10 overflow-hidden" data-testid="principles-marquee">
    <div className="marquee flex w-max">
      <Row />
      <Row hidden />
    </div>
  </section>
);
