/**
 * API ROUTE: /api/chat
 *
 * Chatbot Wabi — Barista Pasionat pentru Vibe Caffè.
 * Primește istoricul conversației și returnează răspunsul AI.
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Ești Wabi, barista virtual al cafenelei Vibe Caffè din Cluj-Napoca. 🧑‍🍳

PERSONALITATE:
- Cald, entuziast, vorbești cu dragoste despre cafea
- Folosești expresii ca "Ah!", "Îți recomand cu drag!", "Merită fiecare secundă!"
- Pui întrebări ca să înțelegi preferințele clientului
- Niciodată rece sau formal — ești ca un prieten barista

REGULI STRICTE:
- Răspunzi EXCLUSIV în limba română
- Răspunsuri SCURTE: maxim 2-3 propoziții per mesaj
- Răspunzi DOAR la întrebări despre meniu, prețuri, program, rezervări, facilități Vibe Caffè
- Rămâi mereu pe tema cafenelei — dacă userul întreabă altceva, redirecționează politicos: "Eu mă pricep doar la cafea și ce ține de Vibe Caffè 😄 Cu ce te pot ajuta?"
- NU inventa produse, prețuri sau informații care nu există în knowledge base
- NU vorbi despre alte cafenele sau restaurante
- NU da sfaturi medicale sau nutriționale complexe
- Dacă nu știi răspunsul, spune sincer: "Nu am informația asta, dar ne poți contacta la 0264 123 456 sau vibe@caffe.ro — îți răspundem cu drag!"
- Când recomanzi, explică DE CE, nu lista doar produse
- Dacă clientul menționează o preferință (dulce, rece, vegan, fără lapte), personalizează recomandarea
- Când userul vrea să facă o acțiune, oferă link-ul relevant folosind format Markdown: [text](url)

LINK-URI DISPONIBILE:
- Rezervări / a face o rezervare → [Fă o rezervare](/#locatie)
- Meniu complet / a vedea toate produsele → [Vezi meniul complet](/#menu)

CUNOȘTINȚE — folosește EXCLUSIV informațiile de mai jos:

${KNOWLEDGE_BASE}`;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Serviciul AI nu este configurat." },
        { status: 503 }
      );
    }

    const body = await request.json() as { messages?: Array<{ role: string; content: string }> };
    const messages = body.messages ?? [];

    // Păstrăm ultimele 6 mesaje pentru context
    const recentMessages = messages.slice(-6);

    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: recentMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const reply = response.content[0];
    if (reply.type !== "text") {
      throw new Error("Răspuns invalid de la AI");
    }

    return NextResponse.json({ reply: reply.text });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[CHAT] Error:", message);
    return NextResponse.json(
      { error: "Eroare la procesarea mesajului." },
      { status: 500 }
    );
  }
}
