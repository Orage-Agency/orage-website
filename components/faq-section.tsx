"use client"

import { useState } from "react"
import { ChevronDown, Loader2, PhoneOff, Mic } from "lucide-react"
import { useElevenLabs } from "@/hooks/use-elevenlabs"

const faqs = [
  {
    q: "Who is this for?",
    a: "This is built for service businesses doing over $1M in annual revenue — agencies, consultancies, coaching operations, and professional service firms — that are growing but feel like the business is growing them instead of the other way around. If your team is stretched, margins are tightening, or you're losing clients faster than you're gaining them, you're exactly who we built this for.",
  },
  {
    q: "What results can I actually expect?",
    a: "Our clients typically see a measurable reduction in operational waste within the first 30 days, an increase in team capacity without adding headcount, and improvement in client retention through automated touchpoints and proactive account management. The specific lever we pull — whether that's marketing, conversions, operations, or customer success — depends on your biggest constraint. We diagnose that first, then we build.",
  },
  {
    q: "What exactly do you do?",
    a: "We find the highest-leverage point in your business — the one change that produces the most compounding return — and we solve it with custom AI-powered systems built specifically for your operation. That could mean an AI that handles client onboarding, a workflow that eliminates manual reporting, a tool that flags churn risk before it happens, or a marketing system that runs without your team having to manage it daily. No off-the-shelf software. Everything is designed for your business.",
  },
  {
    q: "We've already tried tools and automation. Why would this be different?",
    a: "Most tools are built for the average business. They solve generic problems with generic solutions. What we do starts with a diagnostic — we understand your specific workflows, your team, your clients, and your model — then we design and integrate AI systems that fit into how you actually operate. The result is adoption your team embraces instead of workarounds they ignore.",
  },
  {
    q: "How do we get started?",
    a: "The first step is a strategy session where we map your operation, identify your biggest constraint, and show you exactly which lever we'd pull and what the outcome looks like. There's no commitment required. If it makes sense to work together, we'll outline a clear plan with defined deliverables and expected outcomes. Click the button below to book your session.",
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const { status, startConversation } = useElevenLabs()

  const isActive = status === "active"
  const isConnecting = status === "connecting"

  return (
    <section id="faq" style={{ padding: "16px 0 80px", width: "100%" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", marginBottom: "8px", fontFamily: "var(--font-main)" }}>
          FAQ
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b", fontWeight: 400 }}>
          What you need to know about ORAGE AI AGENCY
        </p>
      </div>

      {/* Accordion list */}
      <div style={{ maxWidth: "640px", margin: "32px auto 0", display: "flex", flexDirection: "column", gap: "10px", padding: "0 16px" }}>
        {faqs.map((item, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "#fff",
                overflow: "hidden",
                transition: "box-shadow 0.2s ease",
                boxShadow: isOpen ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "20px 20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#0f172a",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-main)",
                  flex: 1,
                }}>
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  color="#94a3b8"
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              <div style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
              }}>
                <p style={{
                  padding: "0 20px 20px",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "#475569",
                  fontFamily: "var(--font-main)",
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div style={{ textAlign: "center", marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        {isActive ? <PhoneOff size={28} color="#ef4444" strokeWidth={1.5} /> : isConnecting ? <Loader2 size={28} color="#f59e0b" strokeWidth={1.5} className="animate-spin" /> : <Mic size={28} color="#0f172a" strokeWidth={1.5} />}
        <div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px", fontFamily: "var(--font-main)" }}>
            I still have questions.
          </p>
          <p style={{ fontSize: "14px", color: "#64748b", fontFamily: "var(--font-main)" }}>
            {"Let's connect"}
          </p>
        </div>
        <button
          onClick={startConversation}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 24px",
            background: isActive ? "#ef4444" : "#0f172a",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "var(--font-main)",
            transition: "background 0.2s ease",
            marginTop: "4px",
            cursor: "pointer",
            border: "none",
          }}
        >
          {isConnecting ? <Loader2 size={14} className="animate-spin" /> : isActive ? <PhoneOff size={14} /> : <Mic size={14} />}
          {isConnecting ? "Connecting..." : isActive ? "End Call" : "Talk with Stacy"}
        </button>
      </div>
    </section>
  )
}
