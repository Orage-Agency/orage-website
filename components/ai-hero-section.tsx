"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

// --- Animated Background ---
function HeatmapShaderBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center pointer-events-none">
      {/* Animated fluid blobs transitioning between #B68039, whitish, and black */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full mix-blend-screen blur-[80px] sm:blur-[120px] opacity-90"
        animate={{
          background: [
            "radial-gradient(circle, rgba(182,128,57,0.8) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(182,128,57,0.6) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(182,128,57,0.8) 0%, rgba(0,0,0,0) 70%)",
          ],
          x: ["-20%", "20%", "-10%", "-20%"],
          y: ["-20%", "10%", "20%", "-20%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full mix-blend-screen blur-[80px] sm:blur-[120px] opacity-80"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(182,128,57,0.8) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(220,220,220,0.4) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0) 70%)",
          ],
          x: ["20%", "-10%", "20%", "20%"],
          y: ["20%", "-20%", "10%", "20%"],
          scale: [0.9, 1.1, 1.3, 0.9],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full blur-[80px] sm:blur-[120px] opacity-90"
        animate={{
          background: [
            "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)",
            "radial-gradient(circle, rgba(182,128,57,0.3) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
            "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)",
          ],
          x: ["10%", "30%", "-20%", "10%"],
          y: ["-10%", "20%", "-30%", "-10%"],
          scale: [1.1, 0.9, 1.2, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain/noise overlay */}
      <div
        className="absolute inset-0 z-10 mix-blend-overlay opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// --- Hero Content ---
function HeroContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setIsLoaded(true)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isLoaded])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  return (
    <div className="text-center p-1 sm:p-8 md:p-10 w-[85%] sm:w-full mx-auto h-auto min-h-[30vh] sm:min-h-[60vh] flex flex-col items-center justify-center rounded-[1.25rem] sm:rounded-[3rem] bg-white/5 backdrop-blur-[64px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative overflow-hidden z-20">
      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-15 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full gap-3 sm:gap-8">
        {/* Badge only — no title */}
        <div className="flex flex-col items-center mt-1 sm:mt-2 shrink-0 gap-2 sm:gap-4">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <span className="text-white/90 text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase drop-shadow-md" style={{ fontFamily: "var(--font-main)" }}>
              AI FOR BUSINESS
            </span>
          </div>
        </div>

        {/* Video Container — loads only on click, 10% margins on mobile */}
        <div className="w-[90%] sm:w-full max-w-4xl mx-auto relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group shadow-2xl">
          {!isLoaded ? (
            /* Poster / click-to-play state */
            <button
              onClick={handlePlay}
              className="w-full aspect-video rounded-[2rem] flex items-center justify-center cursor-pointer relative overflow-hidden"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              aria-label="Play video"
            >
              {/* Thumbnail */}
              <img
                src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb38245cc2fa59f74538fb.jpg"
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                loading="lazy"
              />
              {/* Play button */}
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          ) : (
            /* Actual video — only rendered after click */
            <>
              <video
                ref={videoRef}
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-auto block rounded-[2rem] object-cover opacity-95"
                src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69b57f49277ba0b6d3f809d1.mp4"
              />
              {/* Control buttons — play/pause and volume side by side */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 z-30">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg cursor-pointer"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg cursor-pointer"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX size={20} className="opacity-70" /> : <Volume2 size={20} />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4 flex-wrap justify-center shrink-0 mb-1 sm:mb-2">
          <a
            href="https://whop.com/checkout/6RepwS96GXiHApij61-G8Sv-2v1a-1urI-ufdvZfCH470y/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 focus:outline-none min-h-[40px] sm:min-h-[48px] uppercase tracking-widest text-xs sm:text-sm cursor-pointer inline-flex items-center justify-center"
            style={{
              fontFamily: "var(--font-main)",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(182, 128, 57, 0.15)",
            }}
          >
            JOIN FREE
          </a>
        </div>
      </div>
    </div>
  )
}

// --- Main Export ---
export function AIHeroSection() {
  return (
    <div id="video" className="relative selection:bg-black/10 selection:text-black mb-0 sm:mb-0">
      {/* Hero Section with Video — 25% shorter on mobile */}
      <section className="min-h-[48vh] sm:min-h-screen relative flex items-center justify-center p-0 sm:p-4 md:p-8 lg:p-12 overflow-hidden pb-0 sm:pb-12">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: [
              "radial-gradient(ellipse at 30% 50%, #2a1a08 0%, #1a1208 40%, #0a0a0a 100%)",
              "radial-gradient(ellipse at 70% 40%, #3a2010 0%, #1a1208 40%, #0a0a0a 100%)",
              "radial-gradient(ellipse at 50% 60%, #2a1a08 0%, #120e06 40%, #0a0a0a 100%)",
              "radial-gradient(ellipse at 30% 50%, #2a1a08 0%, #1a1208 40%, #0a0a0a 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <HeatmapShaderBackground />

        {/* White fade at the very top — no hard cut */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none z-30"
          style={{ height: "180px", background: "linear-gradient(to bottom, white 0%, transparent 100%)" }}
        />
        {/* White fade on left side */}
        <div
          className="absolute top-0 left-0 h-full pointer-events-none z-30"
          style={{ width: "120px", background: "linear-gradient(to right, white 0%, transparent 100%)" }}
        />
        {/* White fade on right side */}
        <div
          className="absolute top-0 right-0 h-full pointer-events-none z-30"
          style={{ width: "120px", background: "linear-gradient(to left, white 0%, transparent 100%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-5xl relative z-20 flex items-center justify-center"
        >
          <HeroContent />
        </motion.div>

        {/* White fade at the very bottom — tighter on mobile */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none z-30"
          style={{ height: "clamp(40px, 8vw, 220px)", background: "linear-gradient(to top, white 0%, transparent 100%)" }}
        />
      </section>
    </div>
  )
}
