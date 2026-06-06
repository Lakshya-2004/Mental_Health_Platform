import React from "react";


const resources = [
  {
    href: "/meditation-video",
    emoji: "🧘‍♂️",
    label: "Meditation",
    desc: "Guided breathing & mindfulness sessions",
    accent: "#b7e4c7",
    accentDark: "#52b788",
    tag: "5–15 min",
  },
  {
    href: "/article",
    emoji: "📖",
    label: "Reading",
    desc: "Curated articles on mental wellness",
    accent: "#d8f3dc",
    accentDark: "#74c69d",
    tag: "Evidence-based",
  },
  {
    href: "/music",
    emoji: "🎧",
    label: "Sound Therapy",
    desc: "Calming playlists & nature soundscapes",
    accent: "#cfe0fc",
    accentDark: "#6fa3ef",
    tag: "Anytime",
  },
  {
    href: "/diary",
    emoji: "📓",
    label: "Journaling",
    desc: "Reflective prompts to process your day",
    accent: "#fde8d8",
    accentDark: "#f4a261",
    tag: "Daily practice",
  },
];

export default function MildServices() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e9f5ee 0%, #d8eefe 55%, #f0faf4 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      paddingTop: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "fixed", top: "-120px", right: "-100px",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, #b7e4c740 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-80px", left: "-80px",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, #cfe0fc40 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <main style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "3rem 1.5rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
      }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(82,183,136,0.13)",
          border: "1.5px solid #52b78840",
          borderRadius: "999px",
          padding: "0.35rem 1rem",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#2d6a4f",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#52b788",
            boxShadow: "0 0 0 3px #52b78830",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }} />
          Mild Support Level
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            color: "#1b4332",
            lineHeight: 1.15,
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
          }}>
            Your Wellness <br />
            <span style={{
              background: "linear-gradient(90deg, #40916c, #74c69d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Toolkit
            </span>
          </h1>
          <p style={{
            color: "#52796f",
            fontSize: "1.05rem",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Based on your self-assessment, we've selected gentle, science-backed activities to nurture your mind today.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "1.25rem",
          width: "100%",
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
                boxShadow: `0 4px 24px ${accent}60`,
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${accent}90`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${accent}60`;
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                background: `linear-gradient(90deg, ${accent}, ${accentDark})`,
                borderRadius: "1.5rem 1.5rem 0 0",
              }} />

              <div style={{
                fontSize: "2.4rem",
                lineHeight: 1,
                marginTop: "0.25rem",
              }}>{emoji}</div>

              <div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "#1b4332",
                  margin: "0 0 0.3rem",
                }}>{label}</h2>
                <p style={{
                  fontSize: "0.82rem",
                  color: "#52796f",
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
          background: "linear-gradient(135deg, #d8f3dc, #cfe0fc)",
          borderRadius: "1.5rem",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          border: "1.5px solid #b7e4c7",
          boxShadow: "0 4px 20px #52b78815",
        }}>
          <span style={{ fontSize: "2rem" }}>💬</span>
          <div>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#2d6a4f",
              margin: "0 0 0.2rem",
              fontWeight: 600,
            }}>
              "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, or overwhelmed."
            </p>
            <span style={{ fontSize: "0.78rem", color: "#52796f", fontWeight: 500 }}>— Lori Deschene</span>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(135deg, #40916c, #52b788)",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "0.85rem 2.2rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 20px #40916c40",
            transition: "transform 0.18s, box-shadow 0.18s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px #40916c55";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px #40916c40";
          }}
        >
          ← Back to Home
        </button>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px #52b78830; }
          50%       { box-shadow: 0 0 0 6px #52b78815; }
        }
        main > * {
          animation: fadeSlideUp 0.5s ease both;
        }
        main > *:nth-child(1) { animation-delay: 0.05s; }
        main > *:nth-child(2) { animation-delay: 0.13s; }
        main > *:nth-child(3) { animation-delay: 0.22s; }
        main > *:nth-child(4) { animation-delay: 0.32s; }
        main > *:nth-child(5) { animation-delay: 0.42s; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}