import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About",
  description: "AI engineer and applied-AI builder.",
};

export default function AboutPage() {
  return (
    <div className="fade-up space-y-10">
      <SectionLabel>about</SectionLabel>

      <section className="space-y-4 leading-[1.75] text-foreground/85">
        <p>
          AI engineer and applied-AI builder. Multi-role analytics
          professional in healthcare and DTC ecommerce, shipping production
          Claude-powered systems on the side.
        </p>
        <p>
          What I&apos;m interested in: context engineering, multi-model
          pipelines, agent design, and the boundary between deterministic
          systems and LLM judgment — when to use the model, when to use a
          parser, when to use a human.
        </p>
        <p>
          Background: BS Forestry, UPLB (2021). MBA, San Beda (2025).
          Currently doing MBA-adjacent graduate work in data science.
          Licensed Forester.
        </p>
      </section>

      <section className="space-y-3">
        <SectionLabel glyph="$">reach me</SectionLabel>
        <ul className="space-y-1.5 text-foreground/85">
          <li>
            <span className="text-muted">email </span>
            <a
              href="mailto:hello@joshuachua.dev"
              className="text-accent underline-offset-4 hover:underline"
            >
              hello@joshuachua.dev
            </a>
          </li>
          <li>
            <span className="text-muted">linkedin </span>
            <a
              href="https://linkedin.com/in/joshuachua"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              /in/joshuachua
            </a>
          </li>
          <li>
            <span className="text-muted">github </span>
            <a
              href="https://github.com/rmptue"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              /rmptue
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
