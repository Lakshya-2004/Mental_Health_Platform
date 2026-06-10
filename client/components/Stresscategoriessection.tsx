"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stressTypes = [
  {
    label: "Mild Mental Stress",
    icon: "🌤️",
    desc: "Occasional tension; manageable with small daily habits.",
    detail: [
      "Mild stress is a natural response to everyday challenges like deadlines, social situations, or minor life changes.",
      "Common signs include brief irritability, light fatigue, or occasional difficulty concentrating.",
      "It typically resolves on its own with rest, exercise, or talking to a friend.",
    ],
    tips: ["10-minute daily walks", "Journaling before bed", "Limiting screen time"],
    color: { bg: "#f6f8ee", border: "rgba(138,154,91,0.35)", accent: "#8a9a5b" },
  },
  {
    label: "Moderate Mental Stress",
    icon: "🌧️",
    desc: "Persistent pressure affecting focus and sleep patterns.",
    detail: [
      "Moderate stress lingers beyond a single event and starts to interfere with daily routines and productivity.",
      "You may notice recurring sleep issues, mood swings, appetite changes, or difficulty making decisions.",
      "Structured coping strategies and possibly speaking to a counselor can make a significant difference.",
    ],
    tips: ["Guided meditation sessions", "Regular sleep schedule", "Talking to a counselor"],
    color: { bg: "#f0f2e6", border: "rgba(75,83,32,0.25)", accent: "#4b5320" },
  },
  {
    label: "Severe Mental Stress",
    icon: "⛈️",
    desc: "Significant impact on daily life — expert guidance recommended.",
    detail: [
      "Severe stress can feel overwhelming and may manifest as persistent anxiety, emotional exhaustion, or physical symptoms like headaches and chest tightness.",
      "Daily functioning — work, relationships, and self-care — may become noticeably impaired.",
      "Professional support from a licensed counselor or therapist is strongly recommended.",
    ],
    tips: ["Book a counselor session", "Reach out to trusted people", "Consider a structured care plan"],
    color: { bg: "#eef0e0", border: "rgba(75,83,32,0.35)", accent: "#3d4a1e" },
  },
];

type StressType = typeof stressTypes[0];

export default function StressCategoriesSection() {
  const [selected, setSelected] = useState<StressType | null>(null);

  return (
    <>
      <section
        style={{
          padding: "80px 32px",
          background: "var(--warm)",
          borderRadius: 52,
          margin: "8px 16px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Eyebrow */}
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#8a9a5b",
              margin: "0 0 16px",
            }}
          >
            Understand your needs
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px,4.5vw,52px)",
              textAlign: "center",
              marginBottom: 16,
              lineHeight: 1.2,
              color: "#4b5320",
            }}
          >
            Types &amp; Categories of Mental Stress
          </h2>

          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: 17,
              color: "var(--muted)",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Based on your responses to a few simple questions.
          </p>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {stressTypes.map((item) => (
              <motion.div
                key={item.label}
                onClick={() => setSelected(item)}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(75,83,32,0.14)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="stress-card"
                style={{ cursor: "pointer" }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 24,
                    color: item.color.accent,
                    marginBottom: 10,
                    lineHeight: 1.25,
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 14,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#8a9a5b",
                  }}
                >
                  Learn more →
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal overlay ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(30,35,15,0.45)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                zIndex: 50,
              }}
            />

            {/* Modal card */}
          {/* Modal card */}
<motion.div
  key="modal"
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.97 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  style={{
    position: "fixed",
    inset: 0,
    zIndex: 51,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  }}
>
  <div
    onClick={(e) => e.stopPropagation()}
    style={{
      width: "min(520px, 90vw)",
      maxHeight: "85vh",
      overflowY: "auto",
      background: selected.color.bg,
      border: `1.5px solid ${selected.color.border}`,
      borderRadius: 32,
      padding: "40px 36px 36px",
      boxShadow: "0 32px 80px rgba(75,83,32,0.22)",
      position: "relative",
    }}
  >
    {/* Close button */}
    <button
      onClick={() => setSelected(null)}
      style={{
        position: "absolute",
        top: 18,
        right: 20,
        background: "rgba(138,154,91,0.15)",
        border: "none",
        borderRadius: "50%",
        width: 32,
        height: 32,
        cursor: "pointer",
        fontSize: 16,
        color: "#4b5320",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      ✕
    </button>

    {/* Icon */}
    <div
      style={{
        fontSize: 44,
        marginBottom: 12,
      }}
    >
      {selected.icon}
    </div>

    {/* Title */}
    <h3
      style={{
        fontSize: "clamp(20px,3vw,28px)",
        fontWeight: 700,
        color: selected.color.accent,
        marginBottom: 20,
        lineHeight: 1.25,
      }}
    >
      {selected.label}
    </h3>

    {/* Description */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 24,
      }}
    >
      {selected.detail.map((line, i) => (
        <p
          key={i}
          style={{
            fontSize: 15,
            color: "#4f5e35",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>

    {/* Tips Section */}
    <div
      style={{
        background: "rgba(255,255,255,0.55)",
        borderRadius: 18,
        padding: "16px 20px",
        border: `1px solid ${selected.color.border}`,
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#8a9a5b",
          margin: "0 0 10px",
        }}
      >
        Suggested Steps
      </p>

      <ul
        style={{
          margin: 0,
          padding: "0 0 0 18px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {selected.tips.map((tip) => (
          <li
            key={tip}
            style={{
              fontSize: 14,
              color: "#4b5320",
              lineHeight: 1.5,
            }}
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  </div>
</motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}