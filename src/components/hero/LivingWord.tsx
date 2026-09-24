"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

const WAVE_DURATION = 1_150;

export function LivingWord({ word = "obvious" }: { word?: string }) {
  const letters = word.split("");
  const [isWaving, setIsWaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function playWave() {
    if (isWaving) return;
    setIsWaving(true);
    timer.current = setTimeout(() => setIsWaving(false), WAVE_DURATION);
  }

  return (
    <span
      className={`${styles.livingWord} ${isWaving ? styles.isWaving : ""}`}
      aria-label={word}
      onPointerEnter={playWave}
    >
      {letters.map((letter, index) => (
        <span
          aria-hidden="true"
          key={`${letter}-${index}`}
          style={{ "--letter": index } as React.CSSProperties}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
