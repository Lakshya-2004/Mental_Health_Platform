import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, db } from "@/firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const redirectBasedOnRole = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) { alert("User not registered in Firestore!"); return; }
      const role = userSnap.data().role;
      if (role === "student") navigate("/");
      else if (role === "counselor") navigate("/counselor");
      else alert("Role not assigned. Contact admin.");
    } catch (error) {
      console.error(error);
      alert("Failed to fetch user role.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await redirectBasedOnRole(result.user.uid);
    } catch (err) { console.error(err); alert("Google login failed"); }
    finally { setLoading(false); }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await redirectBasedOnRole(result.user.uid);
    } catch (err) { console.error(err); alert("Invalid credentials"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: "#0f1a12",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Animated background orbs ── */
        .login-bg {
          position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
        }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-1 { width: 600px; height: 600px; background: #5B8C6E; top: -200px; left: -150px; animation-delay: 0s; }
        .orb-2 { width: 400px; height: 400px; background: #7C6FAB; bottom: -100px; right: -100px; animation-delay: -4s; }
        .orb-3 { width: 300px; height: 300px; background: #4A86B8; top: 40%; left: 30%; animation-delay: -8s; }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }

        /* ── Split layout ── */
        .login-left {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          padding: 60px 72px;
          background: rgba(255,255,255,0.015);
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 1;
        }
        .login-right {
          width: 520px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 48px;
          position: relative; z-index: 1;
        }

        /* ── Testimonial cards on left ── */
        .testimonial {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 24px 28px;
          margin-bottom: 16px;
          transition: background .2s;
        }
        .testimonial:hover { background: rgba(255,255,255,0.07); }
        .testimonial-text {
          font-family: 'DM Serif Display', Georgia, serif;
          font-style: italic; font-size: 16px;
          color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 14px;
        }
        .testimonial-author { display: flex; align-items: center; gap: 10px; }
        .avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600;
        }
        .author-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }
        .author-role { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 1px; }

        /* ── Feature pills on left ── */
        .feature-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }
        .feature-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 100px;
          background: rgba(168,213,181,0.10);
          border: 1px solid rgba(168,213,181,0.2);
          font-size: 12.5px; font-weight: 500;
          color: rgba(168,213,181,0.8);
        }
        .feature-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #A8D5B5; }

        /* ── Form card ── */
        .form-card {
          width: 100%; max-width: 420px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 32px;
          padding: 48px 40px 44px;
        }

        /* ── Inputs ── */
        .field-wrap { position: relative; }
        .login-input {
          width: 100%; height: 52px; padding: 0 44px 0 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 15px; color: #fff;
          transition: border-color .18s, background .18s, box-shadow .18s;
          outline: none;
        }
        .login-input:focus {
          border-color: rgba(168,213,181,0.6);
          background: rgba(168,213,181,0.05);
          box-shadow: 0 0 0 3px rgba(168,213,181,0.10);
        }
        .login-input::placeholder { color: rgba(255,255,255,0.22); }
        .input-icon {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.3); cursor: pointer;
          transition: color .15s; font-size: 18px; line-height: 1;
          display: flex; align-items: center;
        }
        .input-icon:hover { color: rgba(255,255,255,0.7); }

        /* ── Buttons ── */
        .btn-primary {
          width: 100%; height: 52px;
          background: linear-gradient(135deg, #5B8C6E 0%, #4A7560 100%);
          color: #fff; font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 15px; font-weight: 600; letter-spacing: .4px;
          border: none; border-radius: 14px; cursor: pointer;
          transition: opacity .18s, transform .1s, box-shadow .18s;
          position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0);
          transition: background .18s;
        }
        .btn-primary:hover::after { background: rgba(255,255,255,0.08); }
        .btn-primary:hover { box-shadow: 0 8px 28px rgba(91,140,110,0.45); }
        .btn-primary:active { transform: scale(.98); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-google {
          width: 100%; height: 52px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.85);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14.5px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background .18s, border-color .18s, box-shadow .18s;
        }
        .btn-google:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        /* ── Progress dots (loading) ── */
        .loading-dots { display: inline-flex; gap: 4px; align-items: center; }
        .loading-dots span {
          width: 5px; height: 5px; border-radius: 50%; background: #fff;
          animation: blink 1s infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: .15s; }
        .loading-dots span:nth-child(3) { animation-delay: .3s; }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        /* ── Divider ── */
        .divider { display: flex; align-items: center; gap: 14px; margin: 20px 0; }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .divider-text { font-size: 12px; color: rgba(255,255,255,0.25); letter-spacing: .5px; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .login-left { display: none; }
          .login-right { width: 100%; padding: 40px 20px; }
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
      `}</style>

      {/* ── Animated background ── */}
      <div className="login-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* ══════════════════════════════════
          LEFT — branding + social proof
      ══════════════════════════════════ */}
      <div className="login-left">
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 64 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#A8D5B5 0%,#5B8C6E 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="#fff" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, fontStyle: "italic", color: "#A8D5B5", letterSpacing: ".3px" }}>Beacon</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px,4vw,54px)", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
          Your mind<br />
          <span style={{ color: "#A8D5B5", fontStyle: "italic" }}>deserves care.</span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 36, maxWidth: 400 }}>
          Join thousands who've found calm, clarity, and connection through Beacon's compassionate tools.
        </p>

        {/* Feature badges */}
        <div className="feature-row">
          {["100% Confidential", "Expert Therapists", "AI-Powered Support", "Free to Join"].map((f) => (
            <div key={f} className="feature-badge">
              <div className="feature-badge-dot" />
              {f}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        {[
          { text: "Beacon helped me find peace during the hardest year of my life.", name: "Priya S.", role: "Student · 3 months with Beacon", initials: "PS", color: "#5B8C6E" },
          { text: "The AI chatbot felt like talking to someone who genuinely understood.", name: "Rohan M.", role: "Graduate · 6 months with Beacon", initials: "RM", color: "#7C6FAB" },
        ].map((t) => (
          <div key={t.name} className="testimonial">
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className="avatar" style={{ background: t.color + "30", color: t.color }}>
                {t.initials}
              </div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, marginTop: 32 }}>
          {[{ num: "10k+", label: "People supported" }, { num: "50+", label: "Expert therapists" }, { num: "98%", label: "Feel improvement" }].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: "#A8D5B5" }}>{num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          RIGHT — login form
      ══════════════════════════════════ */}
      <div className="login-right">
        <motion.div
          className="form-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#A8D5B5 0%,#5B8C6E 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3.5" fill="#fff" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: "#fff", marginBottom: 6 }}>Welcome back</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.42)" }}>Log in to continue your journey</p>
          </div>

          {/* Google button — prominent at top */}
          <button type="button" onClick={handleGoogleLogin} className="btn-google" style={{ marginBottom: 4 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or sign in with email</span>
            <div className="divider-line" />
          </div>

          <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 8 }}>
                Email Address
              </label>
              <div className="field-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="login-input"
                  required
                />
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 7 10-7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 8 }}>
                Password
              </label>
              <div className="field-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="login-input"
                  required
                />
                <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginBottom: 24 }}>
              <a href="#" style={{ fontSize: 12.5, color: "rgba(168,213,181,0.55)", textDecoration: "none", transition: "color .15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A8D5B5")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(168,213,181,0.55)")}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <span className="loading-dots">
                  <span /><span /><span />
                </span>
              ) : "Log In"}
            </button>

          </form>

          {/* Sign up row */}
          <div style={{ marginTop: 28, textAlign: "center", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.32)" }}>New to Beacon?</span>{" "}
            <NavLink to="/signup" style={{ fontSize: 13.5, fontWeight: 600, color: "#A8D5B5", textDecoration: "none" }}>
              Create a free account →
            </NavLink>
          </div>

          {/* Legal */}
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
            By continuing, you agree to our{" "}
            <a href="#" style={{ color: "rgba(168,213,181,0.45)", textDecoration: "none" }}>Terms</a>
            {" "}and{" "}
            <a href="#" style={{ color: "rgba(168,213,181,0.45)", textDecoration: "none" }}>Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}