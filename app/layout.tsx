import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

// Same pixel as onedayback + george.orage.agency so all visitors pool into one Meta audience.
const PIXEL_ID = "889360033848278"

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
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "George Moffat — Founder, ORAGE AI AGENCY" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORAGE AI AGENCY — Scale Your Service Business with AI",
    description: "We help service businesses doing $1M+ close operational gaps and scale with custom AI systems.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "700x700" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
