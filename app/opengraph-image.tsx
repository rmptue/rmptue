import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Joshua Chua — Applied AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0c0b0a",
          color: "#ebe7e0",
          fontFamily: "monospace",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", color: "#5fd9e8", fontSize: 26 }}>
          $ joshua chua · applied ai engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 60, fontWeight: 500, lineHeight: 1.1 }}>
            production ai systems
            <br />
            <span style={{ color: "#807a72" }}>
              for analytics-shaped problems.
            </span>
          </div>
          <div style={{ fontSize: 26, color: "#807a72", maxWidth: 1000 }}>
            chiefs of staff · scoring engines · narrative pipelines · context substrates
          </div>
        </div>
        <div style={{ display: "flex", color: "#807a72", fontSize: 22 }}>
          rmptue.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
