import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "", as = "div" }) => {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
};

export const Eyebrow = ({ children, index }) => (
  <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon flex items-center gap-3">
    {index && <span className="text-zinc-400">{index}</span>}
    <span className="h-px w-8 bg-neon/60" />
    {children}
  </p>
);

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
};
