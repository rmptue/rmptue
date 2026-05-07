import { ProjectCard } from "@/components/ProjectCard";
import { SectionLabel } from "@/components/SectionLabel";
import { TerminalCursor } from "@/components/TerminalCursor";
import { CATEGORY_LABEL, getByCategory } from "@/lib/projects";

export default function Home() {
  const groups = getByCategory();
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="fade-up max-w-[760px] space-y-5">
        <p className="font-mono text-[13px] text-accent">$ joshua chua</p>
        <h1 className="text-[34px] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[44px]">
          AI engineer building production
          <br />
          Claude-powered systems.
          <TerminalCursor />
        </h1>
        <p className="max-w-[58ch] text-[16px] leading-[1.7] text-foreground/75 sm:text-[17px]">
          Chiefs of staff, correction pipelines, scoring engines, context
          substrates. Each project below has a clickable demo and a process
          flow showing how the model fits in.
        </p>
      </section>

      <div id="projects" className="space-y-16 sm:space-y-20">
        {groups.map(({ category, items }) =>
          items.length === 0 ? null : (
            <section key={category} className="space-y-6">
              <SectionLabel>{CATEGORY_LABEL[category]}</SectionLabel>
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ),
        )}
      </div>

      <footer className="border-t border-border pt-8 font-mono text-[13px] text-muted">
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
            ccet explorer
          </a>
        </div>
      </footer>
    </div>
  );
}
