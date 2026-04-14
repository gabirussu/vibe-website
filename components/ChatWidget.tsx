"use client";

/**
 * CHAT WIDGET — Wabi, Ghid Virtual 🫘🍃
 *
 * Widget floating de chat AI pentru Vibe Caffè.
 * Apare pe toate paginile, în colțul din dreapta jos.
 */

import { useState, useRef, useEffect } from "react";

// ─── Tipuri ───────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Quick replies ────────────────────────────────────────────────────────────

type QuickReply = { label: string; href?: string };

const INITIAL_REPLIES: QuickReply[] = [
  { label: "Vezi meniu" },
  { label: "Recomandări" },
  { label: "Rezervări" },
  { label: "Program" },
  { label: "Jurnal ✨", href: "/#feedback" },
];

const CONTEXTUAL_REPLIES: { keywords: string[]; replies: QuickReply[] }[] = [
  {
    keywords: ["meniu", "cafea", "espresso", "specialty", "cold brew", "patiserie", "produs", "preț"],
    replies: [{ label: "Opțiuni vegane" }, { label: "Deserturi" }, { label: "Cafea rece" }],
  },
  {
    keywords: ["rezerv", "rezervare", "masă", "loc", "book"],
    replies: [{ label: "Fă o rezervare" }, { label: "Program" }],
  },
];

function getContextualReplies(text: string): QuickReply[] | null {
  const lower = text.toLowerCase();
  for (const { keywords, replies } of CONTEXTUAL_REPLIES) {
    if (keywords.some((k) => lower.includes(k))) return replies;
  }
  return null;
}

// ─── Render markdown links ────────────────────────────────────────────────────

function renderParagraph(text: string, isUser: boolean, keyPrefix: string): React.ReactNode[] {
  const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <a
        key={`${keyPrefix}-${match.index}`}
        href={match[2]}
        className={`underline underline-offset-2 font-medium ${
          isUser ? "text-stone-200 hover:text-white" : "text-stone-700 hover:text-stone-900"
        }`}
      >
        {match[1]}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderContent(text: string, isUser: boolean) {
  const paragraphs = text.split("\n\n");
  if (paragraphs.length === 1) {
    return renderParagraph(text, isUser, "p0");
  }
  return paragraphs.map((p, i) => (
    <p key={i} className={i > 0 ? "mt-2" : ""}>
      {renderParagraph(p, isUser, `p${i}`)}
    </p>
  ));
}

// ─── Mesaj individual ─────────────────────────────────────────────────────────

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
          🫘🍃
        </div>
      )}
      <div
        className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "text-white rounded-tr-sm"
            : "bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100"
        }`}
        style={isUser ? { background: "#44403c" } : undefined}
      >
        {renderContent(message.content, isUser)}
      </div>
    </div>
  );
}

// ─── Quick reply buttons ──────────────────────────────────────────────────────

function QuickReplies({
  replies,
  onSelect,
  onNavigate,
  disabled,
}: {
  replies: QuickReply[];
  onSelect: (text: string) => void;
  onNavigate: (href: string) => void;
  disabled: boolean;
}) {
  const btnClass = "chat-btn text-xs px-3 py-1.5 rounded-full border bg-white hover:bg-stone-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const btnStyle = { borderColor: "#44403c", color: "#44403c", fontFamily: "var(--font-inter)" };

  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {replies.map((r) =>
        r.href ? (
          <button
            key={r.label}
            onClick={() => onNavigate(r.href!)}
            disabled={disabled}
            className={btnClass}
            style={btnStyle}
          >
            {r.label}
          </button>
        ) : (
          <button
            key={r.label}
            onClick={() => onSelect(r.label)}
            disabled={disabled}
            className={btnClass}
            style={btnStyle}
          >
            {r.label}
          </button>
        )
      )}
    </div>
  );
}

// ─── Widget principal ─────────────────────────────────────────────────────────

export default function ChatWidget() {
  const WELCOME: Message = {
    role: "assistant",
    content: "Bună! ☕ Sunt Wabi, ghidul tău virtual 🫘🍃\n\nNumele meu vine din wabi-sabi — filozofia japoneză care găsește frumusețe în imperfect și pace în momentul prezent. Ca prima înghițitură de cafea a zilei. 🌿✨\n\nCum te pot ajuta? Poți să mă întrebi despre meniu, program sau rezervări. Îți voi răspunde cu drag! Dacă îți plac răspunsurile mele, mă poți menționa în jurnalul nostru virtual! 📖",
  };

  const [open, setOpen]                 = useState(false);
  const [messages, setMessages]         = useState<Message[]>([WELCOME]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[] | null>(INITIAL_REPLIES);
  const messagesEndRef                  = useRef<HTMLDivElement>(null);
  const inputRef                        = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, quickReplies]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = async (text: string, fromQuickReply = false) => {
    if (!text.trim() || loading) return;

    if (!fromQuickReply) setQuickReplies(null);

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const json = await res.json() as { reply?: string; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Eroare necunoscută");

      const botReply = json.reply ?? "";
      setMessages([...newMessages, { role: "assistant", content: botReply }]);
      setQuickReplies(getContextualReplies(botReply));
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Ups, ceva nu a mers. Încearcă din nou! ☕" },
      ]);
      setQuickReplies(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([WELCOME]);
    setInput("");
    setQuickReplies(INITIAL_REPLIES);
  };

  return (
    <>
      {/* Fereastra de chat */}
      <div
        className={`fixed z-50 flex flex-col overflow-hidden transition-all duration-300
          bg-stone-50 border border-stone-200 shadow-2xl
          inset-0 rounded-none
          sm:inset-auto sm:bottom-24 sm:right-5 sm:w-[360px] sm:rounded-2xl
          ${open ? "opacity-100 pointer-events-auto translate-y-0 sm:scale-100" : "opacity-0 pointer-events-none translate-y-4 sm:translate-y-0 sm:scale-95"}`}
        style={{ height: undefined }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0 text-white"
          style={{ background: "#44403c" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
              🫘🍃
            </div>
            <p
              className="font-semibold text-base"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Wabi
            </p>
          </div>
          <button
            onClick={handleClose}
            className="chat-btn w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
            aria-label="Închide chat"
          >
            ✕
          </button>
        </div>

        {/* Zona de mesaje */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-stone-50">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                🫘🍃
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#44403c", animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#44403c", animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#44403c", animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Quick replies */}
          {!loading && quickReplies && quickReplies.length > 0 && (
            <QuickReplies
              replies={quickReplies}
              onSelect={(text) => send(text, true)}
              onNavigate={(href) => { setOpen(false); window.location.href = href; }}
              disabled={loading}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-white border-t border-stone-200 flex gap-2 flex-shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrie un mesaj..."
            disabled={loading}
            className="flex-1 text-sm px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:bg-white transition-colors placeholder:text-gray-400 disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="chat-btn w-9 h-9 flex items-center justify-center rounded-xl text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            style={{ background: "#44403c" }}
            aria-label="Trimite mesaj"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1917")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#44403c")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Buton floating */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-3xl ${
          open ? "scale-90 hidden sm:flex" : "animate-pulse-slow"
        }`}
        style={{ background: open ? "#1c1917" : "#44403c" }}
        aria-label={open ? "Închide chat" : "Deschide chat"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          "☕"
        )}
      </button>
    </>
  );
}
