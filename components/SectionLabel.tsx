import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  glyph?: ">" | "$";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionLabel({
  children,
  glyph = ">",
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <Tag
      className={cn(
        "text-[13px] font-medium tracking-tight text-muted",
        className,
      )}
    >
      <span className="mr-2 text-accent">{glyph}</span>
      {children}
    </Tag>
  );
}
