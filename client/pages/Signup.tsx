import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ── Types ──────────────────────────────────────
type Img = { src: string; ratio: string };

// ── Animations ─────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

const imgFade: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.7, ease: "easeOut" },
  }),
};

// ── Image data ─────────────────────────────────
const row1: Img[] = [
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/d1687c77cac552eab64c4fb076822eb6731b2890?width=450", ratio: "4/3" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/bfca34f3a322e60a0a5c87cca1e9b214806e9562?width=338", ratio: "16/9" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a2c37a723acd151ae574e5ec76ffdcbfc329a1bf?width=412", ratio: "3/2" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/1cc908bb6104215c9ab3b8c07769d1120a491f45?width=438", ratio: "3/2" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/e6b1aef4ed6cfe8f54e6cbd1fd31c845d1c5a499?width=400", ratio: "3/2" },
];
const row2: Img[] = [
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/8b73a26947eddaa97611edc55c3d09a78c3c35f2?width=354", ratio: "4/3" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/f234a7561db77825c7ef17996fcea49eadf52fa9?width=432", ratio: "3/2" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a389986f25bf96997e7377bb8b1c90c9f9d771af?width=338", ratio: "16/9" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/4295fc244013da75f23987cd555dc62ff24bb742?width=400", ratio: "3/2" },
];
const row3: Img[] = [
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a4a4ae603794a848f6cdcfa9481452d95234fdea?width=400", ratio: "3/2" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/4717ac53571d3925daec07823c7b336e0c523ad0?width=432", ratio: "4/3" },
  { src: "https://api.builder.io/api/v1/image/assets/TEMP/b08fd0c396ed2556ed78c4017344871fa14926b8?width=400", ratio: "3/2" },
];

// ── Image row ──────────────────────────────────
function ImageRow({ imgs, rowIdx = 0 }: { imgs: Img[]; rowIdx?: number }) {
  return (
    <div className="flex gap-3 px-4 mt-4">
      {imgs.map((img, i) => (
        <motion.img
          key={i} src={img.src} alt=""
          custom={i + rowIdx}
          variants={imgFade} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="object-cover rounded-3xl flex-shrink-0 h-28 md:h-36 opacity-50"
          style={{ aspectRatio: img.ratio }}
        />
      ))}
    </div>
  );
}

// ── Input component ─────────────────────────────
function Field({
  label, icon, error, ...props
}: { label: string; icon: React.ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#3D6B44] uppercase tracking-wider pl-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7BC47F]">{icon}</span>
        <input
          {...props}
          className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm transition-all duration-200
            bg-white/70 text-gray-800 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#7BC47F]/40 focus:border-[#7BC47F]
            ${error ? "border-red-400 bg-red-50/50" : "border-[#C8E6CA]"}
          `}
        />
      </div>
      {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
    </motion.div>
  );
}

function SelectField({
  label, icon, children, value, onChange, error,
}: { label: string; icon: React.ReactNode; children: React.ReactNode; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; error?: string }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#3D6B44] uppercase tracking-wider pl-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7BC47F]">{icon}</span>
        <select
          value={value} onChange={onChange}
          className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm appearance-none
            bg-white/70 text-gray-800 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#7BC47F]/40 focus:border-[#7BC47F]
            ${error ? "border-red-400" : "border-[#C8E6CA]"}
          `}
        >
          {children}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7BC47F] pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
    </motion.div>
  );
}

// ── Step indicator ─────────────────────────────
function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all duration-300 ${
          i === step ? "w-6 h-2 bg-[#4CAF50]" : i < step ? "w-2 h-2 bg-[#7BC47F]" : "w-2 h-2 bg-[#C8E6CA]"
        }`} />
      ))}
    </div>
  );
}

// ── Utils ──────────────────────────────────────
function generateAnonymousUsername() {
  const animals    = ["Tiger", "Eagle", "Wolf", "Panther", "Falcon", "Lion"];
  const adjectives = ["Silent", "Swift", "Mysterious", "Hidden", "Shadow", "Brave"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}_${Math.floor(100 + Math.random() * 900)}`;
}

// ── Icons (inline SVG) ─────────────────────────
const icons = {
  user:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  age:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  role:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  year:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  branch:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  email:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
  password: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  google:   <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>,
};

