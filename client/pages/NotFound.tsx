import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
    // trigger entrance animation
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // ── Styles ──────────────────────────────────────────────

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e8f0e3",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  };

  // soft ambient blob top-left
  const blobA: React.CSSProperties = {
    position: "absolute",
    width: "480px",
    height: "480px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(130,190,100,0.20) 0%, transparent 70%)",
    top: "-140px",
    left: "-160px",
    filter: "blur(72px)",
    pointerEvents: "none",
  };

  // soft ambient blob bottom-right
  const blobB: React.CSSProperties = {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(176,212,150,0.16) 0%, transparent 70%)",
    bottom: "-100px",
    right: "-120px",
    filter: "blur(72px)",
    pointerEvents: "none",
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    background: "#f4f8f1",
    border: "1px solid rgba(90,130,70,0.16)",
    borderRadius: "24px",
    padding: "60px 64px 52px",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 2px 0 rgba(255,255,255,0.85) inset, 0 16px 48px rgba(60,100,40,0.12)",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
    transition: "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)",
  };

  // top edge green shimmer
  const cardTopLine: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: "12%",
    right: "12%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #a8c990, #7ab060, transparent)",
    borderRadius: "2px",
    opacity: 0.7,
  };

  const illustrationWrap: React.CSSProperties = {
    marginBottom: "28px",
    display: "flex",
    justifyContent: "center",
  };

  const bigNumberStyle: React.CSSProperties = {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontSize: "7rem",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    background: "linear-gradient(135deg, #5a8a48 0%, #a8c990 60%, #7ab060 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    userSelect: "none",
    position: "relative",
  };

  const leafLeft: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    left: "-28px",
    fontSize: "1.8rem",
    opacity: 0.55,
    transform: "rotate(-20deg)",
    WebkitTextFillColor: "initial",
    background: "none",
    animation: "leafSway 3s ease-in-out infinite alternate",
  };

  const leafRight: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    right: "-28px",
    fontSize: "1.8rem",
    opacity: 0.55,
    transform: "rotate(20deg) scaleX(-1)",
    WebkitTextFillColor: "initial",
    background: "none",
    animation: "leafSway 3.5s ease-in-out infinite alternate-reverse",
  };

  const dividerStyle: React.CSSProperties = {
    width: "36px",
    height: "2px",
    background: "linear-gradient(90deg, #d4eac8, #a8c990)",
    borderRadius: "2px",
    margin: "0 auto 20px",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Georgia', serif",
    fontSize: "1.55rem",
    fontWeight: 600,
    color: "#2a3d22",
    marginBottom: "10px",
    letterSpacing: "0.01em",
  };

  const subTextStyle: React.CSSProperties = {
    fontSize: "0.93rem",
    fontWeight: 300,
    color: "#5a7248",
    lineHeight: 1.65,
    marginBottom: "32px",
    maxWidth: "340px",
    margin: "0 auto 32px",
  };

  const pathBadgeStyle: React.CSSProperties = {
    display: "inline-block",
    background: "#ecf4e7",
    border: "1px solid rgba(90,130,70,0.18)",
    borderRadius: "8px",
    padding: "4px 12px",
    fontSize: "0.78rem",
    fontFamily: "monospace",
    color: "#5a8a48",
    marginBottom: "28px",
    letterSpacing: "0.04em",
  };

  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 28px",
    borderRadius: "12px",
    border: hovered ? "1px solid rgba(90,138,72,0.40)" : "1px solid rgba(90,138,72,0.22)",
    background: hovered
      ? "linear-gradient(135deg, #5a8a48 0%, #7ab060 100%)"
      : "linear-gradient(135deg, #6a9a55 0%, #88b870 100%)",
    color: "#fff",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: hovered
      ? "0 8px 26px rgba(90,138,72,0.36)"
      : "0 4px 16px rgba(90,138,72,0.24)",
  };

  const footNoteStyle: React.CSSProperties = {
    marginTop: "20px",
    fontSize: "0.78rem",
    color: "#b0c8a0",
    letterSpacing: "0.03em",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes leafSway {
          from { transform: rotate(-20deg) translateY(0px); }
          to   { transform: rotate(-10deg) translateY(-5px); }
        }
      `}</style>

      <div style={pageStyle}>
        {/* Ambient blobs */}
        <div style={blobA} />
        <div style={blobB} />

        {/* Card */}
        <div style={cardStyle}>
          <div style={cardTopLine} />

          {/* Big 404 with leaves */}
          <div style={illustrationWrap}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span style={leafLeft}>🌿</span>
              <span style={bigNumberStyle}>404</span>
              <span style={leafRight}>🌿</span>
            </div>
          </div>

          <div style={dividerStyle} />

          <h1 style={headingStyle}>Page Not Found</h1>

          <p style={subTextStyle}>
            The page you're looking for doesn't exist or may have been moved.
            Take a breath — let's get you back on track.
          </p>

          {/* Show the bad path */}
          <div>
            <span style={pathBadgeStyle}>{location.pathname}</span>
          </div>

          {/* Home button */}
          <a
            href="/"
            style={btnStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span>⌂</span> Return Home
          </a>

          <p style={footNoteStyle}>SafeSpace · Mental Wellness</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;