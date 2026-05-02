"use client"

import { useState, useCallback, useRef } from "react"

type ConversationStatus = "idle" | "connecting" | "active" | "error"

export function useElevenLabs() {
  const [status, setStatus] = useState<ConversationStatus>("idle")
  const conversationRef = useRef<{ endSession: () => Promise<void> } | null>(null)

  const startConversation = useCallback(async () => {
    if (status === "active" || status === "connecting") {
      // If already active, end the session
      if (conversationRef.current) {
        await conversationRef.current.endSession()
        conversationRef.current = null
        setStatus("idle")
      }
      return
    }

    try {
      setStatus("connecting")

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })

      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
      if (!agentId) throw new Error("ElevenLabs Agent ID is not set")

      // Dynamically import to avoid SSR issues
      const { Conversation } = await import("@11labs/client")

      const conversation = await Conversation.startSession({
        agentId,
        onConnect: () => setStatus("active"),
        onDisconnect: () => {
          setStatus("idle")
          conversationRef.current = null
        },
        onError: (error: unknown) => {
          console.error("[ElevenLabs]", error)
          setStatus("error")
          conversationRef.current = null
          setTimeout(() => setStatus("idle"), 3000)
        },
      })

      conversationRef.current = conversation
    } catch (err) {
      console.error("[ElevenLabs] Failed to start:", err)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }, [status])

  const endConversation = useCallback(async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession()
      conversationRef.current = null
      setStatus("idle")
    }
  }, [])

  return { status, startConversation, endConversation }
}
