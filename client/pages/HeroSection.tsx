/* ─────────────────────────────────────────────────────────────────
   HeroSection.tsx
   Drop this INSIDE the {isLoggedIn && (<> ... <>)} block,
   as the very first child — before the stats bar.
   It uses the same CSS variables / fonts already in globalStyles
   so nothing conflicts.
─────────────────────────────────────────────────────────────────── */

import { motion, Variants } from "framer-motion";
import ExplorePage from "./ExplorePage";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const heroStyles = `
  .hero-root {
    position: relative;
    width: 100%;
    min-height: 92vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: var(--sage-pale);
  }

  /* subtle organic blob shapes in background */
  .hero-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(72px);
    opacity: 0.38;
    pointer-events: none;
  }
  .hero-blob-1 {
    width: 560px; height: 560px;
    background: #A8D5B5;
    top: -120px; right: -100px;
  }
  .hero-blob-2 {
    width: 400px; height: 400px;
    background: #C4B5E8;
    bottom: -80px; left: -80px;
  }
  .hero-blob-3 {
    width: 280px; height: 280px;
    background: #F0D9B5;
    top: 40%; left: 38%;
  }

  /* wavy bottom edge so it flows into next section */
  .hero-wave {
    position: absolute;
    bottom: -2px;
    left: 0; right: 0;
    line-height: 0;
    z-index: 3;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    max-width: 1240px;
    margin: 0 auto;
    padding: 80px 40px 120px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 860px) {
    .hero-inner {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 64px 24px 100px;
      gap: 40px;
    }
    .hero-badge-row { justify-content: center !important; }
    .hero-cta-row   { justify-content: center !important; }
    .hero-right     { display: none; }
  }

  /* eyebrow pill */
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(91,140,110,0.12);
    border: 1px solid rgba(91,140,110,0.25);
    border-radius: 100px;
    padding: 6px 16px;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--sage-mid);
    margin-bottom: 22px;
  }
  .hero-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sage);
    animation: hero-pulse 2s ease-in-out infinite;
  }
  @keyframes hero-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.5); opacity: 0.55; }
  }

  /* headline */
  .hero-h1 {
    font-family: var(--serif);
    font-size: clamp(44px, 6vw, 80px);
    line-height: 1.08;
    color: var(--charcoal);
    margin-bottom: 24px;
  }
  .hero-h1-accent {
    color: var(--sage);
    font-style: italic;
    position: relative;
    display: inline-block;
  }
  /* hand-drawn underline */
  .hero-h1-accent::after {
    content: '';
    position: absolute;
    left: 0; bottom: -6px;
    width: 100%; height: 3px;
    background: var(--sage);
    border-radius: 2px;
    opacity: 0.45;
  }

  /* sub-text */
  .hero-sub {
    font-family: var(--sans);
    font-size: clamp(16px, 1.8vw, 19px);
    color: var(--muted);
    line-height: 1.75;
    max-width: 500px;
    margin-bottom: 36px;
  }

  /* badge chips row */
  .hero-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 100px;
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 500;
    background: #fff;
    border: 1.5px solid rgba(91,140,110,0.18);
    color: var(--charcoal);
  }
  .hero-badge-icon { font-size: 15px; }

  /* CTA row */
  .hero-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }
  .hero-btn-main {
    padding: 16px 36px;
    background: var(--sage);
    color: #fff;
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: background .2s, transform .12s, box-shadow .2s;
    box-shadow: 0 4px 20px rgba(91,140,110,0.3);
    text-decoration: none;
    display: inline-block;
  }
  .hero-btn-main:hover {
    background: var(--sage-mid);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(91,140,110,0.35);
  }
  .hero-btn-secondary {
    padding: 15px 30px;
    background: transparent;
    color: var(--charcoal);
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 500;
    border: 1.5px solid rgba(45,51,64,0.2);
    border-radius: 14px;
    cursor: pointer;
    transition: border-color .2s, background .2s;
    text-decoration: none;
    display: inline-block;
  }
  .hero-btn-secondary:hover {
    border-color: var(--sage);
    background: var(--sage-light);
    color: var(--sage-mid);
  }

  /* right side — floating card cluster */
  .hero-right {
    position: relative;
    height: 520px;
  }

  /* main mood card */
  .hero-card-main {
    position: absolute;
    top: 40px; left: 20px;
    width: 290px;
    background: #fff;
    border: 1.5px solid rgba(91,140,110,0.14);
    border-radius: 28px;
    padding: 28px 24px;
    box-shadow: 0 8px 40px rgba(91,140,110,0.13);
    animation: hero-float 5s ease-in-out infinite;
  }
  @keyframes hero-float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  .hero-card-avatar {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--sage-light);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    margin-bottom: 16px;
    border: 2px solid rgba(91,140,110,0.2);
  }
  .hero-card-label {
    font-family: var(--sans);
    font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--sage); margin-bottom: 6px;
  }
  .hero-card-title {
    font-family: var(--serif);
    font-size: 20px; color: var(--charcoal);
    margin-bottom: 10px;
  }
  .hero-card-text {
    font-family: var(--sans);
    font-size: 13px; color: var(--muted);
    line-height: 1.6;
  }

  /* mood bar */
  .hero-mood-bar {
    margin-top: 16px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .hero-mood-row {
    display: flex; align-items: center; gap: 10px;
  }
  .hero-mood-name {
    font-family: var(--sans); font-size: 12px; color: var(--muted);
    width: 56px; flex-shrink: 0;
  }
  .hero-mood-track {
    flex: 1; height: 6px;
    background: rgba(91,140,110,0.1);
    border-radius: 100px;
    overflow: hidden;
  }
  .hero-mood-fill {
    height: 100%; border-radius: 100px;
    background: var(--sage);
  }

  /* floating quote pill */
  .hero-pill-quote {
    position: absolute;
    top: 0; right: 0;
    background: var(--lav-light);
    border: 1.5px solid rgba(124,111,171,0.2);
    border-radius: 20px;
    padding: 14px 18px;
    max-width: 210px;
    animation: hero-float 5s ease-in-out infinite;
    animation-delay: 1.2s;
    box-shadow: 0 4px 20px rgba(124,111,171,0.1);
  }
  .hero-pill-quote p {
    font-family: var(--serif);
    font-style: italic;
    font-size: 14px;
    color: var(--lavender);
    line-height: 1.5;
  }

  /* session card */
  .hero-card-session {
    position: absolute;
    bottom: 20px; right: 0;
    width: 240px;
    background: var(--charcoal);
    border-radius: 22px;
    padding: 20px 18px;
    animation: hero-float 5s ease-in-out infinite;
    animation-delay: 2.4s;
    box-shadow: 0 8px 32px rgba(45,51,64,0.2);
  }
  .hero-session-top {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px;
  }
  .hero-session-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #A8D5B5;
    animation: hero-pulse 2s ease-in-out infinite;
  }
  .hero-session-label {
    font-family: var(--sans); font-size: 11px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }
  .hero-session-name {
    font-family: var(--serif); font-size: 17px; color: #fff;
    margin-bottom: 4px;
  }
  .hero-session-sub {
    font-family: var(--sans); font-size: 12px; color: rgba(255,255,255,0.45);
  }
  .hero-session-btn {
    margin-top: 14px;
    width: 100%; padding: 10px;
    background: var(--sage); color: #fff;
    font-family: var(--sans); font-size: 13px; font-weight: 600;
    border: none; border-radius: 10px; cursor: pointer;
    transition: background .2s;
  }
  .hero-session-btn:hover { background: var(--sage-mid); }

  /* scroll indicator */
  .hero-scroll {
    position: absolute;
    bottom: 36px; left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .hero-scroll span {
    font-family: var(--sans); font-size: 11px; font-weight: 500;
    letter-spacing: 1.2px; text-transform: uppercase;
    color: var(--muted);
  }
  .hero-scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--sage), transparent);
    animation: hero-scroll-drop 1.8s ease-in-out infinite;
  }
  @keyframes hero-scroll-drop {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
    40%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
  }
`;

