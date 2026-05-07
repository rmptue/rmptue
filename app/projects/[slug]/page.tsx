import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { TechStack } from "@/components/TechStack";
import { getDemoFor } from "@/components/demos";
import { getAllSlugs, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneliner,
    openGraph: {
      title: `${project.title} · Joshua Chua`,
      description: project.oneliner,
    },
  };
}

const STATUS_LABEL: Record<string, string> = {
  live: "live",
  active: "active",
  shipped: "shipped",
  concept: "concept",
  prototype: "prototype",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Demo = getDemoFor(slug);
  const { default: Body } = await import(`@/content/projects/${slug}.mdx`);

  return (
    <article className="fade-up space-y-8">
      <header className="space-y-4 border-b border-border pb-8">
        <Link
          href="/"
          className="inline-block text-[13px] text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          ← projects
        </Link>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-[26px] font-medium tracking-tight text-foreground">
            {project.title}
          </h1>
          <span className="text-[11px] uppercase tracking-wide text-accent">
            {STATUS_LABEL[project.status] ?? project.status}
          </span>
        </div>
        <p className="max-w-[64ch] leading-[1.7] text-foreground/80">
          {project.oneliner}
        </p>
        <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-1.5 pt-2 text-[13px] text-muted">
          <span>role</span>
          <span className="text-foreground/80">{project.role}</span>
          <span>year</span>
          <span className="text-foreground/80">{project.year}</span>
        </div>
        <TechStack items={project.stack} className="pt-2" />
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2 text-[13px]">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      {project.hero && !Demo && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Image
            src={project.hero}
            alt={`${project.title} screenshot`}
            width={1366}
            height={768}
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      {Demo && (
        <section className="space-y-3">
          <SectionLabel>demo</SectionLabel>
          <Demo />
        </section>
      )}

      {project.ai_components.length > 0 && (
        <section className="space-y-3">
          <SectionLabel>ai components</SectionLabel>
          <ul className="space-y-1.5 text-foreground/85">
            {project.ai_components.map((c) => (
              <li key={c}>
                <span className="text-muted">—</span> {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <Body />
      </section>
    </article>
  );
}
