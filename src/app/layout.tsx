import type { Metadata } from "next";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhaskar Pathak | Designer & Developer",
  description: "Digital experiences with a pulse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
