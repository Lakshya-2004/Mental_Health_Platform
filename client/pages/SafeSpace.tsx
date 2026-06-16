import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToHome from "./BackToHome";
import { useSafeSpaceAudio, SOUNDSCAPES } from './SafeSpaceAudioContext';

const SESSION_DURATIONS = [
    { value: 0, label: '— Select —' },
    { value: 30, label: '30 sec' },
    { value: 120, label: '2 min' },
    { value: 300, label: '5 min' },
];

const formatTime = (seconds: number): string => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
};

const SafeSpace: React.FC = () => {
    const navigate = useNavigate();
    const { selectedSoundscape, setSelectedSoundscape, isPlaying, play, pause, error, clearError } = useSafeSpaceAudio();

    const [selectedDuration, setSelectedDuration] = useState<number>(0);
    const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isBreathingExpanding, setIsBreathingExpanding] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    const countdownTimerRef = useRef<number | null>(null);
    const breathingIntervalRef = useRef<number | null>(null);
    const breathingBallRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLElement>(null);

    const updateBallSize = useCallback(() => {
        if (!breathingBallRef.current || !navbarRef.current) return;
        const navbarHeight = navbarRef.current.offsetHeight;
        const maxAvailableHeight = window.innerHeight - navbarHeight - 40;
        const maxSize = Math.min(maxAvailableHeight, window.innerWidth * 0.9);
        const targetSize = isBreathingExpanding ? maxSize : 100;
        breathingBallRef.current.style.width = targetSize + 'px';
        breathingBallRef.current.style.height = targetSize + 'px';
    }, [isBreathingExpanding]);

    useEffect(() => {
        if (isSessionActive) {
            updateBallSize();
            window.addEventListener('resize', updateBallSize);
        } else {
            window.removeEventListener('resize', updateBallSize);
        }
        return () => window.removeEventListener('resize', updateBallSize);
    }, [isBreathingExpanding, isSessionActive, updateBallSize]);

    const stopBreathingAnimation = useCallback(() => {
        if (breathingIntervalRef.current) {
            window.clearInterval(breathingIntervalRef.current);
            breathingIntervalRef.current = null;
        }
        if (breathingBallRef.current) {
            breathingBallRef.current.style.width = '100px';
            breathingBallRef.current.style.height = '100px';
        }
    }, []);

    const startBreathingAnimation = useCallback(() => {
        setIsBreathingExpanding(true);
        updateBallSize();
        breathingIntervalRef.current = window.setInterval(() => {
            setIsBreathingExpanding(prev => !prev);
        }, 4000);
    }, [updateBallSize]);

    const handleSessionEnd = useCallback(() => {
        if (countdownTimerRef.current) {
            window.clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
        }
        setIsSessionActive(false);
        stopBreathingAnimation();
        setShowModal(true);
    }, [stopBreathingAnimation]);

    const handleStopSession = useCallback(() => {
        if (countdownTimerRef.current) {
            window.clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
        }
        setIsSessionActive(false);
        setRemainingTime(0);
        stopBreathingAnimation();
        // Note: soundtrack is NOT paused here on purpose — it's a separate,
        // persistent layer from the breathing session itself.
    }, [stopBreathingAnimation]);

    const handleStartSession = useCallback(() => {
        if (selectedDuration <= 0) {
            return;
        }
        handleStopSession();
        setRemainingTime(selectedDuration);
        setIsSessionActive(true);
        startBreathingAnimation();
        let currentRemaining = selectedDuration;
        countdownTimerRef.current = window.setInterval(() => {
            currentRemaining--;
            setRemainingTime(currentRemaining);
            if (currentRemaining <= 0) handleSessionEnd();
        }, 1000);
    }, [selectedDuration, startBreathingAnimation, handleSessionEnd, handleStopSession]);

    useEffect(() => {
        return () => {
            if (countdownTimerRef.current) window.clearInterval(countdownTimerRef.current);
            if (breathingIntervalRef.current) window.clearInterval(breathingIntervalRef.current);
            // Soundtrack deliberately NOT stopped on unmount — it persists
            // globally via SafeSpaceAudioProvider in App.tsx.
        };
    }, []);

    const handleModalAction = (action: 'Journal' | 'Chat' | 'Rest') => {
        setShowModal(false);
        if (action === 'Journal') {
            navigate('/diary');
        } else if (action === 'Chat') {
            navigate('/IB');
        } else if (action === 'Rest') {
            handleStopSession();
        }
    };

    const Styles = () => (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

            :root {
                --bg-deep:       #2c3d2a;
                --bg-mid:        #243322;
                --bg-surface:    rgba(0,0,0,0.18);
                --bg-glass:      rgba(0,0,0,0.22);
                --border:        rgba(160,200,120,0.18);
                --border-hover:  rgba(160,200,120,0.38);
                --accent-soft:   #a8c97e;
                --accent-teal:   #7dbf72;
                --accent-rose:   #c9a05a;
                --text-primary:  #edf2e8;
                --text-muted:    #8aab7a;
                --nav-h:         68px;
                --radius-sm:     8px;
                --radius-md:     14px;
                --radius-lg:     20px;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            .safespace-root {
                font-family: 'DM Sans', sans-serif;
                background: var(--bg-deep);
                color: var(--text-primary);
                height: 100vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                position: relative;
            }

            .safespace-root::before {
                content: '';
                position: fixed;
                inset: 0;
                background:
                    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(80,140,60,0.18) 0%, transparent 70%),
                    radial-gradient(ellipse 50% 60% at 80% 20%, rgba(100,160,70,0.12) 0%, transparent 70%);
                pointer-events: none;
                z-index: 0;
            }

            .navbar {
                position: fixed;
                top: 0; left: 0;
                width: 100%;
                height: var(--nav-h);
                background: rgba(18,28,16,0.90);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border-bottom: 1px solid var(--border);
                display: flex;
                align-items: center;
                padding: 0 24px;
                gap: 18px;
                z-index: 100;
                flex-wrap: wrap;
            }

            .navbar h1 {
                font-family: 'Cormorant Garamond', serif;
                font-weight: 400;
                font-size: 1.65rem;
                letter-spacing: 0.03em;
                color: var(--text-primary);
                flex-shrink: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .navbar h1::before {
                content: '◈';
                color: var(--accent-teal);
                font-size: 1rem;
                opacity: 0.8;
            }

            .controls {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
                flex-grow: 1;
                margin-left: auto;
            }
            .controls label {
                font-size: 0.78rem;
                font-weight: 400;
                color: var(--text-muted);
                letter-spacing: 0.06em;
                text-transform: uppercase;
            }
            .controls select {
                padding: 7px 30px 7px 12px;
                font-family: 'DM Sans', sans-serif;
                font-size: 0.85rem;
                border-radius: var(--radius-sm);
                border: 1px solid var(--border);
                background: #111a0f;
                color: #c8ddb8;
                outline: none;
                cursor: pointer;
                appearance: none;
                -webkit-appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238aab7a'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 10px center;
                transition: border-color 0.2s, background 0.2s;
            }
            .controls select:hover,
            .controls select:focus {
                border-color: var(--border-hover);
                background-color: #0d1409;
            }
            .controls select option {
                background: #111a0f;
                color: #c8ddb8;
            }

            .controls button, .btn {
                padding: 8px 16px;
                font-family: 'DM Sans', sans-serif;
                font-size: 0.82rem;
                font-weight: 500;
                letter-spacing: 0.04em;
                border-radius: var(--radius-sm);
                border: 1px solid var(--border);
                background: var(--bg-glass);
                color: var(--text-primary);
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
                white-space: nowrap;
            }
            .controls button:hover:not(:disabled), .btn:hover {
                background: rgba(255,255,255,0.12);
                border-color: var(--border-hover);
                transform: translateY(-1px);
                box-shadow: 0 4px 16px rgba(0,0,0,0.25);
            }
            .controls button:active:not(:disabled) { transform: translateY(0); }
            .controls button:disabled { opacity: 0.35; cursor: not-allowed; }

            #playBtn {
                background: rgba(100,180,80,0.15);
                border-color: rgba(100,180,80,0.35);
                color: var(--accent-teal);
            }
            #playBtn:hover { background: rgba(100,180,80,0.26); border-color: rgba(100,180,80,0.55); }

            #startSession {
                background: rgba(140,195,100,0.14);
                border-color: rgba(140,195,100,0.32);
                color: var(--accent-soft);
            }
            #startSession:hover:not(:disabled) {
                background: rgba(140,195,100,0.24);
                border-color: rgba(140,195,100,0.52);
            }

            #countdown {
                font-family: 'Cormorant Garamond', serif;
                font-size: 1.4rem;
                font-weight: 300;
                letter-spacing: 0.08em;
                color: var(--accent-soft);
                min-width: 68px;
                text-align: center;
                opacity: 0.9;
            }

            main {
                margin-top: var(--nav-h);
                flex-grow: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                overflow: auto;
                padding: 24px;
                z-index: 1;
            }

            .breathing-section {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #breathingBall {
                background: radial-gradient(circle at 38% 38%,
                    rgba(160,230,120,0.85) 0%,
                    rgba(100,185,80,0.65) 45%,
                    rgba(55,130,45,0.45) 100%);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                position: relative;
                transition: width 4s cubic-bezier(0.45, 0.05, 0.55, 0.95),
                            height 4s cubic-bezier(0.45, 0.05, 0.55, 0.95);
                box-shadow:
                    0 0 60px 20px rgba(100,185,80,0.18),
                    0 0 120px 50px rgba(100,185,80,0.09),
                    inset 0 0 40px rgba(255,255,255,0.10);
                z-index: 5;
                overflow: visible;
            }
            #breathingBall::after {
                content: '';
                position: absolute;
                top: 18%;
                left: 22%;
                width: 28%;
                height: 18%;
                background: rgba(255,255,255,0.30);
                border-radius: 50%;
                filter: blur(6px);
                pointer-events: none;
            }

            .ripple {
                position: absolute;
                border: 1.5px solid rgba(100,185,80,0.35);
                border-radius: 50%;
                top: 50%; left: 50%;
                width: 125%;
                height: 125%;
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
                pointer-events: none;
                animation: ripplePulse 4s infinite;
                animation-play-state: paused;
                transition: opacity 0.4s ease;
            }
            .ripple:nth-child(2) { animation-delay: 1.33s; }
            .ripple:nth-child(3) { animation-delay: 2.66s; }
            .ripple.active { opacity: 1; animation-play-state: running; }

            @keyframes ripplePulse {
                0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
                60%  { opacity: 0.15; }
                100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
            }

            .playback-error-bar {
                position: fixed;
                width: 100%;
                z-index: 200;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 16px;
                padding: 12px 20px;
                background: rgba(180,80,90,0.20);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(201,123,138,0.30);
                animation: fadeSlideUp 0.3s ease both;
            }
            .playback-error-bar p { font-size: 0.85rem; color: #f0a8b2; font-weight: 400; }
            .playback-error-bar button {
                padding: 5px 14px;
                border-radius: 6px;
                border: 1px solid rgba(201,123,138,0.30);
                background: rgba(201,123,138,0.15);
                color: #f0a8b2;
                font-size: 0.8rem;
                cursor: pointer;
                transition: background 0.2s;
            }
            .playback-error-bar button:hover { background: rgba(201,123,138,0.28); }

            @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(18px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            .modal {
                display: none;
                position: fixed;
                inset: 0;
                background: rgba(5,8,15,0.75);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                justify-content: center;
                align-items: center;
                z-index: 300;
                animation: fadeIn 0.3s ease both;
            }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

            .modal-content {
                background: rgba(12,20,10,0.94);
                border: 1px solid var(--border);
                border-radius: var(--radius-lg);
                padding: 40px 44px;
                max-width: 420px;
                width: 90vw;
                text-align: center;
                box-shadow: 0 24px 80px rgba(0,0,0,0.55);
                animation: fadeSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
            }
            .modal-content p {
                font-family: 'Cormorant Garamond', serif;
                font-size: 1.45rem;
                font-weight: 300;
                font-style: italic;
                color: var(--text-primary);
                margin-bottom: 28px;
                line-height: 1.5;
            }
            .modal-actions { display: flex; flex-direction: column; gap: 10px; }
            .modal-content button {
                width: 100%;
                padding: 14px 20px;
                border-radius: var(--radius-md);
                border: 1px solid var(--border);
                background: var(--bg-glass);
                color: var(--text-primary);
                font-family: 'DM Sans', sans-serif;
                font-size: 0.9rem;
                font-weight: 400;
                letter-spacing: 0.05em;
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s, transform 0.15s;
            }
            .modal-content button:hover { background: rgba(255,255,255,0.12); border-color: var(--border-hover); transform: translateY(-1px); }

            #journalBtn { background: rgba(100,180,80,0.12); border-color: rgba(100,180,80,0.28); color: var(--accent-teal); }
            #journalBtn:hover { background: rgba(100,180,80,0.22); border-color: rgba(100,180,80,0.48); }
            #chatBtn { background: rgba(140,195,100,0.10); border-color: rgba(140,195,100,0.26); color: var(--accent-soft); }
            #chatBtn:hover { background: rgba(140,195,100,0.20); border-color: rgba(140,195,100,0.46); }
            #restBtn { color: var(--text-muted); }

            ::-webkit-scrollbar { width: 5px; height: 5px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }

            *:focus-visible { outline: 2px solid rgba(100,185,80,0.60); outline-offset: 2px; }
        `}</style>
    );

    return (
        <div className="safespace-root">
            <BackToHome position="top-right" />
            <Styles />

            {error && (
                <div className="playback-error-bar" style={{ top: navbarRef.current?.offsetHeight || 68 }}>
                    <p>{error}</p>
                    <button onClick={clearError}>Dismiss</button>
                </div>
            )}

            <nav className="navbar" ref={navbarRef}>
                <h1>SafeSpace</h1>

                <div className="controls">
                    <label htmlFor="soundscapeSelect">Soundscape</label>
                    <select
                        id="soundscapeSelect"
                        value={selectedSoundscape}
                        onChange={(e) => setSelectedSoundscape(e.target.value)}
                    >
                        {SOUNDSCAPES.map(s => (
                            <option key={s.value} value={s.value}>{s.icon} {s.label}</option>
                        ))}
                    </select>
                    <button id="playBtn" onClick={play} disabled={isPlaying}>▶ Play</button>
                    <button id="pauseBtn" onClick={pause} disabled={!isPlaying}>⏸ Pause</button>

                    <label htmlFor="timerSelect">Session</label>
                    <select
                        id="timerSelect"
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                        disabled={isSessionActive}
                    >
                        {SESSION_DURATIONS.map(d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                    </select>
                    <button id="startSession" onClick={handleStartSession} disabled={isSessionActive || selectedDuration <= 0}>
                        Begin
                    </button>
                    <button id="stopSession" onClick={handleStopSession} disabled={!isSessionActive}>
                        End
                    </button>
                    <div id="countdown">
                        {isSessionActive ? formatTime(remainingTime) : formatTime(0)}
                    </div>
                </div>
            </nav>

            <main>
                <div className="breathing-section">
                    <div
                        id="breathingBall"
                        ref={breathingBallRef}
                        aria-label="Breathing ball animation"
                        role="img"
                        aria-live="polite"
                    >
                        <div className={`ripple ${isSessionActive ? 'active' : ''}`}></div>
                        <div className={`ripple ${isSessionActive ? 'active' : ''}`}></div>
                        <div className={`ripple ${isSessionActive ? 'active' : ''}`}></div>
                    </div>
                </div>
            </main>

            <div
                id="promptModal"
                className="modal"
                style={{ display: showModal ? 'flex' : 'none' }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
                aria-describedby="modalDesc"
            >
                <div className="modal-content">
                    <p id="modalDesc">Session complete. How are you feeling now?</p>
                    <div className="modal-actions">
                        <button id="journalBtn" onClick={() => handleModalAction('Journal')}>
                            ✦ Write in Journal
                        </button>
                        <button id="chatBtn" onClick={() => handleModalAction('Chat')}>
                            ◎ Talk to Chatbot
                        </button>
                        <button id="restBtn" onClick={() => handleModalAction('Rest')}>
                            Reset SafeSpace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafeSpace;