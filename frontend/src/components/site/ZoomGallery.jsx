import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";

export const ZoomGallery = ({ items, prefix, gridClass, frameClass = "" }) => {
  const [idx, setIdx] = useState(null);
  return (
    <>
      <ul className={gridClass}>
        {items.map((it, i) => (
          <Reveal as="li" key={it.src} delay={(i % 3) * 0.08}>
            <button onClick={() => setIdx(i)} data-testid={`${prefix}-item-${i}`} aria-label={`Увеличить: ${it.alt}`} className={`group relative block w-full overflow-hidden rounded-[22px] border border-white/10 bg-surface hover:border-neon/50 transition-colors duration-500 ${frameClass}`}>
              <img src={it.src} alt={it.alt} loading="lazy" width={it.w} height={it.h} className={`block w-full ${frameClass ? "h-full object-cover" : "h-auto"} transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]`} />
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/70 backdrop-blur text-white opacity-90 lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:bg-neon group-hover:text-ink transition-[opacity,background-color,color] duration-300"><Maximize2 className="h-4 w-4" /></span>
            </button>
          </Reveal>
        ))}
      </ul>
      <Lightbox items={items} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
};
