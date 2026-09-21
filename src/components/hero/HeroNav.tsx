import styles from "./hero.module.css";

export function HeroNav() {
  return (
    <header className={styles.nav}>
      <a className={styles.name} href="#top" aria-label="Bhaskar Pathak, home">
        Bhaskar Pathak<span>®</span>
      </a>
      <p className={styles.role}>
        Designer + developer
        <br />
        India, working globally
      </p>
      <a className={styles.menu} href="mailto:hello@bhaskarjyotipathak.in">
        Let&apos;s talk <span>↗</span>
      </a>
    </header>
  );
}
