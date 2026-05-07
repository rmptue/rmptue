import Link from "next/link";
import type { Project } from "@/lib/projects";

const STATUS_DOT: Record<Project["status"], string> = {
  live: "bg-accent",
  active: "bg-accent",
  shipped: "bg-foreground/60",
  prototype: "bg-amber-300",
  concept: "bg-muted",
};

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "live",
  active: "active",
  shipped: "shipped",
  prototype: "prototype",
  concept: "currently building",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col gap-3 rounded-md border border-border bg-[#131211] p-4 transition-all hover:border-accent/50 hover:bg-[#181715]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wide text-muted">
          <span className={`size-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
          {STATUS_LABEL[project.status]}
        </div>
      </div>
      <p className="text-[13px] leading-[1.55] text-foreground/70">
        {project.oneliner}
      </p>
      <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-1 font-mono text-[10.5px] text-muted">
        {project.stack.slice(0, 3).map((s) => (
          <span key={s}>{s}</span>
        ))}
        {project.stack.length > 3 && <span>+{project.stack.length - 3}</span>}
      </div>
    </Link>
  );
}
