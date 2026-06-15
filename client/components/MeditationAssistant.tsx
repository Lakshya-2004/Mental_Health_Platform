import React, { useEffect } from "react";
import Typed from "typed.js";
import Header from "./Header";
import BackToHome from "@/pages/BackToHome";

const API_URL_PY = import.meta.env.VITE_PYTHON_API_URL;
const MeditationAssistant: React.FC = () => {
  useEffect(() => {
    const typed = new Typed(".typing", {
      strings: [
        "Feeling stressed?",
        "Mind feels heavy?",
        "Need peace?",
        "Let's meditate 🧘‍♀️"
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  const detectMood = async () => {
    const input = document.getElementById("moodText") as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return alert("Describe your mood first!");

    try {
        const res = await fetch(`${API_URL_PY}/meditation/detect_mood`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const data = await res.json();
        // ... rest same
    } catch (err) {
        document.getElementById("result")!.innerHTML = 
            `❌ Connection failed. Try again.`;
    }
};

 return (
  <div className="relative min-h-screen bg-[#e8f0e3] overflow-hidden">

    <Header />
   <BackToHome/>
    {/* Background blobs */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-[150px]" />
    </div>

    <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-10">

      <div
        className="
        relative
        w-full
        max-w-3xl
        bg-white/65
        backdrop-blur-2xl
        rounded-[36px]
        overflow-hidden
        border border-white/70
        shadow-[0_20px_80px_rgba(60,90,60,0.12)]
      "
      >

        {/* Shimmer line */}
        <div
          className="
          h-1.5
          bg-gradient-to-r
          from-green-400
          via-emerald-500
          to-green-300
        "
        />

        <div className="p-10">

          <h1 className="text-center text-4xl md:text-5xl font-bold text-[#294231]">
            AI Meditation Assistant
          </h1>

          <p className="text-center text-[#5c6f61] mt-4 text-lg">
            Relax your mind, reduce stress, and discover
            personalized meditation sessions.
          </p>

          <div
            className="
            typing
            text-center
            text-[#5e8a68]
            font-medium
            text-lg
            h-8
            mt-6
          "
          />

          <div className="mt-8">

            <label className="block text-[#294231] font-semibold mb-2">
              Describe your current mood
            </label>

            <input
              id="moodText"
              type="text"
              placeholder="I'm feeling anxious about exams..."
              className="
              w-full
              h-14
              px-5
              rounded-2xl
              border
              border-[#d7e8d8]
              bg-[#f8fcf8]
              focus:outline-none
              focus:ring-2
              focus:ring-[#7BC47F]
              transition
            "
            />

            <button
              onClick={detectMood}
              className="
              w-full
              mt-6
              h-14
              rounded-2xl
              bg-[#7BC47F]
              hover:bg-[#68B56C]
              text-white
              text-lg
              font-semibold
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.02]
            "
            >
              Start Meditation 🌿
            </button>

          </div>

          <div
            id="result"
            className="
            mt-8
            text-center
            text-xl
            font-medium
            text-[#294231]
          "
          />

          <div
            id="meditationPlayer"
            className="
            mt-8
            space-y-4
          "
          />
        </div>
      </div>
    </div>
  </div>
);
};

export default MeditationAssistant;
