import { useState } from "react";
import BackToHome from "./BackToHome";
import Header from "@/components/Header";

const helplines = [
  {
    category: "Crisis & Suicide Prevention",
    icon: "🆘",
    color: "#c0392b",
    paleBg: "#fdf0ee",
    border: "rgba(192,57,43,0.18)",
    items: [
      {
        name: "iCall (India)",
        number: "9152987821",
        hours: "Mon–Sat, 8am–10pm",
        desc: "Free psychological counselling by trained professionals.",
        type: "call",
      },
      {
        name: "Vandrevala Foundation",
        number: "1860-2662-345",
        hours: "24 × 7",
        desc: "Mental health support and crisis intervention across India.",
        type: "call",
      },
      {
        name: "AASRA",
        number: "9820466627",
        hours: "24 × 7",
        desc: "Emotional support for people in crisis or suicidal distress.",
        type: "call",
      },
    ],
  },
  {
    category: "Mental Health Support",
    icon: "🧠",
    color: "#5a8a48",
    paleBg: "#f4f8f1",
    border: "rgba(90,138,72,0.18)",
    items: [
      {
        name: "Snehi",
        number: "044-24640050",
        hours: "24 × 7",
        desc: "Emotional support helpline for distress, anxiety and loneliness.",
        type: "call",
      },
      {
        name: "Fortis Stress Helpline",
        number: "8376804102",
        hours: "24 × 7",
        desc: "Stress, anxiety and trauma support by mental health professionals.",
        type: "call",
      },
      {
        name: "Mann Talks",
        number: "8686139139",
        hours: "Mon–Sat, 9am–9pm",
        desc: "Professional counselling and emotional wellness guidance.",
        type: "call",
      },
    ],
  },
  {
    category: "Child & Youth Support",
    icon: "🌱",
    color: "#7a6a3a",
    paleBg: "#faf6ed",
    border: "rgba(122,106,58,0.18)",
    items: [
      {
        name: "Childline India",
        number: "1098",
        hours: "24 × 7",
        desc: "Emergency outreach for children in distress — free & confidential.",
        type: "call",
      },
      {
        name: "YourDOST",
        number: "yourdost.com",
        hours: "Online 24 × 7",
        desc: "Chat-based counselling platform for students and young adults.",
        type: "web",
      },
    ],
  },
  {
    category: "Women's Helplines",
    icon: "💜",
    color: "#7a4a8a",
    paleBg: "#f8f0fc",
    border: "rgba(122,74,138,0.18)",
    items: [
      {
        name: "National Women Helpline",
        number: "181",
        hours: "24 × 7",
        desc: "Support for women in distress, violence, or mental health crises.",
        type: "call",
      },
      {
        name: "iWill Therapy",
        number: "9aside.com/iwill",
        hours: "Online, book anytime",
        desc: "Online therapy sessions focused on women's mental health.",
        type: "web",
      },
    ],
  },
];

const tips = [
  { icon: "🌬️", title: "Box Breathing", desc: "Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Repeat 4 times to calm your nervous system." },
  { icon: "🖐️", title: "5-4-3-2-1 Grounding", desc: "Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste." },
  { icon: "📓", title: "Journaling", desc: "Write 3 sentences about what you're feeling right now — no editing, just honesty." },
  { icon: "🚶", title: "Walk it Out", desc: "A 10-minute walk outside lowers cortisol and resets your mood significantly." },
  { icon: "💧", title: "Hydrate First", desc: "Drink a full glass of water. Dehydration amplifies anxiety and low mood." },
  { icon: "📵", title: "Screen Break", desc: "Step away from all screens for 15 minutes. Your mind needs white space too." },
];

