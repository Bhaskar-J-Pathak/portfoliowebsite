"use client";

import { useEffect, useRef } from "react";
import styles from "./method.module.css";

const principles = [
  {
    lead: "Clarity",
    thought: "before decoration.",
    detail: "Strip away the noise until the purpose, hierarchy and next move feel obvious.",
  },
  {
    lead: "Motion",
    thought: "with a reason.",
    detail: "Use movement to explain change, guide attention and make interaction feel alive.",
  },
  {
    lead: "Code",
    thought: "that protects the idea.",
    detail: "Build the final experience without sanding away the details that made it distinct.",
  },
] as const;

export function Method() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = section.current;
    if (!node) return;

    const update = () => {
      frame.current = null;
      const bounds = node.getBoundingClientRect();
      const distance = Math.max(1, node.offsetHeight - window.innerHeight);
      const stickyProgress = Math.min(1, Math.max(0, -bounds.top / distance));
      const entranceProgress = Math.min(
        1,
        Math.max(0, (window.innerHeight - bounds.top) / window.innerHeight),
      );
      const progress = entranceProgress < 1
        ? entranceProgress * 0.22
        : 0.22 + stickyProgress * 0.78;
      const centered = progress - 0.5;
      const maximumRadius = window.innerWidth <= 800 ? 28 : 44;

      node.style.setProperty("--method-progress", `${(progress * 100).toFixed(2)}%`);
      node.style.setProperty(
        "--method-radius",
        `${((1 - entranceProgress) * maximumRadius).toFixed(2)}px`,
      );
      node.style.setProperty("--drift-one", `${(centered * -12).toFixed(2)}vw`);
      node.style.setProperty("--drift-two", `${(centered * 9).toFixed(2)}vw`);
      node.style.setProperty("--drift-three", `${(centered * -7).toFixed(2)}vw`);
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

  return (
    <section className={styles.method} ref={section} aria-label="How I work">
      <div className={styles.sticky}>
        <div className={styles.score}>
          {principles.map((principle, index) => (
            <article className={styles.principle} data-row={index + 1} key={principle.lead}>
              <div className={styles.rule} aria-hidden="true"><span /></div>
              <div className={styles.copy}>
                <h2>
                  <span>{principle.lead}</span>
                  <em>{principle.thought}</em>
                </h2>
                <p>{principle.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
