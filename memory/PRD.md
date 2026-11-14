# PRD — Sofi Rzaeva landing page

## Original problem statement
Create a premium, responsive Russian-language one-page website for Sofi Rzaeva, a Moscow-based fitness mentor for women aged 25–60, including office workers and beginners. Her positioning is helping women pursue sustainable weight loss, reduce cycles of setbacks, and build confidence; present this as her stated approach, not a guaranteed outcome. Use a dark, minimalist, energetic visual direction with restrained neon accents, bold typography, generous spacing, subtle scroll-reveal motion, hover states, a fixed navigation header, and a prominent booking CTA. Include a hero, about and coaching approach, benefits, service cards with prices left as editable placeholders, a client results and portfolio gallery with clearly marked image/case placeholders rather than invented transformations or testimonials, a four-step work process, contact section with an inquiry form, and footer. Add clickable Instagram and Telegram links using the supplied public profile URLs, plus editable contact fields; do not fabricate credentials, client results, pricing, biography, or testimonials. Include accessible semantic structure, mobile-first layouts, optimized image placeholders with alt text, and basic SEO metadata. The main CTA should invite visitors to contact Sofi via Telegram.

User answers: Telegram https://t.me/sofi_rzaevaa, Instagram https://www.instagram.com/sofi.rzaeva?rpxt=ZDRheGV1OG9xaXEz; form only opens Telegram with prefilled text; Sofi's photo will be sent later.

## Architecture
Frontend-only React (CRA/craco) + Tailwind + framer-motion + lenis. No backend usage.
- Editable content: /app/frontend/src/data/content.js (links, contacts, services/prices, cases, steps)
- Sections: /app/frontend/src/components/site/*
- Images: /app/frontend/public/img (Unsplash, stored locally), favicon.svg = logo mark

## Implemented (2026-11-12)
- Fixed glass header + mobile menu, Lenis smooth scroll
- Hero: masked line reveal, 3D tilt + parallax portrait placeholder, rotating badge, Telegram CTA with prefilled text
- Slow editorial marquee, About/approach, bento benefits, 3 service cards ([цена] placeholders), 6 case placeholders (до/после), 4-step process with scroll progress line, contact (Telegram/Instagram + editable phone/email/hours), form → opens Telegram with prefilled message + copies text, footer with disclaimer
- SEO: lang=ru, title, description, OG tags, SVG favicon

## Update (2026-11-14)
- Real photos: hero (sofi-hero.webp), about (sofi-about.webp); stock images removed
- New content from Sofia: hero headline/subtitle, About + «Моя история» + achievements, «Мой подход» bento, single «Индивидуальное сопровождение» card (4 parts, [цена] placeholder) + «Что меняется», client results gallery (2 uploaded photos, lightbox), Reviews section (lightbox-ready, waiting for screenshots — REVIEWS array in content.js), clickable phone, new Instagram URL (?xtok=), final CTA «Готова начать?»

## Update 2 (2026-11-14)
- Reviews: 5 screenshots (review-1..5.webp) in masonry gallery with lightbox
- Price → «По запросу» + DM link @sofi_rzaeva; all booking CTAs (tgWithText, TgButton default, mobile sticky CTA) → https://t.me/sofi_rzaeva (personal); channel @sofi_rzaevaa kept in contacts/footer
- Mobile sticky «Хочу на сопровождение» button (MobileCta.jsx)

## Update 3 (2026-11-14)
- Hero photo removed (typographic hero + rotating badge); only about photo of Sofia remains; og-sofi.jpg from about photo
- Results: +3 photos (result-3..5), masonry; uploaded pink duplicate skipped
- QuoteMarquee with verbatim quotes from review screenshots; FAQ accordion (Зал answer = placeholder)

## Backlog
- P0: Replace hero/about photos with Sofi's real photos; fill prices, bio, contacts
- P1: Real client cases (with consent), FAQ section
- P2: Analytics, OG preview image, Yandex.Metrica
