import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://bhaskarjyotipathak.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-09-24",
      changeFrequency: "monthly",
      priority: 1,
      images: projects.map((project) => siteUrl + project.image),
    },
    ...projects.map((project) => ({
      url: siteUrl + "/work/" + project.slug,
      lastModified: "2026-09-24",
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [siteUrl + project.desktopImage],
    })),
  ];
}
