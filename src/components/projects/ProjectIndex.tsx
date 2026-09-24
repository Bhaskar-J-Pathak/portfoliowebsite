"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ShockwavePreview } from "./ShockwavePreview";
import styles from "./projectIndex.module.css";

type ProjectIndexProps = {
  intro: ReactNode;
  about: ReactNode;
};

export function ProjectIndex({ intro, about }: ProjectIndexProps) {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const previewSlides = useMemo(() => projects.map(({ number, title, background, ink, accent, image }) => ({ number, title, background, ink, accent, image })), []);

  useEffect(() => {
    const node = section.current;
    if (!node) return;

    const update = () => {
      frame.current = null;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(1, node.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const introExit = Math.min(1, Math.max(0, (progress - 0.15) / 0.22));
      const stageEntrance = Math.min(1, Math.max(0, (progress - 0.15) / 0.18));
      const projectProgress = Math.min(0.999, Math.max(0, (progress - 0.39) / 0.5));
      const aboutRaw = Math.min(1, Math.max(0, (progress - 0.8) / 0.19));
      const aboutEntrance = aboutRaw * aboutRaw * (3 - 2 * aboutRaw);

      node.style.setProperty("--intro-x", `${(-introExit * 100).toFixed(2)}vw`);
      node.style.setProperty("--stage-ui", stageEntrance.toFixed(4));
      node.style.setProperty("--stage-x", `${((1 - stageEntrance) * 12).toFixed(2)}vw`);
      node.style.setProperty("--project-exit-x", `${(-aboutEntrance * 100).toFixed(2)}vw`);
      node.style.setProperty("--about-x", `${((1 - aboutEntrance) * 100).toFixed(2)}vw`);
      node.style.setProperty("--about-y", `${((1 - aboutEntrance) * 3.5).toFixed(2)}vh`);
      node.style.setProperty("--about-scale", (0.965 + aboutEntrance * 0.035).toFixed(4));
      node.style.setProperty("--about-radius", `${((1 - aboutEntrance) * 30).toFixed(2)}px`);
      setActive(Math.min(projects.length - 1, Math.floor(projectProgress * projects.length)));
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

  const project = projects[active];

  return (
    <section
      className={styles.index}
      ref={section}
      aria-labelledby="projects-title"
    >
      <div className={styles.sticky}>
        <div className={styles.introPanel}>{intro}</div>

        <div className={styles.projectStage}>
          <header className={styles.header}>
            <p id="projects-title">Selected projects</p>
            <p>{project.number} / {String(projects.length).padStart(2, "0")}</p>
          </header>

          <div className={styles.slider}>
            <div className={styles.context}>
              <span>02</span>
              <i />
              <p>Featured work</p>
            </div>

            <div className={styles.imageStage}>
              <ShockwavePreview activeIndex={active} slides={previewSlides} />
            </div>

            <div className={styles.titles} aria-live="polite">
              {projects.map((item, index) => (
                <h2 className={index === active ? styles.titleActive : ""} key={item.title}>
                  <Link href={"/work/" + item.slug}>{item.title}</Link>
                </h2>
              ))}
            </div>

            <div className={styles.details}>
              <div className={styles.detailStack} key={project.title}>
                <p className={styles.projectType}>{project.clientType}</p>
                <p className={styles.projectSummary}>{project.summary}</p>
                <Link className={styles.caseLink} href={"/work/" + project.slug}>
                  View case study <span>↗</span>
                </Link>
              </div>
            </div>

            <div
              className={styles.thumbnails}
              aria-label="Choose a project"
              style={{ "--active-thumbnail": active } as CSSProperties}
            >
              {projects.map((item, index) => (
                <button
                  aria-label={`Show ${item.title}`}
                  aria-pressed={index === active}
                  className={index === active ? styles.thumbnailActive : ""}
                  key={item.title}
                  onClick={() => setActive(index)}
                  style={{ backgroundImage: `linear-gradient(rgba(24, 21, 28, .08), rgba(24, 21, 28, .08)), url(${item.image})` }}
                />
              ))}
            </div>

            <div className={styles.progress} aria-hidden="true">
              {projects.map((item, index) => <span className={index === active ? styles.progressActive : ""} key={item.title} />)}
            </div>
          </div>
        </div>

        <div className={styles.aboutPanel}>{about}</div>
      </div>
    </section>
  );
}
