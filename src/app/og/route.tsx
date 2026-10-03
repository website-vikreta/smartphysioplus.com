import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

// Per-page share image: brand colours plus the page title (?title=...).
export function GET(request: Request) {
  const title = (
    new URL(request.url).searchParams.get("title") ?? clinic.tagline
  ).slice(0, 90);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#F4F9FB",
        color: "#013F5F",
      }}
    >
      <div style={{ fontSize: 40, color: "#01689C" }}>{clinic.brandName}</div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          marginTop: 24,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 30, marginTop: 32, color: "#1CABB0" }}>
        {clinic.tagline}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
