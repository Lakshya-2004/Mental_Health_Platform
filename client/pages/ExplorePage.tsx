// src/pages/ExplorePage.tsx

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackToHome from "./BackToHome";
const ExplorePage = () => {
  const navigate = useNavigate();

  const assessmentTools = [
    {
      title: "Image Therapy",
      route: "/IB",
    },
    {
      title: "AI ChatBot",
      route: "/chatbot",
    },
    {
      title: "Detox Bin",
      route: "/Detox",
    },
    {
      title: "Diary",
      route: "/diary",
    },
    {
      title: "Safe Space",
      route: "/Safespace",
    },
  ];

  const stressCategories = [
    {
      emoji: "🌤️",
      title: "Mild Mental Stress",
      description:
        "Occasional tension; manageable with small daily habits.",
      route: "/mild",
    },
    {
      emoji: "🌧️",
      title: "Moderate Mental Stress",
      description:
        "Persistent pressure affecting focus and sleep patterns.",
      route: "/moderate",
    },
    {
      emoji: "⛈️",
      title: "Severe Mental Stress",
      description:
        "Significant impact on daily life — expert guidance recommended.",
      route: "/severe",
    },
  ];

  const wellnessTools = [
    {
      title: "Article",
      route: "/article",
    },
    {
      title: "Music",
      route: "/music",
    },
    {
      title: "Diary",
      route: "/diary",
    },
    {
      title: "SafeSpace",
      route: "/Safespace",
    },
    {
      title: "Meditation Video",
      route: "/meditation-video",
    },
  ];

  return (
    <section className="min-h-screen bg-[#e8f0e3] py-16 px-6">
        <BackToHome/>
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-[#2F6B3B]">
            Explore Beacon
          </h1>

          <p className="mt-4 text-lg text-[#5f6f61]">
            Discover wellness tools, mental health resources,
            and guided support designed for students.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-[#2F6B3B] text-center mb-8">
            Wellness Tools
          </h2>

         <div className="flex flex-wrap justify-center gap-5">
  {assessmentTools.map((tool) => (
    <a
      key={tool.title}
      href={tool.route}
      className="
        px-8 py-4
        rounded-full
        bg-white/70
        border border-[#c8d8ca]
        text-[#356047]
        text-lg
        font-medium
        hover:bg-[#7BC47F]
        hover:text-white
        hover:scale-105
        transition-all
        duration-300
        inline-block
        text-center
      "
    >
      {tool.title}
    </a>
  ))}
</div>
        </div>

        {/* Section 2 */}
        <div className="mb-20">
          <p className="text-center uppercase tracking-[4px] text-[#5e8a68] mb-4">
            Understand Your Needs
          </p>

          <h2 className="text-center text-5xl font-bold text-[#303447] mb-4">
            Types & Categories of Mental Stress
          </h2>

          <p className="text-center text-[#65717a] text-lg mb-12">
            Based on your responses to a few simple questions.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {stressCategories.map((card) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={card.title}
                onClick={() => navigate(card.route)}
                className="
                  cursor-pointer
                  bg-white/70
                  border border-[#d6e0d8]
                  rounded-[32px]
                  p-8
                  text-center
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                "
              >
                <div className="text-5xl mb-6">
                  {card.emoji}
                </div>

                <h3 className="text-3xl font-semibold text-[#5c8a63] mb-4">
                  {card.title}
                </h3>

                <p className="text-[#64707a] text-lg">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <p className="text-center text-[#65717a] text-xl mb-10">
            Powerful new features for better mental wellness.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            {wellnessTools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => navigate(tool.route)}
                className="
                  px-10 py-5
                  rounded-[24px]
                  bg-[#5f946d]
                  text-white
                  text-xl
                  font-semibold
                  shadow-md
                  hover:bg-[#4f825d]
                  hover:scale-105
                  transition-all
                  duration-300
                "
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