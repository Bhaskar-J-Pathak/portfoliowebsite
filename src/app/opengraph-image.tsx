import { ImageResponse } from "next/og";

export const alt =
  "Bhaskar Pathak, freelance web designer and creative developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 70px 60px",
          color: "#171717",
          background: "#f2f1ed",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          <span>Bhaskar Pathak</span>
          <span>Designer + Developer</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1020,
              fontSize: 92,
              fontWeight: 500,
              letterSpacing: -5,
              lineHeight: 0.94,
            }}
          >
            Building digital experiences that feel intentional.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 48,
              paddingTop: 22,
              borderTop: "2px solid #171717",
              fontSize: 20,
            }}
          >
            <span>Web design · Creative development · Interaction</span>
            <span>India, working globally</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
