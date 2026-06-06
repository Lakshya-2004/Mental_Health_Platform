import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles, Moon, Sun, Settings, TrendingUp, Smile, Meh, Frown, BookOpen, Clock, Plus, X, CheckCircle, Brain, Zap, LucideIcon } from 'lucide-react';

/* ─── SHARED PALETTE (matches Diary & MIRA) ─────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Nunito:wght@300;400;500;600&display=swap');
:root{
  --cream:#faf6f0;--warm:#fff9f2;--sage:#7a9e87;--sage-l:#b2cbb9;--sage-p:#e8f0ea;
  --tc:#c47c5a;--tc-l:#dfa98e;--tc-p:#f7ede6;
  --mocha:#6b4f3a;--mocha-l:#9c7b68;--ink:#2d2420;
  --mist:#8a9ba8;--rose:#c9858c;--gold:#c9a84c;--gold-p:#f5efd8;
  --bd:rgba(122,158,135,.2);--shadow:rgba(107,79,58,.08);
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Nunito',sans-serif;color:var(--ink);background:var(--cream)}

/* layout */
.td-wrap{min-height:100vh;background:var(--cream);
  background-image:radial-gradient(ellipse at 15% 10%,rgba(178,203,185,.22) 0%,transparent 50%),
  radial-gradient(ellipse at 85% 90%,rgba(196,124,90,.1) 0%,transparent 50%)}

/* header */
.td-header{background:var(--warm);border-bottom:1px solid var(--bd);
  box-shadow:0 1px 4px var(--shadow);position:sticky;top:0;z-index:40}
.td-header-inner{max-width:1100px;margin:0 auto;padding:.9rem 1.5rem;
  display:flex;align-items:center;justify-content:space-between}
.td-logo{display:flex;align-items:center;gap:.65rem}
.td-logo-icon{width:40px;height:40px;border-radius:12px;
  background:linear-gradient(135deg,var(--sage),var(--tc-l));
  display:flex;align-items:center;justify-content:center}
.td-logo-icon svg{color:#fff}
.td-logo-name{font-family:'Lora',serif;font-size:1.3rem;font-weight:600;color:var(--mocha)}
.td-nav{display:flex;gap:.4rem}
.td-nav-btn{padding:.4rem 1rem;border-radius:50px;border:none;cursor:pointer;
  font-family:'Nunito',sans-serif;font-size:.85rem;font-weight:500;
  background:transparent;color:var(--mocha-l);transition:all .2s}
.td-nav-btn.active{background:var(--sage-p);color:var(--sage)}
.td-nav-btn:hover:not(.active){background:var(--tc-p);color:var(--tc)}

/* main */
.td-main{max-width:1100px;margin:0 auto;padding:2rem 1.5rem}

/* card base */
.td-card{background:var(--warm);border-radius:18px;padding:1.5rem;
  border:1px solid var(--bd);box-shadow:0 2px 16px var(--shadow);position:relative;overflow:hidden}
.td-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(to right,var(--sage),var(--tc-l),var(--gold));opacity:.6;
  border-radius:18px 18px 0 0}

/* welcome banner */
.td-banner{border-radius:18px;padding:2rem;color:#fff;
  background:linear-gradient(135deg,var(--sage) 0%,var(--tc) 60%,var(--gold) 100%);
  box-shadow:0 4px 20px rgba(122,158,135,.3)}
.td-banner h2{font-family:'Lora',serif;font-size:1.8rem;font-weight:600;
  display:flex;align-items:center;gap:.6rem;margin-bottom:.4rem}
.td-banner p{opacity:.9;font-size:1rem}
.td-banner-btn{margin-top:1.2rem;background:var(--warm);color:var(--mocha);
  border:none;padding:.7rem 1.5rem;border-radius:50px;font-family:'Nunito',sans-serif;
  font-weight:600;cursor:pointer;font-size:.95rem;box-shadow:0 2px 10px rgba(107,79,58,.15);
  transition:all .2s}
.td-banner-btn:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(107,79,58,.2)}

/* stat grid */
.td-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.2rem}
.td-stat{background:var(--warm);border-radius:14px;padding:1.2rem;
  border:1px solid var(--bd);box-shadow:0 2px 10px var(--shadow);
  display:flex;align-items:center;gap:1rem}
.td-stat-icon{width:48px;height:48px;border-radius:12px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center}
.td-stat-icon.sage{background:var(--sage-p)} .td-stat-icon.sage svg{color:var(--sage)}
.td-stat-icon.gold{background:var(--gold-p)} .td-stat-icon.gold svg{color:var(--gold)}
.td-stat-icon.tc  {background:var(--tc-p)}   .td-stat-icon.tc svg{color:var(--tc)}
.td-stat-label{font-size:.78rem;color:var(--mocha-l)}
.td-stat-val{font-family:'Lora',serif;font-size:1.6rem;font-weight:600;color:var(--mocha)}

