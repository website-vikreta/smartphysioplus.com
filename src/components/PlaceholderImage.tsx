import Image from "next/image";

const svgs: string[] = ["portrait"];

// Design-only image. Every file used here is listed in PLACEHOLDERS.md and must be replaced with a real photo.
export function PlaceholderImage({
  name,
  alt,
  width = 800,
  height = 600,
  className,
}: {
  name:
    | "portrait"
    | "shoulder"
    | "leg"
    | "back"
    | "spine"
    | "exercise"
    | `tech-${2 | 3 | 4 | 5 | 6}`;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/images/placeholder/${name}.${svgs.includes(name) ? "svg" : "jpg"}`}
      alt={alt}
      width={width}
      height={height}
      data-placeholder="true"
      className={className}
    />
  );
}
