import { HeroMeta } from "./HeroMeta";
import { HeroNav } from "./HeroNav";
import { HeroStatement } from "./HeroStatement";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.container}>
        <HeroNav />
        <HeroStatement />
        <HeroMeta />
      </div>
      <div className={styles.texture} aria-hidden="true" />
    </section>
  );
}
