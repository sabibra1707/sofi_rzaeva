import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { LINKS } from "../../data/content";

const API = process.env.REACT_APP_BACKEND_URL;
const GREETING = { role: "assistant", content: "Привет! Я помощник Софии. Спроси про сопровождение, тренировки или питание — подскажу и помогу записаться." };
const SUGGESTIONS = ["Как проходят тренировки?", "Нужен ли зал?", "Что входит в сопровождение?"];

const getSession = () => {
  let id = localStorage.getItem("sofi_chat_session");
  if (!id) { id = crypto.randomUUID().replace(/-/g, ""); localStorage.setItem("sofi_chat_session", id); }
  return id;
};

const Bubble = ({ m }) => (
  <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
    <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-neon text-ink rounded-br-md" : "bg-white/[0.06] text-zinc-100 rounded-bl-md border border-white/10"}`}>
      {m.content || <Loader2 className="h-4 w-4 animate-spin text-neon" />}
    </p>
  </div>
);

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);
  const session = useRef(null);

  useEffect(() => {
    if (!open || session.current || !API) return;
    session.current = getSession();
    fetch(`${API}/api/chat/history/${session.current}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setMsgs(Array.isArray(d?.messages) ? d.messages : []))
      .catch(() => {});
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, open]);

  useEffect(() => {
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    return () => window.__lenis?.start();
  }, [open]);

  const update = (fn) => setMsgs((prev) => { const next = [...prev]; const last = next[next.length - 1]; next[next.length - 1] = fn(last); return next; });

  const send = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setMsgs((p) => [...p, { role: "user", content: text }, { role: "assistant", content: "" }]);
    try {
      const res = await fetch(`${API}/api/chat/stream`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: session.current, message: text }) });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => null);
        update(() => ({ role: "assistant", content: err?.detail && typeof err.detail === "string" ? err.detail : "Не получилось ответить. Напиши Софии в Telegram @sofi_rzaeva." }));
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop();
        for (const p of parts) {
          const data = p.replace(/^data: /, "");
          if (data === "[DONE]") continue;
          const ev = JSON.parse(data);
          if (ev.delta) update((m) => ({ ...m, content: m.content + ev.delta }));
          if (ev.error) update(() => ({ role: "assistant", content: ev.error }));
        }
      }
    } catch {
      update(() => ({ role: "assistant", content: "Нет связи. Попробуй ещё раз или напиши Софии в Telegram @sofi_rzaeva." }));
    } finally {
      setBusy(false);
    }
  };

  if (!API) return null;
  const shown = [GREETING, ...msgs];

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Закрыть чат" : "Открыть чат с помощником"} data-testid="chat-toggle" className="fixed right-4 bottom-24 lg:bottom-6 z-[65] grid h-14 w-14 place-items-center rounded-full bg-ink border border-neon/60 text-neon shadow-[0_10px_40px_-10px_rgba(0,255,157,0.6)] hover:bg-neon hover:text-ink transition-colors">
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label="Чат с помощником Софии" data-testid="chat-panel" data-lenis-prevent initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.3 }} className="fixed right-4 left-4 sm:left-auto bottom-40 lg:bottom-24 z-[65] sm:w-[380px] h-[min(560px,calc(100svh-200px))] flex flex-col rounded-3xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            <header className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-neon animate-pulse" />
              <div>
                <p className="font-display uppercase text-sm">Помощник Софии</p>
                <p className="text-[11px] text-zinc-400">ИИ-ассистент · ответы могут быть неточными</p>
              </div>
            </header>
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" data-testid="chat-messages">
              {shown.map((m, i) => <Bubble key={i} m={m} />)}
              {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s, i) => <button key={s} onClick={() => send(s)} data-testid={`chat-suggestion-${i}`} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-zinc-200 hover:border-neon hover:text-neon transition-colors">{s}</button>)}
                </div>
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={1000} placeholder="Напиши вопрос…" aria-label="Сообщение" data-testid="chat-input" className="flex-1 bg-white/[0.05] rounded-full px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-neon" />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Отправить" data-testid="chat-send" className="grid h-10 w-10 place-items-center rounded-full bg-neon text-ink disabled:opacity-40 transition-opacity"><Send className="h-4 w-4" /></button>
            </form>
            <a href={LINKS.telegramDM} target="_blank" rel="noopener noreferrer" data-testid="chat-telegram-link" className="text-center text-xs text-zinc-400 hover:text-neon pb-3 transition-colors">Написать Софии лично в Telegram →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
