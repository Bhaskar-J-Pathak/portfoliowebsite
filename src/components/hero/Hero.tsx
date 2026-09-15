import { HeroMeta } from "./HeroMeta";
import { HeroNav } from "./HeroNav";
import { HeroStatement } from "./HeroStatement";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <main className={styles.hero} id="top">
      <div className={styles.container}>
        <HeroNav />
        <HeroStatement />
        <HeroMeta />
      </div>
      <div className={styles.texture} aria-hidden="true" />
    </main>
  );
}
