import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const styles = {
  // White on blue-700 = 6:1 contrast. Teal is reserved for focus and accents.
  primary: "bg-sp-blue-700 text-sp-white hover:bg-sp-blue-900",
  secondary:
    "border-2 border-sp-blue-700 bg-sp-white text-sp-blue-900 hover:bg-sp-teal-100",
};

type Props = ComponentProps<typeof Link> & { variant?: keyof typeof styles };

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-2 font-medium transition-colors",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
