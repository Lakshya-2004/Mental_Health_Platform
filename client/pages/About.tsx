// src/pages/About.tsx

import { motion } from "framer-motion";
import BackToHome from "./BackToHome";
import Header from "@/components/Header";
const About = () => {
  return (<>
    <Header/>
    <section className="relative min-h-screen overflow-hidden bg-[#e8f0e3] py-20 px-6">
     
      {/* Ambient Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            top-20
            left-10
            w-96
            h-96
            rounded-full
            bg-green-300/30
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute
            bottom-10
            right-10
            w-[420px]
            h-[420px]
            rounded-full
            bg-emerald-200/40
            blur-[150px]
            animate-pulse
          "
        />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          rounded-[36px]
          bg-white/55
          backdrop-blur-2xl
          border
          border-white/70
          shadow-[0_20px_80px_rgba(60,90,60,0.12)]
          overflow-hidden
        "
      >
        {/* Shimmer Top Border */}
        <div
          className="
            h-1.5
            w-full
            bg-gradient-to-r
            from-green-400
            via-emerald-500
            to-green-300
          "
        />

        {/* Hero Section */}
        <div className="px-10 py-14 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#294231]">
            About Beacon
          </h1>

          <p className="mt-6 text-xl text-[#4f6657] max-w-3xl mx-auto leading-relaxed">
            A student-focused mental wellness platform designed to encourage
            emotional resilience, self-reflection, and healthy habits through
            technology-driven support tools.
          </p>
        </div>

        {/* Who We Are */}
        <div className="px-10 pb-12">
          <h2 className="text-3xl font-bold text-[#294231] mb-5">
            Who We Are
          </h2>

          <p className="text-[#556b5c] leading-8 text-lg">
            Beacon was created with the belief that mental health support
            should be accessible, private, and stigma-free. Students often face
            academic pressure, uncertainty, loneliness, and emotional
            challenges that can impact both their personal and professional
            lives.
          </p>

          <p className="mt-5 text-[#556b5c] leading-8 text-lg">
            Our platform provides a safe and welcoming environment where users
            can reflect on their thoughts, track emotional well-being, access
            self-help tools, and develop healthier coping strategies. We aim to
            empower individuals to better understand themselves and prioritize
            mental wellness every day.
          </p>
        </div>

        {/* Features */}
        <div className="px-10 pb-12">
          <h2 className="text-3xl font-bold text-[#294231] mb-8">
            What Beacon Offers
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#294231]">
                🧠 Mental Health Assessment
              </h3>
              <p className="mt-3 text-[#556b5c]">
                Gain insights into your emotional well-being through guided
                assessments and wellness evaluations.
              </p>
            </div>

            <div className="bg-white/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#294231]">
                📝 Reflection Diary
              </h3>
              <p className="mt-3 text-[#556b5c]">
                Maintain a personal journal to track emotions, experiences,
                achievements, and personal growth.
              </p>
            </div>

            <div className="bg-white/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#294231]">
                🌿 Thought Detox
              </h3>
              <p className="mt-3 text-[#556b5c]">
                Challenge negative thinking patterns and build healthier mental
                habits through guided exercises.
              </p>
            </div>

            <div className="bg-white/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#294231]">
                🎵 Music Therapy
              </h3>
              <p className="mt-3 text-[#556b5c]">
                Explore calming and uplifting music experiences designed to
                reduce stress and improve mood.
              </p>
            </div>

            <div className="bg-white/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#294231]">
                🧘 Meditation Support
              </h3>
              <p className="mt-3 text-[#556b5c]">
                Access mindfulness and meditation resources that promote focus,
                relaxation, and emotional balance.
              </p>
            </div>

            <div className="bg-white/70 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#294231]">
                🤝 Safe Space
              </h3>
              <p className="mt-3 text-[#556b5c]">
                Express thoughts freely in a supportive environment focused on
                positivity, empathy, and self-growth.
              </p>
            </div>

          </div>
        </div>

        {/* Privacy */}
        <div className="px-10 pb-12">
          <h2 className="text-3xl font-bold text-[#294231] mb-5">
            Privacy & Trust
          </h2>

          <p className="text-[#556b5c] leading-8 text-lg">
            We understand that mental wellness is deeply personal. Beacon is
            designed with privacy and trust at its core. We strive to provide a
            safe digital space where users can explore their emotions and
            personal growth journey with confidence and comfort.
          </p>
        </div>

        {/* Vision */}
        <div className="px-10 pb-12">
          <h2 className="text-3xl font-bold text-[#294231] mb-5">
            Our Vision
          </h2>

          <p className="text-[#556b5c] leading-8 text-lg">
            Our vision is to create a future where mental wellness support is
            available to everyone, anytime and anywhere. Through innovation,
            empathy, and technology, we aim to make emotional well-being a
            natural part of everyday life.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-green-200 px-10 py-10 text-center">
          <p className="text-[#6a7f70] text-lg">
            Built and Crafted with ❤️ for student wellness
          </p>

          <h3 className="mt-4 text-3xl font-bold text-[#294231]">
            Lakshya Ghanghoriya & Yash Patel
          </h3>

          <p className="mt-3 text-[#6a7f70]">
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