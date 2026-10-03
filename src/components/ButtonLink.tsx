import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const styles = {
  // White on blue-700 = 6:1 contrast. Teal is reserved for focus, tints and accents.
  primary: "bg-sp-blue-700 text-sp-white hover:bg-sp-blue-900",
  secondary: "sp-btn-line",
  // For dark blue surfaces.
  light: "bg-sp-white text-sp-blue-900 hover:bg-sp-teal-100",
};

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof styles;
  icon?: IconName;
};

export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: Props) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 sp-btn px-8 py-2 font-medium",
        styles[variant],
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} />}
      {children}
    </Link>
  );
}
