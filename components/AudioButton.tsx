
"use client";

import { useRef, useState } from "react";

interface AudioButtonProps {
  src?: string;
  fallbackText?: string;
  label?: string;
}

export function AudioButton({ src, fallbackText, label = "🔊 Listen" }: AudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    if (!src) return fallback();
    if (!audioRef.current) audioRef.current = new Audio(src);

    try {
      window.speechSynthesis?.cancel();
      await audioRef.current.play();
      setPlaying(true);
      audioRef.current.onended = () => setPlaying(false);
    } catch {
      fallback();
    }
  };

  const fallback = () => {
    if (!fallbackText || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fallbackText);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button className="audio-btn" type="button" onClick={play}>
      {playing ? "⏸ Playing" : label}
    </button>
  );
}
