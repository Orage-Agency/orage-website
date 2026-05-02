"use client"

import { Loader2, PhoneOff, Mic } from "lucide-react"
import { useElevenLabs } from "@/hooks/use-elevenlabs"

export function FloatingStacyButton() {
  const { status, startConversation } = useElevenLabs()

  const isActive = status === "active"
  const isConnecting = status === "connecting"

  return (
    <button
      onClick={startConversation}
      aria-label={isActive ? "End call with Stacy" : "Talk with Stacy"}
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 28px",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.6)",
        cursor: "pointer",
        fontFamily: "var(--font-main)",
        fontWeight: 700,
        fontSize: "13px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        transition: "all 0.3s ease",
        background: isActive
          ? "linear-gradient(135deg, #fff 0%, #fce4ec 40%, #b86a2e 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #ffd6e0 35%, #f9a8c9 60%, #c8922a 100%)",
        color: isActive ? "#b91c1c" : "#1a0a00",
        boxShadow: isActive
          ? "0 4px 32px rgba(239,68,68,0.35), 0 1px 0 rgba(255,255,255,0.8) inset"
          : "0 4px 32px rgba(200,146,42,0.3), 0 8px 48px rgba(249,168,201,0.25), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      {isConnecting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isActive ? (
        <PhoneOff size={16} />
      ) : (
        <Mic size={16} />
      )}
      {isConnecting ? "Connecting..." : isActive ? "End Call" : "Talk with Stacy"}
    </button>
  )
}
