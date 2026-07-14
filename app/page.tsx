"use client"

import { useEffect } from "react"
import { LiquidMetalButton } from "@/components/liquid-metal-button"
import { AIHeroSection } from "@/components/ai-hero-section"
import { TrustedBy } from "@/components/trusted-by"
import { LiquidGlassBanner } from "@/components/liquid-glass-banner"
import { AdvancedTrainingSection } from "@/components/advanced-training-section"
import { FAQSection } from "@/components/faq-section"
import { FloatingStacyButton } from "@/components/floating-stacy-button"
import { LiquidGlassChatWidget } from "@/components/liquid-glass-chat-widget"

export default function Page() {
  // Auto-scroll to video section when coming from freestuff.orage.agency
  useEffect(() => {
    const referrer = document.referrer
    if (referrer.includes("freestuff.orage.agency")) {
      setTimeout(() => {
        const videoEl = document.getElementById("video")
        if (videoEl) videoEl.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href?.startsWith("#")) {
      e.preventDefault()
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <div className="grid-overlay" />

      {/* Fixed banner — always visible at the very top */}
      <div className="banner-fixed">
        <LiquidGlassBanner />
      </div>

      {/* Side nav (desktop) / Top nav (mobile) */}
      <nav>
        <div className="nav-logo">
          SCALE WITH AI
        </div>
        <div className="nav-links">
          <a href="#projects" onClick={handleNavClick}>Projects</a>
          <a href="#about-us" onClick={handleNavClick}>About Us</a>
          <a href="#contact" onClick={handleNavClick}>Contact</a>
        </div>
        <div className="nav-copyright">©25</div>
      </nav>

      <div className="container">
        {/* Hero */}
        <header>
          <h1 className="hero-title">
            <span className="hero-line-blur" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.1em" }}>
              <img
                src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69b0c2eebfc81fb1ab616b02.png"
                alt=""
                aria-hidden="true"
                className="hero-line-logo"
                style={{ width: "0.75em", height: "0.75em", objectFit: "contain", display: "inline-block", verticalAlign: "middle", opacity: 0.65, flexShrink: 0 }}
              />
              ORAGE AI AGENCY
            </span>
            <span className="hero-line-clear">
              READY TO SCALE YOUR{" "}
              <a
                href="https://onedayback.orage.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-glass-bubble"
              >
                BUSINESS WITH AI
              </a>
            </span>
            <span className="hero-line-sub">
              Ready to turn your business into a high-margin machine.
            </span>
          </h1>

          <div className="hero-cta-wrapper">
            <div className="hero-left-col">
              <p className="hero-subtitle">
                Learn from the team that has closed over{" "}
                <span style={{ color: "#B68039" }}>10+ million dollars</span>{" "}
                in operational gaps in the past year.
              </p>
            </div>
            <div className="hero-cta-controls">
              <a href="https://onedayback.orage.agency/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
                <LiquidMetalButton
                  label="Get Started"
                  viewMode="text"
                  glowColor="#B68039"
                />
              </a>
            </div>
            <div className="hero-trusted-col">
              <TrustedBy />
            </div>
          </div>

          <div className="hero-line-accent" />
        </header>

        {/* Training teaser above video */}
        <AdvancedTrainingSection />

        {/* Video section */}
        <AIHeroSection />

        {/* Portfolio */}
        <main className="portfolio-section" id="projects">
          <div className="section-label">Selected Works</div>

          <div className="diagonal-grid">
            {/* Project 1 */}
            <div className="project-card" id="maximize-ltv">
              <div className="project-image-wrapper" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bc29513147fd3f1e601353.jpg"
                  alt="Maximize LTV"
                  className="project-image"
                  width={1200}
                  height={675}
                  loading="eager"
                />
              </div>
              <div className="project-info">
                <div className="project-category-glass">
                  <span className="project-category">Automate follow-up, retention, and upsells — grow profit per client on autopilot.</span>
                </div>
                <h2 className="project-title" data-text="MAXIMIZE LTV">MAXIMIZE LTV</h2>
                <p className="project-subtitle">& INCREASE CONVERSION RATE</p>
              </div>
              <div className="line-accent" style={{ width: "100%", height: "1px", top: 0, left: "-50px" }} />
            </div>

            {/* Project 2 */}
            <div className="project-card" id="increase-efficiency">
              <div className="project-image-wrapper" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bc2951a37cc24a66066e33.jpg"
                  alt="2x Your Team's Output"
                  className="project-image"
                  width={1200}
                  height={675}
                  loading="eager"
                />
              </div>
              <div className="project-info">
                <div className="project-category-glass">
                  <span className="project-category">Give your team AI leverage — same headcount, twice the output.</span>
                </div>
                <h2 className="project-title" data-text="2X YOUR TEAM'S OUTPUT">
                  2X YOUR TEAM'S OUTPUT
                </h2>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card" id="scale-business">
              <div className="project-image-wrapper" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bc29512f0e9a7b69b66db9.jpg"
                  alt="Scale Your Business"
                  className="project-image"
                  width={1200}
                  height={675}
                  loading="eager"
                />
              </div>
              <div className="project-info">
                <div className="project-category-glass">
                  <span className="project-category">AI-driven insights and automated workflows that do the heavy lifting for you.</span>
                </div>
                <h2 className="project-title" data-text="SCALE YOUR BUSINESS">SCALE YOUR BUSINESS</h2>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card" id="learn-ai">
              <div className="project-image-wrapper" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bc29517e33efe14476b855.jpg"
                  alt="Learn AI"
                  className="project-image"
                  width={1200}
                  height={675}
                  loading="eager"
                />
              </div>
              <div className="project-info">
                <div className="project-category-glass">
                  <span className="project-category">Master the fundamentals — the biggest return on your time this year.</span>
                </div>
                <h2 className="project-title" data-text="LEARN AI">LEARN AI</h2>
              </div>
            </div>
          </div>
        </main>

        {/* FAQ */}
        <FAQSection />

        {/* About Us */}
        <section id="about-us" className="about-section">
          <div className="section-label">About Us</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "48px", flexWrap: "wrap" }}>
            {/* Founder image — liquid glass capsule */}
            <div
              className="founder-capsule"
              style={{
                flexShrink: 0,
                width: 260,
                borderRadius: 32,
                overflow: "hidden",
                position: "relative",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.55)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              {/* diagonal shimmer */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 55%, rgba(255,255,255,0.12) 100%)",
                zIndex: 2, pointerEvents: "none",
              }} />
              <img
                src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb60603147fd01594d365d.jpg"
                alt="Our Founders"
                style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "3/4" }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Text */}
            <div className="about-content" style={{ flex: 1, minWidth: 240 }}>
              <h2 className="about-title" style={{ overflow: "hidden" }}>
                <span
                  className="diagonal-reveal"
                  style={{ display: "block" }}
                >
                  OUR FOUNDERS
                </span>
              </h2>
              <p className="about-body">
                We operate at the crossroads of AI strategy, marketing operations, and business
                intelligence. Our team has identified and closed over{" "}
                <span style={{ color: "#B68039", fontWeight: 700 }}>10+ million dollars</span> in
                operational gaps for service businesses — by finding the exact lever that unlocks
                growth and building custom AI systems to pull it. We don't sell software. We build
                the infrastructure that makes your business run without you running it.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact">
          <div className="footer-grid">
            <div>
              <a href="https://onedayback.orage.agency/" target="_blank" rel="noopener noreferrer" className="footer-cta">
                TAKING THE WORLD BY STORM
              </a>
            </div>
            <div>
              <ul className="social-list">
                <li><a href="https://www.youtube.com/@GeorgeWMoffat" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://www.linkedin.com/in/george-w-moffat-750965361/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/moffat.ai/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.facebook.com/georgewmoffat" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://whop.com/joined/orage/products/enterpriseai/" target="_blank" rel="noopener noreferrer">AI For Business</a></li>
                <li><a href="https://onedayback.orage.agency/" target="_blank" rel="noopener noreferrer">Scale Your Business</a></li>
              </ul>
            </div>
            <div className="footer-location">
              <p>ORAGE AGENCY LLC<br />EST. 2025</p>
            </div>
          </div>
          {/* Disclaimer Section — Brand Styled */}
          <div style={{ paddingTop: "60px", paddingBottom: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "900px", margin: "0 auto", fontFamily: "var(--font-main)" }}>
              George and Brooklyn's results are not typical and are not a guarantee of your success. George and Brooklyn are experienced business owners and investors, and your results will vary depending on education, effort, application, experience, and background. George and Brooklyn do not personally invest in every business they work with through ORAGE Agency. Due to the sensitivity of financial information, we do not know all results of our students. We cannot guarantee that you will make money or that you will be successful if you employ their business strategies. Consequently, your results may significantly vary from theirs. We do not give investment, tax, or other professional advice. Specific transactions and experiences are mentioned for informational purposes only.
            </p>
          </div>

          {/* Minimal clean footer */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "32px", paddingBottom: "32px", textAlign: "center", fontSize: "13px", color: "#64748b", fontFamily: "var(--font-main)" }}>
            <p style={{ margin: "8px 0" }}>
              © 2025 ORAGE AGENCY LLC. All Rights Reserved.
            </p>
            <p style={{ margin: "12px 0 0 0", fontSize: "12px" }}>
              <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none", marginRight: "12px" }}>Privacy</a>
              <span style={{ color: "#cbd5e1" }}>·</span>
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#64748b", textDecoration: "none", marginLeft: "12px" }}>Terms</a>
            </p>
          </div>
        </footer>
      </div>
      <FloatingStacyButton />
      <LiquidGlassChatWidget />
    </>
  )
}
