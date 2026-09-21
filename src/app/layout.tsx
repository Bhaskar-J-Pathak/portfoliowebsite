import type { Metadata } from "next";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bhaskarjyotipathak.in"),
  title: {
    default: "Bhaskar Pathak | Web Designer & Creative Developer",
    template: "%s | Bhaskar Pathak",
  },
  description:
    "Independent web designer and creative developer building distinctive, fast and responsive websites for startups and growing businesses worldwide.",
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
  authors: [{ name: "Bhaskar Pathak", url: "https://bhaskarjyotipathak.in" }],
  creator: "Bhaskar Pathak",
  publisher: "Bhaskar Pathak",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Bhaskar Pathak",
    title: "Bhaskar Pathak | Web Designer & Creative Developer",
    description:
      "Distinctive digital experiences designed and developed for startups and growing businesses worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhaskar Pathak | Web Designer & Creative Developer",
    description:
      "Distinctive digital experiences designed and developed for startups and growing businesses worldwide.",
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
  "@type": "Person",
  name: "Bhaskar Pathak",
  url: "https://bhaskarjyotipathak.in",
  email: "mailto:hello@bhaskarjyotipathak.in",
  jobTitle: "Web Designer and Creative Developer",
  knowsAbout: [
    "Web design",
    "Creative development",
    "Next.js",
    "Interaction design",
    "Responsive web development",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
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
