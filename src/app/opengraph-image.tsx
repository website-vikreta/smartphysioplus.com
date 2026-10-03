import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

export const alt = `${clinic.brandName} physiotherapy, Balewadi, Pune`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share image in brand colours. Per-page titles can be added later.
export default function OpengraphImage() {
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
      <div style={{ fontSize: 96, fontWeight: 700, color: "#01689C" }}>
        {clinic.brandName}
      </div>
      <div style={{ fontSize: 44, marginTop: 16 }}>
        Physiotherapy in Balewadi, Pune
      </div>
      <div style={{ fontSize: 32, marginTop: 24, color: "#1CABB0" }}>
        {clinic.tagline}
      </div>
    </div>,
    size,
  );
}
