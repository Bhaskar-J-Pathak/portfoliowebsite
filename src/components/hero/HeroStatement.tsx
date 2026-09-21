import { LivingWord } from "./LivingWord";
import styles from "./hero.module.css";

export function HeroStatement() {
  return (
    <section className={styles.statement} aria-labelledby="hero-title">
      <p className={styles.index}>01 / Introduction</p>
      <h1 id="hero-title">
        <span className={styles.line}>Building digital</span>
        <span className={`${styles.line} ${styles.offset}`}>
          experiences that
        </span>
        <span className={`${styles.line} ${styles.intentional}`}>
          feel <LivingWord />
          <span className={styles.dot}>.</span>
        </span>
      </h1>
      <p className={styles.summary}>
        Independent web designer and creative developer building distinctive,
        fast and responsive websites for startups and growing businesses worldwide.
      </p>
    </section>
  );
}
