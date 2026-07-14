"use client"

import { motion } from "framer-motion"

export function LiquidGlassBanner() {
  return (
    <section className="liquid-glass-banner-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="liquid-glass-banner-outer"
      >
        {/* Animated gradient background */}
        <div className="liquid-glass-bg" />

        {/* Glass surface */}
        <div className="liquid-glass-surface">
          {/* Noise texture */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-10 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Specular highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />

          {/* Content — single line on both desktop and mobile */}
          <div className="liquid-glass-content">
            <p className="liquid-glass-text">
              Ready to maximize efficiency and scale your business?
            </p>
            <a href="https://onedayback.orage.agency/?utm_source=orage_website&utm_medium=cta&utm_content=glass_banner" className="liquid-glass-cta">
              Learn to Scale
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="liquid-glass-arrow" aria-hidden="true">
                <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
