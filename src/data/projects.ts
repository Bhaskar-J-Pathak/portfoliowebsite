export type Project = {
  slug: string;
  number: string;
  title: string;
  year: string;
  type: string;
  clientType: string;
  disciplines: string[];
  role: string;
  summary: string;
  problem: string;
  approach: string[];
  result: string;
  image: string;
  desktopImage: string;
  mobileImage?: string;
  background: string;
  ink: string;
  accent: string;
  liveUrl?: string;
  liveLabel?: string;
  disclosure?: string;
  offlineNote?: string;
};

export const projects: Project[] = [
  {
    slug: "rajdhany-realtors",
    number: "01",
    title: "Rajdhany Realtors",
    year: "2025",
    type: "Client work",
    clientType: "Luxury real estate",
    disciplines: ["Brand direction", "Website design", "Development"],
    role: "Brand direction, UX/UI design and frontend development",
    summary: "A premium property website that makes the offer, location and enquiry path clear from the first screen.",
    problem: "Rajdhany needed a digital presence that felt as considered as its residences without falling into the familiar property-listing template.",
    approach: [
      "Built an editorial hierarchy around the brand promise before introducing individual residences.",
      "Used restrained typography, generous space and warm imagery to give the property work room to lead.",
      "Kept exploration and enquiry visible as two clear paths across desktop and mobile.",
    ],
    result: "The site now establishes the positioning, location and next steps on the first screen. On mobile, the same story stays readable without shrinking the desktop composition into a cramped column.",
    image: "/images/projects/rajdhany.webp",
    desktopImage: "/images/case-studies/rajdhany/desktop.png",
    mobileImage: "/images/case-studies/rajdhany/mobile.png",
    background: "#f4f3f0",
    ink: "#171717",
    accent: "#777773",
    liveUrl: "https://www.rajdhanyrealtors.com/",
    liveLabel: "Visit live site",
  },
  {
    slug: "xvault-studio",
    number: "02",
    title: "Xvault Studio",
    year: "2025",
    type: "Founder-led product",
    clientType: "Writing software",
    disciplines: ["Product positioning", "Website design", "Development"],
    role: "Founder, product design, visual direction and frontend development",
    summary: "A product story that explains how Xvault helps fiction writers keep continuity, context and ideas together.",
    problem: "A writing tool with several interconnected features needed one simple promise that a novelist could understand before learning how the product works.",
    approach: [
      "Led with the human problem of remembering a growing story instead of a list of software features.",
      "Framed each capability through the part of the writing process it supports.",
      "Created a quiet visual system that feels literary while keeping the primary action obvious.",
    ],
    result: "The first screen now connects the product promise to a single action, while the wider page gives writers enough context to decide if Xvault fits the way they work.",
    image: "/images/projects/xvault.webp",
    desktopImage: "/images/case-studies/xvault/desktop.png",
    mobileImage: "/images/case-studies/xvault/mobile.png",
    background: "#ecebe7",
    ink: "#171717",
    accent: "#686866",
    liveUrl: "https://xvault.dev/",
    liveLabel: "Visit live product",
  },
  {
    slug: "spylt-study",
    number: "03",
    title: "Spylt",
    year: "2025",
    type: "Independent study",
    clientType: "Awwwards-style CPG concept",
    disciplines: ["Art direction", "Interaction concept", "Creative development"],
    role: "Independent concept, website design and creative development",
    summary: "An Awwwards-style website study exploring how an energetic beverage brand can become a bold digital experience.",
    problem: "The self-initiated brief was to carry a loud product personality into a scroll-led website without letting spectacle bury the product itself.",
    approach: [
      "Used oversized type and packaging as the main visual language rather than decorating a conventional product grid.",
      "Designed motion as a sequence of reveals so each interaction advances the product story.",
      "Balanced dense brand energy with direct product information and clear visual anchors.",
    ],
    result: "The study became a high-energy concept system where brand expression, product information and interaction share the same hierarchy.",
    image: "/images/projects/spylt.webp",
    desktopImage: "/images/case-studies/spylt/desktop.png",
    background: "#e7e6e2",
    ink: "#171717",
    accent: "#858581",
    disclosure: "Independent design study. Not commissioned by or affiliated with SPYLT.",
  },
  {
    slug: "lucas-danielsson",
    number: "04",
    title: "Lucas Danielsson",
    year: "2025",
    type: "Client work",
    clientType: "Swedish magician",
    disciplines: ["Creative direction", "Website design", "Development"],
    role: "Creative direction, web design and frontend development",
    summary: "A performance-led portfolio for a Swedish magician, helping event organisers understand his magic, see the work and make contact.",
    problem: "Swedish magician Lucas Danielsson needed one portfolio where event organisers could understand his style of magic, compare performance formats and move naturally towards an enquiry.",
    approach: [
      "Used playing cards as a visual motif for sleight of hand and stage magic, creating a recognisable opening instead of a generic performer template.",
      "Grouped corporate events, private parties and stage work around the decision an organiser needs to make.",
      "Protected the oversized identity on smaller screens with a mobile composition built on its own terms.",
    ],
    result: "Event organisers can move from Lucas’s introduction to performance fit and contact in one narrative, while the mobile layout keeps his magician identity intact without clipping useful content.",
    image: "/images/projects/lucas.webp",
    desktopImage: "/images/case-studies/lucas/desktop.png",
    mobileImage: "/images/case-studies/lucas/mobile.png",
    background: "#171717",
    ink: "#f4f2e8",
    accent: "#a5a5a0",
    offlineNote: "Website currently offline because the client domain has expired.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
