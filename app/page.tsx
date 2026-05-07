import { ProjectCard } from "@/components/ProjectCard";
import { TerminalCursor } from "@/components/TerminalCursor";
import { CATEGORY_LABEL, getByCategory } from "@/lib/projects";

export default function Home() {
  const groups = getByCategory();
  return (
    <div className="space-y-14">
      <section className="fade-up max-w-[820px] space-y-5 pb-2">
        <p className="font-mono text-[12px] uppercase tracking-wide text-accent">
          $ joshua chua · ai engineer
        </p>
        <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[44px] lg:text-[52px]">
          Production Claude-powered systems —
          <br />
          <span className="text-foreground/55">
            chiefs of staff, correction pipelines, scoring engines.
          </span>
          <TerminalCursor />
        </h1>
        <p className="max-w-[60ch] text-[15px] leading-[1.65] text-foreground/65 sm:text-[16px]">
          Each project below ships with a clickable demo and a process flow
          showing where the model fits. Click into any one — they&apos;re
          mockups, but they show the real architecture.
        </p>
      </section>

      <div id="projects" className="space-y-12">
        {groups.map(({ category, items }) =>
          items.length === 0 ? null : (
            <section key={category} className="space-y-4">
              <div className="flex items-baseline gap-3 border-b border-border pb-2">
                <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
                  ›
                </span>
                <h2 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                  {CATEGORY_LABEL[category]}
                </h2>
                <span className="ml-auto font-mono text-[11px] text-muted">
                  {items.length}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ),
        )}
      </div>

      <footer className="border-t border-border pt-6 font-mono text-[12px] text-muted">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="https://github.com/rmptue"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/jachua3/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            linkedin
          </a>
          <a
            href="mailto:chuajoshuaalto@gmail.com"
            className="hover:text-accent"
          >
            email
          </a>
        </div>
      </footer>
    </div>
  );
}
