# Vibe Caffè — Documentație Lecție
**Vibe Coding Course | 2026-03-19 → 2026-03-22**

---

## Ce am construit

Un landing page complet pentru o cafenea fictivă — **Vibe Caffè** — cu 7 secțiuni interactive, animații la scroll, hartă interactivă, formular de rezervare și jurnal live.

**URL live:** https://vibe-website-gabirussu.vercel.app *(înlocuiește cu URL-ul tău real)*
**Repo GitHub:** https://github.com/gabirussu/vibe-website

---

## Tehnologii folosite

| Tehnologie | Rol |
|---|---|
| Next.js 16 (App Router) | Framework React cu routing și SSR |
| React 19 | UI components |
| TypeScript 5 | Tipare statice |
| Tailwind CSS 4 | Stilizare rapidă |
| Leaflet.js + OpenStreetMap | Hartă interactivă gratuită, fără API key |
| Vercel | Deploy și hosting gratuit |
| GitHub | Versionare cod |

---

## Structura site-ului

### 1. Navbar
- Transparent pe Hero, devine opac (fundal închis + blur) după scroll
- Dispare complet când ești pe Hero — apare doar când scrollezi în jos
- Linkuri ancorate către fiecare secțiune
- Hamburger animat pe mobile

### 2. Hero
- Video background cu 4 clipuri diferite — se schimbă la hover pe fiecare buton
- Titlu: *"Respiră. Savurează. Reîncarcă."*
- 4 butoane legate de secțiunile site-ului
- 3 săgeți în cascadă (bounce animation) pentru scroll

### 3. Features — "De ce Vibe Caffè?"
- Layout tip bento grid (asimetric)
- 3 carduri cu imagini Unsplash + 1 card wide la final
- Animații fade-in la scroll (Intersection Observer)
- Gradient fundal: alb → stone → taupe

### 4. Menu — "Meniul nostru"
- 4 tab-uri: Espresso, Specialty, Cold Brew, Patiserie
- 24 produse total cu imagini reale de pe Unsplash
- Tranziție fade între tab-uri (200ms)
- Tab activ: gradient închis | Tab inactiv: gradient deschis stone/taupe

### 5. Location — "Unde ne găsești"
- Hartă interactivă Leaflet.js cu pin pe Strada Potaissa nr. 8, Cluj-Napoca
- Card info cu adresă, program, telefon
- 2 butoane cu efect hover inversat (închis↔deschis)
- Modal pop-up rezervare cu 6 câmpuri (Nume, Telefon, Dată, Oră, Persoane, Mesaj)

### 6. Journal — "Lasă aici gândurile tale"
- Split layout: stânga Povestea noastră + dreapta jurnal funcțional
- Video background pe carduri (hero-coffe-1.mp4 și hero-coffe-2.mp4)
- Jurnal live: utilizatorul scrie un gând, apare imediat în listă
- Fiecare gând postat are video background individual

### 7. Footer
- 3 coloane: Contact + WhatsApp | Program + Buton sus | Social media
- Iconițe sociale cu culorile oficiale: Instagram (gradient), Facebook (albastru), TikTok (negru), Threads (negru)
- Buton "Respiră. Savurează. Reîncarcă." cu gradient stone

---

## Decizii de design

### Sistem de culori
- **Gradient secțiuni:** `alb → stone (#d6d3d1) → taupe (#78716c)` — consistent pe toate secțiunile
- **Accent cald:** `#F5E6C8` (crem) pentru titluri pe fundal închis
- **Text secundar:** `#9CA3AF` (gri fumuriu)
- **Dark:** `#44403c → #1c1917` pentru footer și elemente închise

### Tipografie
- **Cormorant Garamond** — titluri principale (elegant, serif)
- **Cinzel** — navbar links (clasic, all-caps)
- **Raleway** — text curent (modern, curat)
- **Lora** — subtitluri italic (literar, poetic)

### Video backgrounds
Decizia de a folosi video-uri scurte în loc de imagini statice adaugă viață site-ului fără să afecteze performanța (fișiere mici, autoplay muted, loop).

### Leaflet.js în loc de Google Maps
Google Maps necesită API key cu card de credit. Leaflet.js + OpenStreetMap este 100% gratuit, open-source și suficient pentru un site de prezentare.

### Animații la scroll
Folosim Intersection Observer API (hook custom `useScrollAnimation`) în loc de biblioteci externe — zero dependențe adiționale, performanță maximă.

---

## Concepte învățate

- Structura unui proiect Next.js cu App Router
- Componente React cu `'use client'` (interactivitate)
- Hook-uri React: `useState`, `useEffect`, `useRef`
- Hook custom: `useScrollAnimation` cu Intersection Observer
- Dynamic import (pentru Leaflet — evitare erori SSR)
- CSS Grid și layout asimetric (bento grid)
- Video backgrounds în React
- Modal cu scroll lock (`document.body.style.overflow`)
- Deploy pe Vercel + GitHub integration
- Git basics: commit, push, remote

---

*Documentație generată la finalul sesiunii de lucru — Vibe Coding Course 2026*
