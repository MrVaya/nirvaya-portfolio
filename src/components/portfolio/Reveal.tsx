"use client";

import { cn } from "@/lib/cn";
import { useReveal } from "@/hooks/useReveal";

export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
