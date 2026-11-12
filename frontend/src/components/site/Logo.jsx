export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="21" fill="none" stroke="currentColor" strokeWidth="3.5" />
    <path d="M14 36h10l4-12 8 18 4-10h10" fill="none" stroke="var(--neon)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="logo-pulse" />
  </svg>
);

export const Logo = () => (
  <span className="flex items-center gap-3">
    <LogoMark />
    <span className="leading-none">
      <span className="font-display block text-[15px] tracking-[0.04em]">SOFI<span className="text-neon">.</span>RZ</span>
      <span className="font-mono block text-[10px] uppercase tracking-[0.3em] text-zinc-400 mt-1">fit mentor</span>
    </span>
  </span>
);
