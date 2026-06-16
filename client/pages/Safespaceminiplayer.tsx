import React from 'react';
import { useSafeSpaceAudio, SOUNDSCAPES } from './SafeSpaceAudioContext';

const styles = `
  .ssmp-root {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px 10px 12px;
    background: rgba(12,20,10,0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(160,200,120,0.22);
    border-radius: 100px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    font-family: 'DM Sans', sans-serif;
    animation: ssmpSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes ssmpSlideIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ssmp-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .ssmp-info {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    min-width: 0;
  }
  .ssmp-label {
    font-size: 0.78rem;
    font-weight: 500;
    color: #edf2e8;
    white-space: nowrap;
  }
  .ssmp-status {
    font-size: 0.66rem;
    color: #8aab7a;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .ssmp-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(140,195,100,0.32);
    background: rgba(140,195,100,0.14);
    color: #a8c97e;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
    font-size: 0.85rem;
  }
  .ssmp-btn:hover {
    background: rgba(140,195,100,0.26);
    transform: scale(1.06);
  }
  .ssmp-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }
  .ssmp-bars span {
    width: 3px;
    background: #7dbf72;
    border-radius: 2px;
    animation: ssmpBar 1s ease-in-out infinite;
  }
  .ssmp-bars span:nth-child(1) { animation-delay: 0s; }
  .ssmp-bars span:nth-child(2) { animation-delay: 0.2s; }
  .ssmp-bars span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes ssmpBar {
    0%, 100% { height: 4px; }
    50% { height: 14px; }
  }

  @media (max-width: 480px) {
    .ssmp-root { left: 12px; bottom: 12px; padding: 8px 12px 8px 10px; }
    .ssmp-label { display: none; }
  }
`;

const SafeSpaceMiniPlayer: React.FC = () => {
    const { selectedSoundscape, isPlaying, toggle, currentLabel } = useSafeSpaceAudio();

    if (!selectedSoundscape) return null;

    const icon = SOUNDSCAPES.find(s => s.value === selectedSoundscape)?.icon || '♪';

    return (
        <>
            <style>{styles}</style>
            <div className="ssmp-root">
                <span className="ssmp-icon">{icon}</span>
                <div className="ssmp-info">
                    <span className="ssmp-label">{currentLabel}</span>
                    <span className="ssmp-status">{isPlaying ? 'playing' : 'paused'}</span>
                </div>
                {isPlaying && (
                    <div className="ssmp-bars" aria-hidden="true">
                        <span /><span /><span />
                    </div>
                )}
                <button className="ssmp-btn" onClick={toggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? '⏸' : '▶'}
                </button>
            </div>
        </>
    );
};

export default SafeSpaceMiniPlayer;