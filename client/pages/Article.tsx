import Header from "@/components/Header";
import { motion } from "framer-motion";


const Article = () => {
  return (
    <>
    <Header/>
    <section className="relative min-h-screen bg-[#e8f0e3] overflow-hidden py-16 px-6">

      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-green-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          relative
          z-10
          max-w-5xl
          mx-auto
          bg-white/65
          backdrop-blur-xl
          rounded-[36px]
          overflow-hidden
          shadow-[0_20px_80px_rgba(60,90,60,0.12)]
          border border-white/70
        "
      >
        {/* Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-300" />

        <div className="p-8 md:p-12">

          <p className="uppercase tracking-[4px] text-[#5e8a68] text-center">
            Mental Wellness Article
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-center text-[#294231] mt-4">
            Mental Health in Today's World
          </h1>

          <p className="text-center text-[#5c6f61] mt-6 text-lg">
            Understanding emotional well-being in a fast-moving digital age.
          </p>

          {/* Article */}
          <div className="mt-12 space-y-8 text-[#556b5c] leading-8 text-lg">
            <p>
              Mental health has become one of the most important topics of the
              modern era. While technology has connected people across the
              world, it has also introduced new challenges such as stress,
              anxiety, burnout, loneliness, and information overload.
            </p>

            <p>
              Students and young professionals often face pressure from
              academics, careers, social expectations, and personal goals.
              When these pressures accumulate without healthy coping
              mechanisms, they can negatively affect emotional well-being.
            </p>

            <p>
              Good mental health does not mean being happy all the time.
              Rather, it means developing the ability to manage emotions,
              handle setbacks, build meaningful relationships, and maintain
              balance during difficult times.
            </p>
          </div>

          {/* Expert Thoughts */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold text-[#294231] mb-8">
              What Mental Health Experts Say
            </h2>

            <div className="space-y-6">

              <div className="bg-white/70 rounded-3xl p-6 border border-[#d7e8d8]">
                <p className="italic text-[#556b5c]">
                  "Mental health is not a destination, but a process. It is
                  about how you drive, not where you're going."
                </p>

                <p className="mt-4 font-semibold text-[#2F6B3B]">
                  — Dr. Noam Shpancer, Psychologist
                </p>
              </div>

              <div className="bg-white/70 rounded-3xl p-6 border border-[#d7e8d8]">
                <p className="italic text-[#556b5c]">
                  "Self-care is not selfish. You cannot serve from an empty
                  vessel."
                </p>

                <p className="mt-4 font-semibold text-[#2F6B3B]">
                  — Dr. Eleanor Brownn
                </p>
              </div>

              <div className="bg-white/70 rounded-3xl p-6 border border-[#d7e8d8]">
                <p className="italic text-[#556b5c]">
                  "Talking about mental health is a sign of strength, not
                  weakness."
                </p>

                <p className="mt-4 font-semibold text-[#2F6B3B]">
                  — Mental Health Professionals Worldwide
                </p>
              </div>

            </div>
          </div>

          {/* Tips */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold text-[#294231] mb-8">
              Daily Practices for Better Mental Health
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-white/70 p-5 rounded-2xl">
                🌿 Practice mindfulness for 10 minutes daily
              </div>

              <div className="bg-white/70 p-5 rounded-2xl">
                💤 Maintain healthy sleep habits
              </div>

              <div className="bg-white/70 p-5 rounded-2xl">
                🏃 Stay physically active
              </div>

              <div className="bg-white/70 p-5 rounded-2xl">
                📖 Keep a personal journal
              </div>

              <div className="bg-white/70 p-5 rounded-2xl">
                🎵 Listen to calming music
              </div>

              <div className="bg-white/70 p-5 rounded-2xl">
                🤝 Reach out when you need support
              </div>

            </div>
          </div>

          {/* Final Message */}
          <div className="mt-16 text-center border-t border-[#d7e8d8] pt-10">

            <h2 className="text-3xl font-bold text-[#294231]">
              Remember
            </h2>

            <p className="mt-4 text-xl text-[#556b5c] max-w-3xl mx-auto">
              Taking care of your mind is just as important as taking care
              of your body. Small positive actions every day can create
              meaningful improvements in emotional well-being and overall
              quality of life.
            </p>

          </div>

        </div>
      </motion.div>
      
    </section>
    </>
  );
};

export default Article;