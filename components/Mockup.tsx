import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  title?: string;
  variant?: "browser" | "phone" | "terminal" | "discord";
  className?: string;
};

export function Mockup({
  children,
  title,
  variant = "browser",
  className,
}: Props) {
  const isPhone = variant === "phone";
  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-lg border border-border bg-[#0d0d0d] shadow-lg shadow-black/40",
        isPhone && "mx-auto max-w-[340px] rounded-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-border bg-[#1a1a1a] px-3 py-2 text-[11px] text-muted",
          isPhone && "justify-center",
        )}
      >
        {!isPhone && (
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
            <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
          </div>
        )}
        <div className={cn(isPhone ? "" : "ml-2")}>
          {title ?? (variant === "discord" ? "discord · #vantage" : "preview")}
        </div>
      </div>
      <div className={cn("p-4 text-[13px] leading-[1.6]", isPhone && "p-3")}>
        {children}
      </div>
    </div>
  );
}
