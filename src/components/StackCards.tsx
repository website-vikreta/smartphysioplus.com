"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export type StackItem = { key: string; content: ReactNode };

function StackCard({
  item,
  i,
  n,
  progress,
}: {
  item: StackItem;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks a little as later cards slide over it.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i) * 0.04]);
  return (
    <li className="sticky" style={{ top: `${6 + i * 1.25}rem` }}>
      <motion.div style={{ scale, transformOrigin: "top center" }}>
        {item.content}
      </motion.div>
    </li>
  );
}

// Cards pin to the top and stack as you scroll down the list.
export function StackCards({ items }: { items: StackItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <ol ref={ref} className="space-y-8">
      {items.map((item, i) => (
        <StackCard
          key={item.key}
          item={item}
          i={i}
          n={items.length}
          progress={scrollYProgress}
        />
      ))}
    </ol>
  );
}

// Numbered card body for StackCards: optional photo on the left, text on the right.
export function StackPanel({
  n,
  title,
  image,
  children,
}: {
  n: number;
  title: string;
  image?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div
      className={`sp-card grid overflow-hidden !p-0 shadow-xl ${image ? "md:grid-cols-2" : ""}`}
    >
      {image}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sp-blue-700 font-display text-lg font-semibold text-sp-white">
            {n}
          </span>
          <h3 className="text-lg font-semibold text-sp-blue-900">{title}</h3>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
