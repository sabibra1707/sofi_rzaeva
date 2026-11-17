import { MessageCircle, Send, Phone } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { LINKS, CONTACTS } from "../../data/content";

const Social = ({ href, icon: Icon, label, handle, testId, external = true }) => (
  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-testid={testId} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface px-5 py-4 hover:border-neon/50 transition-colors duration-500">
    <span className="flex items-center gap-4">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/5 group-hover:bg-neon group-hover:text-ink transition-colors duration-500"><Icon className="h-5 w-5" /></span>
      <span><span className="block text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">{label}</span><span className="block text-base">{handle}</span></span>
    </span>
    <span className="text-neon text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
  </a>
);

export const Contact = () => (
  <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-32 lg:py-40 border-t border-white/5">
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-14">
      <div className="lg:col-span-5">
        <Reveal><Eyebrow index="08">Контакты</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 id="contact-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Начнём <span className="text-neon">с разговора</span></h2></Reveal>
        <Reveal delay={0.1}><p className="mt-6 text-zinc-400 leading-relaxed max-w-md">Напиши мне, расскажи о своей цели — и мы обсудим, как выстроить путь к ней. Форма откроет чат в Telegram с готовым сообщением.</p></Reveal>
        <Reveal delay={0.15} className="mt-10 space-y-3">
          <Social href={LINKS.telegramDM} icon={Send} label="Telegram · личные сообщения" handle="@sofi_rzaeva" testId="contact-telegram-link" />
          <Social href={LINKS.telegram} icon={Send} label="Telegram-канал" handle="@sofi_rzaevaa" testId="contact-telegram-channel-link" />
          <Social href={LINKS.max} icon={MessageCircle} label="MAX" handle="Написать в MAX" testId="contact-max-link" />
          <Social href={LINKS.phone} icon={Phone} label="Позвонить" handle={CONTACTS.phone} testId="contact-phone-link" external={false} />
        </Reveal>
        <Reveal delay={0.2}><p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">{CONTACTS.city}</p></Reveal>
      </div>
      <div className="lg:col-span-7"><Reveal delay={0.1}><ContactForm /></Reveal></div>
    </div>
  </section>
);
