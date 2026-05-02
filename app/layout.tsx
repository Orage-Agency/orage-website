import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "ORAGE AI AGENCY — Scale Your Service Business with AI",
  description:
    "We help service businesses doing $1M+ identify operational gaps and deploy custom AI systems that increase efficiency, boost conversions, and maximize LTV. 10+ million dollars in gaps closed.",
  generator: "v0.app",
  keywords: ["AI agency", "business automation", "service business", "operational efficiency", "AI consulting", "scale business", "increase LTV", "conversion rate optimization"],
  authors: [{ name: "George W. Moffat", url: "https://www.linkedin.com/in/george-w-moffat-750965361/" }],
  creator: "ORAGE AI AGENCY",
  publisher: "ORAGE AI AGENCY",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orage.agency",
    siteName: "ORAGE AI AGENCY",
    title: "ORAGE AI AGENCY — Scale Your Service Business with AI",
    description: "We help service businesses doing $1M+ identify operational gaps and deploy custom AI systems that increase efficiency, boost conversions, and maximize LTV.",
    images: [{ url: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb60603147fd01594d365d.jpg", width: 1200, height: 630, alt: "ORAGE AI AGENCY Founders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORAGE AI AGENCY — Scale Your Service Business with AI",
    description: "We help service businesses doing $1M+ close operational gaps and scale with custom AI systems.",
    images: ["https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb60603147fd01594d365d.jpg"],
  },
  icons: {
    icon: [
      { url: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69b0c2eebfc81fb1ab616b02.png", type: "image/png" },
    ],
    shortcut: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69b0c2eebfc81fb1ab616b02.png",
    apple: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69b0c2eebfc81fb1ab616b02.png",
  },
  metadataBase: new URL("https://orage.agency"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
