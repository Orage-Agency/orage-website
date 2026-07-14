"use client"

import React, { useState, useEffect, useCallback } from "react"

const PROJECTS = [
  {
    id: "boomer-ai",
    title: "BOOMER AI",
    footerText: "AI EDUCATION — COMMUNITY",
    logo: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69270a5b63b30fdd4c7b60de.png",
    images: [
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3f8749814b17d8a255fc.jpg",
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bd71444865cd7a2b3fc292.jpg",
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3f870d06db84c1d0fc4e.jpg",
    ],
  },
  {
    id: "lifetime",
    title: "LIFETIME",
    footerText: "GLOBAL MEDIA NETWORK",
    logo: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3917a37cc2a398ef82c0.webp",
    images: [
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3b0a0d06db99ddd09ccc.jpg",
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3bca2da5554e2d8ebb04.jpg",
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3a6f0d06db9aadd08ce3.png",
    ],
  },
  {
    id: "quintessa",
    title: "QUINTESSA",
    footerText: "100M+ ARR · INCREASE EFFICIENCY",
    logo: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb45a70d06db5124d1961f.png",
    images: [
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb449a49814b1db9a2d1b6.png",
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb4627aaac0f402f7b06f8.jpeg",
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb411849814b1134a27b61.jpg",
    ],
  },
]

const ROTATE_MS = 4000
const FADE_MS = 350

export function TrustedBy() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  const goTo = useCallback((next: number) => {
    setFading(true)
    setTimeout(() => {
      setIndex(next)
      setFading(false)
    }, FADE_MS)
  }, [])

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => {
      goTo((index + 1) % PROJECTS.length)
    }, ROTATE_MS)
    return () => clearInterval(iv)
  }, [index, paused, goTo])

  const p = PROJECTS[index]

  return (
    <div
      style={{
        paddingTop: 12,
        paddingBottom: 4,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p
        style={{
          marginBottom: 10,
          fontSize: 11,
          fontWeight: 800,
          color: "rgba(0,0,0,0.38)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontFamily: "var(--font-main)",
        }}
      >
        Trusted by
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          maxWidth: 560,
          padding: "12px 16px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(6px)" : "translateY(0)",
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            overflow: "hidden",
            background: "rgba(0,0,0,0.04)",
            border: "1px solid rgba(255,255,255,0.6)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={p.logo}
            alt={p.title}
            crossOrigin="anonymous"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#0a0a0a",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "var(--font-main)",
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(0,0,0,0.45)",
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "var(--font-main)",
            }}
          >
            {p.footerText}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {p.images.map((src, i) => (
            <div
              key={`${p.id}-${i}`}
              style={{
                width: 32,
                height: 46,
                borderRadius: 7,
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                marginLeft: i === 0 ? 0 : -8,
                transform: `rotate(${(i - 1) * 5}deg)`,
                zIndex: i === 1 ? 2 : 1,
                background: "#fff",
              }}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 10, paddingLeft: 2 }}>
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.id}
            onClick={() => i !== index && goTo(i)}
            aria-label={`Show ${proj.title}`}
            style={{
              width: i === index ? 18 : 6,
              height: 6,
              borderRadius: 999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === index ? "#B68039" : "rgba(0,0,0,0.15)",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  )
}