export default function HeroSection() {
  return (
    <>
      <style>{heroStyles}</style>

      <section className="hero-root">
        {/* Background blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="hero-inner">

          {/* ── LEFT: text content ── */}
          <div>
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="show"
            >
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                Mental Wellness Platform
              </div>
            </motion.div>

            <motion.h1
              className="hero-h1"
              custom={1} variants={fadeUp} initial="hidden" animate="show"
            >
              Your mind<br />
              deserves to{" "}
              <span className="hero-h1-accent">heal.</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              custom={2} variants={fadeUp} initial="hidden" animate="show"
            >
              Beacon connects you with expert therapists, calming tools, and a
              compassionate community — so every day feels a little lighter.
            </motion.p>

            <motion.div
              className="hero-badge-row"
              custom={3} variants={fadeUp} initial="hidden" animate="show"
            >
              {[
                { icon: "🔒", label: "100% Confidential" },
                { icon: "🌿", label: "Expert Therapists" },
                { icon: "✨", label: "Free to Join" },
                { icon: "💬", label: "24/7 Support" },
              ].map(({ icon, label }) => (
                <span key={label} className="hero-badge">
                  <span className="hero-badge-icon">{icon}</span>
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="hero-cta-row"
              custom={4} variants={fadeUp} initial="hidden" animate="show"
            >
              <a href="/chatbot" className="hero-btn-main">
                Talk to an Expert
              </a>
              <a href="/explore" className="hero-btn-secondary">
                Explore Tools
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: floating cards ── */}
          <motion.div
            className="hero-right"
            custom={2} variants={fadeUp} initial="hidden" animate="show"
          >
            {/* Main mood card */}
            <div className="hero-card-main">
              <div className="hero-card-avatar">🧘</div>
              <div className="hero-card-label">Today's Check-in</div>
              <div className="hero-card-title">How are you feeling?</div>
              <p className="hero-card-text">
                Track your mood daily and notice the patterns that shape your wellbeing.
              </p>
              <div className="hero-mood-bar">
                {[
                  { name: "Calm",    pct: "78%" },
                  { name: "Focused", pct: "62%" },
                  { name: "Rested",  pct: "55%" },
                ].map(({ name, pct }) => (
                  <div key={name} className="hero-mood-row">
                    <span className="hero-mood-name">{name}</span>
                    <div className="hero-mood-track">
                      <div className="hero-mood-fill" style={{ width: pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote pill top-right */}
            <div className="hero-pill-quote">
              <p>"You don't have to face this alone."</p>
            </div>

            {/* Session card bottom-right */}
            <div className="hero-card-session">
              <div className="hero-session-top">
                <div className="hero-session-dot" />
                <span className="hero-session-label">Live Session</span>
              </div>
              <div className="hero-session-name">Dr. Priya Sharma</div>
              <div className="hero-session-sub">Anxiety & Stress · Available now</div>
              <button className="hero-session-btn">Book a Session</button>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>

        {/* Wave SVG — blends into white background of next section */}
        <div className="hero-wave">
          <svg
            viewBox="0 0 1440 64"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: "100%", height: 64, display: "block" }}
          >
            <path
              d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
    </>
  );
}