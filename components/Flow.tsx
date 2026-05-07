import { cn } from "@/lib/cn";

type Node = {
  label: string;
  sub?: string;
  highlight?: boolean;
};

type Props = {
  nodes: Node[];
  className?: string;
  direction?: "down" | "right";
};

export function Flow({ nodes, className, direction = "down" }: Props) {
  const isVertical = direction === "down";
  return (
    <div
      className={cn(
        "my-6 flex gap-2",
        isVertical
          ? "flex-col items-stretch"
          : "flex-row items-stretch overflow-x-auto",
        className,
      )}
    >
      {nodes.map((n, i) => (
        <div
          key={i}
          className={cn(
            "flex",
            isVertical ? "flex-col items-center" : "flex-row items-center",
          )}
        >
          <div
            className={cn(
              "rounded border px-3 py-2 text-[12px] leading-tight",
              isVertical ? "w-full text-center" : "min-w-[140px] text-center",
              n.highlight
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-border bg-border/30 text-foreground/85",
            )}
          >
            <div className="font-medium">{n.label}</div>
            {n.sub && (
              <div
                className={cn(
                  "mt-0.5 text-[10.5px]",
                  n.highlight ? "text-accent/80" : "text-muted",
                )}
              >
                {n.sub}
              </div>
            )}
          </div>
          {i < nodes.length - 1 && (
            <div
              className={cn(
                "text-muted",
                isVertical ? "py-1 text-center" : "px-2",
              )}
              aria-hidden
            >
              {isVertical ? "↓" : "→"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
