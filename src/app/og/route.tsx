import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

// Per-page share image: the logo plus the page title (?title=...).
export async function GET(request: Request) {
  const title = (
    new URL(request.url).searchParams.get("title") ?? clinic.tagline
  ).slice(0, 90);
  const logo = await readFile(
    path.join(process.cwd(), "public/brand/logo.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "56px 80px 0",
        background: "#FFFFFF",
        color: "#013F5F",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain img only */}
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={900}
        height={201}
        alt=""
      />
      <div
        style={{
          width: 1200,
          height: 190,
          margin: "0 -80px",
          padding: "0 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "#DDF4F5",
          fontSize: title.length > 40 ? 52 : 64,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
