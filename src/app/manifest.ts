import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bhaskar Pathak | Web Designer and Creative Developer",
    short_name: "Bhaskar Pathak",
    description:
      "Independent web designer and creative developer building distinctive websites for clients worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f1ed",
    theme_color: "#f2f1ed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
