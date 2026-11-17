import { Logo } from "./Logo";
import { TgButton } from "./TgButton";
import { Reveal } from "./Reveal";
import { MessageCircle, Phone } from "lucide-react";
import { LINKS, NAV, CONTACTS, tgWithText, CTA_TEXT } from "../../data/content";

export const Footer = () => (
  <footer className="relative border-t border-white/10 pt-20 overflow-hidden pb-28 lg:pb-10" data-testid="site-footer">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div>
          <p className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.95]">Готова<br /><span className="text-neon">начать?</span></p>
          <p className="mt-6 max-w-md text-zinc-300 text-base sm:text-lg">Напиши мне, и мы обсудим твой путь к комфортной форме.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <TgButton testId="footer-telegram-cta" label="Хочу на сопровождение" href={tgWithText(CTA_TEXT)} />
          <a href={LINKS.max} target="_blank" rel="noopener noreferrer" data-testid="footer-max-cta" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-semibold hover:border-neon hover:text-neon transition-colors"><MessageCircle className="h-4 w-4" />MAX</a>
        </div>
      </Reveal>
      <div className="mt-20 grid gap-10 md:grid-cols-3 border-t border-white/10 pt-10">
        <Logo />
        <nav aria-label="Навигация в подвале">
          <ul className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-neon transition-colors">{n.label}</a></li>)}
          </ul>
        </nav>
        <ul className="flex flex-wrap md:justify-end gap-6 text-sm">
          <li><a href={LINKS.telegram} target="_blank" rel="noopener noreferrer" data-testid="footer-telegram-link" className="nav-link text-zinc-200">Telegram</a></li>
         <li><a href={LINKS.max} target="_blank" rel="noopener noreferrer" data-testid="footer-max-link" className="nav-link text-zinc-200">MAX</a></li>
          <li><a href={LINKS.phone} data-testid="footer-phone-link" className="nav-link text-zinc-200 inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{CONTACTS.phone}</a></li>
        </ul>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} София Рзаева. Фитнес-наставник.</p>
        <p className="max-w-md sm:text-right">Информация на сайте носит ознакомительный характер и не является гарантией результата. Перед началом тренировок проконсультируйтесь с врачом.</p>
      </div>
    </div>
  </footer>
);
