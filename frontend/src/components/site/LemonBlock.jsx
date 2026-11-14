import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { Reveal } from "./Reveal";
import { TgButton } from "./TgButton";
import { tgWithText } from "../../data/content";

export const LemonBlock = () => (
  <section aria-labelledby="lemon-title" className="pb-24 sm:pb-32">
    <Reveal className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
      <div data-testid="lemon-block" className="relative overflow-hidden rounded-[32px] border border-neon/50 bg-neon/[0.07] p-8 sm:p-14 grid lg:grid-cols-12 gap-10 items-center shadow-[0_40px_120px_-50px_rgba(0,255,157,0.55)]">
        <motion.span
          aria-hidden="true"
          animate={{ rotate: [0, 8, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-10 -top-16 font-display uppercase text-[9rem] sm:text-[13rem] leading-none text-outline opacity-30 select-none"
        >
          лимон
        </motion.span>
        <div className="relative lg:col-span-8">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-neon"><Gift className="h-4 w-4" />Бесплатная консультация</p>
          <h2 id="lemon-title" className="mt-5 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">
            Напиши мне слово <span className="text-neon">«лимон»</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-200 leading-relaxed">
            Если сейчас нет возможности вступить в сопровождение — напиши мне в личные сообщения кодовое слово «лимон», и мы проведём с тобой бесплатную консультацию, которая позволит быть ближе к желаемому телу.
          </p>
        </div>
        <div className="relative lg:col-span-4 lg:justify-self-end">
          <TgButton testId="lemon-telegram-cta" label="Написать «лимон»" href={tgWithText("лимон")} />
        </div>
      </div>
    </Reveal>
  </section>
);
