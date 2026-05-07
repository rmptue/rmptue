import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionLabel } from "@/components/SectionLabel";
import { TerminalCursor } from "@/components/TerminalCursor";
import { CATEGORY_LABEL, getByCategory } from "@/lib/projects";

export default function Home() {
  const groups = getByCategory();
  return (
    <div className="space-y-14 sm:space-y-20">
      <section className="fade-up space-y-3">
        <h1 className="text-[15px] font-medium text-foreground">
          <span className="text-accent">$</span> joshua chua
        </h1>
        <p className="text-foreground/85">
          ai engineer, applied-ai builder
          <TerminalCursor />
        </p>
        <p className="max-w-[60ch] pt-3 leading-[1.7] text-foreground/75">
          i build production claude-powered systems — chiefs of staff,
          correction pipelines, scoring engines, context substrates. each
          project below has a clickable demo and a process flow showing
          how the model fits in.
        </p>
      </section>

      {groups.map(({ category, items }) => (
        <section key={category} className="space-y-5">
          <SectionLabel>{CATEGORY_LABEL[category]}</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <SectionLabel glyph="$">now</SectionLabel>
        <ul className="space-y-2 text-foreground/80">
          <li>
            <span className="text-muted">→</span> igloo engagement — supply
            chain analytics, claude code for pipeline scaffolding (NDA)
          </li>
          <li>
            <span className="text-muted">→</span> mrv gap analysis — public
            research brief, claude as research-synthesis partner
          </li>
          <li>
            <span className="text-muted">→</span> portfolio v2 (this site) —
            interactive demos for every project
          </li>
        </ul>
        <Link
          href="/now"
          className="inline-block pt-1 text-[13px] text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          more →
        </Link>
      </section>

      <footer className="border-t border-border pt-8 text-[13px] text-muted">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="https://github.com/rmptue"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/joshuachua"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            linkedin
          </a>
          <a href="mailto:hello@joshuachua.dev" className="hover:text-accent">
            email
          </a>
          <a
            href="https://altographanalytics.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            altograph
          </a>
        </div>
      </footer>
    </div>
  );
}
