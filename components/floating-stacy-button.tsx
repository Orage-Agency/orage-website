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
      className="stacy-fab"
      aria-label={isActive ? "End call with Stacy" : "Talk with Stacy"}
      title={isActive ? "End call" : "Talk with Stacy"}
      style={{
        background: isActive
          ? "linear-gradient(135deg, #fff 0%, #fce4ec 40%, #b86a2e 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #ffd6e0 35%, #f9a8c9 60%, #c8922a 100%)",
        color: isActive ? "#b91c1c" : "#1a0a00",
        boxShadow: isActive
          ? "0 4px 24px rgba(239,68,68,0.35), 0 1px 0 rgba(255,255,255,0.8) inset"
          : "0 4px 24px rgba(200,146,42,0.3), 0 6px 32px rgba(249,168,201,0.25), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
    >
      {isConnecting ? (
        <Loader2 size={20} className="animate-spin" />
      ) : isActive ? (
        <PhoneOff size={20} />
      ) : (
        <Mic size={20} />
      )}
      <span className="stacy-fab-label">
        {isConnecting ? "Connecting..." : isActive ? "End Call" : "Talk with Stacy"}
      </span>
    </button>
  )
}
