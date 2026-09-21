import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User"],
        allow: "/",
      },
    ],
    sitemap: "https://bhaskarjyotipathak.in/sitemap.xml",
    host: "https://bhaskarjyotipathak.in",
  };
}
