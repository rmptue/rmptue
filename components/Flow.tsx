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
        "my-6 flex gap-2 rounded-md border border-border bg-[#131211] p-4",
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
              isVertical ? "w-full text-center" : "min-w-[148px] text-center",
              n.highlight
                ? "border-accent/70 bg-[#0e1f23] text-accent"
                : "border-border bg-[#1a1816] text-foreground/90",
            )}
          >
            <div className="font-medium">{n.label}</div>
            {n.sub && (
              <div
                className={cn(
                  "mt-0.5 font-mono text-[10.5px]",
                  n.highlight ? "text-accent/85" : "text-muted",
                )}
              >
                {n.sub}
              </div>
            )}
          </div>
          {i < nodes.length - 1 && (
            <div
              className={cn(
                "shrink-0 text-muted",
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
