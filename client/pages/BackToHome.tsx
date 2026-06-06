import React, { useState } from "react";

interface BackToHomeProps {
  href?: string;       // destination path, defaults to "/"
  label?: string;      // button label, defaults to "Home"
  position?: "top-left" | "top-right" | "inline"; // placement style
}

const BackToHome: React.FC<BackToHomeProps> = ({
  href = "/",
  label = "Home",
  position = "top-left",
}) => {
  const [hovered, setHovered] = useState(false);

  const positionStyles: React.CSSProperties =
    position === "top-left"
      ? { position: "fixed", top: "18px", left: "20px", zIndex: 999 }
      : position === "top-right"
      ? { position: "fixed", top: "18px", right: "20px", zIndex: 999 }
      : {}; // "inline" — flows naturally in the DOM

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "9px 18px",
    borderRadius: "10px",
    border: hovered
      ? "1px solid rgba(90,138,72,0.40)"
      : "1px solid rgba(90,138,72,0.18)",
    background: hovered ? "#d4eac8" : "#ecf4e7",
    color: hovered ? "#3a6028" : "#5a7248",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
    boxShadow: hovered
      ? "0 4px 14px rgba(90,138,72,0.18)"
      : "0 1px 4px rgba(90,138,72,0.08)",
    ...positionStyles,
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "1rem",
    lineHeight: 1,
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    opacity: 0.7,
    marginRight: "2px",
  };

  return (
    <a
      href={href}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={arrowStyle}>←</span>
      <span style={iconStyle}>⌂</span>
      {label}
    </a>
  );
};

export default BackToHome;