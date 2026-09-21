import type { Metadata } from "next";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import "./globals.css";

const siteUrl = "https://bhaskarjyotipathak.in";
const title = "Bhaskar Pathak | Freelance Web Designer & Developer";
const description =
  "Independent web designer and creative developer building custom, fast and responsive websites for startups and growing businesses worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Bhaskar Pathak",
  },
  description,
  applicationName: "Bhaskar Pathak Portfolio",
  keywords: [
    "freelance web designer",
    "creative web developer",
    "Next.js developer",
    "interactive website designer",
    "portfolio website designer",
    "startup web designer",
    "custom business website",
    "Bhaskar Pathak",
  ],
  authors: [{ name: "Bhaskar Pathak", url: siteUrl }],
  creator: "Bhaskar Pathak",
  publisher: "Bhaskar Pathak",
  category: "Design and web development",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Bhaskar Pathak",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Bhaskar Pathak Portfolio",
      description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: title,
      description,
      dateModified: "2026-09-21",
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Bhaskar Pathak",
      givenName: "Bhaskar",
      familyName: "Pathak",
      url: siteUrl,
      image: `${siteUrl}/Bhaskar.webp`,
      email: "mailto:hello@bhaskarjyotipathak.in",
      jobTitle: "Freelance Web Designer and Creative Developer",
      description,
      homeLocation: {
        "@type": "Country",
        name: "India",
      },
      sameAs: ["https://github.com/Bhaskar-J-Pathak"],
      knowsAbout: [
        "Web design",
        "Creative development",
        "Next.js",
        "Frontend development",
        "Interaction design",
        "Motion design",
        "Responsive web development",
        "Art direction",
        "Digital product design",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Web Designer and Creative Developer",
        skills:
          "Web design, creative frontend development, interaction design, motion design, responsive development and art direction",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web design and creative development services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@id": `${siteUrl}/#web-design-service` },
          },
          {
            "@type": "Offer",
            itemOffered: { "@id": `${siteUrl}/#creative-development-service` },
          },
          {
            "@type": "Offer",
            itemOffered: { "@id": `${siteUrl}/#interaction-design-service` },
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#web-design-service`,
      name: "Custom web design",
      description:
        "Distinctive, responsive website design for startups and growing businesses.",
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      serviceType: "Web design",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#creative-development-service`,
      name: "Creative frontend development",
      description:
        "Fast, responsive frontend implementation that preserves the visual direction and interaction details.",
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      serviceType: "Frontend web development",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#interaction-design-service`,
      name: "Motion and interaction design",
      description:
        "Purposeful motion and interaction systems that guide attention and give digital products character.",
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
      serviceType: "Interaction design",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#selected-work`,
      name: "Selected web design and development projects",
      numberOfItems: 5,
      itemListElement: [
        ["Rajdhany Realtors", "Brand direction and web development", "2025", "rajdhany.webp"],
        ["Xvault Studio", "Product design and creative development", "2025", "xvault.webp"],
        ["Spylt", "Brand direction and creative development", "2025", "spylt.webp"],
        ["Lucas Danielsson", "Creative development and 3D interaction", "2025", "lucas.webp"],
        ["Previous Portfolio", "Portfolio design and creative development", "2024", "previous-portfolio.webp"],
      ].map(([name, projectDescription, year, image], index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name,
          description: projectDescription,
          dateCreated: year,
          image: `${siteUrl}/images/projects/${image}`,
          url: `${siteUrl}/#work`,
          creator: { "@id": `${siteUrl}/#person` },
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
