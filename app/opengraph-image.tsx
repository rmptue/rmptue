import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Joshua Chua — AI engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#e5e5e5",
          fontFamily: "monospace",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", color: "#22d3ee", fontSize: 28 }}>
          $ joshua chua
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 500, lineHeight: 1.1 }}>
            ai engineer,
            <br />
            applied-ai builder.
          </div>
          <div style={{ fontSize: 28, color: "#737373", maxWidth: 900 }}>
            production claude-powered systems — chiefs of staff,
            correction pipelines, scoring engines, context substrates.
          </div>
        </div>
        <div style={{ display: "flex", color: "#737373", fontSize: 22 }}>
          rmptue.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
