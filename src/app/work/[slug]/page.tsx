import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import styles from "./caseStudy.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title + " Case Study",
    description: project.summary,
    alternates: { canonical: "/work/" + project.slug },
    openGraph: {
      title: project.title + " Case Study",
      description: project.summary,
      images: [{ url: project.desktopImage, alt: project.title + " website" }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const theme = {
    "--case-bg": project.background,
    "--case-ink": project.ink,
  } as CSSProperties;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    dateCreated: project.year,
    image: "https://bhaskarjyotipathak.in" + project.desktopImage,
    url: "https://bhaskarjyotipathak.in/work/" + project.slug,
    creator: {
      "@type": "Person",
      name: "Bhaskar Pathak",
      url: "https://bhaskarjyotipathak.in",
    },
  };

  return (
    <main className={styles.page} style={theme}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <nav className={styles.nav} aria-label="Case study navigation">
        <Link href="/">Bhaskar Pathak</Link>
        <Link href="/#work">All work</Link>
        <a href="mailto:hello@bhaskarjyotipathak.in?subject=Website%20project">Let&apos;s talk ↗</a>
      </nav>

      <header className={styles.hero}>
        <div className={styles.eyebrow}>
          <span>{project.number} / 04</span>
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p className={styles.dek}>{project.summary}</p>
        {project.disclosure && <p className={styles.disclosure}>{project.disclosure}</p>}
        <dl className={styles.meta}>
          <div><dt>For</dt><dd>{project.clientType}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
        </dl>
      </header>

      <figure className={styles.heroVisual}>
        <Image
          src={project.desktopImage}
          alt={"Desktop view of the " + project.title + " website"}
          fill
          priority
          sizes="100vw"
        />
      </figure>

      <section className={styles.story} aria-labelledby="situation-title">
        <p className={styles.sectionLabel}>The situation</p>
        <h2 id="situation-title">{project.problem}</h2>
      </section>

      <section className={styles.decisions} aria-labelledby="decisions-title">
        <div>
          <p className={styles.sectionLabel}>What changed</p>
          <h2 id="decisions-title">The structure did the heavy lifting.</h2>
        </div>
        <ol>
          {project.approach.map((decision, decisionIndex) => (
            <li key={decision}>
              <span>0{decisionIndex + 1}</span>
              <p>{decision}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.evidence} aria-labelledby="evidence-title">
        <div className={styles.evidenceCopy}>
          <p className={styles.sectionLabel}>The result</p>
          <h2 id="evidence-title">{project.result}</h2>
        </div>
        <div className={project.mobileImage ? styles.deviceGrid : styles.studyGrid}>
          <figure className={styles.desktopEvidence}>
            <Image
              src={project.desktopImage}
              alt={"Full desktop composition for " + project.title}
              fill
              sizes={project.mobileImage ? "(max-width: 760px) 100vw, 70vw" : "100vw"}
            />
            <figcaption>Desktop direction</figcaption>
          </figure>
          {project.mobileImage ? (
            <figure className={styles.mobileEvidence}>
              <Image
                src={project.mobileImage}
                alt={"Mobile view of " + project.title}
                fill
                sizes="(max-width: 760px) 52vw, 22vw"
              />
              <figcaption>Mobile evidence</figcaption>
            </figure>
          ) : (
            <figure className={styles.detailEvidence}>
              <Image
                src={project.desktopImage}
                alt={"Art direction detail from the " + project.title + " study"}
                fill
                sizes="(max-width: 760px) 100vw, 45vw"
              />
              <figcaption>Interaction canvas</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className={styles.close}>
        <div>
          <p className={styles.sectionLabel}>Contribution</p>
          <p>{project.role}</p>
        </div>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            {project.liveLabel} ↗
          </a>
        ) : (
          <p className={styles.conceptNote}>{project.offlineNote ?? "Self-initiated concept study"}</p>
        )}
      </section>

      <section className={styles.next}>
        <p>Next case study</p>
        <Link href={"/work/" + next.slug}>
          <span>{next.title}</span>
          <i>↗</i>
        </Link>
      </section>

      <footer className={styles.contact}>
        <p>Have a current site that is not doing the work justice?</p>
        <a href="mailto:hello@bhaskarjyotipathak.in?subject=My%20current%20website&body=Hi%20Bhaskar%2C%0A%0AHere%20is%20my%20current%20site%3A%20">
          Send me your current site ↗
        </a>
      </footer>
    </main>
  );
}
