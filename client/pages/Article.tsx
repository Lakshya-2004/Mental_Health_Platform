import Header from "@/components/Header";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

const Article = () => {
  return (
    <>
      <Header />
      <section className="relative min-h-screen overflow-hidden py-16 px-6"
        style={{ background: "linear-gradient(135deg, #f0f2e6 0%, #e8ecce 50%, #eef0e0 100%)" }}
      >

        {/* Ambient olive glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-80 h-80 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(138,154,91,0.18) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[150px]"
            style={{ background: "radial-gradient(circle, rgba(75,83,32,0.12) 0%, transparent 70%)" }}
          />
        </div>

        <motion.div
          {...fadeUp}
          className="relative z-10 max-w-5xl mx-auto rounded-[36px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.60)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow: "0 20px 80px rgba(75,83,32,0.13)",
          }}
        >
          {/* Olive top accent bar */}
          <div
            className="h-1.5"
            style={{ background: "linear-gradient(to right, #8a9a5b, #4b5320, #8a9a5b)" }}
          />

          <div className="p-8 md:p-12">

            {/* Eyebrow */}
            <p
              className="uppercase tracking-[4px] text-center text-sm font-medium"
              style={{ color: "#8a9a5b" }}
            >
              Mental Wellness Article
            </p>

            {/* Headline */}
            <h1
              className="text-4xl md:text-6xl font-bold text-center mt-4 leading-tight"
              style={{ color: "#4b5320" }}
            >
              Mental Health in Today's World
            </h1>

            {/* Sub-headline */}
            <p
              className="text-center mt-6 text-lg"
              style={{ color: "#5e6b3a" }}
            >
              Understanding emotional well-being in a fast-moving digital age.
            </p>

            {/* Divider */}
            <div
              className="mx-auto mt-8 w-16 h-0.5 rounded-full"
              style={{ background: "linear-gradient(to right, transparent, #8a9a5b, transparent)" }}
            />

            {/* Body text */}
            <div
              className="mt-10 space-y-6 text-lg leading-8"
              style={{ color: "#4f5e35" }}
            >
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

            {/* Expert Quotes */}
            <div className="mt-14">
              <h2
                className="text-3xl font-bold mb-8"
                style={{ color: "#4b5320" }}
              >
                What Mental Health Experts Say
              </h2>

              <div className="space-y-5">
                {[
                  {
                    quote:
                      '"Mental health is not a destination, but a process. It is about how you drive, not where you\'re going."',
                    author: "— Dr. Noam Shpancer, Psychologist",
                  },
                  {
                    quote:
                      '"Self-care is not selfish. You cannot serve from an empty vessel."',
                    author: "— Dr. Eleanor Brownn",
                  },
                  {
                    quote:
                      '"Talking about mental health is a sign of strength, not weakness."',
                    author: "— Mental Health Professionals Worldwide",
                  },
                ].map(({ quote, author }, i) => (
                  <div
                    key={i}
                    className="rounded-3xl p-6"
                    style={{
                      background: "rgba(232,236,206,0.45)",
                      border: "1px solid rgba(138,154,91,0.30)",
                    }}
                  >
                    <p className="italic" style={{ color: "#4f5e35" }}>
                      {quote}
                    </p>
                    <p
                      className="mt-4 font-semibold"
                      style={{ color: "#4b5320" }}
                    >
                      {author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Practices */}
            <div className="mt-14">
              <h2
                className="text-3xl font-bold mb-8"
                style={{ color: "#4b5320" }}
              >
                Daily Practices for Better Mental Health
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { emoji: "🌿", text: "Practice mindfulness for 10 minutes daily" },
                  { emoji: "💤", text: "Maintain healthy sleep habits" },
                  { emoji: "🏃", text: "Stay physically active" },
                  { emoji: "📖", text: "Keep a personal journal" },
                  { emoji: "🎵", text: "Listen to calming music" },
                  { emoji: "🤝", text: "Reach out when you need support" },
                ].map(({ emoji, text }, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl text-base font-medium"
                    style={{
                      background: "rgba(255,255,255,0.60)",
                      border: "1px solid rgba(138,154,91,0.20)",
                      color: "#4f5e35",
                    }}
                  >
                    <span className="mr-2">{emoji}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Final Message */}
            <div
              className="mt-16 text-center pt-10"
              style={{ borderTop: "1px solid rgba(138,154,91,0.25)" }}
            >
              <h2
                className="text-3xl font-bold"
                style={{ color: "#4b5320" }}
              >
                Remember
              </h2>

              <p
                className="mt-4 text-xl max-w-3xl mx-auto leading-8"
                style={{ color: "#4f5e35" }}
              >
                Taking care of your mind is just as important as taking care of
                your body. Small positive actions every day can create meaningful
                improvements in emotional well-being and overall quality of life.
              </p>

              {/* Closing olive glow mark */}
              <div
                className="mx-auto mt-8 w-10 h-1 rounded-full"
                style={{ background: "#8a9a5b" }}
              />
            </div>

          </div>
        </motion.div>

      </section>
    </>
  );
};

export default Article;