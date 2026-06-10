"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is Beacon for?",
    a: "Beacon is a mental wellness platform designed to connect students and young professionals with licensed counselors, curated resources, and peer support — all in one place.",
  },
  {
    q: "What is the objective of Beacon?",
    a: "Our objective is to make mental health support accessible, stigma-free, and effective. We believe everyone deserves the tools to build emotional resilience and thrive.",
  },
  {
    q: "What major steps is Beacon taking?",
    a: "Beacon is expanding its network of certified counselors, launching AI-assisted mood tracking, and partnering with universities to provide on-campus mental health resources.",
  },
  {
    q: "What is the cost for Beacon features?",
    a: "Beacon offers a free tier with access to articles, community forums, and self-help tools. Premium plans unlock unlimited counselor sessions and personalized care plans.",
  },
  {
    q: "Will Beacon really help me improve stress?",
    a: "Yes. Our evidence-based techniques — including CBT exercises, mindfulness sessions, and guided journaling — have helped thousands of users measurably reduce stress levels.",
  },
  {
    q: "Is Beacon really that effective?",
    a: "Over 85% of Beacon users report feeling more in control of their mental health within the first month. Our counselors are licensed professionals with verified credentials.",
  },
  {
    q: "Can I get Beacon features for free?",
    a: "Absolutely. Sign up for free and immediately access our article library, daily check-in tools, and community support groups — no credit card required.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{ padding: "80px 32px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

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
          Got questions?
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(26px, 4vw, 48px)",
            textAlign: "center",
            marginBottom: 48,
            lineHeight: 1.25,
            color: "#4b5320",
          }}
        >
          Frequently Asked Questions About{" "}
          <span style={{ color: "#8a9a5b", fontStyle: "italic" }}>Beacon</span>
        </h2>

        {/* Accordion */}
        <div
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1.5px solid rgba(138,154,91,0.25)",
            borderRadius: 32,
            padding: "8px 0",
            boxShadow: "0 16px 48px rgba(75,83,32,0.10)",
            overflow: "hidden",
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isLast = i === faqs.length - 1;

            return (
              <div
                key={faq.q}
                style={{
                  borderBottom: isLast
                    ? "none"
                    : "1px solid rgba(138,154,91,0.15)",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 36px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: isOpen ? "#4b5320" : "#3d4a1e",
                      transition: "color 0.2s",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* Animated chevron */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isOpen
                        ? "#4b5320"
                        : "rgba(138,154,91,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.25s",
                      fontSize: "18px",
                      fontWeight: 300,
                      color: isOpen ? "#e8ecce" : "#4b5320",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer dropdown */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          margin: 0,
                          padding: "0 36px 24px",
                          fontSize: "15px",
                          lineHeight: 1.75,
                          color: "#4f5e35",
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#8a9a5b",
              marginBottom: 12,
            }}
          >
            Ready to begin?
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#4b5320",
              margin: 0,
            }}
          >
            Join Us Today
          </h2>
        </div>

      </div>
    </section>
  );
}