/* mood chart */
.td-mood-bars{display:flex;align-items:flex-end;gap:.4rem;height:140px}
.td-mood-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center}
.td-mood-bar{width:100%;border-radius:6px 6px 0 0;
  background:linear-gradient(to top,var(--sage),var(--tc-l));transition:height .3s}
.td-mood-bar.empty{background:var(--sage-p)}
.td-mood-label{font-size:.68rem;color:var(--mocha-l);margin-top:.35rem}

/* two col */
.td-two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
@media(max-width:640px){.td-two-col{grid-template-columns:1fr}}

/* section head */
.td-section-head{font-family:'Lora',serif;font-size:1.1rem;font-weight:600;color:var(--mocha);
  display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;
  padding-bottom:.65rem;border-bottom:1px dashed var(--bd)}
.td-section-head svg{color:var(--tc);opacity:.8}

/* history items */
.td-history-item{border-left:3px solid var(--sage);padding:.6rem .8rem;
  border-radius:0 8px 8px 0;background:var(--sage-p);margin-bottom:.6rem}
.td-history-item h4{font-weight:600;color:var(--mocha);text-transform:capitalize;font-size:.9rem}
.td-history-item p{font-size:.82rem;color:var(--mocha-l);overflow:hidden;
  text-overflow:ellipsis;white-space:nowrap;margin-top:.15rem}
.td-history-item time{font-size:.72rem;color:var(--mocha-l);opacity:.6;margin-top:.2rem;display:block}

.td-event-item{border-left:3px solid var(--tc);padding:.6rem .8rem;
  border-radius:0 8px 8px 0;background:var(--tc-p);margin-bottom:.6rem}
.td-event-item h4{font-weight:600;color:var(--mocha);font-size:.9rem}
.td-event-item p{font-size:.82rem;color:var(--mocha-l);display:flex;align-items:center;gap:.3rem;margin-top:.2rem}
.td-badge{display:inline-block;padding:.15rem .55rem;border-radius:50px;font-size:.68rem;font-weight:600;margin-top:.3rem}
.td-badge.tc{background:var(--tc-p);color:var(--tc)}
.td-badge.sage{background:var(--sage-p);color:var(--sage)}
.td-badge.gold{background:var(--gold-p);color:#8a6a1f}
.td-badge.mist{background:rgba(138,155,168,.15);color:var(--mist)}

.td-empty{text-align:center;padding:2.5rem 1rem;border:2px dashed var(--bd);
  border-radius:14px;color:var(--mocha-l);font-style:italic;font-family:'Lora',serif}

/* FAB */
.td-fab{position:fixed;bottom:2rem;right:2rem;width:56px;height:56px;border-radius:50%;
  border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,var(--sage),var(--tc));z-index:50;
  box-shadow:0 4px 16px rgba(122,158,135,.4);transition:all .2s}
