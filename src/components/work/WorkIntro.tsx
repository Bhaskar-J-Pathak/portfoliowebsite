"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./workIntro.module.css";

export function WorkIntro() {
  const section = useRef<HTMLElement>(null);
  const animationFrame = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = section.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);

    const updateMotion = () => {
      animationFrame.current = null;
      const rect = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
      const remaining = 1 - progress;

      node.style.setProperty("--line-one-x", `${(remaining * 22).toFixed(2)}vw`);
      node.style.setProperty("--line-two-x", `${(remaining * -18).toFixed(2)}vw`);
      node.style.setProperty("--line-three-x", `${(remaining * 26).toFixed(2)}vw`);
      node.style.setProperty("--line-one-r", `${(remaining * 1.8).toFixed(2)}deg`);
      node.style.setProperty("--line-two-r", `${(remaining * -2.2).toFixed(2)}deg`);
      node.style.setProperty("--line-three-r", `${(remaining * 1.4).toFixed(2)}deg`);
    };

    const onScroll = () => {
      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(updateMotion);
      }
    };

    updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <section
      ref={section}
      className={`${styles.intro} ${isVisible ? styles.visible : ""}`}
      id="work"
      aria-labelledby="work-intro-title"
    >
      <div className={styles.frame}>
        <div className={styles.statement}>
          <h2 id="work-intro-title">
            <span><b>Things I&apos;ve made</b></span>
            <span className={styles.care}><b>with <em>care</em></b></span>
            <span className={styles.curiosity}><b>and curiosity.</b></span>
          </h2>
        </div>
      </div>
    </section>
  );
}
