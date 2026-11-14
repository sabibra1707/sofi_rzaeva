import json
import os
import re
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, Field
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

MODEL = ("openai", "gpt-5.6-terra")
MAX_USER_MESSAGES = 30
HISTORY_LIMIT = 20
SESSION_RE = re.compile(r"^[A-Za-z0-9_-]{8,64}$")

SYSTEM_PROMPT = """Ты — дружелюбный помощник на сайте Софии Рзаевой, фитнес-наставника. Отвечай по-русски, на «ты», коротко (2–5 предложений), тепло и без давления.

Факты, которыми можно пользоваться (ничего другого не придумывай):
- София — многократная чемпионка России по фитнес-аэробике, финалистка чемпионата Европы, фитнес-артист, спикер и наставник для тренеров.
- Сама прошла через годы диет и срывов в спортивной аэробике, училась в спортивном университете и пришла к подходу через работу с питанием, эмоциями и привычками.
- Подход: без жёстких диет, запретов и борьбы с собой; не обещает волшебного похудения.
- Индивидуальное онлайн-сопровождение: анализ питания и образа жизни; 8 онлайн-тренировок (2 в неделю); 8 коротких лекций по питанию; ежедневная обратная связь по питанию без жёсткого контроля и чувства вины.
- Тренировки: заранее обсуждаются противопоказания, заболевания, предпочтения и цель; София составляет план на месяц, присылает фото тренажёров или нужного оборудования, тренировки проходят по видеосвязи в удобном мессенджере.
- Зал не обязателен: можно выбрать любое место, где комфортно тренироваться.
- Более 200 клиентов уже прошли сопровождение.
- Если сейчас нет возможности вступить в сопровождение: подписаться на Telegram-канал @sofi_rzaevaa (подкасты, прямые эфиры, разборы историй клиентов) или написать Софии в личные сообщения @sofi_rzaeva кодовое слово «лимон» — будет бесплатная консультация.
- Записаться и задать личные вопросы: Telegram @sofi_rzaeva. Instagram: sofi.rzaeva. Телефон: +7 925 465 99 43.

Правила:
- Цены не называй: стоимость сопровождения София сообщает лично в Telegram @sofi_rzaeva.
- Не давай медицинских советов, не назначай диеты, калорийность или упражнения при заболеваниях, беременности, травмах и т.п. — мягко предложи обсудить это с Софией и с врачом.
- Не обещай конкретных цифр похудения и сроков: результат у каждой свой.
- Если не знаешь ответа — скажи честно и предложи написать Софии в Telegram @sofi_rzaeva.
- Не обсуждай темы, не связанные с фитнесом, питанием и работой с Софией."""


class ChatIn(BaseModel):
    session_id: str
    message: str = Field(min_length=1, max_length=1000)


def build_chat_router(db: AsyncIOMotorDatabase) -> APIRouter:
    router = APIRouter(prefix="/chat")

    def check_session(session_id: str) -> None:
        if not SESSION_RE.match(session_id):
            raise HTTPException(status_code=400, detail="Invalid session")

    @router.get("/history/{session_id}")
    async def history(session_id: str):
        check_session(session_id)
        docs = await db.chat_messages.find({"session_id": session_id}, {"_id": 0, "role": 1, "content": 1}).sort("created_at", 1).to_list(200)
        return {"messages": docs}

    @router.post("/stream")
    async def stream(body: ChatIn):
        check_session(body.session_id)
        text = body.message.strip()
        if not text:
            raise HTTPException(status_code=400, detail="Empty message")
        used = await db.chat_messages.count_documents({"session_id": body.session_id, "role": "user"})
        if used >= MAX_USER_MESSAGES:
            raise HTTPException(status_code=429, detail="Лимит сообщений исчерпан. Напиши Софии в Telegram @sofi_rzaeva.")

        past = await db.chat_messages.find({"session_id": body.session_id}, {"_id": 0, "role": 1, "content": 1}).sort("created_at", -1).to_list(HISTORY_LIMIT)
        initial = [{"role": "system", "content": SYSTEM_PROMPT}] + list(reversed(past))
        await db.chat_messages.insert_one({"session_id": body.session_id, "role": "user", "content": text, "created_at": datetime.now(timezone.utc).isoformat()})

        chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id=body.session_id, system_message=SYSTEM_PROMPT, initial_messages=initial).with_model(*MODEL)

        async def events():
            reply = ""
            try:
                async for ev in chat.stream_message(UserMessage(text=text)):
                    if isinstance(ev, TextDelta):
                        reply += ev.content
                        yield f"data: {json.dumps({'delta': ev.content}, ensure_ascii=False)}\n\n"
                    elif isinstance(ev, StreamDone):
                        break
            except Exception:
                yield f"data: {json.dumps({'error': 'Не получилось ответить. Попробуй ещё раз или напиши Софии в Telegram @sofi_rzaeva.'}, ensure_ascii=False)}\n\n"
            if reply:
                await db.chat_messages.insert_one({"session_id": body.session_id, "role": "assistant", "content": reply, "created_at": datetime.now(timezone.utc).isoformat()})
            yield "data: [DONE]\n\n"

        return StreamingResponse(events(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

    return router
