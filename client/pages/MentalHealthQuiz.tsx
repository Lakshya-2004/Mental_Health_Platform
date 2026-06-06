import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble sleeping or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop worrying",
  "Trouble relaxing",
  "Feeling irritable or easily annoyed",
  "Feeling afraid as if something awful might happen",
  "Have you been able to concentrate well?",
  "Have you been feeling confident in yourself?",
  "Have you felt capable of making decisions?",
  "Have you enjoyed your daily activities?",
  "Have you felt unhappy or depressed?",
];

const options = [
  "Not at all",
  "A few days",
  "More than half the days",
  "Nearly every day",
];

const severityConfig = {
  mild: {
    label: "Mild",
    tip: "Try yoga, music, and journaling to support your wellbeing.",
    page: "/mild",
    badgeClass: "badge-mild",
    barClass: "bar-mild",
  },
  moderate: {
    label: "Moderate",
    tip: "Peer support and positive self-talk can make a meaningful difference.",
    page: "/moderate",
    badgeClass: "badge-moderate",
    barClass: "bar-moderate",
  },
  severe: {
    label: "Severe",
    tip: "Speaking with a professional counsellor is strongly recommended.",
    page: "/severe",
    badgeClass: "badge-severe",
    barClass: "bar-severe",
  },
};

