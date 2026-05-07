import { ProjectCard } from "@/components/ProjectCard";
import { TerminalCursor } from "@/components/TerminalCursor";
import { CATEGORY_LABEL, getByCategory } from "@/lib/projects";

export default function Home() {
  const groups = getByCategory();
  return (
    <div className="space-y-14">
      <section className="fade-up max-w-[860px] space-y-5 pb-2">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-accent">
          $ joshua chua · ai engineer
        </p>
        <h1 className="text-[24px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[30px] lg:text-[36px]">
          Production AI systems —{" "}
          <span className="text-foreground/55">
            chiefs of staff, correction pipelines, scoring engines.
          </span>
          <TerminalCursor />
        </h1>
        <p className="max-w-[62ch] text-[14.5px] leading-[1.65] text-foreground/65 sm:text-[15.5px]">
          Each project below ships with a clickable demo and a process flow
          showing where the model fits. Click into any one — they&apos;re
          mockups, but they show the real architecture.
        </p>

        <div className="space-y-2 pt-3 font-mono text-[11.5px]">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="shrink-0 text-accent">› models</span>
            {[
              "anthropic claude",
              "openai gpt",
              "gemini",
              "llama 3.1",
              "nemotron 3",
              "kimi k2",
              "qwen 3",
              "qwen 2.5",
              "deepseek r1",
              "gemma 4",
              "granite 4",
              "ibm bob",
            ].map((m, i, arr) => (
              <span key={m} className="text-foreground/75">
                {m}
                {i < arr.length - 1 && (
                  <span className="px-1.5 text-muted">·</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="shrink-0 text-accent">› tools</span>
            {[
              "claude code",
              "claude skills",
              "mcp",
              "ollama",
              "n8n",
              "supabase",
              "railway",
              "obsidian",
              "godot",
            ].map((t, i, arr) => (
              <span key={t} className="text-foreground/75">
                {t}
                {i < arr.length - 1 && (
                  <span className="px-1.5 text-muted">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
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
