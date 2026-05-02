"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"

const WEBHOOK_URL = "https://orageaiagency.app.n8n.cloud/webhook/e9b95343-00f9-4772-9e76-d60aa255271e"
const STORAGE_SESSION_KEY = "orage_chat_session_id"
const STORAGE_MESSAGES_KEY = "orage_chat_messages"
const MESSAGES_TTL_MS = 1000 * 60 * 60 * 24 // 24h
const FALLBACK_REPLY = "Sorry — I hit a snag. Mind asking that again, or tap 'Talk to a human' below to reach the team directly."

interface Message {
  id: string
  role: "user" | "assistant"
  text: string
  timestamp: number
}

function generateId() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3)
}

function loadSessionId(): string {
  if (typeof window === "undefined") return generateId()
  try {
    const existing = localStorage.getItem(STORAGE_SESSION_KEY)
    if (existing) return existing
    const fresh = generateId()
    localStorage.setItem(STORAGE_SESSION_KEY, fresh)
    return fresh
  } catch {
    return generateId()
  }
}

function loadMessages(): Message[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_MESSAGES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as { savedAt: number; messages: Message[] }
    if (!parsed?.messages || Date.now() - parsed.savedAt > MESSAGES_TTL_MS) return []
    return parsed.messages
  } catch {
    return []
  }
}

function saveMessages(messages: Message[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify({ savedAt: Date.now(), messages }))
  } catch {
    // storage full / disabled — non-fatal
  }
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hey, I'm Stacy — Orage AI's assistant. I'm here to help. Got a question about our services, or ready to book a strategy call?",
  timestamp: Date.now(),
}

