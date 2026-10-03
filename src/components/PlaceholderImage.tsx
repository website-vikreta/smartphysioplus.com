import Image from "next/image";

// Design-only image. Every file used here is listed in PLACEHOLDERS.md and must be replaced with a real photo.
export function PlaceholderImage({
  name,
  alt,
  width = 800,
  height = 600,
  className,
}: {
  name: "portrait" | "clinic" | "equipment";
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/images/placeholder/${name}.svg`}
      alt={alt}
      width={width}
      height={height}
      data-placeholder="true"
      className={className}
    />
  );
}
