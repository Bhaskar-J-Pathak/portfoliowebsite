import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bhaskarjyotipathak.in",
      lastModified: "2026-09-21",
      changeFrequency: "monthly",
      priority: 1,
      images: [
        "https://bhaskarjyotipathak.in/images/projects/xvault.webp",
        "https://bhaskarjyotipathak.in/images/projects/rajdhany.webp",
        "https://bhaskarjyotipathak.in/images/projects/spylt.webp",
        "https://bhaskarjyotipathak.in/images/projects/lucas.webp",
        "https://bhaskarjyotipathak.in/images/projects/previous-portfolio.webp",
      ],
    },
  ];
}
