import React from "react";

export default function SevereServices() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ffe4e6 0%, #fce7f3 55%, #fff1f2 100%)",
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
        background: "radial-gradient(circle, #fecdd350 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-80px", left: "-80px",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, #fbcfe850 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <main style={{
        maxWidth: "720px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
      }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(220,38,38,0.08)",
          border: "1.5px solid #dc262640",
          borderRadius: "999px",
          padding: "0.35rem 1rem",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#991b1b",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          animation: "fadeSlideUp 0.4s ease both",
        }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#ef4444",
            boxShadow: "0 0 0 3px #ef444430",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }} />
          Severe Support Level
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", animation: "fadeSlideUp 0.4s 0.08s ease both" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            color: "#7f1d1d",
            lineHeight: 1.15,
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
          }}>
            You're Not <br />
            <span style={{
              background: "linear-gradient(90deg, #dc2626, #db2777)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Alone
            </span>
          </h1>
          <p style={{
            color: "#9f1239",
            fontSize: "1.05rem",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
            opacity: 0.85,
          }}>
            Professional support is recommended. A trained counsellor is here to listen, guide, and walk alongside you.
          </p>
        </div>

        {/* Counsellor card */}
        <div style={{
          width: "100%",
          background: "#ffffffd9",
          border: "1.5px solid #fecdd3",
          borderRadius: "1.5rem",
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "0 8px 40px #fecdd360",
          position: "relative",
          overflow: "hidden",
          animation: "fadeSlideUp 0.4s 0.16s ease both",
        }}>
          {/* Top accent bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "4px",
            background: "linear-gradient(90deg, #ef4444, #db2777)",
            borderRadius: "1.5rem 1.5rem 0 0",
          }} />

          <div style={{ fontSize: "3.5rem", lineHeight: 1, marginTop: "0.5rem" }}>🧑‍⚕️</div>

          <div style={{ textAlign: "center" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#7f1d1d",
              margin: "0 0 0.5rem",
            }}>Counsellor Support</h2>
            <p style={{
              fontSize: "0.95rem",
              color: "#9f1239",
              margin: "0 0 1.5rem",
              lineHeight: 1.6,
              opacity: 0.85,
              maxWidth: "380px",
            }}>
              Schedule a confidential meeting with a trained counsellor for personalised professional guidance.
            </p>
          </div>

          {/* Reassurance tags */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "0.5rem" }}>
            {["Confidential", "Trained Professional", "Safe Space"].map(tag => (
              <span key={tag} style={{
                background: "#ffe4e6",
                color: "#be123c",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderRadius: "999px",
                padding: "0.25rem 0.8rem",
                letterSpacing: "0.03em",
              }}>{tag}</span>
            ))}
          </div>

          <a
            href="/schedule-counsellor"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "linear-gradient(135deg, #dc2626, #db2777)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "999px",
              padding: "0.85rem 2.4rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              boxShadow: "0 4px 20px #dc262640",
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px #dc262655";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px #dc262640";
            }}
          >
            📅 Schedule Meeting
          </a>
        </div>

        {/* Affirmation banner */}
        <div style={{
          width: "100%",
          background: "linear-gradient(135deg, #ffe4e6, #fce7f3)",
          borderRadius: "1.5rem",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          border: "1.5px solid #fecdd3",
          boxShadow: "0 4px 20px #ef444415",
          animation: "fadeSlideUp 0.4s 0.24s ease both",
        }}>
          <span style={{ fontSize: "2rem" }}>❤️</span>
          <div>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#7f1d1d",
              margin: "0 0 0.2rem",
              fontWeight: 600,
            }}>
              "Asking for help is the first step. You've already shown incredible strength."
            </p>
            <span style={{ fontSize: "0.78rem", color: "#9f1239", fontWeight: 500 }}>— MindBloom</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.9rem",
          justifyContent: "center",
          animation: "fadeSlideUp 0.4s 0.32s ease both",
        }}>
          {[
            { label: "🌿 Mild Features", href: "/mild", bg: "linear-gradient(135deg, #16a34a, #4ade80)", shadow: "#16a34a40" },
            { label: "🌟 Moderate Features", href: "/moderate", bg: "linear-gradient(135deg, #d97706, #fb923c)", shadow: "#d9770640" },
            { label: "🏠 Home", href: "/", bg: "#ffffff", shadow: "#00000015", color: "#7f1d1d", border: "2px solid #fecdd3" },
          ].map(({ label, href, bg, shadow, color, border }) => (
            <button
              key={label}
              onClick={() => (window.location.href = href)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: bg,
                color: color ?? "#fff",
                border: border ?? "none",
                borderRadius: "999px",
                padding: "0.8rem 1.8rem",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 4px 16px ${shadow}`,
                transition: "transform 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >{label}</button>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px #ef444430; }
          50%       { box-shadow: 0 0 0 6px #ef444415; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}