import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Globe, Save, Trash2, Zap, BookOpen, Mic, Lock, Home } from 'lucide-react';

interface AnalysisResult {
    moodScore: number;
    language: string;
}

interface DiaryEntry {
    id: number;
    title: string;
    text: string;
    timestamp: string;
    analysis: AnalysisResult;
}

const analyzeEntry = (text: string, selectedLang: string): AnalysisResult => {
    let moodScore = 5;
    const lowerText = text.toLowerCase();

    const positiveWords = ['happy', 'joy', 'feliz', 'joie', 'glücklich', 'gut', 'good', 'amore', 'love', 'खुश', 'अच्छा', 'आनंद', 'मस्त', 'मजा'];
    const negativeWords = ['sad', 'angry', 'triste', 'fâché', 'traurig', 'bad', 'terrible', 'odio', 'hate', 'दुखी', 'गुस्सा', 'बुरा', 'खराब', 'तनाव'];

    let positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    let negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) moodScore = 7 + Math.min(3, positiveCount);
    else if (negativeCount > positiveCount) moodScore = 4 - Math.min(3, negativeCount);

    moodScore = Math.max(1, Math.min(10, moodScore));

    return { moodScore, language: selectedLang || 'en' };
};

const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' }
];

const PASSWORD_KEY = "diary_password";
const AUTH_KEY = "diary_authenticated";

type Props = {
    accountPassword?: string;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Nunito:wght@300;400;500;600&display=swap');

  :root {
    --cream: #faf6f0;
    --warm-white: #fff9f2;
    --sage: #7a9e87;
    --sage-light: #b2cbb9;
    --sage-pale: #e8f0ea;
    --terracotta: #c47c5a;
    --terracotta-light: #dfa98e;
    --terracotta-pale: #f7ede6;
    --mocha: #6b4f3a;
    --mocha-light: #9c7b68;
    --ink: #2d2420;
    --mist: #8a9ba8;
    --dusty-rose: #c9858c;
    --gold: #c9a84c;
    --gold-pale: #f5efd8;
  }

  .mhd-root {
    min-height: 100vh;
    background-color: var(--cream);
    background-image: 
      radial-gradient(ellipse at 20% 10%, rgba(178, 203, 185, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 90%, rgba(196, 124, 90, 0.12) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237a9e87' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    font-family: 'Nunito', sans-serif;
    color: var(--ink);
    padding: 2rem 1rem 4rem;
  }

  .mhd-container {
    max-width: 820px;
    margin: 0 auto;
  }

  /* Header */
  .mhd-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .mhd-header-leaf {
    display: block;
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    animation: gentle-sway 4s ease-in-out infinite;
  }

  @keyframes gentle-sway {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }

  .mhd-title {
    font-family: 'Lora', serif;
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--mocha);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 0.6rem;
  }

  .mhd-subtitle {
    font-size: 0.95rem;
    color: var(--mocha-light);
    font-weight: 300;
    font-style: italic;
    font-family: 'Lora', serif;
  }

  .mhd-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
    color: var(--sage-light);
    font-size: 0.85rem;
    letter-spacing: 0.1em;
  }

  .mhd-divider-line {
    height: 1px;
    width: 60px;
    background: linear-gradient(to right, transparent, var(--sage-light));
  }

  .mhd-divider-line.right {
    background: linear-gradient(to left, transparent, var(--sage-light));
  }

  /* Topbar */
  .mhd-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .mhd-home-btn {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: transparent;
    border: 1.5px solid var(--sage);
    color: var(--sage);
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.04em;
    text-decoration: none;
  }

  .mhd-home-btn:hover {
    background: var(--sage);
    color: white;
  }

  .mhd-lock-btn {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: transparent;
    border: 1.5px solid var(--mocha-light);
    color: var(--mocha-light);
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.04em;
  }

  .mhd-lock-btn:hover {
    background: var(--mocha-light);
    color: white;
  }

  /* Card */
  .mhd-card {
    background: var(--warm-white);
    border-radius: 20px;
    padding: 2rem 2.2rem;
    border: 1px solid rgba(122, 158, 135, 0.2);
    box-shadow: 
      0 1px 3px rgba(107, 79, 58, 0.06),
      0 8px 32px rgba(107, 79, 58, 0.07),
      0 0 0 1px rgba(255, 249, 242, 0.8) inset;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
  }

  .mhd-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--sage), var(--terracotta-light), var(--gold));
    border-radius: 20px 20px 0 0;
    opacity: 0.7;
  }

  .mhd-card-title {
    font-family: 'Lora', serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--mocha);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed rgba(122, 158, 135, 0.3);
  }

  .mhd-card-title svg {
    color: var(--terracotta);
    opacity: 0.8;
  }

  /* Inputs */
  .mhd-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid rgba(122, 158, 135, 0.3);
    border-radius: 12px;
    background: var(--cream);
    color: var(--ink);
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;
  }

  .mhd-input:focus {
    border-color: var(--sage);
    background: white;
    box-shadow: 0 0 0 3px rgba(122, 158, 135, 0.1);
  }

  .mhd-input::placeholder {
    color: var(--mocha-light);
    opacity: 0.5;
    font-style: italic;
  }

  .mhd-textarea {
    width: 100%;
    flex: 1;
    padding: 1rem;
    border: 1.5px solid rgba(122, 158, 135, 0.3);
    border-radius: 12px;
    background: var(--cream);
    color: var(--ink);
    font-family: 'Lora', serif;
    font-size: 1rem;
    line-height: 1.75;
    resize: none;
    transition: all 0.2s ease;
    outline: none;
    min-height: 160px;
    box-sizing: border-box;
  }

  .mhd-textarea:focus {
    border-color: var(--sage);
    background: white;
    box-shadow: 0 0 0 3px rgba(122, 158, 135, 0.1);
  }

  .mhd-textarea::placeholder {
    color: var(--mocha-light);
    opacity: 0.45;
    font-style: italic;
    font-family: 'Lora', serif;
  }

  .mhd-text-row {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.2rem;
  }

  /* Voice button */
  .mhd-voice-btn {
    flex-shrink: 0;
    width: 52px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, var(--sage), #5d8a6e);
    color: white;
    box-shadow: 0 4px 12px rgba(122, 158, 135, 0.35);
  }

  .mhd-voice-btn.listening {
    background: linear-gradient(135deg, var(--dusty-rose), #b56870);
    box-shadow: 0 4px 12px rgba(201, 133, 140, 0.4);
    animation: pulse-glow 1.5s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 4px 12px rgba(201, 133, 140, 0.4); }
    50% { box-shadow: 0 4px 20px rgba(201, 133, 140, 0.7); }
  }

  /* Bottom row */
  .mhd-bottom-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .mhd-lang-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--mocha-light);
    font-size: 0.85rem;
    font-weight: 500;
  }

  .mhd-lang-label svg {
    color: var(--mist);
  }

  .mhd-select {
    padding: 0.45rem 0.9rem;
    border: 1.5px solid rgba(122, 158, 135, 0.35);
    border-radius: 50px;
    background: var(--cream);
    color: var(--mocha);
    font-family: 'Nunito', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    transition: all 0.2s;
  }

  .mhd-select:focus {
    border-color: var(--sage);
    box-shadow: 0 0 0 2px rgba(122, 158, 135, 0.12);
  }

  /* Save button */
  .mhd-save-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--terracotta), #b8694a);
    color: white;
    border: none;
    padding: 0.7rem 1.6rem;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.03em;
    box-shadow: 0 4px 14px rgba(196, 124, 90, 0.35);
    transition: all 0.2s ease;
  }

  .mhd-save-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(196, 124, 90, 0.45);
  }

  .mhd-save-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }

  /* History */
  .mhd-section-head {
    font-family: 'Lora', serif;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--mocha);
    border-bottom: 1px dashed rgba(122, 158, 135, 0.3);
    padding-bottom: 0.75rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
  }

  .mhd-count {
    font-size: 0.8rem;
    color: var(--mocha-light);
    font-family: 'Nunito', sans-serif;
    font-style: italic;
  }

  .mhd-empty {
    text-align: center;
    padding: 3rem 2rem;
    border: 2px dashed rgba(122, 158, 135, 0.25);
    border-radius: 16px;
    background: rgba(232, 240, 234, 0.3);
    color: var(--mocha-light);
  }

  .mhd-empty-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }

  .mhd-empty p {
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 1rem;
    margin: 0;
  }

  .mhd-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  @media (min-width: 640px) {
    .mhd-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Entry card */
  .mhd-entry {
    background: var(--warm-white);
    border-radius: 16px;
    padding: 1.4rem 1.5rem;
    border: 1px solid rgba(122, 158, 135, 0.18);
    box-shadow: 0 2px 12px rgba(107, 79, 58, 0.05);
    transition: all 0.25s ease;
    position: relative;
  }

  .mhd-entry:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(107, 79, 58, 0.1);
    border-color: rgba(196, 124, 90, 0.25);
  }

  .mhd-entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.6rem;
  }

  .mhd-entry-title {
    font-family: 'Lora', serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--mocha);
    line-height: 1.3;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 0.75rem;
  }

  .mhd-delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--terracotta-light);
    opacity: 0.5;
    padding: 0.2rem;
    border-radius: 6px;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .mhd-delete-btn:hover {
    opacity: 1;
    background: var(--terracotta-pale);
  }

  .mhd-entry-text {
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    color: var(--mocha-light);
    line-height: 1.65;
    font-style: italic;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .mhd-entry-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(122, 158, 135, 0.15);
    padding-top: 0.75rem;
    gap: 0.5rem;
  }

  .mhd-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .mhd-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.25rem 0.65rem;
    border-radius: 50px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .mhd-tag-positive { background: rgba(122, 158, 135, 0.15); color: #4a7c5c; }
  .mhd-tag-neutral  { background: var(--gold-pale); color: #8a6a1f; }
  .mhd-tag-negative { background: rgba(196, 124, 90, 0.15); color: var(--terracotta); }

  .mhd-tag-lang { background: rgba(138, 155, 168, 0.15); color: var(--mist); }

  .mhd-entry-date {
    font-size: 0.72rem;
    color: var(--mocha-light);
    opacity: 0.6;
    letter-spacing: 0.02em;
  }

  /* Lock screen */
  .mhd-lock-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--cream);
    background-image: 
      radial-gradient(ellipse at 30% 20%, rgba(178, 203, 185, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(196, 124, 90, 0.15) 0%, transparent 50%);
    padding: 2rem;
    font-family: 'Nunito', sans-serif;
  }

  .mhd-lock-card {
    background: var(--warm-white);
    border-radius: 24px;
    padding: 2.5rem 2.2rem;
    width: 100%;
    max-width: 380px;
    text-align: center;
    border: 1px solid rgba(122, 158, 135, 0.2);
    box-shadow: 0 12px 40px rgba(107, 79, 58, 0.1);
    position: relative;
    overflow: hidden;
  }

  .mhd-lock-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--sage), var(--terracotta-light), var(--gold));
    border-radius: 24px 24px 0 0;
  }

  .mhd-lock-icon {
    font-size: 2.8rem;
    display: block;
    margin-bottom: 0.75rem;
  }

  .mhd-lock-title {
    font-family: 'Lora', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--mocha);
    margin-bottom: 0.35rem;
  }

  .mhd-lock-sub {
    font-size: 0.82rem;
    color: var(--mocha-light);
    font-style: italic;
    margin-bottom: 1.5rem;
    font-family: 'Lora', serif;
  }

  .mhd-lock-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid rgba(122, 158, 135, 0.35);
    border-radius: 12px;
    background: var(--cream);
    color: var(--ink);
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    transition: all 0.2s;
    outline: none;
    text-align: center;
    letter-spacing: 0.05em;
    box-sizing: border-box;
  }

  .mhd-lock-input:focus {
    border-color: var(--sage);
    box-shadow: 0 0 0 3px rgba(122, 158, 135, 0.1);
    background: white;
  }

  .mhd-unlock-btn {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, var(--sage), #5d8a6e);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.04em;
    box-shadow: 0 4px 14px rgba(122, 158, 135, 0.3);
    transition: all 0.2s;
  }

  .mhd-unlock-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(122, 158, 135, 0.4);
  }

  .mhd-lock-hint {
    font-size: 0.76rem;
    color: var(--mocha-light);
    margin-top: 1rem;
    opacity: 0.6;
    font-family: 'Lora', serif;
    font-style: italic;
  }

  /* Affirmation banner */
  .mhd-affirmation {
    background: linear-gradient(135deg, var(--sage-pale), rgba(245, 239, 216, 0.6));
    border: 1px solid rgba(122, 158, 135, 0.2);
    border-radius: 14px;
    padding: 1rem 1.4rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .mhd-affirmation-icon { font-size: 1.4rem; }

  .mhd-affirmation-text {
    font-family: 'Lora', serif;
    font-size: 0.88rem;
    color: var(--mocha);
    font-style: italic;
    line-height: 1.5;
  }
`;

const AFFIRMATIONS = [
    "Your feelings are valid. Writing them down is an act of courage.",
    "Every word you write is a step toward understanding yourself.",
    "This space is yours — safe, private, and judgment-free.",
    "Healing isn't linear. Be gentle with yourself today.",
    "You showed up for yourself today. That matters.",
];

const Diary: React.FC<Props> = ({ accountPassword }) => {
    const [entries, setEntries] = useState<DiaryEntry[]>(() => {
        try {
            const saved = localStorage.getItem('multilingualMoodDiaryEntries');
            return saved ? JSON.parse(saved) as DiaryEntry[] : [];
        } catch { return []; }
    });

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].code);
    const [isListening, setIsListening] = useState(false);
    const [affirmation] = useState(() => AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);

    useEffect(() => {
        localStorage.setItem('multilingualMoodDiaryEntries', JSON.stringify(entries));
    }, [entries]);

    const [passwordInput, setPasswordInput] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem(AUTH_KEY) === "true");

    const savedPasswordFromStorage = typeof window !== "undefined" ? localStorage.getItem(PASSWORD_KEY) : null;
    const savedPassword = accountPassword ?? savedPasswordFromStorage;

    const handleSetPassword = () => {
        if (!newPassword.trim()) return;
        localStorage.setItem(PASSWORD_KEY, newPassword);
        localStorage.setItem(AUTH_KEY, "true");
        setIsAuthenticated(true);
    };

    const handleLogin = () => {
        if (passwordInput === savedPassword) {
            localStorage.setItem(AUTH_KEY, "true");
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        setPasswordInput('');
    };

    const handleVoiceInput = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.lang = selectedLanguage;
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setText(prev => prev.trim() === '' ? transcript : prev + ' ' + transcript);
        };
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        if (isListening) recognition.stop();
        else { try { recognition.start(); } catch (e) {} }
    };

    const handleSaveEntry = () => {
        if (!text.trim()) return;
        const analysis = analyzeEntry(text, selectedLanguage);
        const newEntry: DiaryEntry = {
            id: Date.now(),
            title: title || `Entry ${entries.length + 1}`,
            text,
            timestamp: new Date().toISOString(),
            analysis,
        };
        setEntries([newEntry, ...entries]);
        setTitle('');
        setText('');
    };

    const handleDeleteEntry = (id: number) => setEntries(entries.filter(e => e.id !== id));

    const getMoodTag = (score: number) => {
        if (score >= 7) return { cls: 'mhd-tag-positive', label: `🌿 ${score}/10`, icon: null };
        if (score <= 4) return { cls: 'mhd-tag-negative', label: `🍂 ${score}/10`, icon: null };
        return { cls: 'mhd-tag-neutral', label: `🌾 ${score}/10`, icon: null };
    };

    if (!isAuthenticated) {
        return (
            <>
                <style>{styles}</style>
                <div className="mhd-lock-screen">
                    <div className="mhd-lock-card">
                        <span className="mhd-lock-icon">🌿</span>
                        {!savedPassword ? (
                            <>
                                <h2 className="mhd-lock-title">Create Your Safe Space</h2>
                                <p className="mhd-lock-sub">Set a password to protect your journal</p>
                                <input
                                    type="password"
                                    className="mhd-lock-input"
                                    placeholder="Choose a password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSetPassword()}
                                />
                                <button className="mhd-unlock-btn" onClick={handleSetPassword}>
                                    Begin My Journey
                                </button>
                                <p className="mhd-lock-hint">Stored locally in your browser only.</p>
                            </>
                        ) : (
                            <>
                                <h2 className="mhd-lock-title">Welcome Back</h2>
                                <p className="mhd-lock-sub">Your thoughts are waiting for you</p>
                                <input
                                    type="password"
                                    className="mhd-lock-input"
                                    placeholder="Enter your password"
                                    value={passwordInput}
                                    onChange={e => setPasswordInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                />
                                <button className="mhd-unlock-btn" onClick={handleLogin}>
                                    Open My Journal
                                </button>
                                <p className="mhd-lock-hint">This space belongs to you alone.</p>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{styles}</style>
            <div className="mhd-root">
                <div className="mhd-container">

                    {/* Header */}
                    <header className="mhd-header">
                        <span className="mhd-header-leaf">🌿</span>
                        <h1 className="mhd-title">My Wellness Journal</h1>
                        <p className="mhd-subtitle">A quiet place to tend to your inner world</p>
                        <div className="mhd-divider">
                            <span className="mhd-divider-line" />
                            <span>✦</span>
                            <span className="mhd-divider-line right" />
                        </div>
                    </header>

                    {/* Topbar */}
                    <div className="mhd-topbar">
                        <a href="/" className="mhd-home-btn">
                            <Home size={13} /> Home
                        </a>
                        <button className="mhd-lock-btn" onClick={handleLogout}>
                            <Lock size={13} /> Lock Journal
                        </button>
                    </div>

                    {/* Daily affirmation */}
                    <div className="mhd-affirmation">
                        <span className="mhd-affirmation-icon">☀️</span>
                        <p className="mhd-affirmation-text">{affirmation}</p>
                    </div>

                    {/* New Entry */}
                    <div className="mhd-card">
                        <h2 className="mhd-card-title">
                            <Zap size={18} /> Today's Reflection
                        </h2>

                        <input
                            type="text"
                            className="mhd-input"
                            placeholder="Give this moment a name… (optional)"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <div className="mhd-text-row">
                            <textarea
                                className="mhd-textarea"
                                placeholder="What's on your mind and heart today? This is your safe space…"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                rows={7}
                            />
                            <button
                                onClick={handleVoiceInput}
                                className={`mhd-voice-btn${isListening ? ' listening' : ''}`}
                                title={isListening ? 'Stop listening' : 'Speak your thoughts'}
                            >
                                <Mic size={20} />
                            </button>
                        </div>

                        <div className="mhd-bottom-row">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <label className="mhd-lang-label">
                                    <Globe size={14} /> Language
                                </label>
                                <select
                                    className="mhd-select"
                                    value={selectedLanguage}
                                    onChange={e => setSelectedLanguage(e.target.value)}
                                >
                                    {languageOptions.map(l => (
                                        <option key={l.code} value={l.code}>{l.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="mhd-save-btn"
                                onClick={handleSaveEntry}
                                disabled={!text.trim()}
                            >
                                <Save size={16} /> Save Entry
                            </button>
                        </div>
                    </div>

                    {/* Entry History */}
                    <div>
                        <h2 className="mhd-section-head">
                            Past Reflections
                            <span className="mhd-count">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
                        </h2>

                        {entries.length === 0 ? (
                            <div className="mhd-empty">
                                <span className="mhd-empty-icon">🌱</span>
                                <p>Your journal is a seed, waiting to grow.<br/>Write your first reflection above.</p>
                            </div>
                        ) : (
                            <div className="mhd-grid">
                                {entries.map(entry => {
                                    const moodTag = getMoodTag(entry.analysis.moodScore);
                                    return (
                                        <div key={entry.id} className="mhd-entry">
                                            <div className="mhd-entry-header">
                                                <h3 className="mhd-entry-title">{entry.title}</h3>
                                                <button
                                                    className="mhd-delete-btn"
                                                    onClick={() => handleDeleteEntry(entry.id)}
                                                    title="Remove entry"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                            <p className="mhd-entry-text">{entry.text}</p>
                                            <div className="mhd-entry-footer">
                                                <div className="mhd-tags">
                                                    <span className={`mhd-tag ${moodTag.cls}`}>{moodTag.label}</span>
                                                    <span className="mhd-tag mhd-tag-lang">
                                                        <Globe size={9} />
                                                        {entry.analysis.language.toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="mhd-entry-date">
                                                    {new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    {' · '}
                                                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Diary;