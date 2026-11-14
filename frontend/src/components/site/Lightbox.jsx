import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Btn = ({ onClick, label, testId, className, children }) => (
  <button onClick={onClick} aria-label={label} data-testid={testId} className={`absolute z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-ink/70 backdrop-blur text-white hover:border-neon hover:text-neon transition-colors ${className}`}>
    {children}
  </button>
);

export const Lightbox = ({ items, index, onClose, onIndex }) => {
  const open = index !== null;
  const n = items.length;

  useEffect(() => {
    if (!open) return undefined;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; window.__lenis?.start(); };
  }, [open, index, n, onClose, onIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Просмотр изображения" data-testid="lightbox" className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-md grid place-items-center p-4 sm:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.img key={items[index].src} src={items[index].src} alt={items[index].alt} className="max-h-[88vh] max-w-full w-auto rounded-2xl object-contain" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} onClick={(e) => e.stopPropagation()} data-testid="lightbox-image" />
          <Btn onClick={onClose} label="Закрыть" testId="lightbox-close" className="top-4 right-4"><X className="h-5 w-5" /></Btn>
          {n > 1 && (
            <>
              <Btn onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + n) % n); }} label="Предыдущее" testId="lightbox-prev" className="left-3 sm:left-6 top-1/2 -translate-y-1/2"><ChevronLeft className="h-5 w-5" /></Btn>
              <Btn onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % n); }} label="Следующее" testId="lightbox-next" className="right-3 sm:right-6 top-1/2 -translate-y-1/2"><ChevronRight className="h-5 w-5" /></Btn>
            </>
          )}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-300">{index + 1} / {n}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
