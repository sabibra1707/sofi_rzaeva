import { Send, ArrowUpRight } from "lucide-react";
import { LINKS } from "../../data/content";

export const TgButton = ({ href = LINKS.telegramDM, label = "Написать в Telegram", testId, size = "lg", className = "" }) => {
  const pad = size === "lg" ? "pl-6 pr-2 py-2 text-sm sm:text-base" : "pl-4 pr-1.5 py-1.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className={`group relative inline-flex items-center gap-4 rounded-full bg-neon text-ink font-semibold overflow-hidden transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_40px_rgba(0,255,157,0.45)] active:scale-[0.98] ${pad} ${className}`}
    >
      <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]" />
      <span className="relative flex items-center gap-2"><Send className="h-4 w-4" aria-hidden="true" />{label}</span>
      <span className={`relative grid place-items-center rounded-full bg-ink text-neon ${size === "lg" ? "h-10 w-10" : "h-8 w-8"}`}>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      </span>
    </a>
  );
};
