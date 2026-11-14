import { MessageSquareQuote } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ZoomGallery } from "./ZoomGallery";
import { REVIEWS } from "../../data/content";

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
      <Reveal delay={0.05}><h2 id="reviews-title" className="mt-6 mb-12 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Слова <span className="text-neon">клиенток</span></h2></Reveal>
      {REVIEWS.length ? (
        <ZoomGallery items={REVIEWS} prefix="review" gridClass="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" frameClass="aspect-[9/16]" />
      ) : <Reveal><Empty /></Reveal>}
    </div>
  </section>
);