// ══════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════
const Signup = () => {
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "", age: "", role: "student",
    year: "", branch: "", email: "", password: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  // ── Validation ────────────────────────────
  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim())   e.name   = "Name is required";
      if (!form.age || +form.age < 10 || +form.age > 100) e.age = "Enter a valid age";
      if (!form.role)          e.role   = "Select a role";
    }
    if (step === 1) {
      if (!form.year)          e.year   = "Select your year";
      if (!form.branch.trim()) e.branch = "Branch is required";
    }
    if (step === 2) {
      if (!form.email.includes("@")) e.email = "Enter a valid email";
      if (form.password.length < 6)  e.password = "Password must be at least 6 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => { setErrors({}); setStep(s => s - 1); };

  // ── Email signup ──────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, "users", user.uid), {
        name: form.name, age: form.age, role: form.role,
        year: form.year, branch: form.branch,
        email: user.email, photoURL: null,
        anonymousUsername: generateAnonymousUsername(),
        createdAt: new Date(),
      });
      window.location.href = "/";
    } catch (err: any) {
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  // ── Google signup ─────────────────────────
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName, email: user.email,
        photoURL: user.photoURL, role: "student",
        anonymousUsername: generateAnonymousUsername(),
        createdAt: new Date(),
      }, { merge: true });
      window.location.href = "/";
    } catch (err: any) {
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  // ── Step content ──────────────────────────
  const steps = [
    // Step 0 — Personal info
    <motion.div key="s0" variants={stagger} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-4">
      <motion.p variants={fadeUp} className="text-sm text-[#5A7D5E] mb-1">Let's start with the basics</motion.p>
      <Field label="Full Name" icon={icons.user} type="text" value={form.name} onChange={set("name")} placeholder="Your full name" error={errors.name} required />
      <Field label="Age" icon={icons.age} type="number" value={form.age} onChange={set("age")} placeholder="e.g. 20" min={10} max={100} error={errors.age} required />
      <SelectField label="Role" icon={icons.role} value={form.role} onChange={set("role")} error={errors.role}>
        <option value="student">Student</option>
        <option value="counselor">Counselor</option>
      </SelectField>
    </motion.div>,

    // Step 1 — Academic info
    <motion.div key="s1" variants={stagger} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-4">
      <motion.p variants={fadeUp} className="text-sm text-[#5A7D5E] mb-1">Tell us about your studies</motion.p>
      <SelectField label="Year of Study" icon={icons.year} value={form.year} onChange={set("year")} error={errors.year}>
        <option value="">Select year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </SelectField>
      <Field label="Branch / Department" icon={icons.branch} type="text" value={form.branch} onChange={set("branch")} placeholder="e.g. Computer Science" error={errors.branch} required />
    </motion.div>,

    // Step 2 — Credentials
    <motion.div key="s2" variants={stagger} initial="hidden" animate="show" exit="exit" className="flex flex-col gap-4">
      <motion.p variants={fadeUp} className="text-sm text-[#5A7D5E] mb-1">Almost there — secure your account</motion.p>
      <Field label="Email" icon={icons.email} type="email" value={form.email} onChange={set("email")} placeholder="you@college.edu" error={errors.email} required />
      <Field label="Password" icon={icons.password} type="password" value={form.password} onChange={set("password")} placeholder="At least 6 characters" error={errors.password} required />

      <motion.div variants={fadeUp} className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-[#4CAF50] hover:bg-[#43A047] disabled:opacity-60
            text-white text-sm font-semibold tracking-wide transition-all duration-200
            shadow-[0_4px_14px_rgba(76,175,80,0.35)] hover:shadow-[0_6px_20px_rgba(76,175,80,0.45)]
            flex items-center justify-center gap-2"
        >
          {loading ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          ) : "Create Account →"}
        </button>
      </motion.div>

      <motion.div variants={fadeUp} className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-[#C8E6CA]" />
        <span className="text-xs text-[#7BC47F] font-medium">or</span>
        <div className="flex-1 h-px bg-[#C8E6CA]" />
      </motion.div>

      <motion.div variants={fadeUp}>
        <button
          type="button" onClick={handleGoogle} disabled={loading}
          className="w-full h-11 rounded-xl border border-[#C8E6CA] bg-white/80 hover:bg-white
            text-gray-700 text-sm font-medium transition-all duration-200
            flex items-center justify-center gap-2.5 shadow-sm hover:shadow"
        >
          {icons.google} Continue with Google
        </button>
      </motion.div>
    </motion.div>,
  ];

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-[#FFFDF7] via-[#F4FAF5] to-[#EAF7EE]">

      {/* ── Background images ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <ImageRow imgs={row1} rowIdx={0} />
        <ImageRow imgs={row2} rowIdx={10} />
        <ImageRow imgs={row3} rowIdx={20} />
      </div>

      {/* ── Overlay ── */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* ── Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#A7D7A9] blur-[130px] opacity-25 z-10 pointer-events-none" />

      {/* ── Form ── */}
      <div className="relative z-20 h-screen flex items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-7 shadow-2xl border border-white/60">

            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7BC47F] to-[#4CAF50] mb-3 shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round"/>
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#2F6B3B] tracking-tight">Join Beacon</h1>
              <p className="text-sm text-[#6B8F6E] mt-1">Your wellness journey starts here</p>
            </div>

            {/* Step dots */}
            <StepDots step={step} total={3} />

            {/* Step label */}
            <p className="text-center text-xs font-semibold text-[#7BC47F] uppercase tracking-widest mb-4">
              Step {step + 1} of 3 — {["Personal Info", "Academic Info", "Your Credentials"][step]}
            </p>

            {/* Steps */}
            <form onSubmit={handleSignup}>
              <AnimatePresence mode="wait">
                {steps[step]}
              </AnimatePresence>

              {/* Navigation */}
              <div className={`flex mt-5 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
                {step > 0 && (
                  <button
                    type="button" onClick={back}
                    className="flex items-center gap-1.5 px-4 h-10 rounded-xl border border-[#C8E6CA]
                      text-sm text-[#4A7A50] font-medium hover:bg-[#F0FAF1] transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    Back
                  </button>
                )}
                {step < 2 && (
                  <button
                    type="button" onClick={next}
                    className="flex items-center gap-1.5 px-5 h-10 rounded-xl bg-[#4CAF50] hover:bg-[#43A047]
                      text-sm text-white font-semibold transition-all shadow-[0_3px_10px_rgba(76,175,80,0.3)]"
                  >
                    Continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                )}
              </div>
            </form>

            {/* Footer link */}
            <p className="text-center text-sm text-[#7A8F7B] mt-5">
              Already have an account?{" "}
              <a href="/login" className="text-[#2F6B3B] font-semibold hover:underline">Sign in</a>
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;