export default function MentalHealthQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [result, setResult] = useState<null | { total: number; severity: keyof typeof severityConfig }>(null);
  const [saving, setSaving] = useState(false);

  const progress = ((current + 1) / questions.length) * 100;

  const handleSelect = (index: number) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[current] === -1) return alert("Please select an answer to continue.");
    if (current === questions.length - 1) return handleSubmit();
    setCurrent((c) => c + 1);
  };

  const handlePrev = () => current > 0 && setCurrent((c) => c - 1);

  const handleSubmit = async () => {
    const total = answers.reduce((a, b) => a + b, 0);
    const severity: keyof typeof severityConfig =
      total <= 20 ? "mild" : total <= 25 ? "moderate" : "severe";

    setSaving(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const quizRef = collection(db, "users", user.uid, "mental_health_quiz");
        await addDoc(quizRef, {
          answers,
          score: total,
          severity,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error saving quiz:", error);
      }
    }
    setSaving(false);
    setResult({ total, severity });
  };

  /* ── Result screen ── */
  if (result) {
    const config = severityConfig[result.severity];
    const maxScore = (questions.length - 1) * 3;

    return (
      <div className="quiz-page">
        <div className="result-card">
          <span className={`severity-badge ${config.badgeClass}`}>{config.label}</span>

          <div className="score-display">
            <span className="score-number">{result.total}</span>
            <span className="score-max">/ {maxScore}</span>
          </div>

          <div className="score-bar-track">
            <div
              className={`score-bar-fill ${config.barClass}`}
              style={{ width: `${(result.total / maxScore) * 100}%` }}
            />
          </div>

          <p className="result-message">
            Thank you for completing the self-assessment. This is a guideline only — not a clinical diagnosis.
          </p>

          <div className="result-tip">
            <span className="tip-icon">💡</span>
            <span>{config.tip}</span>
          </div>

          <div className="result-actions">
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = config.page)}
            >
              Explore Services →
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setAnswers(Array(questions.length).fill(-1));
                setCurrent(0);
                setResult(null);
              }}
            >
              Retake Assessment
            </button>
          </div>
        </div>

        <style>{styles}</style>
      </div>
    );
  }

  /* ── Quiz screen ── */
  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <header className="quiz-header">
          <h1 className="quiz-title">Mental Health Self-Assessment</h1>
          <div className="progress-meta">
            <span className="progress-label">
              Question {current + 1} of {questions.length}
            </span>
            <span className="progress-pct">{Math.round(progress)}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <div className="question-body">
          <p className="question-text">{questions[current]}</p>

          <div className="options-list">
            {options.map((opt, i) => (
              <label
                key={i}
                className={`option-item ${answers[current] === i ? "option-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="option"
                  checked={answers[current] === i}
                  onChange={() => handleSelect(i)}
                  className="sr-only"
                />
                <span className="radio-ring">
                  {answers[current] === i && <span className="radio-dot" />}
                </span>
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <footer className="quiz-footer">
          <button
            className="btn btn-ghost"
            onClick={handlePrev}
            disabled={current === 0}
          >
            ← Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={saving}
          >
            {current === questions.length - 1
              ? saving
                ? "Saving…"
                : "Submit"
              : "Continue →"}
          </button>
        </footer>
      </div>

      <style>{styles}</style>
    </div>
  );
}

/* ── Styles ── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

  .quiz-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f5f3ff;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Card shared ── */
  .quiz-card,
  .result-card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 2px 24px rgba(83, 74, 183, 0.10);
    width: 100%;
    max-width: 600px;
    overflow: hidden;
  }

  /* ── Quiz header ── */
  .quiz-header {
    padding: 2rem 2rem 1.25rem;
    border-bottom: 1px solid #f0eefe;
  }

  .quiz-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #1a1233;
    margin: 0 0 1.25rem;
    line-height: 1.3;
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .progress-label {
    font-size: 13px;
    color: #7c6fb0;
    font-weight: 500;
  }

  .progress-pct {
    font-size: 13px;
    color: #534ab7;
    font-weight: 600;
  }

  .progress-track {
    height: 5px;
    background: #ede9ff;
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #7f77dd, #534ab7);
    border-radius: 99px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Question ── */
  .question-body {
    padding: 1.75rem 2rem 1.25rem;
  }

  .question-text {
    font-size: 1.1rem;
    font-weight: 500;
    color: #1a1233;
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }

  /* ── Options ── */
  .options-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1.5px solid #e8e4f8;
    background: #faf9ff;
    cursor: pointer;
    transition: border-color 0.18s, background 0.18s, transform 0.12s;
    user-select: none;
  }

  .option-item:hover {
    border-color: #afa9ec;
    background: #f0eefe;
    transform: translateX(3px);
  }

  .option-item.option-selected {
    border-color: #534ab7;
    background: #eeedfe;
  }

  .radio-ring {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #cbc6f0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.18s;
  }

  .option-selected .radio-ring {
    border-color: #534ab7;
    background: #534ab7;
  }

  .radio-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffffff;
  }

  .option-text {
    font-size: 15px;
    color: #3d3460;
    font-weight: 400;
  }

  .option-selected .option-text {
    color: #3c3489;
    font-weight: 500;
  }

  /* ── Footer ── */
  .quiz-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem 2rem;
    border-top: 1px solid #f0eefe;
    gap: 12px;
  }

  /* ── Buttons ── */
  .btn {
    padding: 11px 24px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.18s, border-color 0.18s, opacity 0.18s, transform 0.1s;
    border: 1.5px solid transparent;
    line-height: 1;
  }

  .btn:active { transform: scale(0.97); }

  .btn-primary {
    background: #534ab7;
    color: #ffffff;
    border-color: #534ab7;
  }

  .btn-primary:hover { background: #3c3489; border-color: #3c3489; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-ghost {
    background: transparent;
    color: #534ab7;
    border-color: #cbc6f0;
  }

  .btn-ghost:hover { background: #f0eefe; border-color: #afa9ec; }
  .btn-ghost:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

  /* ── Result card ── */
  .result-card {
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .severity-badge {
    display: inline-block;
    padding: 5px 18px;
    border-radius: 99px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .badge-mild    { background: #eaf3de; color: #27500a; }
  .badge-moderate { background: #faeeda; color: #633806; }
  .badge-severe  { background: #fcebeb; color: #791f1f; }

  .score-display {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .score-number {
    font-family: 'DM Serif Display', serif;
    font-size: 4rem;
    color: #1a1233;
    line-height: 1;
  }

  .score-max {
    font-size: 1.1rem;
    color: #9990cc;
    font-weight: 400;
  }

  .score-bar-track {
    width: 100%;
    height: 8px;
    background: #ede9ff;
    border-radius: 99px;
    overflow: hidden;
  }

  .score-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bar-mild     { background: linear-gradient(90deg, #97c459, #3b6d11); }
  .bar-moderate { background: linear-gradient(90deg, #ef9f27, #854f0b); }
  .bar-severe   { background: linear-gradient(90deg, #f09595, #a32d2d); }

  .result-message {
    font-size: 14px;
    color: #7c6fb0;
    line-height: 1.6;
    margin: 0;
    max-width: 420px;
  }

  .result-tip {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #faf9ff;
    border: 1.5px solid #e8e4f8;
    border-left: 4px solid #7f77dd;
    border-radius: 12px;
    padding: 14px 16px;
    text-align: left;
    font-size: 14px;
    color: #3d3460;
    line-height: 1.6;
    width: 100%;
    box-sizing: border-box;
  }

  .tip-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  .result-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .result-actions .btn { width: 100%; justify-content: center; }

  /* ── Screen reader only ── */
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0);
    white-space: nowrap; border: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .quiz-header,
    .question-body,
    .quiz-footer { padding-left: 1.25rem; padding-right: 1.25rem; }
    .quiz-title { font-size: 1.25rem; }
    .question-text { font-size: 1rem; }
    .score-number { font-size: 3rem; }
    .result-card { padding: 2rem 1.25rem; }
  }
`;