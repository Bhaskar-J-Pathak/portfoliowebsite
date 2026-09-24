"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./capabilities.module.css";

const capabilities = [
  {
    number: "01",
    lead: "New site",
    accent: "for a service brand",
    description:
      "A focused website for a studio, consultant or local business that needs to look established and make enquiry easy.",
  },
  {
    number: "02",
    lead: "Focused",
    accent: "website redesign",
    description:
      "A clearer structure and stronger visual direction when the current site hides the quality of the work, especially on mobile.",
  },
  {
    number: "03",
    lead: "Design",
    accent: "brought to life",
    description:
      "A responsive build from an existing design, with the type, motion and interaction details protected through implementation.",
  },
] as const;

export function Capabilities() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = section.current;
    if (!node) return;

    const update = () => {
      frame.current = null;
      const bounds = node.getBoundingClientRect();
      const distance = Math.max(1, node.offsetHeight - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -bounds.top / distance));
      const next = Math.min(capabilities.length - 1, Math.floor(progress * capabilities.length));

      node.style.setProperty("--capability-progress", progress.toFixed(4));
      node.style.setProperty("--active-capability", String(next));
      setActive(next);
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

  const capability = capabilities[active];

  return (
    <section className={styles.capabilities} ref={section} aria-labelledby="capabilities-title">
      <div className={styles.sticky}>
        <div className={styles.stage}>
          <div className={styles.copy} key={capability.number} aria-live="polite">
            <h2 id="capabilities-title">
              <span>{capability.lead}</span>
              <em>{capability.accent}</em>
            </h2>
            <p className={styles.description}>{capability.description}</p>
          </div>

          <div className={styles.specimen} data-variant={active} aria-hidden="true">
            <div className={styles.specimenCore}>
              {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
            </div>
          </div>

          <div className={styles.index} style={{ "--active-capability": active } as CSSProperties}>
            <i aria-hidden="true" />
            <ol aria-label="Capability index">
              {capabilities.map((item, index) => (
                <li className={index === active ? styles.indexActive : ""} key={item.number}>
                  {item.lead}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
