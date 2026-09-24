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
          feel <LivingWord word="intentional" />
          <span className={styles.dot}>.</span>
        </span>
      </h1>
      <p className={styles.summary}>
        I shape brands and interfaces through visual direction, purposeful
        interaction, and resilient frontend code.
      </p>
    </section>
  );
}
