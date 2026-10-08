import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const styles = {
  // White on blue-900 edge/blue-700 face = 6:1+ contrast. Teal is reserved for focus and accents.
  primary: "",
  secondary: "sp-btn-alt",
  // For dark blue surfaces.
  light: "sp-btn-white",
};

/** Face + edge + base layers for .sp-btn. Use inside any element with that class. */
export function PushLayers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="sp-btn-top">{children}</span>
      <span className="sp-btn-bottom" />
      <span className="sp-btn-base" />
    </>
  );
}

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
        "sp-btn",
        styles[variant],
        className,
      )}
      {...props}
    >
      <PushLayers>
        {icon && <Icon name={icon} />}
        {children}
      </PushLayers>
    </Link>
  );
}
