import Image from "next/image";
import styles from "./about.module.css";

export function About() {
  return (
    <section
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.layout}>
        <p className={styles.eyebrow}>Working together</p>

        <h2 className={styles.headline} id="about-title">
          I design and build the site, and work directly with the person responsible for the business.
          <em> Clear communication, one person from direction to launch.</em>
        </h2>

        <dl className={styles.facts}>
          <div>
            <span className={styles.factLine} aria-hidden="true" />
            <dt>Experience</dt>
            <dd>4+ years</dd>
          </div>
          <div>
            <span className={styles.factLine} aria-hidden="true" />
            <dt>Off screen</dt>
            <dd>Magic, novels and writing</dd>
          </div>
          <div>
            <span className={styles.factLine} aria-hidden="true" />
            <dt>Fuel</dt>
            <dd>Monster Ultra</dd>
          </div>
        </dl>

        <figure className={styles.portrait}>
          <div className={styles.portraitFrame}>
            <Image
              src="/Bhaskar.webp"
              alt="Portrait of Bhaskar Pathak, web designer and creative developer"
              fill
              sizes="(max-width: 700px) 39vw, (max-width: 960px) 24vw, 290px"
            />
            <span aria-hidden="true">BP</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
