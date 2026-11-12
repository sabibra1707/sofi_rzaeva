import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV } from "../../data/content";
import { Logo } from "./Logo";
import { TgButton } from "./TgButton";
import { scrollToId, EASE } from "./Reveal";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setOpen(false); scrollToId(id); };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 border-b ${scrolled || open ? "bg-ink/75 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"}`}
      data-testid="site-header"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between">
        <a href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label="Sofi Rzaeva — на главную" data-testid="header-logo-link"><Logo /></a>
        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} data-testid={`nav-${n.id}`} className="nav-link text-sm text-zinc-300 hover:text-white transition-colors">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <TgButton size="sm" label="Записаться" testId="header-telegram-cta" className="hidden sm:inline-flex" />
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Закрыть меню" : "Открыть меню"} data-testid="mobile-menu-toggle" className="lg:hidden grid place-items-center h-11 w-11 rounded-full border border-white/15 hover:border-neon/60 transition-colors">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.5, ease: EASE }} className="lg:hidden overflow-hidden" aria-label="Мобильная навигация" data-testid="mobile-menu">
            <ul className="px-5 pb-8 pt-2 flex flex-col">
              {NAV.map((n, i) => (
                <li key={n.id} className="border-b border-white/10">
                  <a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} data-testid={`mobile-nav-${n.id}`} className="flex items-baseline gap-4 py-4 font-display text-2xl uppercase">
                    <span className="font-mono text-xs text-neon">0{i + 1}</span>{n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-8"><TgButton testId="mobile-menu-telegram-cta" label="Записаться в Telegram" /></div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
