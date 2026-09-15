import styles from "./hero.module.css";

export function HeroMeta() {
  return (
    <div className={styles.meta}>
      <a className={styles.workLink} href="#work">
        Selected work <span>(01)</span>
        <b>↓</b>
      </a>
      <p className={styles.availability}>
        <i /> Available for select projects
      </p>
      <p className={styles.year}>© 2026</p>
    </div>
  );
}
