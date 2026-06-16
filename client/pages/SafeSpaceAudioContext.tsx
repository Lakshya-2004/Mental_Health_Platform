import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

export interface Soundscape {
    value: string;
    label: string;
    icon: string;
}

export const SOUNDSCAPES: Soundscape[] = [
    { value: '', label: '— Select —', icon: '○' },
    { value: '/sounds/rain.mp3', label: 'Rain', icon: '☔' },
    { value: '/sounds/ocean.mp3', label: 'Ocean Waves', icon: '🌊' },
    { value: '/sounds/forest.mp3', label: 'Forest', icon: '🌲' },
];

interface AudioContextValue {
    selectedSoundscape: string;
    setSelectedSoundscape: (url: string) => void;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    error: string | null;
    clearError: () => void;
    currentLabel: string;
}

const SafeSpaceAudioContext = createContext<AudioContextValue | null>(null);

export const SafeSpaceAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedSoundscape, setSelectedSoundscapeState] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Create the audio element once, at provider mount (survives route changes
    // because this provider lives above the router in App.tsx)
    useEffect(() => {
        const audio = new Audio();
        audio.loop = true;
        audioRef.current = audio;
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!selectedSoundscape) {
            setError('Please select a soundscape first.');
            return;
        }
        if (audio.src !== selectedSoundscape) {
            audio.src = selectedSoundscape;
            audio.load();
        }
        setError(null);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(err => {
                    console.error('Audio play failed:', err.name, err.message);
                    if (err.name !== 'AbortError') {
                        setError(`Playback blocked: ${err.message || err.name}`);
                    }
                    setIsPlaying(false);
                });
        }
    }, [selectedSoundscape]);

    const pause = useCallback(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
    }, []);

    const toggle = useCallback(() => {
        if (isPlaying) pause(); else play();
    }, [isPlaying, play, pause]);

    const setSelectedSoundscape = useCallback((url: string) => {
        setSelectedSoundscapeState(url);
        setError(null);
        const audio = audioRef.current;
        if (audio && isPlaying && url) {
            audio.src = url;
            audio.play().catch(() => setIsPlaying(false));
        }
    }, [isPlaying]);

    const clearError = useCallback(() => setError(null), []);

    const currentLabel = SOUNDSCAPES.find(s => s.value === selectedSoundscape)?.label || '';

    return (
        <SafeSpaceAudioContext.Provider
            value={{ selectedSoundscape, setSelectedSoundscape, isPlaying, play, pause, toggle, error, clearError, currentLabel }}
        >
            {children}
        </SafeSpaceAudioContext.Provider>
    );
};

export const useSafeSpaceAudio = (): AudioContextValue => {
    const ctx = useContext(SafeSpaceAudioContext);
    if (!ctx) {
        throw new Error('useSafeSpaceAudio must be used within SafeSpaceAudioProvider');
    }
    return ctx;
};