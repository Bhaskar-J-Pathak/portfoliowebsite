import { About } from "@/components/about/About";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { Hero } from "@/components/hero/Hero";
import { Method } from "@/components/method/Method";
import { WorkIntro } from "@/components/work/WorkIntro";
import { OpeningSequence } from "@/components/opening/OpeningSequence";
import { Expectations } from "@/components/expectations/Expectations";
import { ContactFooter } from "@/components/footer/ContactFooter";
import { ProjectIndex } from "@/components/projects/ProjectIndex";

export default function Home() {
  return (
    <main id="main-content">
      <OpeningSequence
        hero={<Hero />}
        work={<ProjectIndex intro={<WorkIntro />} about={<About />} />}
      />
      <Capabilities />
      <Method />
      <div className="footer-reveal-sequence">
        <Expectations />
        <ContactFooter />
      </div>
    </main>
  );
}
