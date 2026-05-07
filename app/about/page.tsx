import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About",
  description: "Applied AI engineer with analytics roots.",
};

export default function AboutPage() {
  return (
    <div className="fade-up space-y-10">
      <SectionLabel>about</SectionLabel>

      <section className="space-y-4 leading-[1.75] text-foreground/85">
        <p>
          Applied AI engineer with analytics roots. Multi-role analytics
          professional across marketing, call-center operations, healthcare
          operations, SaaS, and ESG — now shipping production Claude-powered
          systems for the same analytics-shaped problems I used to solve with
          dashboards.
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
              href="mailto:chuajoshuaalto@gmail.com"
              className="text-accent underline-offset-4 hover:underline"
            >
              chuajoshuaalto@gmail.com
            </a>
          </li>
          <li>
            <span className="text-muted">linkedin </span>
            <a
              href="https://www.linkedin.com/in/jachua3/"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              /in/jachua3
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
