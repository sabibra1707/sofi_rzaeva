import { Logo } from "./Logo";
import { TgButton } from "./TgButton";
import { Reveal } from "./Reveal";
import { LINKS, NAV } from "../../data/content";

export const Footer = () => (
  <footer className="relative border-t border-white/10 pt-20 pb-10 overflow-hidden" data-testid="site-footer">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <p className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.95]">Готовы<br /><span className="text-neon">начать?</span></p>
        <TgButton testId="footer-telegram-cta" label="Написать Софи в Telegram" />
      </Reveal>
      <div className="mt-20 grid gap-10 md:grid-cols-3 border-t border-white/10 pt-10">
        <Logo />
        <nav aria-label="Навигация в подвале">
          <ul className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-neon transition-colors">{n.label}</a></li>)}
          </ul>
        </nav>
        <ul className="flex md:justify-end gap-6 text-sm">
          <li><a href={LINKS.telegram} target="_blank" rel="noopener noreferrer" data-testid="footer-telegram-link" className="nav-link text-zinc-200">Telegram</a></li>
          <li><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" data-testid="footer-instagram-link" className="nav-link text-zinc-200">Instagram</a></li>
        </ul>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} Софи Рзаева. Фитнес-наставник, Москва.</p>
        <p className="max-w-md sm:text-right">Информация на сайте носит ознакомительный характер и не является гарантией результата. Перед началом тренировок проконсультируйтесь с врачом.</p>
      </div>
    </div>
  </footer>
);
