// src/pages/ExplorePage.tsx

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackToHome from "./BackToHome";

const ExplorePage = () => {
  const navigate = useNavigate();

  const assessmentTools = [
    { title: "Image Therapy", route: "/IB" },
    { title: "AI ChatBot", route: "/chatbot" },
    { title: "Detox Bin", route: "/Detox" },
    { title: "Diary", route: "/diary" },
    { title: "Safe Space", route: "/Safespace" },
  ];

  const stressCategories = [
    {
      emoji: "🌤️",
      title: "Mild Mental Stress",
      description: "Occasional tension; manageable with small daily habits.",
      route: "/mild",
    },
    {
      emoji: "🌧️",
      title: "Moderate Mental Stress",
      description: "Persistent pressure affecting focus and sleep patterns.",
      route: "/moderate",
    },
    {
      emoji: "⛈️",
      title: "Severe Mental Stress",
      description: "Significant impact on daily life — expert guidance recommended.",
      route: "/severe",
    },
  ];

  const wellnessTools = [
    { title: "Article", route: "/article" },
    { title: "Music", route: "/music" },
    { title: "Diary", route: "/diary" },
    { title: "SafeSpace", route: "/Safespace" },
    { title: "Meditation Video", route: "/meditation-video" },
  ];

  return (
    <section
      className="min-h-screen py-16 px-6"
      style={{
        background: "linear-gradient(160deg, #f5f7ee 0%, #eef1e2 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <BackToHome />

      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <p
            className="text-xs uppercase tracking-[0.18em] font-semibold mb-4"
            style={{ color: "#8a9a5b" }}
          >
            Beacon · Explore
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold tracking-tight mb-4"
            style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
          >
            Explore Beacon
          </h1>
          <div
            className="mx-auto w-12 h-[2px] rounded-full mb-5"
            style={{ background: "#8a9a5b" }}
          />
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "#6b7560" }}
          >
            Discover wellness tools, mental health resources, and guided
            support designed for students.
          </p>
        </div>

        {/* Section 1 — Wellness Tools (pill links) */}
        <div className="mb-24">
          <h2
            className="text-2xl font-semibold text-center mb-8"
            style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
          >
            Wellness Tools
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {assessmentTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.route}
                className="transition-all duration-200 active:scale-95"
                style={{
                  padding: "10px 24px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  border: "1.5px solid #d6dcc4",
                  color: "#4b5320",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                  boxShadow: "0 1px 4px rgba(75,83,32,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4b5320";
                  e.currentTarget.style.color = "#e8ecce";
                  e.currentTarget.style.borderColor = "#4b5320";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(75,83,32,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.color = "#4b5320";
                  e.currentTarget.style.borderColor = "#d6dcc4";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(75,83,32,0.07)";
                }}
              >
                {tool.title}
              </a>
            ))}
          </div>
        </div>

        {/* Section 2 — Stress Categories */}
        <div className="mb-24">
          <p
            className="text-center text-xs uppercase tracking-[0.18em] font-semibold mb-3"
            style={{ color: "#8a9a5b" }}
          >
            Understand Your Needs
          </p>
          <h2
            className="text-center text-4xl md:text-5xl font-semibold tracking-tight mb-3"
            style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
          >
            Types of Mental Stress
          </h2>
          <p
            className="text-center text-base mb-12 max-w-md mx-auto"
            style={{ color: "#8a9a5b" }}
          >
            Based on your responses to a few simple questions.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {stressCategories.map((card) => (
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                key={card.title}
                onClick={() => navigate(card.route)}
                className="cursor-pointer text-center transition-shadow duration-200"
                style={{
                  background: "#ffffff",
                  border: "1px solid #d6dcc4",
                  borderRadius: "20px",
                  padding: "36px 28px",
                  boxShadow: "0 2px 12px rgba(75,83,32,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 32px rgba(75,83,32,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(75,83,32,0.06)";
                }}
              >
                <div className="text-5xl mb-5">{card.emoji}</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6b7560" }}
                >
                  {card.description}
                </p>
                <div
                  className="mt-5 text-xs font-semibold tracking-wide"
                  style={{ color: "#8a9a5b" }}
                >
                  Explore →
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3 — Feature Tools */}
        <div className="text-center">
          <p
            className="text-sm mb-8"
            style={{ color: "#8a9a5b" }}
          >
            Powerful features for better mental wellness.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {wellnessTools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => navigate(tool.route)}
                className="transition-all duration-200 active:scale-95"
                style={{
                  padding: "12px 28px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #4b5320 0%, #6b7a30 100%)",
                  color: "#e8ecce",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(75,83,32,0.28)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(75,83,32,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(75,83,32,0.28)";
                }}
              >
                {tool.title}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExplorePage;