import Link from "next/link";
import type { Project } from "@/lib/projects";
import { TechStack } from "./TechStack";

const STATUS_COLOR: Record<Project["status"], string> = {
  live: "text-accent",
  active: "text-accent",
  shipped: "text-foreground/80",
  "in-progress": "text-foreground/80",
  archived: "text-muted",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded border border-border bg-border/10 p-5 transition-colors hover:border-accent/40 hover:bg-border/20"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span
          className={`text-[11px] uppercase tracking-wide ${STATUS_COLOR[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-[13px] leading-[1.65] text-foreground/80">
        {project.oneliner}
      </p>
      <TechStack items={project.stack} limit={3} className="mt-auto" />
    </Link>
  );
}
