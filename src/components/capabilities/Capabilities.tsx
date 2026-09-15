"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./capabilities.module.css";

const capabilities = [
  {
    number: "01",
    lead: "Product",
    accent: "and Web Design",
    description:
      "Interfaces shaped around hierarchy, flow and the moment a person decides to stay.",
  },
  {
    number: "02",
    lead: "Art Direction",
    accent: "and Identity",
    description:
      "Visual systems with a clear point of view, built to stay recognizable across every surface.",
  },
  {
    number: "03",
    lead: "Motion",
    accent: "and Interaction",
    description:
      "Movement that explains, rewards and gives digital work a pulse without getting in its way.",
  },
  {
    number: "04",
    lead: "Creative",
    accent: "Development",
    description:
      "Frontend builds where the implementation protects the original idea and every intentional detail.",
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
