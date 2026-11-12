import { Instagram, Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { LINKS, CONTACTS } from "../../data/content";

const ROWS = [
  { icon: MapPin, label: "Город", value: CONTACTS.city, id: "city" },
  { icon: Phone, label: "Телефон", value: CONTACTS.phone, id: "phone" },
  { icon: Mail, label: "Email", value: CONTACTS.email, id: "email" },
  { icon: Clock, label: "Часы связи", value: CONTACTS.hours, id: "hours" },
];

const Social = ({ href, icon: Icon, label, handle, testId }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" data-testid={testId} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-surface px-5 py-4 hover:border-neon/50 transition-colors duration-500">
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
        <Reveal><Eyebrow index="06">Контакты</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 id="contact-title" className="mt-6 font-display uppercase text-3xl sm:text-5xl leading-[1.02]">Начнём <span className="text-neon">с разговора</span></h2></Reveal>
        <Reveal delay={0.1}><p className="mt-6 text-zinc-400 leading-relaxed max-w-md">Заполните форму — она откроет чат с Софи в Telegram с готовым сообщением. Или напишите напрямую.</p></Reveal>
        <Reveal delay={0.15} className="mt-10 space-y-3">
          <Social href={LINKS.telegram} icon={Send} label="Telegram" handle="@sofi_rzaevaa" testId="contact-telegram-link" />
          <Social href={LINKS.instagram} icon={Instagram} label="Instagram" handle="@sofi.rzaeva" testId="contact-instagram-link" />
        </Reveal>
        <Reveal delay={0.2}>
          <address className="not-italic mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ROWS.map(({ icon: Icon, label, value, id }) => (
              <div key={id} data-testid={`contact-${id}`}>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"><Icon className="h-3.5 w-3.5 text-neon" />{label}</p>
                <p className="mt-1 text-zinc-200">{value}</p>
              </div>
            ))}
          </address>
        </Reveal>
      </div>
      <div className="lg:col-span-7"><Reveal delay={0.1}><ContactForm /></Reveal></div>
    </div>
  </section>
);
