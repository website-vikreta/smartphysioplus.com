"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

// Fades and lifts its children in once, when they scroll into view.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