export function LiquidGlassChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [hydrated, setHydrated] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const sessionIdRef = useRef<string>("")

  // Hydrate session + messages on mount (avoids SSR mismatch)
  useEffect(() => {
    sessionIdRef.current = loadSessionId()
    const stored = loadMessages()
    if (stored.length > 0) setMessages(stored)
    setHydrated(true)
  }, [])

  // Persist messages whenever they change (post-hydration)
  useEffect(() => {
    if (!hydrated) return
    saveMessages(messages)
  }, [messages, hydrated])

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: generateId(), role: "user", text, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionIdRef.current }),
      })
      const data = await res.json().catch(() => null)
      const reply: string =
        data?.reply ?? data?.output ?? data?.response ?? data?.text ?? data?.message ??
        (typeof data === "string" ? data : FALLBACK_REPLY)

      setMessages(prev => [
        ...prev,
        { id: generateId(), role: "assistant", text: reply, timestamp: Date.now() },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { id: generateId(), role: "assistant", text: FALLBACK_REPLY, timestamp: Date.now() },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const startFresh = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_SESSION_KEY)
        localStorage.removeItem(STORAGE_MESSAGES_KEY)
      } catch {}
      sessionIdRef.current = loadSessionId()
    }
    setMessages([WELCOME])
  }

  return (
    <>
      <style>{`
        @keyframes chat-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(182, 128, 57, 0.45), 0 8px 32px rgba(0,0,0,0.35); }
          50%       { box-shadow: 0 0 0 10px rgba(182, 128, 57, 0), 0 8px 32px rgba(0,0,0,0.35); }
        }
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-5px); opacity: 1; }
        }
        .chat-dot:nth-child(1) { animation-delay: 0s; }
        .chat-dot:nth-child(2) { animation-delay: 0.15s; }
        .chat-dot:nth-child(3) { animation-delay: 0.3s; }
        @media (max-width: 480px) {
          .orage-chat-panel {
            right: 8px !important;
            left: 8px !important;
            width: auto !important;
            bottom: 84px !important;
            max-height: calc(100dvh - 110px) !important;
          }
          .orage-chat-trigger {
            bottom: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>

      {/* Floating trigger button */}
      <button
        className="orage-chat-trigger"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat with Stacy"}
        aria-expanded={open}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "9999px",
          border: "1.5px solid rgba(182,128,57,0.55)",
          background: "linear-gradient(145deg, #1a1a1a 0%, #2c2c2c 100%)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          animation: open ? "none" : "chat-pulse 2.2s ease-in-out infinite",
          transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Image src="/logo.png" alt="" width={32} height={32} style={{ width: 32, height: "auto", filter: "brightness(0.85)" }} />
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="orage-chat-panel"
          role="dialog"
          aria-label="Chat with Stacy"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            zIndex: 9998,
            width: "min(380px, calc(100vw - 32px))",
            maxHeight: "min(560px, calc(100dvh - 130px))",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "chat-slide-up 0.28s cubic-bezier(0.25,0.1,0.25,1) both",
            background: "linear-gradient(145deg, #1a1a1a 0%, #242424 55%, #2a1f10 100%)",
            backdropFilter: "blur(28px) saturate(1.6)",
            WebkitBackdropFilter: "blur(28px) saturate(1.6)",
            border: "1px solid rgba(182,128,57,0.35)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.1) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
          }}
        >
          {/* Noise texture overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, borderRadius: "20px", opacity: 0.07, mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* Specular highlight */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)", pointerEvents: "none", zIndex: 0, borderRadius: "20px 20px 0 0" }} />

          {/* Header */}
          <div style={{
            position: "relative", zIndex: 1,
            display: "flex", alignItems: "center", gap: "10px",
            padding: "16px 18px 14px",
            borderBottom: "1px solid rgba(182,128,57,0.25)",
            background: "linear-gradient(135deg, rgba(182,128,57,0.22) 0%, rgba(0,0,0,0.35) 100%)",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(145deg, #1a1a1a, #2c2c2c)", border: "1px solid rgba(182,128,57,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Image src="/logo.png" alt="ORAGE" width={22} height={22} style={{ width: 22, height: "auto", filter: "brightness(0.85)" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontFamily: "var(--font-main)", fontWeight: 700, fontSize: "13px", color: "#f1f0ee", letterSpacing: "0.06em", textTransform: "uppercase" }}>Stacy · Orage AI</p>
              <p style={{ margin: 0, fontFamily: "var(--font-main)", fontSize: "11px", color: "rgba(200,180,140,0.8)", letterSpacing: "0.03em" }}>I'm here to help</p>
            </div>
            <div title="Online" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.6)", flexShrink: 0 }} />
            <button
              onClick={startFresh}
              aria-label="Start a fresh conversation"
              title="Start a fresh conversation"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: "4px", lineHeight: 1, fontSize: "12px", marginLeft: "4px", letterSpacing: "0.04em" }}
            >
              ↻
            </button>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: "4px", lineHeight: 1, fontSize: "18px", marginLeft: "2px" }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            position: "relative", zIndex: 1,
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: "10px",
            scrollbarWidth: "none",
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontFamily: "var(--font-main)",
                  fontSize: "13px",
                  lineHeight: 1.55,
                  letterSpacing: "0.01em",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #B68039 0%, #8c5f23 100%)"
                    : "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.12)",
                  boxShadow: msg.role === "user" ? "0 4px 16px rgba(182,128,57,0.25)" : "none",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", gap: "5px", alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="chat-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,180,140,0.8)", display: "block", animation: "dot-bounce 1.2s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            position: "relative", zIndex: 1,
            padding: "10px 14px 6px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.4)",
            display: "flex", gap: "8px", alignItems: "flex-end",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              rows={1}
              aria-label="Type a message to Stacy"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "rgba(240,238,234,0.95)",
                fontFamily: "var(--font-main)",
                fontSize: "14px", // 14px on mobile prevents iOS zoom
                lineHeight: 1.5,
                resize: "none",
                outline: "none",
                maxHeight: "100px",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
              onInput={e => {
                const el = e.currentTarget
                el.style.height = "auto"
                el.style.height = Math.min(el.scrollHeight, 100) + "px"
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                width: 40, height: 40, borderRadius: "10px", border: "none", flexShrink: 0,
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #B68039, #8c5f23)"
                  : "rgba(255,255,255,0.08)",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: input.trim() && !loading ? "0 4px 14px rgba(182,128,57,0.4)" : "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l12-6-6 12V9L2 8z" fill={input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.3)"} />
              </svg>
            </button>
          </div>

          {/* Disclosure footer */}
          <div style={{
            position: "relative", zIndex: 1,
            padding: "0 14px 10px",
            background: "rgba(0,0,0,0.4)",
            fontFamily: "var(--font-main)", fontSize: "10px", color: "rgba(200,180,140,0.55)", letterSpacing: "0.02em",
            textAlign: "center",
          }}>
            AI · messages stored. <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(200,180,140,0.85)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy</a>
          </div>
        </div>
      )}
    </>
  )
}
