// src/pages/About.tsx

import { motion } from "framer-motion";
import BackToHome from "./BackToHome";
import Header from "@/components/Header";

const features = [
  {
    emoji: "🧠",
    title: "Mental Health Assessment",
    description:
      "Gain insights into your emotional well-being through guided assessments and wellness evaluations.",
  },
  {
    emoji: "📝",
    title: "Reflection Diary",
    description:
      "Maintain a personal journal to track emotions, experiences, achievements, and personal growth.",
  },
  {
    emoji: "🌿",
    title: "Thought Detox",
    description:
      "Challenge negative thinking patterns and build healthier mental habits through guided exercises.",
  },
  {
    emoji: "🎵",
    title: "Music Therapy",
    description:
      "Explore calming and uplifting music experiences designed to reduce stress and improve mood.",
  },
  {
    emoji: "🧘",
    title: "Meditation Support",
    description:
      "Access mindfulness and meditation resources that promote focus, relaxation, and emotional balance.",
  },
  {
    emoji: "🤝",
    title: "Safe Space",
    description:
      "Express thoughts freely in a supportive environment focused on positivity, empathy, and self-growth.",
  },
];

const About = () => {
  return (
    <>
      <Header />
      <section
        className="relative min-h-screen overflow-hidden py-20 px-6"
        style={{
          background: "linear-gradient(160deg, #f5f7ee 0%, #eef1e2 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap');
        `}</style>

        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              top: "60px", left: "-40px",
              width: "420px", height: "420px",
              background: "radial-gradient(circle, rgba(138,154,91,0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: "40px", right: "-60px",
              width: "480px", height: "480px",
              background: "radial-gradient(circle, rgba(75,83,32,0.12) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl mx-auto overflow-hidden"
          style={{
            borderRadius: "28px",
            background: "rgba(255,255,255,0.88)",
            border: "1px solid #d6dcc4",
            boxShadow: "0 20px 64px rgba(75,83,32,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Olive top accent bar */}
          <div
            className="h-1 w-full"
            style={{ background: "linear-gradient(90deg, #4b5320 0%, #8a9a5b 50%, #e8ecce 100%)" }}
          />

          {/* Hero */}
          <div className="px-10 py-14 text-center">
            <p
              className="text-xs uppercase tracking-[0.18em] font-semibold mb-4"
              style={{ color: "#8a9a5b" }}
            >
              Beacon · Our Story
            </p>
            <h1
              className="text-5xl md:text-6xl font-semibold tracking-tight"
              style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
            >
              About Beacon
            </h1>
            <div
              className="mx-auto mt-4 mb-6 w-12 h-[2px] rounded-full"
              style={{ background: "#8a9a5b" }}
            />
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#6b7560" }}
            >
              A student-focused mental wellness platform designed to encourage
              emotional resilience, self-reflection, and healthy habits through
              technology-driven support tools.
            </p>
          </div>

          {/* Who We Are */}
          <div
            className="mx-8 mb-10 rounded-2xl p-8"
            style={{ background: "#f7f8f2", border: "1px solid #e4e9d4" }}
          >
            <h2
              className="text-2xl font-semibold mb-5"
              style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
            >
              Who We Are
            </h2>
            <p
              className="leading-8 text-base mb-4"
              style={{ color: "#6b7560" }}
            >
              Beacon was created with the belief that mental health support
              should be accessible, private, and stigma-free. Students often
              face academic pressure, uncertainty, loneliness, and emotional
              challenges that can impact both their personal and professional
              lives.
            </p>
            <p className="leading-8 text-base" style={{ color: "#6b7560" }}>
              Our platform provides a safe and welcoming environment where users
              can reflect on their thoughts, track emotional well-being, access
              self-help tools, and develop healthier coping strategies. We aim
              to empower individuals to better understand themselves and
              prioritize mental wellness every day.
            </p>
          </div>

          {/* What Beacon Offers */}
          <div className="px-8 pb-10">
            <h2
              className="text-2xl font-semibold mb-2"
              style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
            >
              What Beacon Offers
            </h2>
            <p className="text-sm mb-7" style={{ color: "#8a9a5b" }}>
              Six tools, one platform — built around you.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl p-5 transition-shadow duration-200 hover:shadow-md"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d6dcc4",
                    boxShadow: "0 1px 6px rgba(75,83,32,0.05)",
                  }}
                >
                  <div className="text-3xl mb-3">{f.emoji}</div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7560" }}>
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Vision — two columns */}
          <div className="px-8 pb-10 grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Privacy & Trust",
                body: "We understand that mental wellness is deeply personal. Beacon is designed with privacy and trust at its core. We strive to provide a safe digital space where users can explore their emotions and personal growth journey with confidence and comfort.",
              },
              {
                title: "Our Vision",
                body: "Our vision is to create a future where mental wellness support is available to everyone, anytime and anywhere. Through innovation, empathy, and technology, we aim to make emotional well-being a natural part of everyday life.",
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-2xl p-6"
                style={{ background: "#f7f8f2", border: "1px solid #e4e9d4" }}
              >
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
                >
                  {section.title}
                </h2>
                <p className="text-sm leading-7" style={{ color: "#6b7560" }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="px-10 py-10 text-center"
            style={{ borderTop: "1px solid #e4e9d4" }}
          >
            <p className="text-sm mb-3" style={{ color: "#a4ac88" }}>
              Built and crafted with ❤️ for student wellness
            </p>
            <h3
              className="text-2xl font-semibold"
              style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
            >
              Lakshya Ghanghoriya & Yash Patel
            </h3>
            <p className="mt-2 text-sm" style={{ color: "#8a9a5b" }}>
              Creating meaningful technology for mental well-being, emotional
              growth, and a healthier future.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;