"use client"

import Image from "next/image"

export function ViewModeToggle() {
  return (
    <div className="relative inline-flex p-1 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-full shadow-lg">
      {/* Active indicator — always on logo */}
      <div
        className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-full"
        style={{
          background: "linear-gradient(135deg, #a8a8a8 0%, #6b6b6b 50%, #4a4a4a 100%)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      />
      {/* Logo — decorative, no action */}
      <div className="relative z-10 flex items-center justify-center w-24 h-12 rounded-full">
        <Image
          src="/logo.png"
          alt="Logo"
          width={29}
          height={29}
          loading="eager"
          priority
          style={{ width: "29px", height: "auto", filter: "brightness(0.2)", transition: "filter 0.2s ease" }}
        />
      </div>
    </div>
  )
}
