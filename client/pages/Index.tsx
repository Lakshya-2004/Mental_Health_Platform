import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "@/components/Header";
import { motion, Variants } from "framer-motion";
import Data from "../components/cardDetails/storage.json";
type Img = { src: string; ratio: string };
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";

const tokens = {
  sage: "#5B8C6E",
  sageMid: "#4A7560",
  sageLight: "#EAF3EC",
  sagePale: "#F4F9F5",
  lavender: "#7C6FAB",
  lavLight: "#F0EEFA",
  sky: "#4A86B8",
  skyLight: "#EBF3FA",
  warm: "#F7F3EE",
  warmDeep: "#EDE6DB",
  sand: "#C8A97E",
  charcoal: "#2D3340",
  muted: "#6B7280",
  white: "#FFFFFF",
  shadow: "rgba(91,140,110,0.10)",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --sage:${tokens.sage};
    --sage-mid:${tokens.sageMid};
    --sage-light:${tokens.sageLight};
    --sage-pale:${tokens.sagePale};
    --lav:${tokens.lavender};
    --lav-light:${tokens.lavLight};
    --sky:${tokens.sky};
    --sky-light:${tokens.skyLight};
    --warm:${tokens.warm};
    --warm-deep:${tokens.warmDeep};
    --sand:${tokens.sand};
    --charcoal:${tokens.charcoal};
    --muted:${tokens.muted};
    --serif:'DM Serif Display',Georgia,serif;
    --sans:'DM Sans',system-ui,sans-serif;
    --radius-sm:10px;
    --radius-md:18px;
    --radius-lg:28px;
    --radius-xl:40px;
    --shadow:0 4px 24px ${tokens.shadow};
    --shadow-lg:0 8px 40px rgba(91,140,110,0.15);
  }
  body{ font-family:var(--sans); color:var(--charcoal); background:#fff; -webkit-font-smoothing:antialiased; }

  /* Feature pill links */
  .feature-pill{
    display:inline-block; padding:12px 28px;
    background:var(--sage-pale); color:var(--sage-mid);
    font-family:var(--sans); font-size:16px; font-weight:500;
    border:1.5px solid rgba(91,140,110,0.2); border-radius:100px;
    text-decoration:none;
    transition:background .2s,border-color .2s,transform .12s,box-shadow .2s;
  }
  .feature-pill:hover{
    background:var(--sage-light); border-color:var(--sage);
    transform:translateY(-2px); box-shadow:0 6px 20px rgba(91,140,110,0.15);
  }

  /* Nav feature buttons */
  .nav-feature-btn{
    padding:14px 28px; background:var(--sage); color:#fff;
    font-family:var(--sans); font-size:16px; font-weight:600;
    border:none; border-radius:var(--radius-md);
    cursor:pointer; text-decoration:none; display:inline-block;
    transition:background .2s,transform .12s,box-shadow .2s;
  }
  .nav-feature-btn:hover{ background:var(--sage-mid); transform:translateY(-2px); box-shadow:0 6px 20px rgba(91,140,110,0.3); }

  /* Stress category cards */
  .stress-card{
    background:#fff; border:1.5px solid rgba(91,140,110,0.2);
    border-radius:var(--radius-lg); padding:32px 24px; text-align:center;
    transition:transform .2s,box-shadow .2s,border-color .2s;
  }
  .stress-card:hover{ transform:translateY(-4px); box-shadow:var(--shadow); border-color:var(--sage); }

  /* Mindful card */
  .mindful-card{
    background:#fff; border:1.5px solid rgba(91,140,110,0.12);
    border-radius:var(--radius-lg); padding:28px;
    display:flex; flex-direction:column; align-items:center; text-align:center;
    transition:transform .2s,box-shadow .2s;
  }
  .mindful-card:hover{ transform:translateY(-6px); box-shadow:var(--shadow-lg); }

  /* Section labels */
  .section-eyebrow{
    font-family:var(--sans); font-size:13px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase;
    color:var(--sage); margin-bottom:12px;
  }

  /* Divider accent */
  .accent-divider{ width:48px; height:3px; background:var(--sage); border-radius:4px; margin:16px auto 0; }

  /* FAQ items */
  .faq-item{
    padding:20px 0; border-bottom:1px solid rgba(45,51,64,0.08);
    font-family:var(--sans); font-size:17px; font-weight:500; font-style:italic;
    color:var(--charcoal); cursor:default;
  }
  .faq-item:hover{ color:var(--sage); }
  .faq-item:last-child{ border-bottom:none; }

  /* Testimonial cards */
  .testimonial-card{ border-radius:var(--radius-lg); padding:36px 32px; }
  .testimonial-card.sage-bg{ background:var(--sage-light); }
  .testimonial-card.lav-bg{ background:var(--lav-light); }
  .testimonial-card.sky-bg{ background:var(--sky-light); }

  /* CTA button */
  .cta-btn{
    display:inline-block; background:var(--charcoal); color:#fff;
    font-family:var(--serif); font-size:22px;
    padding:20px 56px; border-radius:var(--radius-md);
    border:none; cursor:pointer;
    transition:background .2s,transform .12s,box-shadow .2s; letter-spacing:.5px;
  }
  .cta-btn:hover{ background:#1a1f28; transform:translateY(-2px); box-shadow:0 8px 28px rgba(45,51,64,0.2); }

  /* Stats banner */
  .stat-item{ text-align:center; padding:0 24px; }
  .stat-num{ font-family:var(--serif); font-size:42px; color:var(--sage); display:block; }
  .stat-label{ font-family:var(--sans); font-size:14px; color:var(--muted); margin-top:4px; }

  /* Tag chip */
  .chip{
    display:inline-block; padding:6px 14px;
    background:var(--warm-deep); color:var(--charcoal);
    font-size:13px; font-weight:500; border-radius:100px; margin:4px;
  }

  /* Public navbar */
  .public-nav{
    position:fixed; top:0; left:0; right:0; z-index:100;
    display:flex; align-items:center; justify-content:space-between;
    padding:18px 48px;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(16px);
    -webkit-backdrop-filter:blur(16px);
    border-bottom:1px solid rgba(255,255,255,0.1);
  }
  .public-nav-logo{
    font-family:var(--serif); font-size:24px; font-style:italic;
    color:#A8D5B5; text-decoration:none; letter-spacing:.3px;
  }
  .public-nav-links{ display:flex; align-items:center; gap:32px; }
  .public-nav-link{
    font-family:var(--sans); font-size:15px; font-weight:500;
    color:rgba(255,255,255,0.75); text-decoration:none;
    transition:color .15s;
  }
  .public-nav-link:hover{ color:#fff; }
  .public-nav-cta{
    padding:10px 24px;
    background:var(--sage); color:#fff;
    font-family:var(--sans); font-size:14px; font-weight:600;
    border:none; border-radius:100px; cursor:pointer; text-decoration:none;
    transition:background .18s, transform .1s;
  }
  .public-nav-cta:hover{ background:var(--sage-mid); transform:translateY(-1px); }
`;

const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const imageRowFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6 },
  }),
};

type CardProps = { title: string; description: string; image: string; bgColor: string };

function Card({ title, description, image }: CardProps) {
  return (
    <motion.div className="mindful-card" whileHover={{ scale: 1.03 }} variants={fadeSlide}>
      <img src={image} alt={title} style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 20, marginBottom: 20, border: "3px solid rgba(91,140,110,0.12)" }} />
      <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--charcoal)", marginBottom: 10 }}>{title}</h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>{description}</p>
    </motion.div>
  );
}

function ImageRow({ imgs, rowIdx }: { imgs: Img[]; rowIdx?: number }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "0 16px", marginTop: 16 }}>
      {imgs.map((img, i) => (
        <motion.img
          key={i} src={img.src} alt=""
          custom={i + (rowIdx ?? 0)}
          variants={imageRowFade} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ objectFit: "cover", borderRadius: 36, flexShrink: 0, height: "clamp(160px,20vw,340px)", aspectRatio: img.ratio, filter: "saturate(0.85)" }}
        />
      ))}
    </div>
  );
}

// ─── Shared landing page content (visible to ALL users) ───────────────────────
function LandingContent() {
  const [showCards, setShowCards] = useState(false);

  return (
    <>
      {/* ── Stats bar ── */}
      <div style={{ background: "var(--sage-pale)", borderBottom: "1px solid rgba(91,140,110,0.12)", padding: "28px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
          {[{ num: "10k+", label: "People supported" }, { num: "50+", label: "Expert therapists" }, { num: "98%", label: "Feel improvement" }].map(({ num, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Inner peace tagline ── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 40, textAlign: "center" }}>
          <img src="https://api.builder.io/api/v1/image/assets/TEMP/01076e436641f5b8efc63ed0a24537c67d0f1c5c?width=754" alt="Meditation" style={{ width: "clamp(160px,22vw,280px)", borderRadius: 24, objectFit: "cover" }} />
          <div>
            <p className="section-eyebrow">Your guiding light</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,5vw,64px)", lineHeight: 1.15, maxWidth: 520 }}>
              Your inner <span style={{ color: "var(--sage)", fontStyle: "italic" }}>Beacon</span> leads to peace
            </h2>
            <div className="accent-divider" />
          </div>
          <img src="https://api.builder.io/api/v1/image/assets/TEMP/f83b250d5f7765f8fb3d4cd3e6b995b19bf47465?width=588" alt="Meditation" style={{ width: "clamp(140px,18vw,220px)", objectFit: "contain" }} />
        </div>
      </section>

      {/* ── Relieve stress section ── */}
      <section style={{ padding: "72px 32px", background: "var(--warm)", borderRadius: 48, margin: "0 16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ textAlign: "center" }}>Modern solutions</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,48px)", textAlign: "center", color: "var(--charcoal)", marginBottom: 56, maxWidth: 640, marginLeft: "auto", marginRight: "auto", lineHeight: 1.25 }}>
            Relieve mental stress with modern solutions.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 32, alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: 32, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/1a10fc8516bd01697a4e42f2736ea683394320cc?width=788" alt="Video" style={{ width: "100%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="none"><path d="M2 1.5L20 13L2 24.5V1.5Z" fill={tokens.sage} stroke={tokens.sage} strokeWidth="2" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
            <div style={{ background: "#2D3340", borderRadius: 44, border: "6px solid #1a1f28", padding: "40px 24px 32px", maxWidth: 260, margin: "0 auto", boxShadow: "0 16px 48px rgba(45,51,64,0.25)", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 40, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 10 }} />
              <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 24, padding: "28px 20px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "#A8D5B5", marginBottom: 10 }}>Feeling Anxious?</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>Use Beacon for a calmer, more centred experience</p>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/81c0273149afd0e9dd3de35548dfb1cc9afcbb06?width=560" alt="Avatar" style={{ width: "clamp(160px,24vw,260px)", margin: "0 auto", display: "block" }} />
              <div style={{ background: "var(--sage-light)", border: "1.5px solid rgba(91,140,110,0.2)", borderRadius: "24px 24px 24px 4px", padding: "20px 24px", marginTop: 16, display: "inline-block", maxWidth: 280 }}>
                <p style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 500, color: "var(--charcoal)", lineHeight: 1.55 }}>"Everything's in the right place — no worries!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Big tagline ── */}
      <section style={{ padding: "72px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,5.5vw,64px)", color: "var(--sage)", lineHeight: 1.2 }}>
            Mental stress can be eased with <span style={{ fontStyle: "italic" }}>Beacon.</span>
          </h2>
          <div className="accent-divider" />
        </div>
      </section>

      {/* ── Online counselling ── */}
      <section style={{ padding: "72px 32px", background: "var(--lav-light)", borderRadius: 64, margin: "0 16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p className="section-eyebrow">Expert care</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3.5vw,42px)", lineHeight: 1.25, color: "var(--charcoal)", marginBottom: 20 }}>
              Online &amp; Offline Counselling with <span style={{ color: "var(--lavender)" }}>Our Experts</span>
            </h2>
            <p style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 500, color: "var(--muted)", lineHeight: 1.65, marginBottom: 28 }}>
              Talk to them about your concerns — they'll guide you with the best solutions.
            </p>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/4db278c142672d2d40f577b394ab3fd6d19e1e19?width=560" alt="Selfie" style={{ width: "clamp(140px,18vw,200px)" }} />
          </div>
          <div style={{ background: "#fff", border: "1.5px solid rgba(124,111,171,0.15)", borderRadius: 36, overflow: "hidden", maxWidth: 340, margin: "0 auto", boxShadow: "0 8px 32px rgba(124,111,171,0.12)" }}>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/fa851b56b3726627f385834b1d837446cfba4e4a?width=790" alt="Therapist" style={{ width: "100%", display: "block" }} />
            <div style={{ padding: "20px 24px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--charcoal)" }}>Mr John</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--muted)", marginTop: 4 }}>Licensed Counsellor · 5:35 available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mindful Cards ── */}
      <section style={{ padding: "80px 32px", background: "var(--sage-pale)", borderRadius: 64, margin: "8px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p className="section-eyebrow">Self-care toolkit</p>
          <motion.h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4.5vw,52px)", color: "var(--charcoal)", marginBottom: 12 }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeSlide}>
            Explore Our <span style={{ color: "var(--sage)", fontStyle: "italic" }}>Mindful Cards</span>
          </motion.h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: "var(--muted)", marginBottom: 36 }}>Gentle reminders and practices for everyday calm.</p>
          <motion.button onClick={() => setShowCards(!showCards)} style={{ marginBottom: 40, background: "var(--sage)", color: "#fff", fontFamily: "var(--sans)", fontSize: 16, fontWeight: 600, padding: "14px 36px", borderRadius: 100, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(91,140,110,0.3)" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            {showCards ? "Hide Cards" : "Show Mindful Cards"}
          </motion.button>
          {showCards && (
            <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }} initial="hidden" animate="show" variants={fadeSlide}>
              {Data.map((card: any) => (
                <Card key={card.id} title={card.Name} description={card.Details} image={card.img?.trim() !== "" ? card.img : "https://via.placeholder.com/300x200.png?text=Mindful+Card"} bgColor="#fff" />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── For the people ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p className="section-eyebrow">Our tools</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.25, marginBottom: 48, color: "var(--charcoal)" }}>
            <span style={{ color: "var(--sage)", fontStyle: "italic" }}>Beacon </span>— for the people, by the people who care.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 48 }}>
            {[{ name: "Image Therapy", url: "/IB" }, { name: "AI ChatBot", url: "/chatbot" }, { name: "Detox Bin", url: "/Detox" }, { name: "Diary", url: "/diary" }, { name: "Safe Space", url: "/Safespace" }].map((f) => (
              <a key={f.name} href={f.url} className="feature-pill">{f.name}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connect with experts ── */}
      <section style={{ padding: "72px 32px", background: "var(--sage)", borderRadius: 52, margin: "0 16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(234,243,236,0.7)", marginBottom: 16 }}>Guided support</p>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3.5vw,42px)", color: "#fff", marginBottom: 24, lineHeight: 1.25 }}>Connect and talk with experts.</h3>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/83130707be45809816bbc1c02bc9789f130ee317?width=932" alt="Video call" style={{ width: "100%", borderRadius: 40 }} />
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,48px)", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>Here for you, always.</h3>
            <p style={{ fontFamily: "var(--sans)", fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: 28 }}>Find the experts who can provide the answers you need.</p>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/dda4639af4c615fed14e8c8dba859b23921926b4?width=742" alt="Reading" style={{ maxWidth: 340, width: "100%" }} />
          </div>
        </div>
      </section>

      {/* ── Stress categories ── */}
      <section style={{ padding: "80px 32px", background: "var(--warm)", borderRadius: 52, margin: "8px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ textAlign: "center" }}>Understand your needs</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4.5vw,52px)", textAlign: "center", marginBottom: 16, lineHeight: 1.2 }}>Types &amp; Categories of Mental Stress</h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 17, color: "var(--muted)", textAlign: "center", marginBottom: 48 }}>Based on your responses to a few simple questions.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {[{ label: "Mild Mental Stress", icon: "🌤️", desc: "Occasional tension; manageable with small daily habits." }, { label: "Moderate Mental Stress", icon: "🌧️", desc: "Persistent pressure affecting focus and sleep patterns." }, { label: "Severe Mental Stress", icon: "⛈️", desc: "Significant impact on daily life — expert guidance recommended." }].map(({ label, icon, desc }) => (
              <div key={label} className="stress-card">
                <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--sage)", marginBottom: 10, lineHeight: 1.25 }}>{label}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All features ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <p className="section-eyebrow">All features</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4.5vw,52px)", marginBottom: 12, lineHeight: 1.2 }}>Explore Our <span style={{ color: "var(--sage)", fontStyle: "italic" }}>Beacon</span></h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: "var(--muted)", marginBottom: 40 }}>Powerful new features for better mental wellness.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 56 }}>
            {[{ name: "Article", path: "/article" }, { name: "Music", path: "/music" }, { name: "Diary", path: "/diary" }, { name: "SafeSpace", path: "/safespace" }, { name: "Meditation Video", path: "/meditation-video" }].map((tab) => (
              <Link key={tab.name} to={tab.path}><button className="nav-feature-btn">{tab.name}</button></Link>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
            {[{ text: "It's okay to not be okay — what matters is taking the next small step toward healing.", color: "var(--sage-light)", border: "rgba(91,140,110,0.18)" }, { text: "Your mind deserves the same care, rest, and love you give to others.", color: "var(--lav-light)", border: "rgba(124,111,171,0.18)" }, { text: "Talking about your feelings is a sign of strength, not weakness.", color: "var(--sky-light)", border: "rgba(74,134,184,0.18)" }, { text: "Every day is a new chance to breathe, reset, and begin again.", color: "var(--warm-deep)", border: "rgba(200,169,126,0.25)" }].map((q, i) => (
              <div key={i} style={{ background: q.color, border: `1.5px solid ${q.border}`, borderRadius: 24, padding: "28px 22px" }}>
                <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17, color: "var(--charcoal)", lineHeight: 1.6 }}>"{q.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main CTA ── */}
      <section style={{ padding: "96px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p className="section-eyebrow">Start today</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,5vw,60px)", lineHeight: 1.2, marginBottom: 24 }}>
            <span style={{ color: "var(--sage)", fontStyle: "italic" }}>The Beacon</span> — Designed for people, delivered with care.
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 18, color: "var(--muted)", lineHeight: 1.7, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
            From expert-guided therapy to AI-powered sessions, soothing meditations to personalised song recommendations — connect peer-to-peer with experts and much more.
          </p>
          <div className="w-full flex flex-col items-center gap-2">
            <NavLink to="/login"><button className="cta-btn">Get Started</button></NavLink>
            <NavLink to="/about" className="text-sm text-gray-500 underline hover:text-[#2F6B3B] transition-colors">Click to learn more</NavLink>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ textAlign: "center" }}>What people say</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,48px)", textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>People are embracing life with peace, joy, and a radiant smile.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[{ cls: "testimonial-card sage-bg", quote: "A light for the mind — guiding people from darkness to direction.", body: "Your platform stands as a beacon of hope and healing, helping people navigate through emotional storms toward self-awareness and peace.", icon: "🌿" }, { cls: "testimonial-card lav-bg", quote: "Every visit to Beacon is a step toward self-care and inner strength.", body: "It reminds users that mental health matters every day, and even small actions — reading, reflecting, or reaching out — can bring big positive change.", icon: "💜" }, { cls: "testimonial-card sky-bg", quote: "No mind should ever feel alone — because healing begins with connection.", body: "Beacon creates a safe digital space where empathy, understanding, and professional guidance come together to help people rediscover balance and belonging.", icon: "🤝" }].map(({ cls, quote, body, icon }) => (
              <div key={quote} className={cls}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                <p style={{ fontFamily: "var(--serif)", fontSize: 20, fontStyle: "italic", color: "var(--charcoal)", marginBottom: 14, lineHeight: 1.45 }}>"{quote}"</p>
                <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section style={{ padding: "80px 32px", background: "var(--warm)", borderRadius: 52, margin: "8px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 16 }}>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/170837a357b9ace5093327e7655fbd4d8815b6af?width=608" alt="Community" style={{ width: "55%", borderRadius: 36, objectFit: "cover" }} />
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/73c6bf9104c0b4fdff597f9f439e0c8cbfeb88d7?width=432" alt="Community" style={{ width: "38%", borderRadius: 36, objectFit: "cover" }} />
          </div>
          <div>
            <p className="section-eyebrow">Community</p>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3.5vw,42px)", lineHeight: 1.3, marginBottom: 28, color: "var(--charcoal)" }}>People keep coming back to boost their mental wellness — together, we heal and grow.</h3>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/3e73f7a88e3f13ed3453e77f810ecc983de3c61e?width=590" alt="Dancing" style={{ width: 200 }} />
          </div>
        </div>
      </section>

      {/* ── Message ── */}
      <section style={{ padding: "64px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>🕊️</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px,3.5vw,38px)", lineHeight: 1.45, color: "var(--charcoal)" }}>
            A message for those facing the same pain you endure today:{" "}
            <span style={{ color: "var(--sage)", fontStyle: "italic" }}>You are not alone.</span>
          </h2>
        </div>
      </section>

      {/* ── Journey CTA ── */}
      <section style={{ padding: "80px 32px", background: "var(--warm-deep)", borderRadius: 52, margin: "8px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p className="section-eyebrow">Begin today</p>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px,3.5vw,40px)", lineHeight: 1.3, marginBottom: 16 }}>Join us and connect with others who share your journey.</h3>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,50px)", color: "var(--sage)", lineHeight: 1.25, marginBottom: 40 }}>Your journey to happiness begins with The Beacon.</h2>
         
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="section-eyebrow" style={{ textAlign: "center" }}>Got questions?</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,48px)", textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>
            Frequently Asked Questions About <span style={{ color: "var(--sage)", fontStyle: "italic" }}>Beacon</span>
          </h2>
          <div style={{ background: "#fff", border: "1.5px solid rgba(91,140,110,0.15)", borderRadius: 32, padding: "8px 40px 8px", boxShadow: "var(--shadow)" }}>
            {["What is Beacon for?", "What is the objective of Beacon?", "What major steps is Beacon taking?", "What is the cost for Beacon features?", "Will Beacon really help me improve stress?", "Is Beacon really that effective?", "Can I get Beacon features for free?"].map((q) => (
              <div key={q} className="faq-item">{q}</div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48, font: "bolder", fontSize: "larger" }}><h1>Join Us Today</h1></div>
        </div>
      </section>

      {/* ── Final banner ── */}
      <section style={{ padding: 0 }}>
        <img src="./img.png" alt="Final banner" style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "var(--charcoal)", padding: "48px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#A8D5B5", fontStyle: "italic", marginBottom: 8 }}>Beacon</p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>© 2024 Beacon. All rights reserved. · Made with care for every mind.</p>
        </div>
      </footer>
    </>
  );
}

// ─── Public navbar shown to unauthenticated visitors ──────────────────────────
function PublicNav() {
  return (
    <nav className="public-nav">
      <NavLink to="/" className="public-nav-logo">Beacon</NavLink>
      <div className="public-nav-links">
        <a href="/about" className="public-nav-link">About</a>
        <a href="/explore" className="public-nav-link">Features</a>
        <NavLink to="/login" className="public-nav-cta">Log In</NavLink>
      </div>
    </nav>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Index() {
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#e8f0e3]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7BC47F] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#2F6B3B] font-medium text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ width: "100%", overflowX: "hidden", background: "#fff" }}>

        {/* ── NOT logged in: public landing page ── */}
        {!isLoggedIn && (
          <>
            <PublicNav />
            {/* Hero — no login form, just a CTA */}
            <section style={{ position: "relative", minHeight: 680, background: "#fff", paddingTop: 80 }}>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
                <ImageRow imgs={[
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/d1687c77cac552eab64c4fb076822eb6731b2890?width=450", ratio: "4/3" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/bfca34f3a322e60a0a5c87cca1e9b214806e9562?width=338", ratio: "16/9" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a2c37a723acd151ae574e5ec76ffdcbfc329a1bf?width=412", ratio: "3/2" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/1cc908bb6104215c9ab3b8c07769d1120a491f45?width=438", ratio: "3/2" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/e6b1aef4ed6cfe8f54e6cbd1fd31c845d1c5a499?width=400", ratio: "3/2" },
                ]} />
                <ImageRow imgs={[
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/8b73a26947eddaa97611edc55c3d09a78c3c35f2?width=354", ratio: "4/3" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/f234a7561db77825c7ef17996fcea49eadf52fa9?width=432", ratio: "3/2" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/a389986f25bf96997e7377bb8b1c90c9f9d771af?width=338", ratio: "16/9" },
                  { src: "https://api.builder.io/api/v1/image/assets/TEMP/4295fc244013da75f23987cd555dc62ff24bb742?width=400", ratio: "3/2" },
                ]} rowIdx={10} />
              </div>
              <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg,rgba(20,32,22,0.78) 0%,rgba(45,51,64,0.65) 100%)" }} />
              <motion.div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", padding: "100px 32px 80px", textAlign: "center" }} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeSlide}>
                <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(234,243,236,0.7)", marginBottom: 20 }}>Your mental wellness companion</p>
                <h1 style={{ fontFamily: "var(--serif)", color: "#fff", lineHeight: 1.05, fontSize: "clamp(52px,9vw,100px)", marginBottom: 24 }}>
                  Find Your <span style={{ color: "#A8D5B5", fontStyle: "italic", textDecoration: "underline", textDecorationColor: "rgba(168,213,181,0.4)", textUnderlineOffset: 6 }}>Calm.</span>
                </h1>
                <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(17px,2.2vw,22px)", color: "rgba(255,255,255,0.82)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 40px" }}>
                  Caring for your mental health and helping you thrive — with compassionate experts and gentle tools.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 44 }}>
                  {["100% Confidential", "Expert Therapists", "Free to Join"].map((t) => (
                    <span key={t} style={{ background: "rgba(168,213,181,0.18)", border: "1px solid rgba(168,213,181,0.35)", color: "#A8D5B5", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 100 }}>✓ {t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <NavLink to="/Article">
                    <button style={{ padding: "16px 40px", background: tokens.sage, color: "#fff", fontFamily: "var(--sans)", fontSize: 16, fontWeight: 600, border: "none", borderRadius: 100, cursor: "pointer", transition: "background .18s" }}>
                      Get Started — It's Free
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button style={{ padding: "16px 40px", background: "rgba(255,255,255,0.12)", color: "#fff", fontFamily: "var(--sans)", fontSize: 16, fontWeight: 500, border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, cursor: "pointer", backdropFilter: "blur(8px)" }}>
                      Create an Account
                    </button>
                  </NavLink>
                </div>
              </motion.div>
            </section>

            {/* Shared landing content */}
            <LandingContent />
          </>
        )}

        {/* ── Logged in: full authenticated home ── */}
        {isLoggedIn && (
          <>
            <Header/>
            <HeroSection />
            <LandingContent />
          </>
        )}

      </div>
    </>
  );
}