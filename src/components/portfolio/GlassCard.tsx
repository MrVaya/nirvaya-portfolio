import { cn } from "@/lib/cn";

export default function GlassCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  return <Tag className={cn("glass-card", className)}>{children}</Tag>;
}
