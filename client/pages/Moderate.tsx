import React from "react";

const resources = [
  {
    href: "/peer-support",
    emoji: "🤝",
    label: "Peer-to-Peer Support",
    desc: "Connect with trained students or peers with similar experiences.",
    accent: "#fef08a",
    accentDark: "#ca8a04",
    tag: "Community",
  },
  {
    href: "/diary",
    emoji: "📓",
    label: "Multilingual Diary",
    desc: "Write your thoughts safely in multiple languages.",
    accent: "#fde68a",
    accentDark: "#d97706",
    tag: "Daily practice",
  },
  {
    href: "/Detox",
    emoji: "🗑️",
    label: "AI Thought Detox",
    desc: "Safely process and organise your thoughts using AI guidance.",
    accent: "#fecdd3",
    accentDark: "#e11d48",
    tag: "AI-powered",
  },
  {
    href: "/IB",
    emoji: "🖼️",
    label: "Image Therapy",
    desc: "Visual exercises to relax and stimulate positive emotions.",
    accent: "#fbcfe8",
    accentDark: "#db2777",
    tag: "Visual",
  },
];

export default function ModerateServices() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef9c3 0%, #fce7f3 55%, #fff7ed 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "fixed", top: "-100px", right: "-80px",
        width: "380px", height: "380px", borderRadius: "50%",
        background: "radial-gradient(circle, #fde68a50 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-80px", left: "-80px",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, #fbcfe850 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <main style={{
        maxWidth: "860px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
      }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(202,138,4,0.1)",
          border: "1.5px solid #ca8a0440",
          borderRadius: "999px",
          padding: "0.35rem 1rem",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#92400e",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          animation: "fadeSlideUp 0.4s ease both",
        }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#f59e0b",
            boxShadow: "0 0 0 3px #f59e0b30",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }} />
          Moderate Support Level
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", animation: "fadeSlideUp 0.4s 0.08s ease both" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            color: "#78350f",
            lineHeight: 1.15,
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
          }}>
            Your Support <br />
            <span style={{
              background: "linear-gradient(90deg, #d97706, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Resources
            </span>
          </h1>
          <p style={{
            color: "#92400e",
            fontSize: "1.05rem",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
            opacity: 0.8,
          }}>
            These features are designed to help you manage and strengthen your mental well-being.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "1.25rem",
          width: "100%",
          animation: "fadeSlideUp 0.4s 0.16s ease both",
        }}>
          {resources.map(({ href, emoji, label, desc, accent, accentDark, tag }) => (
            <a
              key={label}
              href={href}
              style={{
                background: "#ffffffd9",
                border: `1.5px solid ${accent}`,
                borderRadius: "1.5rem",
                padding: "1.75rem 1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.75rem",
                textDecoration: "none",
                boxShadow: `0 4px 24px ${accent}80`,
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${accent}cc`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${accent}80`;
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                background: `linear-gradient(90deg, ${accent}, ${accentDark})`,
                borderRadius: "1.5rem 1.5rem 0 0",
              }} />
              <div style={{ fontSize: "2.4rem", lineHeight: 1, marginTop: "0.25rem" }}>{emoji}</div>
              <div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#78350f",
                  margin: "0 0 0.3rem",
                }}>{label}</h2>
                <p style={{
                  fontSize: "0.82rem",
                  color: "#a16207",
                  margin: 0,
                  lineHeight: 1.5,
                }}>{desc}</p>
              </div>
              <span style={{
                display: "inline-block",
                background: accent,
                color: accentDark,
                fontSize: "0.72rem",
                fontWeight: 700,
                borderRadius: "999px",
                padding: "0.2rem 0.7rem",
                letterSpacing: "0.03em",
              }}>{tag}</span>
            </a>
          ))}
        </div>

        {/* Affirmation banner */}
        <div style={{
          width: "100%",
          background: "linear-gradient(135deg, #fef9c3, #fce7f3)",
          borderRadius: "1.5rem",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          border: "1.5px solid #fde68a",
          boxShadow: "0 4px 20px #f59e0b15",
          animation: "fadeSlideUp 0.4s 0.24s ease both",
        }}>
          <span style={{ fontSize: "2rem" }}>💛</span>
          <div>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#92400e",
              margin: "0 0 0.2rem",
              fontWeight: 600,
            }}>
              "You are allowed to be both a masterpiece and a work in progress simultaneously."
            </p>
            <span style={{ fontSize: "0.78rem", color: "#a16207", fontWeight: 500 }}>— Sophia Bush</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          animation: "fadeSlideUp 0.4s 0.32s ease both",
        }}>
          <button
            onClick={() => (window.location.href = "/mild")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#ffffff",
              color: "#d97706",
              border: "2px solid #fde68a",
              borderRadius: "999px",
              padding: "0.8rem 2rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 16px #fde68a60",
              transition: "transform 0.18s, box-shadow 0.18s, background 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.background = "#fef9c3";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.background = "#ffffff";
            }}
          >
            🌿 Explore Mild Features
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "linear-gradient(135deg, #d97706, #ec4899)",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "0.8rem 2rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 20px #d9770640",
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px #d9770655";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px #d9770640";
            }}
          >
            ← Home
          </button>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px #f59e0b30; }
          50%       { box-shadow: 0 0 0 6px #f59e0b15; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}