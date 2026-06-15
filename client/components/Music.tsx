import React, { useEffect } from "react";
import Typed from "typed.js";
import Header from "./Header";

const API_URL_PY = import.meta.env.VITE_PYTHON_API_URL;
const MusicAssistant: React.FC = () => {
  useEffect(() => {
    const typed = new Typed(".typing", {
      strings: [
        "Feeling anxious?",
        "Need focus?",
        "Stressed out?",
        "Let's find your perfect music 🎵"
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  const detectMood = async () => {
    const input = document.getElementById("moodText") as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return alert("Please describe how you're feeling!");

    try {
        const res = await fetch(`${API_URL_PY}/detect_mood`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const data = await res.json();

        document.getElementById("result")!.innerHTML =
            `🌿 Your mood: <b>${data.mood.toUpperCase()}</b>`;

       document.getElementById("musicPlayer")!.innerHTML = `
    <div style="
        margin-top: 24px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(90,138,72,0.18);
        border: 1px solid rgba(90,138,72,0.15);
        background: #f4f8f1;
        width: 100%;
    ">
        <iframe 
            src="${data.playlist}" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen"
            style="
                width: 100%;
                height: clamp(280px, 40vw, 420px);
                border: none;
                display: block;
            "
        ></iframe>
    </div>
`;
        
    } catch (err) {
        document.getElementById("result")!.innerHTML = 
            `❌ Connection failed. Try again.`;
    }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg:            #e8f0e3;
          --bg-soft:       #ddebd5;
          --surface:       #f4f8f1;
          --surface-2:     #ecf4e7;
          --border:        rgba(90,130,70,0.16);
          --border-focus:  rgba(90,150,70,0.42);
          --accent:        #5a8a48;
          --accent-light:  #7ab060;
          --accent-muted:  #a8c990;
          --accent-pale:   #d4eac8;
          --warm:          #b07a3e;
          --warm-pale:     #f0e4d0;
          --text-1:        #2a3d22;
          --text-2:        #5a7248;
          --text-3:        #8aaa78;
          --text-4:        #b0c8a0;
          --shadow:        rgba(60,100,40,0.12);
          --radius:        20px;
        }

        .music-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 100px 20px 60px;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── Soft background texture blobs ── */
        .music-page::before,
        .music-page::after {
          content: '';
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(80px);
        }
        .music-page::before {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(130,190,100,0.22) 0%, transparent 70%);
          top: -100px; left: -150px;
          animation: driftA 14s ease-in-out infinite alternate;
        }
        .music-page::after {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(176,212,150,0.18) 0%, transparent 70%);
          bottom: -80px; right: -100px;
          animation: driftB 16s ease-in-out infinite alternate;
        }
        @keyframes driftA {
          from { transform: translate(0, 0); }
          to   { transform: translate(50px, 30px); }
        }
        @keyframes driftB {
          from { transform: translate(0, 0); }
          to   { transform: translate(-40px, -25px); }
        }

        /* ── Soft waveform at bottom ── */
        .waveform-bg {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 70px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 3px;
          padding: 0 20px;
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
        }
        .waveform-bg span {
          display: block;
          width: 4px;
          background: linear-gradient(to top, var(--accent), var(--accent-muted));
          border-radius: 2px 2px 0 0;
          animation: wavebar 2s ease-in-out infinite alternate;
        }
        .waveform-bg span:nth-child(odd)  { animation-delay: 0.2s; }
        .waveform-bg span:nth-child(3n)   { animation-delay: 0.6s; }
        .waveform-bg span:nth-child(4n)   { animation-delay: 1.0s; }
        .waveform-bg span:nth-child(5n)   { animation-delay: 0.4s; }
        @keyframes wavebar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }

        /* ── Card ── */
        .music-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 660px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 48px 52px 44px;
          text-align: center;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.8) inset,
            0 16px 48px var(--shadow),
            0 4px 12px rgba(60,100,40,0.06);
          animation: cardIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* top leaf-green edge accent */
        .music-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-muted), var(--accent-light), transparent);
          border-radius: 2px;
          opacity: 0.7;
        }

        /* ── Vinyl / note icon ── */
        .vinyl-icon {
          width: 52px; height: 52px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: conic-gradient(
            var(--surface-2) 0deg,   var(--accent-light) 55deg,
            var(--surface-2) 110deg, var(--accent-muted) 165deg,
            var(--surface-2) 220deg, var(--accent) 275deg,
            var(--surface-2) 360deg
          );
          display: flex; align-items: center; justify-content: center;
          animation: spin 10s linear infinite;
          box-shadow: 0 4px 18px rgba(90,138,72,0.22);
          position: relative;
          flex-shrink: 0;
        }
        .vinyl-icon::after {
          content: '';
          width: 15px; height: 15px;
          background: var(--surface);
          border-radius: 50%;
          border: 2px solid var(--border);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Title ── */
        .music-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--text-1);
          letter-spacing: 0.01em;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .music-title span {
          color: var(--accent);
          font-style: italic;
          font-weight: 400;
        }

        /* ── Divider ── */
        .music-divider {
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-pale), var(--accent-muted));
          border-radius: 2px;
          margin: 10px auto 16px;
        }

        /* ── Typing line ── */
        .music-typing-wrap {
          height: 26px;
          margin-bottom: 26px;
        }
        .typing {
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--text-2);
          letter-spacing: 0.02em;
        }

        /* ── Input ── */
        .music-input-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .music-input-wrap .input-icon {
          position: absolute;
          left: 15px; top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          pointer-events: none;
          opacity: 0.45;
        }
        #moodText {
          width: 100%;
          padding: 13px 18px 13px 42px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text-1);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
          caret-color: var(--accent);
        }
        #moodText::placeholder { color: var(--text-4); }
        #moodText:focus {
          border-color: var(--border-focus);
          background: #f8faf6;
          box-shadow: 0 0 0 3px rgba(90,138,72,0.09);
          transform: translateY(-1px);
        }

        /* ── Button ── */
        .music-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 12px;
          border: 1.5px solid rgba(90,138,72,0.30);
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(90,138,72,0.28);
        }
        .music-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 55%);
          pointer-events: none;
        }
        .music-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(90,138,72,0.38);
        }
        .music-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* ── Result ── */
        #result {
          margin-top: 22px;
          min-height: 26px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 400;
          font-style: italic;
          color: var(--text-2);
          letter-spacing: 0.02em;
        }
        #result b {
          font-style: normal;
          font-weight: 600;
          color: var(--accent);
        }

        /* ── Music player ── */
        #musicPlayer {
          margin-top: 12px;
          border-radius: 14px;
          overflow: hidden;
        }
        .music-iframe {
          width: calc(100% + 80px);
          height: 380px;
          border: none;
          border-radius: 0 0 14px 14px;
          display: block;
          margin: 16px -40px -44px;
          box-shadow: 0 6px 30px rgba(60,100,40,0.14);
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--accent-pale); border-radius: 10px; }

        /* ── Home button ── */
        .btn-home {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text-2);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          position: absolute;
          top: 18px;
          left: 20px;
          z-index: 2;
        }
        .btn-home:hover {
          background: var(--accent-pale);
          border-color: rgba(90,138,72,0.30);
          color: var(--accent);
          transform: translateY(-1px);
        }
        .btn-home::before { content: '⌂'; font-size: 0.9rem; }

        /* ── Focus ring ── */
        *:focus-visible {
          outline: 2px solid rgba(90,138,72,0.50);
          outline-offset: 2px;
        }
      `}</style>

      <div className="music-page">

        {/* Ambient waveform decoration */}
        <div className="waveform-bg" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} style={{ height: `${18 + Math.sin(i * 0.45) * 35 + Math.random() * 18}px` }} />
          ))}
        </div>

        {/* Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <Header />
        </div>

        {/* Main Card */}
        <div className="music-card">

          {/* Home button */}
          <a href="/" className="btn-home">Home</a>

          {/* Spinning vinyl */}
          <div className="vinyl-icon" aria-hidden="true" />

          {/* Title */}
          <h2 className="music-title">
            AI <span>Music</span> Assistant
          </h2>

          {/* Divider */}
          <div className="music-divider" />

          {/* Typing animation */}
          <div className="music-typing-wrap">
            <span className="typing" />
          </div>

          {/* Input */}
          <div className="music-input-wrap">
            <span className="input-icon">🧠</span>
            <input
              id="moodText"
              type="text"
              placeholder="Describe how you're feeling right now…"
            />
          </div>

          {/* Button */}
          <button className="music-btn" onClick={detectMood}>
            Find My Music <span>🎶</span>
          </button>

          {/* Mood Result */}
          <div id="result" />

          {/* Music Player */}
          <div id="musicPlayer" />
        </div>
      </div>
    </>
  );
};

export default MusicAssistant;