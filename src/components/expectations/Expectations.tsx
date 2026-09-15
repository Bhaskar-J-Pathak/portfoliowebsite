"use client";

import { useEffect, useRef } from "react";
import styles from "./expectations.module.css";

const expectations = [
  {
    title: "Strategy earns the spectacle.",
    detail: "A strong idea comes before the polished screen.",
  },
  {
    title: "The first second matters.",
    detail: "Hierarchy should make the right thing impossible to miss.",
  },
  {
    title: "Finish is part of function.",
    detail: "The last ten percent is where trust lives.",
  },
  {
    title: "Easy never means ordinary.",
    detail: "Clarity for the user, character for the brand.",
  },
  {
    title: "Type has a voice.",
    detail: "It should say something before it says anything.",
  },
  {
    title: "Curiosity stays switched on.",
    detail: "New tools, better questions and fewer defaults.",
  },
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function Expectations() {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    let visible = false;

    const update = () => {
      frame.current = requestAnimationFrame(update);
      if (!visible) return;

      const bounds = node.getBoundingClientRect();
      const entrance = clamp((window.innerHeight - bounds.top) / window.innerHeight);

      cards.current.forEach((card, index) => {
        const reveal = clamp(entrance * 1.5 - index * 0.09);
        card?.style.setProperty("--card-opacity", reveal.toFixed(3));
        card?.style.setProperty("--card-y", `${((1 - reveal) * 110).toFixed(2)}%`);
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    observer.observe(node);
    frame.current = requestAnimationFrame(update);

    return () => {
      observer.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section className={styles.expectations} ref={section} aria-labelledby="expectations-title">
      <div className={styles.sticky}>
        <header className={styles.intro}>
          <h2 id="expectations-title">
            Six things you can
            <em>always expect from me.</em>
          </h2>
        </header>

        <div className={styles.deck}>
          {expectations.map((item, index) => (
            <article
              className={styles.card}
              key={item.title}
              ref={(element) => { cards.current[index] = element; }}
              tabIndex={0}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <strong aria-hidden="true">{index + 1}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
