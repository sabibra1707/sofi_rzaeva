import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Reveal, Eyebrow } from "./Reveal";
import { FAQ } from "../../data/content";

export const Faq = () => (
  <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32 border-t border-white/5">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <Reveal><Eyebrow index="07">Частые вопросы</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 id="faq-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Отвечаю <span className="text-neon">заранее</span></h2></Reveal>
      </div>
      <Reveal delay={0.1} className="lg:col-span-8">
        <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-white/10">
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-white/10">
              <AccordionTrigger data-testid={`faq-trigger-${i}`} className="py-6 text-left font-display uppercase text-lg sm:text-xl hover:no-underline hover:text-neon transition-colors [&>svg]:text-neon">
                <span className="flex items-baseline gap-4"><span className="font-mono text-xs text-neon">0{i + 1}</span>{f.q}</span>
              </AccordionTrigger>
              <AccordionContent data-testid={`faq-answer-${i}`} className="pb-6 pl-9 text-base text-zinc-300 leading-relaxed max-w-2xl">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