const HelpCard: React.FC<{ item: typeof helplines[0]["items"][0]; accent: string; paleBg: string; border: string }> = ({
  item, accent, paleBg, border,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: hovered ? paleBg : "#fff",
        border: `1px solid ${hovered ? border.replace("0.18", "0.35") : border}`,
        borderRadius: "14px",
        padding: "18px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 20px rgba(60,100,40,0.10)" : "0 1px 4px rgba(60,100,40,0.06)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon circle */}
      <div style={{
        width: "42px", height: "42px", borderRadius: "50%",
        background: paleBg, border: `1px solid ${border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, fontSize: "1.1rem",
      }}>
        {item.type === "call" ? "📞" : "🌐"}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px" }}>
          <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "#2a3d22" }}>{item.name}</span>
          <span style={{
            fontSize: "0.75rem", color: "#8aaa78",
            background: "#ecf4e7", border: "1px solid rgba(90,138,72,0.14)",
            borderRadius: "6px", padding: "2px 8px", whiteSpace: "nowrap",
          }}>{item.hours}</span>
        </div>
        <p style={{ margin: "4px 0 8px", fontSize: "0.82rem", color: "#5a7248", lineHeight: 1.5 }}>{item.desc}</p>

        {item.type === "call" ? (
          <a
            href={`tel:${item.number.replace(/-/g, "")}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: accent, color: "#fff",
              padding: "6px 14px", borderRadius: "8px",
              fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.04em",
              textDecoration: "none", fontFamily: "monospace",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "opacity 0.15s",
            }}
          >
            {item.number}
          </a>
        ) : (
          <a
            href={`https://${item.number}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              color: accent, fontSize: "0.85rem", fontWeight: 500,
              textDecoration: "underline", textDecorationColor: "rgba(90,138,72,0.30)",
            }}
          >
            {item.number} ↗
          </a>
        )}
      </div>
    </div>
  );
};

const Help = () => {
  const [mounted] = useState(true);

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#e8f0e3",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "60px",
  };

  const blobA: React.CSSProperties = {
    position: "fixed", width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(130,190,100,0.20) 0%, transparent 70%)",
    top: "-140px", left: "-160px", filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
  };
  const blobB: React.CSSProperties = {
    position: "fixed", width: "420px", height: "420px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(176,212,150,0.16) 0%, transparent 70%)",
    bottom: "-100px", right: "-120px", filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
  };

  const heroStyle: React.CSSProperties = {
    position: "relative", zIndex: 1,
    background: "linear-gradient(135deg, #d4eac8 0%, #e8f0e3 100%)",
    borderBottom: "1px solid rgba(90,130,70,0.14)",
    padding: "52px 24px 44px",
    textAlign: "center",
  };

  const heroTagStyle: React.CSSProperties = {
    display: "inline-block",
    background: "#ecf4e7", border: "1px solid rgba(90,138,72,0.22)",
    borderRadius: "20px", padding: "4px 14px",
    fontSize: "0.78rem", fontWeight: 500, color: "#5a8a48",
    letterSpacing: "0.06em", textTransform: "uppercase" as const,
    marginBottom: "16px",
  };

  const heroTitleStyle: React.CSSProperties = {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 700,
    color: "#2a3d22",
    marginBottom: "12px",
    lineHeight: 1.2,
  };

  const heroSubStyle: React.CSSProperties = {
    fontSize: "1rem", fontWeight: 300,
    color: "#5a7248", lineHeight: 1.7,
    maxWidth: "520px", margin: "0 auto",
  };

  const containerStyle: React.CSSProperties = {
    position: "relative", zIndex: 1,
    maxWidth: "860px", margin: "0 auto",
    padding: "40px 20px 0",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Georgia', serif",
    fontSize: "1.25rem", fontWeight: 600,
    color: "#2a3d22", marginBottom: "16px",
    display: "flex", alignItems: "center", gap: "10px",
  };

  const categoryCardStyle: React.CSSProperties = {
    background: "#f4f8f1",
    border: "1px solid rgba(90,130,70,0.13)",
    borderRadius: "20px",
    padding: "28px 28px 24px",
    marginBottom: "24px",
    boxShadow: "0 2px 0 rgba(255,255,255,0.80) inset, 0 4px 18px rgba(60,100,40,0.07)",
  };

  const categoryHeaderStyle = (color: string): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: "10px",
    marginBottom: "18px",
    paddingBottom: "14px",
    borderBottom: "1px solid rgba(90,130,70,0.10)",
  });

  const categoryTitleStyle = (color: string): React.CSSProperties => ({
    fontFamily: "'Georgia', serif",
    fontSize: "1.05rem", fontWeight: 600,
    color: color,
  });

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "12px",
  };

  const tipGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "14px",
    marginTop: "16px",
  };

  const dividerStyle: React.CSSProperties = {
    width: "36px", height: "2px",
    background: "linear-gradient(90deg, #d4eac8, #a8c990)",
    borderRadius: "2px",
    margin: "0 0 32px",
  };

  const alertBoxStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #fff8f0 0%, #fdf4e8 100%)",
    border: "1px solid rgba(180,120,50,0.22)",
    borderLeft: "4px solid #c8834a",
    borderRadius: "14px",
    padding: "20px 24px",
    marginBottom: "32px",
    display: "flex", gap: "14px", alignItems: "flex-start",
  };

  return (
    <>
      <Header/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #a8c990; border-radius: 10px; }
      `}</style>

      <div style={pageStyle}>
        <div style={blobA} />
        <div style={blobB} />

        {/* Back to Home */}
       
        {/* ── Hero ── */}
        <div style={heroStyle}>
          <div style={heroTagStyle}>You Are Not Alone</div>
          <h1 style={heroTitleStyle}>Help & Support Resources</h1>
          <p style={heroSubStyle}>
            If you're struggling, reaching out is a sign of strength — not weakness.
            Below you'll find helplines, grounding techniques, and resources available right now.
          </p>
        </div>

        <div style={containerStyle}>

          {/* ── Emergency alert ── */}
          <div style={alertBoxStyle}>
            <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>⚠️</span>
            <div>
              <p style={{ fontWeight: 600, fontSize: "0.92rem", color: "#7a4a20", marginBottom: "4px" }}>
                If you are in immediate danger
              </p>
              <p style={{ fontSize: "0.85rem", color: "#8a6040", lineHeight: 1.6 }}>
                Call <strong>112</strong> (India Emergency) or go to your nearest hospital emergency room immediately.
                Your life matters — please don't wait.
              </p>
            </div>
          </div>

          {/* ── Helplines ── */}
          <div style={sectionTitleStyle}>
            <span>📞</span> Helpline Numbers
          </div>
          <div style={dividerStyle} />

          {helplines.map((group) => (
            <div key={group.category} style={categoryCardStyle}>
              <div style={categoryHeaderStyle(group.color)}>
                <span style={{ fontSize: "1.3rem" }}>{group.icon}</span>
                <span style={categoryTitleStyle(group.color)}>{group.category}</span>
              </div>
              <div style={gridStyle}>
                {group.items.map((item) => (
                  <HelpCard
                    key={item.name}
                    item={item}
                    accent={group.color}
                    paleBg={group.paleBg}
                    border={group.border}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* ── Grounding tips ── */}
          <div style={{ marginTop: "40px" }}>
            <div style={sectionTitleStyle}>
              <span>🌿</span> Quick Grounding Techniques
            </div>
            <div style={dividerStyle} />

            <div style={tipGridStyle}>
              {tips.map((tip) => (
                <TipCard key={tip.title} tip={tip} />
              ))}
            </div>
          </div>

          {/* ── Reminder footer ── */}
          <div style={{
            marginTop: "48px",
            background: "#f4f8f1",
            border: "1px solid rgba(90,130,70,0.13)",
            borderRadius: "18px",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 2px 0 rgba(255,255,255,0.80) inset",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌱</div>
            <p style={{
              fontFamily: "'Georgia', serif",
              fontSize: "1.15rem", fontWeight: 400,
              fontStyle: "italic", color: "#3a6028",
              lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 12px",
            }}>
              "Healing is not linear. Every small step you take matters."
            </p>
            <p style={{ fontSize: "0.82rem", color: "#8aaa78", letterSpacing: "0.04em" }}>
              SafeSpace · Mental Wellness Platform
            </p>
          </div>

          <div style={{ height: "40px" }} />
        </div>
      </div>
    </>
  );
};

const TipCard: React.FC<{ tip: typeof tips[0] }> = ({ tip }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: hovered ? "#ecf4e7" : "#fff",
        border: `1px solid ${hovered ? "rgba(90,138,72,0.28)" : "rgba(90,138,72,0.13)"}`,
        borderRadius: "16px",
        padding: "20px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 20px rgba(60,100,40,0.10)" : "0 1px 4px rgba(60,100,40,0.05)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{tip.icon}</div>
      <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#2a3d22", marginBottom: "6px" }}>
        {tip.title}
      </p>
      <p style={{ fontSize: "0.82rem", color: "#5a7248", lineHeight: 1.6 }}>{tip.desc}</p>
    </div>
  );
};

export default Help;