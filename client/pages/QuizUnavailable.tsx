import React from "react";

/**
 * Placeholder for the /quiz route while the self-assessment is unavailable.
 *
 * Usage: swap in for the quiz route in your router, e.g.
 *   <Route path="/quiz" element={<QuizUnavailable />} />
 * in place of <Route path="/quiz" element={<MentalHealthQuiz />} />
 */
export default function QuizUnavailable() {
  return (
    <div className="unavail-page">
      <div className="unavail-card">
        <div className="breathing-mark" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="96" height="96">
            <circle className="ring ring-1" cx="60" cy="60" r="20" />
            <circle className="ring ring-2" cx="60" cy="60" r="34" />
            <circle className="ring ring-3" cx="60" cy="60" r="48" />
          </svg>
        </div>

        <span className="eyebrow">Self-Assessment</span>
        <h1 className="headline">This check-in is taking a short break</h1>
        <p className="body-text">
          We're working on this assessment and it isn't ready just yet.
          Please check back soon, or head back home in the meantime.
        </p>

        <a className="btn-home" href="/">
          Return home
        </a>

        <p className="support-line">
          Need to talk to someone today? A mental health professional or a
          local helpline can help right now.
        </p>
      </div>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

  .unavail-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f5f3ff;
    font-family: 'DM Sans', sans-serif;
  }

  .unavail-card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 2px 24px rgba(83, 74, 183, 0.10);
    width: 100%;
    max-width: 460px;
    padding: 3rem 2.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;
  }

  .breathing-mark { margin-bottom: 0.5rem; }

  .ring {
    fill: none;
    stroke-width: 2;
    transform-origin: 60px 60px;
    animation: breathe 3.6s ease-in-out infinite;
  }
  .ring-1 { stroke: #534ab7; opacity: 0.55; animation-delay: 0s; }
  .ring-2 { stroke: #7f77dd; opacity: 0.4; animation-delay: 0.5s; }
  .ring-3 { stroke: #cbc6f0; opacity: 0.3; animation-delay: 1s; }

  @keyframes breathe {
    0%, 100% { transform: scale(0.92); opacity: 0.25; }
    50% { transform: scale(1.04); opacity: 0.6; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ring { animation: none; }
  }

  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7c6fb0;
  }

  .headline {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: #1a1233;
    line-height: 1.35;
    margin: 0;
  }

  .body-text {
    font-size: 15px;
    color: #534a78;
    line-height: 1.6;
    margin: 0;
    max-width: 360px;
  }

  .btn-home {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 11px 28px;
    border-radius: 10px;
    background: #534ab7;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.18s;
  }
  .btn-home:hover { background: #3c3489; }

  .support-line {
    font-size: 13px;
    color: #9990cc;
    line-height: 1.6;
    margin: 0.75rem 0 0;
    max-width: 360px;
  }

  @media (max-width: 480px) {
    .unavail-card { padding: 2.25rem 1.5rem; }
    .headline { font-size: 1.35rem; }
  }
`;