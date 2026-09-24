import { LivingWord } from "./LivingWord";
import styles from "./hero.module.css";

export function HeroStatement() {
  return (
    <section className={styles.statement} aria-labelledby="hero-title">
      <p className={styles.index}>01 / Introduction</p>
      <h1 id="hero-title">
        <span className={styles.line}>Websites that make</span>
        <span className={styles.line}>the work clear and</span>
        <span className={styles.line}>
          the next step <LivingWord word="obvious" />
          <span className={styles.dot}>.</span>
        </span>
      </h1>
      <p className={styles.summary}>
        I design and build them for design-led small businesses, working directly
        with owners in the US, UK and India.
      </p>
    </section>
  );
}