.td-fab:hover{transform:scale(1.1);box-shadow:0 6px 22px rgba(122,158,135,.5)}
.td-fab svg{color:#fff}

/* modal backdrop */
.td-backdrop{position:fixed;inset:0;background:rgba(45,36,32,.5);
  backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;
  z-index:50;padding:1rem}
.td-modal{background:var(--warm);border-radius:20px;width:100%;max-width:560px;
  box-shadow:0 20px 60px rgba(107,79,58,.2);overflow:hidden;
  animation:modal-in .25s ease}
@keyframes modal-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.td-modal-head{padding:1.5rem 1.8rem;color:#fff;
  background:linear-gradient(135deg,var(--sage) 0%,var(--tc) 100%)}
.td-modal-head h2{font-family:'Lora',serif;font-size:1.35rem;font-weight:600}
.td-modal-head p{opacity:.9;font-size:.88rem;margin-top:.25rem}
.td-modal-head-top{display:flex;justify-content:space-between;align-items:center}
.td-close-btn{background:rgba(255,255,255,.2);border:none;color:#fff;
  width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
.td-close-btn:hover{background:rgba(255,255,255,.35)}

.td-modal-body{padding:1.5rem 1.8rem}

/* emotion grid */
.td-emotion-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1.2rem}
.td-emo-btn{padding:.9rem .5rem;border-radius:12px;border:1.5px solid var(--bd);
  cursor:pointer;background:var(--cream);transition:all .2s;text-align:center}
.td-emo-btn:hover{border-color:var(--sage);background:var(--sage-p)}
.td-emo-btn.active{border-color:var(--tc);background:var(--tc-p)}
.td-emo-icon{width:40px;height:40px;border-radius:10px;margin:0 auto .5rem;
  display:flex;align-items:center;justify-content:center}
.td-emo-label{font-size:.78rem;font-weight:600;color:var(--mocha)}

/* range */
.td-range{width:100%;height:6px;border-radius:6px;appearance:none;outline:none;cursor:pointer;margin:.5rem 0}
.td-range-labels{display:flex;justify-content:space-between;font-size:.78rem;color:var(--mocha-l)}

/* textarea */
.td-textarea{width:100%;border:1.5px solid var(--bd);border-radius:12px;padding:.8rem 1rem;
  font-family:'Lora',serif;font-size:.95rem;color:var(--ink);background:var(--cream);
  resize:none;outline:none;transition:border-color .2s;line-height:1.65}
.td-textarea:focus{border-color:var(--sage);background:#fff}
.td-textarea::placeholder{color:var(--mocha-l);opacity:.5;font-style:italic}

/* buttons */
.td-btn-row{display:flex;gap:.75rem;margin-top:1.2rem}
.td-btn{flex:1;padding:.7rem;border-radius:50px;font-family:'Nunito',sans-serif;
  font-weight:600;font-size:.9rem;cursor:pointer;transition:all .2s;border:none}
.td-btn.primary{background:linear-gradient(135deg,var(--sage),var(--tc));color:#fff;
  box-shadow:0 3px 10px rgba(122,158,135,.3)}
.td-btn.primary:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 5px 14px rgba(122,158,135,.4)}
.td-btn.primary:disabled{opacity:.45;cursor:not-allowed;box-shadow:none}
.td-btn.ghost{background:transparent;border:1.5px solid var(--bd);color:var(--mocha-l)}
.td-btn.ghost:hover{background:var(--sage-p);border-color:var(--sage);color:var(--mocha)}

/* response modal */
.td-response-head{padding:2rem;text-align:center;color:#fff;
  background:linear-gradient(135deg,var(--sage),var(--tc),var(--gold))}
.td-response-anim{width:72px;height:72px;border-radius:50%;
  background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}
.td-response-anim svg{color:#fff}
.td-response-head h2{font-family:'Lora',serif;font-size:1.5rem;font-weight:600}
.td-response-head p{opacity:.9;margin-top:.25rem}

.td-quote{border-left:3px solid var(--tc);padding:.8rem 1rem;
  background:var(--tc-p);border-radius:0 12px 12px 0;margin-bottom:1rem}
.td-quote p{font-family:'Lora',serif;font-style:italic;color:var(--mocha);line-height:1.6}
.td-quote cite{font-size:.78rem;color:var(--mocha-l);margin-top:.4rem;display:block}

.td-affirmation{background:var(--sage-p);border-radius:12px;padding:.9rem 1rem;
  text-align:center;margin-bottom:1rem}
.td-affirmation strong{color:var(--sage);font-size:.82rem;display:block;margin-bottom:.3rem}
.td-affirmation p{color:var(--mocha);font-size:.92rem}

.td-coping-item{display:flex;align-items:flex-start;gap:.6rem;
  background:var(--cream);border-radius:10px;padding:.6rem .8rem;margin-bottom:.5rem}
.td-coping-item svg{color:var(--sage);flex-shrink:0;margin-top:.1rem}
.td-coping-item span{font-size:.88rem;color:var(--mocha)}

/* calendar view */
.td-cal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
.td-cal-header h2{font-family:'Lora',serif;font-size:1.3rem;font-weight:600;color:var(--mocha);
  display:flex;align-items:center;gap:.5rem}
.td-add-btn{display:flex;align-items:center;gap:.4rem;
  background:linear-gradient(135deg,var(--sage),var(--tc));color:#fff;
  border:none;padding:.55rem 1.1rem;border-radius:50px;font-family:'Nunito',sans-serif;
  font-weight:600;font-size:.85rem;cursor:pointer;box-shadow:0 2px 10px rgba(122,158,135,.3);transition:all .2s}
.td-add-btn:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(122,158,135,.4)}

.td-date-group{margin-bottom:1.5rem}
.td-date-label{font-family:'Lora',serif;font-size:1rem;font-weight:500;color:var(--mocha);
  padding-bottom:.5rem;border-bottom:1px dashed var(--bd);margin-bottom:.75rem}
.td-cal-event{display:flex;align-items:center;justify-content:space-between;
  background:var(--cream);border-radius:12px;padding:.8rem 1rem;margin-bottom:.5rem;
  border:1px solid var(--bd);transition:box-shadow .2s}
.td-cal-event:hover{box-shadow:0 3px 12px var(--shadow)}
.td-cal-event-info{display:flex;align-items:flex-start;gap:.75rem}
.td-cal-event-info svg{color:var(--mist);flex-shrink:0;margin-top:.1rem}
.td-cal-event h4{font-weight:600;color:var(--mocha);font-size:.9rem}
.td-cal-event p{font-size:.8rem;color:var(--mocha-l);margin-top:.2rem;display:flex;align-items:center;gap:.5rem}
.td-cal-event .prompts{font-size:.7rem;color:var(--mocha-l);opacity:.6;margin-top:.2rem}
.td-del-btn{background:none;border:none;color:var(--tc-l);cursor:pointer;
  padding:.3rem;border-radius:6px;transition:all .2s;opacity:.6}
.td-del-btn:hover{background:var(--tc-p);color:var(--tc);opacity:1}

/* event modal form */
.td-form-group{margin-bottom:1rem}
.td-form-group label{display:block;font-size:.82rem;font-weight:600;color:var(--mocha);margin-bottom:.35rem}
.td-input{width:100%;padding:.65rem .9rem;border:1.5px solid var(--bd);border-radius:10px;
  font-family:'Nunito',sans-serif;font-size:.9rem;color:var(--ink);background:var(--cream);
  outline:none;transition:border-color .2s}
.td-input:focus{border-color:var(--sage);background:#fff}
.td-two-inputs{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.td-checkbox-label{display:flex;align-items:center;gap:.5rem;
  font-size:.85rem;color:var(--mocha-l);cursor:pointer;padding:.3rem 0}
.td-checkbox-label input{accent-color:var(--sage);width:15px;height:15px}
`;

/* ─── DATA ───────────────────────────────────────────────────────────── */
interface Quote { text: string; author: string; }
interface AIResponse { quote: Quote; affirmation: string; copingTips: string[]; animation: 'celebrate'|'breathe'|'pulse'|'sparkle'; }
interface DetoxEntry { id:number; emotion:EmotionCategory|''; intensity:number; thought:string; category:EmotionCategory; triggers:string[]; timestamp:string; response:AIResponse; }
interface MoodData { date:string; mood:number; }
interface CalendarEvent { id:number; title:string; date:string; time:string; type:string; promptSettings:{before:boolean;after:boolean}; promptShown?:boolean; postPromptShown?:boolean; }
type EmotionCategory = 'happy'|'academic-stress'|'anxiety'|'overwhelmed'|'tired'|'general';
interface EmotionOption { name:EmotionCategory|'general'; icon:LucideIcon; label:string; color:string; }
interface ThoughtInput { emotion:EmotionCategory|''; intensity:number; thought:string; }
interface AnalysisResult { category:EmotionCategory; intensity:number; triggers:string[]; timestamp:string; }

const quotesDB: Record<EmotionCategory|'general', Quote[]> = {
  happy:[{text:"Your joy is contagious! Keep spreading that positive energy.",author:"Thought Detox"},{text:"Happiness is not a destination, it's a way of life.",author:"Unknown"}],
  'academic-stress':[{text:"Your worth is not measured by your grades. You are enough.",author:"Unknown"},{text:"One test doesn't define your future. Breathe, reset, try again.",author:"Thought Detox"}],
  anxiety:[{text:"This feeling is temporary. You are safe, you are strong.",author:"Unknown"},{text:"Breathe in courage, breathe out fear.",author:"Thought Detox"}],
  overwhelmed:[{text:"You don't have to do everything today. Just the next small step.",author:"Thought Detox"},{text:"It's okay to rest. Productivity isn't your only value.",author:"Unknown"}],
  tired:[{text:"Rest is not a reward — it's a necessity. Honor what your body needs.",author:"Unknown"},{text:"You're not falling behind. You're recharging.",author:"Thought Detox"}],
  general:[{text:"You are worthy of kindness, especially from yourself.",author:"Unknown"},{text:"Every moment is a fresh beginning.",author:"T.S. Eliot"}],
};
const copingDB: Record<EmotionCategory|'general', string[]> = {
  happy:["Share your joy with someone you care about","Write down what made you happy today","Do something kind for someone else"],
  'academic-stress':["Take a 5-minute break and stretch","Write 3 things you've already accomplished","Study in 25-minute intervals with breaks"],
  anxiety:["Box breathing: 4s in, 4 hold, 4 out, 4 hold","Name 5 things you can see right now","Journal your thoughts for 5 minutes"],
  overwhelmed:["Prioritize just 3 tasks","Set a timer for 10 min and tackle one thing","Say no to something non-essential"],
  tired:["Take a 20-minute power nap","Drink water and have a healthy snack","Gentle 5-minute yoga stretch"],
  general:["List 3 things you're grateful for","Do something creative for 10 minutes","Spend 5 minutes near a window or outside"],
};

const analyzeThought = (text:string, intensity:number, sel:EmotionCategory|''): AnalysisResult => {
  const l = text.toLowerCase();
  const kw = {happy:['happy','joy','excited','great','wonderful','amazing'],
    'academic-stress':['exam','test','assignment','deadline','grade','homework'],
    anxiety:['worried','nervous','scared','panic','anxious'],
    overwhelmed:['too much','overwhelmed','everything','all at once'],
    tired:['tired','exhausted','drained','burnout']};
  let cat:EmotionCategory = (sel as EmotionCategory)||'general';
  let triggers:string[] = [];
  for(const [k,words] of Object.entries(kw)){
    if(words.some(w=>l.includes(w))){ cat=k as EmotionCategory; triggers=words.filter(w=>l.includes(w)); break; }
  }
  return {category:cat, intensity, triggers, timestamp:new Date().toISOString()};
};

/* ─── APP ─────────────────────────────────────────────────────────────── */
const ThoughtDetox: React.FC = () => {
  const [view, setView] = useState<'dashboard'|'calendar'>('dashboard');
  const [showDetox, setShowDetox] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse|null>(null);

  const [history, setHistory] = useState<DetoxEntry[]>(()=>{ try{ const s=localStorage.getItem('tdHistory'); return s?JSON.parse(s):[]; }catch{ return []; } });
  const [events, setEvents] = useState<CalendarEvent[]>(()=>{ try{ const s=localStorage.getItem('tdEvents'); return s?JSON.parse(s):[]; }catch{ return []; } });
  const [moods, setMoods] = useState<MoodData[]>(()=>{ try{ const s=localStorage.getItem('tdMoods'); return s?JSON.parse(s):[]; }catch{ return []; } });

  useEffect(()=>{ localStorage.setItem('tdHistory',JSON.stringify(history)); },[history]);
  useEffect(()=>{ localStorage.setItem('tdEvents',JSON.stringify(events)); },[events]);
  useEffect(()=>{ localStorage.setItem('tdMoods',JSON.stringify(moods)); },[moods]);

  const handleDetoxSubmit = (d:ThoughtInput) => {
    const a = analyzeThought(d.thought, d.intensity, d.emotion);
    const q = quotesDB[a.category]; const quote = q[Math.floor(Math.random()*q.length)];
    const affirmations:Record<string,string> = {
      happy:"Keep this energy alive! You're making the world brighter! 🌟",
      'academic-stress':"You are capable. This challenge is temporary.",
      anxiety:"You are safe. You are in control. This will pass.",
      overwhelmed:"One step at a time. You are stronger than you think.",
      tired:"Rest is productive. You deserve to recharge.",
      general:"You are worthy of love and kindness."
    };
    const anim:(()=>'celebrate'|'breathe'|'pulse'|'sparkle') = ()=>{
      if(a.category==='happy') return 'celebrate';
      if(a.intensity>7) return 'breathe';
      if(a.intensity>4) return 'pulse';
      return 'sparkle';
    };
    const response:AIResponse = { quote, affirmation:affirmations[a.category]||affirmations.general, copingTips:copingDB[a.category].slice(0,3), animation:anim() };
    setAiResponse(response);
    setShowDetox(false); setShowResponse(true);
    const entry:DetoxEntry = { id:Date.now(), ...d, ...a, response };
    setHistory(prev=>[entry,...prev]);
    const today = new Date().toISOString().split('T')[0];
    const score = a.category==='happy' ? d.intensity : 10-d.intensity;
    setMoods(prev=>{ const idx=prev.findIndex(m=>m.date===today); if(idx>=0){const u=[...prev];u[idx]={date:today,mood:score};return u;} return [...prev,{date:today,mood:score}]; });
  };

  return (
    <div className="td-wrap">
      <style>{css}</style>
      <header className="td-header">
        <div className="td-header-inner">
          <div className="td-logo">
            <div className="td-logo-icon"><Brain size={22}/></div>
            <span className="td-logo-name">Thought Detox</span>
          </div>
          <nav className="td-nav">
            <button className={`td-nav-btn${view==='dashboard'?' active':''}`} onClick={()=>setView('dashboard')}>Dashboard</button>
            <button className={`td-nav-btn${view==='calendar'?' active':''}`} onClick={()=>setView('calendar')}>Calendar</button>
          </nav>
        </div>
      </header>

      <main className="td-main">
        {view==='dashboard' && <Dashboard history={history} moods={moods} events={events} onDetox={()=>setShowDetox(true)}/>}
        {view==='calendar' && <CalendarView events={events} onAdd={()=>setShowEvent(true)} onDelete={id=>setEvents(prev=>prev.filter(e=>e.id!==id))}/>}
      </main>

      <button className="td-fab" onClick={()=>setShowDetox(true)}><Heart size={26}/></button>

      {showDetox && <DetoxModal onClose={()=>setShowDetox(false)} onSubmit={handleDetoxSubmit}/>}
      {showResponse && aiResponse && <ResponseModal response={aiResponse} onClose={()=>setShowResponse(false)}/>}
      {showEvent && <EventModal onClose={()=>setShowEvent(false)} onSubmit={e=>{ setEvents(prev=>[...prev,{...e,id:Date.now()}]); setShowEvent(false); }}/>}
    </div>
  );
};

/* ─── DASHBOARD ──────────────────────────────────────────────────────── */
const Dashboard:React.FC<{history:DetoxEntry[];moods:MoodData[];events:CalendarEvent[];onDetox:()=>void}> = ({history,moods,events,onDetox}) => {
  const hr = new Date().getHours();
  const greeting = hr<12?'Good Morning':hr<18?'Good Afternoon':'Good Evening';
  const upcoming = events.filter(e=>new Date(e.date)>=new Date()).sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime()).slice(0,3);
  const last7 = moods.slice(-7);
  const placeholders = 7-last7.length;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
      <div className="td-banner">
        <h2>{hr<12?<Sun size={28}/>:<Moon size={28}/>} {greeting}!</h2>
        <p>How are you feeling today? Let's detox those thoughts together.</p>
        <button className="td-banner-btn" onClick={onDetox}>Start a Detox Session</button>
      </div>

      <div className="td-stats">
        <div className="td-stat"><div className="td-stat-icon sage"><CheckCircle size={22}/></div><div><div className="td-stat-label">Total Sessions</div><div className="td-stat-val">{history.length}</div></div></div>
        <div className="td-stat"><div className="td-stat-icon gold"><TrendingUp size={22}/></div><div><div className="td-stat-label">Day Streak</div><div className="td-stat-val">{Math.min(moods.length,7)}</div></div></div>
        <div className="td-stat"><div className="td-stat-icon tc"><Calendar size={22}/></div><div><div className="td-stat-label">Upcoming Events</div><div className="td-stat-val">{upcoming.length}</div></div></div>
      </div>

      <div className="td-card">
        <div className="td-section-head"><Smile size={18}/> Mood Journey — Last 7 Days</div>
        <div className="td-mood-bars">
          {last7.map((d,i)=>(
            <div key={i} className="td-mood-bar-wrap">
              <div className="td-mood-bar" style={{height:`${d.mood*10}%`}}/>
              <span className="td-mood-label">{new Date(d.date).toLocaleDateString('en-US',{weekday:'short'})}</span>
            </div>
          ))}
          {Array(placeholders).fill(0).map((_,i)=>(
            <div key={`p${i}`} className="td-mood-bar-wrap">
              <div className="td-mood-bar empty" style={{height:'5%'}}/>
              <span className="td-mood-label" style={{opacity:.4}}>—</span>
            </div>
          ))}
        </div>
      </div>

      <div className="td-two-col">
        <div className="td-card">
          <div className="td-section-head"><Sparkles size={18}/> Recent Sessions</div>
          {history.length===0 ? <div className="td-empty">No sessions yet. Start your first one!</div>
            : history.slice(0,3).map(e=>(
              <div key={e.id} className="td-history-item">
                <h4>{e.emotion||e.category}</h4>
                <p>{e.thought||'—'}</p>
                <time>{new Date(e.timestamp).toLocaleDateString()} · {new Date(e.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</time>
              </div>
            ))}
        </div>
        <div className="td-card">
          <div className="td-section-head"><Calendar size={18}/> Upcoming Events</div>
          {upcoming.length===0 ? <div className="td-empty">No events yet. Add one!</div>
            : upcoming.map(e=>(
              <div key={e.id} className="td-event-item">
                <h4>{e.title}</h4>
                <p><Clock size={12}/> {new Date(e.date).toLocaleDateString()} at {e.time}</p>
                <span className={`td-badge ${e.type==='High-Stress'?'tc':e.type==='Self-Care'?'sage':'gold'}`}>{e.type}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

/* ─── DETOX MODAL ────────────────────────────────────────────────────── */
const DetoxModal:React.FC<{onClose:()=>void;onSubmit:(d:ThoughtInput)=>void}> = ({onClose,onSubmit}) => {
  const [step,setStep] = useState(1);
  const [emotion,setEmotion] = useState<EmotionCategory|''>('');
  const [intensity,setIntensity] = useState(5);
  const [thought,setThought] = useState('');

  const emotions:EmotionOption[] = [
    {name:'happy',icon:Smile,label:'Happy',color:'sage'},
    {name:'academic-stress',icon:BookOpen,label:'Academic Stress',color:'tc'},
    {name:'anxiety',icon:Zap,label:'Anxiety',color:'gold'},
    {name:'overwhelmed',icon:TrendingUp,label:'Overwhelmed',color:'tc'},
    {name:'tired',icon:Moon,label:'Tired',color:'mist'},
    {name:'general',icon:Heart,label:'General',color:'sage'},
  ];

  const iconBg:Record<string,string> = {sage:'var(--sage-p)',tc:'var(--tc-p)',gold:'var(--gold-p)',mist:'rgba(138,155,168,.15)'};
  const iconColor:Record<string,string> = {sage:'var(--sage)',tc:'var(--tc)',gold:'var(--gold)',mist:'var(--mist)'};

  return (
    <div className="td-backdrop">
      <div className="td-modal">
        <div className="td-modal-head">
          <div className="td-modal-head-top">
            <h2>Let's Detox Your Thoughts</h2>
            <button className="td-close-btn" onClick={onClose}><X size={18}/></button>
          </div>
          <p>Take a moment for yourself. You deserve it.</p>
        </div>
        <div className="td-modal-body">
          {step===1 && <>
            <div className="td-section-head" style={{marginBottom:'1rem'}}>How are you feeling?</div>
            <div className="td-emotion-grid">
              {emotions.map(e=>{const I=e.icon; return (
                <button key={e.name} className={`td-emo-btn${emotion===e.name?' active':''}`} onClick={()=>setEmotion(e.name)}>
                  <div className="td-emo-icon" style={{background:iconBg[e.color]}}><I size={20} style={{color:iconColor[e.color]}}/></div>
                  <div className="td-emo-label">{e.label}</div>
                </button>
              );})}
            </div>
            <button className="td-btn primary" disabled={!emotion} onClick={()=>setStep(2)}>Continue</button>
          </>}

          {step===2 && <>
            <div className="td-section-head">Intensity: {intensity}/10</div>
            <input type="range" min="1" max="10" value={intensity} onChange={e=>setIntensity(+e.target.value)}
              className="td-range"
              style={{background:`linear-gradient(to right,var(--sage) 0%,var(--tc) ${intensity*10}%,var(--bd) ${intensity*10}%,var(--bd) 100%)`}}/>
            <div className="td-range-labels"><span>Mild</span><span>Intense</span></div>
            <div className="td-btn-row"><button className="td-btn ghost" onClick={()=>setStep(1)}>Back</button><button className="td-btn primary" onClick={()=>setStep(3)}>Continue</button></div>
          </>}

          {step===3 && <>
            <div className="td-section-head">What's on your mind?</div>
            <textarea className="td-textarea" rows={5} value={thought} onChange={e=>setThought(e.target.value)} placeholder="Share your thoughts… this is a safe space."/>
            <p style={{fontSize:'.75rem',color:'var(--mocha-l)',marginTop:'.4rem',fontStyle:'italic'}}>Stored only on your device.</p>
            <div className="td-btn-row"><button className="td-btn ghost" onClick={()=>setStep(2)}>Back</button><button className="td-btn primary" onClick={()=>onSubmit({emotion,intensity,thought})}>Analyze & Detox</button></div>
          </>}
        </div>
      </div>
    </div>
  );
};

/* ─── RESPONSE MODAL ─────────────────────────────────────────────────── */
const ResponseModal:React.FC<{response:AIResponse;onClose:()=>void}> = ({response,onClose}) => {
  const {quote,affirmation,copingTips,animation} = response;
  const icons:Record<string,React.ReactNode> = {celebrate:<Zap size={32}/>,breathe:<Brain size={32}/>,pulse:<Heart size={32}/>,sparkle:<Sparkles size={32}/>};
  const animStyle:Record<string,React.CSSProperties> = {celebrate:{animation:'spin 1s linear infinite'},breathe:{animation:'bounce 1s infinite'},pulse:{animation:'pulse 1s infinite'},sparkle:{animation:'spin 2s linear infinite'}};
  return (
    <div className="td-backdrop">
      <div className="td-modal">
        <div className="td-response-head">
          <div className="td-response-anim" style={animStyle[animation]}>{icons[animation]}</div>
          <h2>Detox Complete!</h2>
          <p>Here is your tailored thought-boost.</p>
        </div>
        <div className="td-modal-body">
          <div className="td-quote">
            <p>"{quote.text}"</p>
            <cite>— {quote.author}</cite>
          </div>
          <div className="td-affirmation">
            <strong>✦ Your Affirmation</strong>
            <p>{affirmation}</p>
          </div>
          <div className="td-section-head"><Settings size={16}/> Actionable Steps</div>
          {copingTips.map((t,i)=>(
            <div key={i} className="td-coping-item"><CheckCircle size={16}/><span>{t}</span></div>
          ))}
          <button className="td-btn ghost" style={{width:'100%',marginTop:'1rem'}} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

/* ─── CALENDAR VIEW ──────────────────────────────────────────────────── */
const CalendarView:React.FC<{events:CalendarEvent[];onAdd:()=>void;onDelete:(id:number)=>void}> = ({events,onAdd,onDelete}) => {
  const grouped = events.reduce<Record<string,CalendarEvent[]>>((acc,e)=>{
    const k = new Date(e.date).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    (acc[k]??=[]).push(e); return acc;
  },{});
  const sorted = Object.keys(grouped).sort((a,b)=>new Date(a).getTime()-new Date(b).getTime());

  return (
    <div className="td-card">
      <div className="td-cal-header">
        <h2><Calendar size={20}/> Wellness Calendar</h2>
        <button className="td-add-btn" onClick={onAdd}><Plus size={16}/> Add Event</button>
      </div>
      {events.length===0 ? <div className="td-empty">No events yet. Plan your week and set self-care reminders!</div>
        : sorted.map(dk=>(
          <div key={dk} className="td-date-group">
            <div className="td-date-label">{dk}</div>
            {grouped[dk].sort((a,b)=>a.time.localeCompare(b.time)).map(e=>(
              <div key={e.id} className="td-cal-event">
                <div className="td-cal-event-info">
                  <Clock size={16}/>
                  <div>
                    <h4>{e.title}</h4>
                    <p>{e.time} <span className={`td-badge ${e.type==='High-Stress'?'tc':e.type==='Self-Care'?'sage':'gold'}`}>{e.type}</span></p>
                    <div className="prompts">{e.promptSettings.before&&<span>Pre-prompt ON · </span>}{e.promptSettings.after&&<span>Post-prompt ON</span>}</div>
                  </div>
                </div>
                <button className="td-del-btn" onClick={()=>onDelete(e.id)}><X size={16}/></button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

/* ─── EVENT MODAL ────────────────────────────────────────────────────── */
interface EventInput { title:string;date:string;time:string;type:string;promptSettings:{before:boolean;after:boolean}; }
const EventModal:React.FC<{onClose:()=>void;onSubmit:(e:EventInput)=>void}> = ({onClose,onSubmit}) => {
  const [title,setTitle] = useState('');
  const [date,setDate] = useState('');
  const [time,setTime] = useState('');
  const [type,setType] = useState('General');
  const [ps,setPs] = useState({before:true,after:true});

  return (
    <div className="td-backdrop">
      <div className="td-modal">
        <div className="td-modal-head">
          <div className="td-modal-head-top">
            <h2>Schedule a Wellness Event</h2>
            <button className="td-close-btn" onClick={onClose}><X size={18}/></button>
          </div>
          <p>Set reminders for important or stressful days.</p>
        </div>
        <div className="td-modal-body">
          <div className="td-form-group">
            <label>Event Title</label>
            <input className="td-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Final Exam, Meditation Time…"/>
          </div>
          <div className="td-two-inputs">
            <div className="td-form-group"><label>Date</label><input type="date" className="td-input" value={date} onChange={e=>setDate(e.target.value)}/></div>
            <div className="td-form-group"><label>Time</label><input type="time" className="td-input" value={time} onChange={e=>setTime(e.target.value)}/></div>
          </div>
          <div className="td-form-group">
            <label>Event Type</label>
            <select className="td-input" value={type} onChange={e=>setType(e.target.value)}>
              <option>General</option><option>High-Stress</option><option>Self-Care</option><option>Social</option>
            </select>
          </div>
          <div className="td-form-group">
            <label>Detox Prompts</label>
            <label className="td-checkbox-label"><input type="checkbox" checked={ps.before} onChange={e=>setPs(p=>({...p,before:e.target.checked}))}/> Remind me the day before</label>
            <label className="td-checkbox-label"><input type="checkbox" checked={ps.after} onChange={e=>setPs(p=>({...p,after:e.target.checked}))}/> Remind me the day after</label>
          </div>
          <div className="td-btn-row">
            <button className="td-btn ghost" onClick={onClose}>Cancel</button>
            <button className="td-btn primary" disabled={!title||!date||!time} onClick={()=>onSubmit({title,date,time,type,promptSettings:ps})}>
              <Plus size={15} style={{display:'inline',marginRight:4}}/> Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtDetox;