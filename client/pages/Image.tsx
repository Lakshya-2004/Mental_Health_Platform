
import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';

// --- API Configuration ---
const API_URL_PY = import.meta.env.VITE_PYTHON_API_URL;
const API_URL = `${API_URL_PY}/api/chat`;
const API_RESET_URL = `${API_URL_PY}/api/reset`;

const INITIAL_SYSTEM_MESSAGE = "You are MIRA 💫, an empathetic emotional chatbot and close friend.";
const INITIAL_GREETING = "Hey there! I'm Mira. You can talk to me about anything. I'm here to listen and maybe share a meme or two! What's on your mind today? 😊";

type MessageRole = 'user' | 'model' | 'system';
type Emotion = 'joy' | 'sadness' | 'anger' | 'fear' | 'disgust' | 'neutral' | 'default';

interface Message {
    role: MessageRole;
    content: string;
    memeUrl?: string | null;
    emotion?: Emotion;
    isHidden?: boolean;
    timestamp: number;
}

interface ImageBotProps {
    onSendMessage: (message: string) => void;
    onResetChat: () => void;
    isLoading: boolean;
    history: Message[];
    error: string | null;
}

interface ChatBubbleProps {
    message: Message;
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Nunito:wght@300;400;500;600&display=swap');

  :root {
    --cream:             #faf6f0;
    --warm-white:        #fff9f2;
    --sage:              #7a9e87;
    --sage-light:        #b2cbb9;
    --sage-pale:         #e8f0ea;
    --terracotta:        #c47c5a;
    --terracotta-light:  #dfa98e;
    --terracotta-pale:   #f7ede6;
    --mocha:             #6b4f3a;
    --mocha-light:       #9c7b68;
    --ink:               #2d2420;
    --mist:              #8a9ba8;
    --dusty-rose:        #c9858c;
    --gold:              #c9a84c;
    --gold-pale:         #f5efd8;
    --border:            rgba(122,158,135,0.2);
    --scrollbar:         #d4c9be;
  }

  .mira-root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--cream);
    background-image:
      radial-gradient(ellipse at 10% 0%, rgba(178,203,185,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 100%, rgba(196,124,90,0.12) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237a9e87' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    font-family: 'Nunito', sans-serif;
    color: var(--ink);
    overflow: hidden;
  }

  /* ── Chat header ── */
  .mira-header {
    padding: 0.9rem 1.4rem;
    background: var(--warm-white);
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    box-shadow: 0 1px 3px rgba(107,79,58,0.06);
  }

  .mira-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--sage), var(--terracotta-light), var(--gold), transparent);
    opacity: 0.5;
  }

  .mira-header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .mira-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--sage), var(--terracotta-light));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
    box-shadow: 0 0 0 2px var(--warm-white), 0 0 0 3px var(--sage-light);
  }

  .mira-header-name {
    font-family: 'Lora', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--mocha);
    line-height: 1.1;
  }

  .mira-header-status {
    font-size: 0.72rem;
    color: var(--sage);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .mira-status-dot {
    width: 6px;
    height: 6px;
    background: var(--sage);
    border-radius: 50%;
    animation: status-pulse 2.5s ease-in-out infinite;
  }

  @keyframes status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .mira-reset-btn {
    background: transparent;
    border: 1.5px solid var(--mocha-light);
    color: var(--mocha-light);
    padding: 0.35rem 0.85rem;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: all 0.2s;
  }

  .mira-reset-btn:hover:not(:disabled) {
    background: var(--mocha-light);
    color: white;
  }

  .mira-reset-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* ── Messages area ── */
  .mira-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem 1.2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    scroll-behavior: smooth;
  }

  .mira-messages::-webkit-scrollbar { width: 4px; }
  .mira-messages::-webkit-scrollbar-track { background: transparent; }
  .mira-messages::-webkit-scrollbar-thumb { background: var(--scrollbar); border-radius: 4px; }

  /* ── Chat bubbles ── */
  .mira-bubble-row {
    display: flex;
    margin-bottom: 0.6rem;
    animation: bubble-in 0.25s ease forwards;
    opacity: 0;
  }

  @keyframes bubble-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .mira-bubble-row.user  { justify-content: flex-end; }
  .mira-bubble-row.model { justify-content: flex-start; }

  .mira-bubble {
    max-width: min(72%, 480px);
    padding: 0.75rem 1rem;
    border-radius: 18px;
    font-size: 0.92rem;
    line-height: 1.65;
    word-break: break-word;
    position: relative;
  }

  .mira-bubble.user {
    background: var(--terracotta-pale);
    border: 1px solid rgba(196,124,90,0.3);
    border-bottom-right-radius: 4px;
    color: var(--mocha);
    box-shadow: 0 2px 12px rgba(196,124,90,0.1);
    font-family: 'Nunito', sans-serif;
  }

  .mira-bubble.model {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-top-left-radius: 4px;
    color: var(--ink);
    box-shadow: 0 2px 12px rgba(107,79,58,0.06);
    font-family: 'Lora', serif;
  }

  .mira-bubble p {
    margin: 0;
    white-space: pre-wrap;
  }

  .mira-emotion-tag {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.15rem 0.5rem;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
  }

  /* ── Meme card ── */
  .mira-meme-card {
    margin-top: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--cream);
  }

  .mira-meme-label {
    padding: 0.4rem 0.75rem;
    font-size: 0.72rem;
    color: var(--mocha-light);
    font-weight: 500;
    letter-spacing: 0.04em;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-family: 'Nunito', sans-serif;
  }

  .mira-meme-card img {
    width: 100%;
    max-height: 260px;
    object-fit: contain;
    display: block;
    background: var(--warm-white);
  }

  /* ── Timestamp ── */
  .mira-time {
    font-size: 0.65rem;
    color: var(--mocha-light);
    opacity: 0.55;
    text-align: right;
    margin-top: 0.3rem;
    padding: 0 0.25rem;
  }

  .mira-bubble-row.model .mira-time { text-align: left; }

  /* ── Typing indicator ── */
  .mira-typing {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.6rem;
  }

  .mira-typing-bubble {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-top-left-radius: 4px;
    border-radius: 18px;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .mira-dot {
    width: 7px;
    height: 7px;
    background: var(--sage-light);
    border-radius: 50%;
    animation: typing-bounce 1.2s ease-in-out infinite;
  }

  .mira-dot:nth-child(2) { animation-delay: 0.2s; }
  .mira-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing-bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  /* ── Error ── */
  .mira-error {
    background: var(--terracotta-pale);
    border: 1px solid rgba(196,124,90,0.3);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    font-size: 0.82rem;
    color: var(--terracotta);
    line-height: 1.5;
    margin: 0.5rem 0;
    font-family: 'Nunito', sans-serif;
  }

  .mira-error strong { display: block; margin-bottom: 0.2rem; color: var(--mocha); }

  /* ── Date separator ── */
  .mira-date-sep {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1rem 0 0.5rem;
    color: var(--mocha-light);
    opacity: 0.5;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
  }

  .mira-date-sep::before,
  .mira-date-sep::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── Input area ── */
  .mira-input-area {
    padding: 0.85rem 1.2rem 1rem;
    background: var(--warm-white);
    border-top: 1px solid var(--border);
    flex-shrink: 0;
    position: relative;
    box-shadow: 0 -1px 3px rgba(107,79,58,0.04);
  }

  .mira-input-area::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--sage), var(--terracotta-light), var(--gold), transparent);
    opacity: 0.4;
  }

  .mira-input-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--cream);
    border: 1.5px solid rgba(122,158,135,0.3);
    border-radius: 16px;
    padding: 0.4rem 0.4rem 0.4rem 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .mira-input-row:focus-within {
    border-color: var(--sage);
    box-shadow: 0 0 0 3px rgba(122,158,135,0.1);
    background: white;
  }

  .mira-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--ink);
    font-family: 'Nunito', sans-serif;
    font-size: 0.92rem;
    line-height: 1.5;
    padding: 0.3rem 0;
    caret-color: var(--sage);
  }

  .mira-input::placeholder {
    color: var(--mocha-light);
    opacity: 0.5;
    font-style: italic;
  }

  .mira-input:disabled {
    opacity: 0.5;
  }

  .mira-send-btn {
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, var(--terracotta), #b8694a);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(196,124,90,0.3);
  }

  .mira-send-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 14px rgba(196,124,90,0.45);
  }

  .mira-send-btn:disabled {
    background: var(--sage-pale);
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* ── Fixed Home button ── */
  .mira-home-fixed {
    position: fixed;
    top: 1rem;
    right: 1.2rem;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--warm-white);
    border: 1.5px solid var(--sage);
    color: var(--sage);
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.03em;
    box-shadow: 0 2px 10px rgba(107,79,58,0.12);
    transition: all 0.2s ease;
  }

  .mira-home-fixed:hover {
    background: var(--sage);
    color: white;
    box-shadow: 0 4px 14px rgba(122,158,135,0.3);
  }

  /* ── Emotion tag colors ── */
  .emotion-joy     { background: var(--sage-pale);      color: #4a7c5c; }
  .emotion-sadness { background: rgba(138,155,168,0.15); color: var(--mist); }
  .emotion-anger   { background: var(--terracotta-pale); color: var(--terracotta); }
  .emotion-fear    { background: var(--gold-pale);       color: #8a6a1f; }
  .emotion-disgust { background: rgba(201,133,140,0.15); color: var(--dusty-rose); }
  .emotion-neutral { background: var(--sage-pale);       color: var(--mocha-light); }
`;

const EMOTION_EMOJI: Record<string, string> = {
    joy: '🌿', sadness: '🌧️', anger: '🔥', fear: '🍂', disgust: '💭', neutral: '🌾', default: '✦',
};

// ─── ChatBubble ─────────────────────────────────────────────────────────────
const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
    if (message.isHidden) return null;
    const isUser = message.role === 'user';
    const emoji = message.emotion ? EMOTION_EMOJI[message.emotion] ?? '✦' : '';
    const timeStr = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className={`mira-bubble-row ${isUser ? 'user' : 'model'}`}>
            <div>
                <div className={`mira-bubble ${isUser ? 'user' : 'model'}`}>
                    <p>{message.content}</p>

                    {!isUser && message.emotion && message.emotion !== 'default' && (
                        <span className={`mira-emotion-tag emotion-${message.emotion}`}>
                            {emoji} {message.emotion}
                        </span>
                    )}

                    {message.memeUrl && (
                        <div className="mira-meme-card">
                            <div className="mira-meme-label">🎭 here's a meme for you</div>
                            <img
                                src={message.memeUrl}
                                alt={`Meme — ${message.emotion}`}
                                onError={(e) => {
                                    const t = e.target as HTMLImageElement;
                                    t.onerror = null;
                                    t.src = 'https://placehold.co/300x200/1f2820/4e6b58?text=meme+unavailable';
                                }}
                            />
                        </div>
                    )}
                </div>
                {timeStr && <div className="mira-time">{timeStr}</div>}
            </div>
        </div>
    );
};

// ─── ImageBot ────────────────────────────────────────────────────────────────
const ImageBot: React.FC<ImageBotProps> = ({ onSendMessage, onResetChat, isLoading, history, error }) => {
    const [input, setInput] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [history, isLoading]);

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        onSendMessage(trimmed);
        setInput('');
    };

    return (
        <>
            <style>{styles}</style>
            <div className="mira-root">
              
                {/* Fixed Home button */}
                <a href="/" className="mira-home-fixed">🏠 Home</a>

                {/* Chat panel header */}
                <div className="mira-header">
                    <div className="mira-header-left">
                        <div className="mira-avatar">🌿</div>
                        <div>
                            <div className="mira-header-name">Mira</div>
                            <div className="mira-header-status">
                                <span className="mira-status-dot" />
                                {isLoading ? 'thinking…' : 'here for you'}
                            </div>
                        </div>
                    </div>
                    <button className="mira-reset-btn" onClick={onResetChat} disabled={isLoading}>
                        new chat
                    </button>
                </div>

                {/* Messages */}
                <div className="mira-messages" ref={chatRef}>
                    <div className="mira-date-sep">today</div>

                    {history.map((msg, i) => (
                        <ChatBubble key={i} message={msg} />
                    ))}

                    {isLoading && (
                        <div className="mira-typing">
                            <div className="mira-typing-bubble">
                                <span className="mira-dot" />
                                <span className="mira-dot" />
                                <span className="mira-dot" />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mira-error">
                            <strong>Connection issue</strong>
                            {error}
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="mira-input-area">
                    <form onSubmit={handleSend}>
                        <div className="mira-input-row">
                            <input
                                className="mira-input"
                                type="text"
                                value={input}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                                placeholder={isLoading ? 'Mira is with you…' : 'share what\'s on your mind…'}
                                autoComplete="off"
                                disabled={isLoading}
                            />
                            <button
                                className="mira-send-btn"
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                title="Send"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

// ─── App ─────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
    const [history, setHistory] = useState<Message[]>(() => [
        { role: 'system', content: INITIAL_SYSTEM_MESSAGE, isHidden: true, timestamp: 0 },
        { role: 'model', content: INITIAL_GREETING, memeUrl: null, emotion: 'joy', timestamp: Date.now() },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addMessage = (msg: Message) => setHistory(prev => [...prev, msg]);

    const resetHistory = () => {
        setHistory([
            { role: 'system', content: INITIAL_SYSTEM_MESSAGE, isHidden: true, timestamp: 0 },
            { role: 'model', content: "New chapter — I'm all yours. What's on your mind?", memeUrl: null, emotion: 'neutral', timestamp: Date.now() },
        ]);
        setError(null);
        fetch(API_RESET_URL, { method: 'POST' }).catch(e => console.error('Backend reset failed:', e));
    };

    const handleSendMessage = async (message: string) => {
        setError(null);
        setIsLoading(true);
        addMessage({ role: 'user', content: message, timestamp: Date.now() });

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `Status ${response.status}`);
            }

            const data = await response.json();
            addMessage({ role: 'model', content: data.reply, memeUrl: data.meme_url, emotion: data.emotion as Emotion, timestamp: Date.now() });
        } catch (err) {
            const msg = `Couldn't reach Mira right now. Make sure the Python server on port 5000 is running. (${(err as Error).message})`;
            setError(msg);
            addMessage({ role: 'model', content: "I'm having a little trouble connecting, but I'm here. Try again in a moment? ❤️", memeUrl: null, emotion: 'sadness', timestamp: Date.now() });
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <>
     
        <ImageBot
            onSendMessage={handleSendMessage}
            onResetChat={resetHistory}
            isLoading={isLoading}
            history={history}
            error={error}
            />
            </>
    );
};

const IB = App;
export default IB;