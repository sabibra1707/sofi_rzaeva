import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { GOALS, tgWithText } from "../../data/content";

const Field = ({ id, label, children }) => (
  <div className="field">
    <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 mb-2">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full bg-transparent border-b border-white/20 py-3 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-neon transition-colors";

export const ContactForm = () => {
  const [f, setF] = useState({ name: "", age: "", goal: GOALS[0], message: "" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) { toast.error("Пожалуйста, укажи имя"); return; }
    const text = [`Здравствуйте, София! Меня зовут ${f.name.trim()}.`, f.age && `Возраст: ${f.age}.`, `Цель: ${f.goal}.`, f.message.trim()].filter(Boolean).join("\n");
    navigator.clipboard?.writeText(text).catch(() => {});
    window.open(tgWithText(text), "_blank", "noopener,noreferrer");
    toast.success("Открываем Telegram", { description: "Текст заявки также скопирован — при необходимости вставь его в чат." });
  };

  return (
    <form onSubmit={submit} noValidate data-testid="inquiry-form" className="rounded-[28px] border border-white/10 bg-surface p-6 sm:p-10 lg:p-12 space-y-8" aria-label="Форма заявки">
      <div className="grid sm:grid-cols-2 gap-8">
        <Field id="name" label="Имя *"><input id="name" required autoComplete="given-name" value={f.name} onChange={set("name")} placeholder="Как к тебе обращаться" className={inputCls} data-testid="form-name-input" /></Field>
        <Field id="age" label="Возраст"><input id="age" inputMode="numeric" value={f.age} onChange={set("age")} placeholder="Необязательно" className={inputCls} data-testid="form-age-input" /></Field>
      </div>
      <fieldset>
        <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 mb-4">Главная цель</legend>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g, i) => (
            <label key={g} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neon ${f.goal === g ? "bg-neon text-ink border-neon" : "border-white/20 text-zinc-300 hover:border-white/50"}`} data-testid={`form-goal-${i}`}>
              <input type="radio" name="goal" value={g} checked={f.goal === g} onChange={set("goal")} className="sr-only" />{g}
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="message" label="Сообщение"><textarea id="message" rows={4} value={f.message} onChange={set("message")} placeholder="Расскажи немного о себе и своей цели" className={`${inputCls} resize-none`} data-testid="form-message-input" /></Field>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between pt-2">
        <p className="text-xs text-zinc-400 max-w-xs">Данные не сохраняются на сайте — форма лишь формирует сообщение в Telegram.</p>
        <button type="submit" data-testid="form-submit-button" className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-neon text-ink font-semibold px-7 py-4 overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,255,157,0.45)]">
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative flex items-center gap-2"><Send className="h-4 w-4" />Отправить в Telegram</span>
        </button>
      </div>
    </form>
  );
};
