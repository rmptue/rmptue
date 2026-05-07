import { cn } from "@/lib/cn";

type Props = {
  items: string[];
  limit?: number;
  className?: string;
};

export function TechStack({ items, limit, className }: Props) {
  const shown = limit ? items.slice(0, limit) : items;
  const remainder = limit ? items.length - shown.length : 0;
  return (
    <div className={cn("flex flex-wrap gap-x-2 gap-y-1 text-[11px]", className)}>
      {shown.map((item) => (
        <span
          key={item}
          className="rounded border border-border bg-border/30 px-1.5 py-0.5 text-muted"
        >
          {item}
        </span>
      ))}
      {remainder > 0 && (
        <span className="px-1.5 py-0.5 text-muted">+{remainder}</span>
      )}
    </div>
  );
}
