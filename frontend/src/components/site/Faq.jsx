import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Reveal, Eyebrow } from "./Reveal";
import { Send } from "lucide-react";
import { FAQ, LINKS, tgWithText } from "../../data/content";

const FaqLinks = () => (
  <div className="mt-5 flex flex-wrap gap-3">
    <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer" data-testid="faq-channel-link" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-neon hover:text-neon transition-colors"><Send className="h-4 w-4" />Telegram-канал</a>
    <a href={tgWithText("лимон")} target="_blank" rel="noopener noreferrer" data-testid="faq-lemon-link" className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-ink hover:bg-white transition-colors"><Send className="h-4 w-4" />Написать «лимон»</a>
  </div>
);

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
              <AccordionContent data-testid={`faq-answer-${i}`} className="pb-6 pl-9 text-base text-zinc-300 leading-relaxed max-w-2xl">{f.a}{f.links && <FaqLinks />}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
