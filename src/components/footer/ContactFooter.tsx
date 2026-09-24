"use client";

import { useEffect, useRef } from "react";
import styles from "./contactFooter.module.css";

export function ContactFooter() {
  const eyes = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = eyes.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      node.style.setProperty("--eye-x", `${currentX.toFixed(2)}px`);
      node.style.setProperty("--eye-y", `${currentY.toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        frame = requestAnimationFrame(render);
      } else {
        frame = null;
      }
    };

    const animate = () => {
      if (frame === null) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      const deltaX = event.clientX - (bounds.left + bounds.width / 2);
      const deltaY = event.clientY - (bounds.top + bounds.height / 2);
      const angle = Math.atan2(deltaY, deltaX);
      const travel = Math.min(5, Math.hypot(deltaX, deltaY) * 0.045);
      targetX = Math.cos(angle) * travel;
      targetY = Math.sin(angle) * travel;
      animate();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      animate();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <footer className={styles.footer} id="contact" aria-labelledby="contact-title">
      <div className={styles.inner}>
        <div className={styles.contact}>
          <h2 id="contact-title">Send me your<br />current site.</h2>

          <nav className={styles.actions} aria-label="Contact and navigation">
            <a href="mailto:hello@bhaskarjyotipathak.in?subject=My%20current%20website&body=Hi%20Bhaskar%2C%0A%0AHere%20is%20my%20current%20site%3A%20">
              Email your site <span aria-hidden="true">↗</span>
            </a>
            <a href="#work">
              See selected work <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </div>

        <div className={styles.eyes} aria-hidden="true" ref={eyes}><i /><i /></div>

        <div className={styles.bottom}>
          <p>Bhaskar Pathak</p>
          <p>India / US and UK call hours</p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
