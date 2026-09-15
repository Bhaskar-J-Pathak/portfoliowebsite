"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./openingSequence.module.css";

type OpeningSequenceProps = {
  hero: ReactNode;
  work: ReactNode;
};

export function OpeningSequence({ hero, work }: OpeningSequenceProps) {
  const sequence = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const node = sequence.current;
      if (!node) return;

      const travelled = -node.getBoundingClientRect().top;
      const start = window.innerHeight * 0.42;
      const distance = window.innerHeight * 0.58;
      const progress = Math.min(1, Math.max(0, (travelled - start) / distance));
      node.style.setProperty("--opening-progress", progress.toFixed(4));
      node.style.setProperty("--hero-scale", (1 - progress * 0.055).toFixed(4));
      node.style.setProperty("--hero-blur", `${(progress * 4).toFixed(2)}px`);
      node.style.setProperty("--hero-opacity", (1 - progress * 0.38).toFixed(4));
      node.style.setProperty("--hero-radius", `${(progress * 28).toFixed(2)}px`);
      node.style.setProperty("--shadow-alpha", (progress * 0.12).toFixed(3));
      node.style.setProperty("--frame-y", `${((1 - progress) * 9).toFixed(2)}vh`);
      node.style.setProperty("--frame-v-inset", `${((1 - progress) * 8).toFixed(2)}%`);
      node.style.setProperty("--frame-h-inset", `${((1 - progress) * 3.5).toFixed(2)}%`);
      node.style.setProperty("--frame-radius", `${((1 - progress) * 42).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div className={styles.sequence} ref={sequence}><div className={styles.heroLayer}>{hero}</div><div className={styles.workLayer}>{work}</div></div>;
}
