import { cn } from "@/lib/cn";

export default function GradientText({
  children,
  purple = false,
  className,
}: {
  children: React.ReactNode;
  purple?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("gradient-text", purple && "gradient-text-purple", className)}>
      {children}
    </span>
  );
}
