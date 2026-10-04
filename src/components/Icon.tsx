import type { SVGProps } from "react";
import { siFacebook, siInstagram, siWhatsapp } from "simple-icons";

// Small inline icon set (24px, stroke). Decorative by default: pair with visible text.
const paths = {
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2",
  check: "M5 12.5l4.5 4.5L19 7.5",
  calendar:
    "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm0 4h16M8 3v4m8-4v4",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  chevron: "M6 9l6 6 6-6",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z",
  shield:
    "M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Zm-3 9 2.2 2.2L15.5 10",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  spine: "M12 3v2m0 3v2m0 3v2m0 3v2m0 3v1M9 5h6M8.5 10h7M8 15h8M9 20h6",
  joint: "M8 3v6a3 3 0 0 0 6 0V3M8 21v-6a3 3 0 0 1 6 0v6",
  brain:
    "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4a3 3 0 0 0-3 0Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1",
  rehab: "M12 4a2 2 0 1 0 0 .01ZM8 21l2-7-3-3 4-3 3 2 3-1m-6 5 4 2v5",
  bolt: "M13 3 5 13h6l-1 8 8-10h-6l1-8Z",
  hands:
    "M7 12V6a1.5 1.5 0 0 1 3 0v5m0-6a1.5 1.5 0 0 1 3 0v6m0-5a1.5 1.5 0 0 1 3 0v7a6 6 0 0 1-6 6h-1a5 5 0 0 1-4-2l-3-4 1.5-1.5L7 15",
  heart:
    "M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "size-5",
  ...rest
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}

// Round tinted icon holder used on cards.
export function IconBadge({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex size-12 items-center justify-center rounded-full bg-sp-teal-100 text-sp-blue-700 ${className}`}
    >
      <Icon name={name} className="size-6" />
    </span>
  );
}

// Full-colour brand marks (simple-icons paths). Decorative: pair with a label.
const brands = {
  whatsapp: { path: siWhatsapp.path, fill: "#25D366" },
  facebook: { path: siFacebook.path, fill: "#0866FF" },
  instagram: { path: siInstagram.path, fill: "url(#sp-ig)" },
};

export type BrandName = keyof typeof brands;

export function BrandLogo({
  name,
  className = "size-5",
}: {
  name: BrandName;
  className?: string;
}) {
  const b = brands[name];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={b.fill}
    >
      {name === "instagram" && (
        <defs>
          <linearGradient id="sp-ig" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA77" />
            <stop offset="0.35" stopColor="#F58529" />
            <stop offset="0.6" stopColor="#DD2A7B" />
            <stop offset="1" stopColor="#515BD4" />
          </linearGradient>
        </defs>
      )}
      <path d={b.path} />
    </svg>
  );
}
