import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Now",
  description: "Currently building.",
};

export default function NowPage() {
  return (
    <div className="fade-up space-y-10">
      <header className="space-y-2">
        <SectionLabel glyph="$">now building</SectionLabel>
        <p className="text-muted text-[13px]">last updated 2026-05-08</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-[15px] font-medium text-foreground">
          igloo engagement
        </h2>
        <p className="text-foreground/85">
          Supply chain analytics for an active client. Using Claude Code for
          pipeline scaffolding and data-quality automation. NDA — no client
          name, no team. May 2026 deliverable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-medium text-foreground">
          portfolio v2 (this site)
        </h2>
        <p className="text-foreground/85">
          Interactive demo for every project, process flow diagrams, and
          category grouping. Demos are clickable mockups — not the actual
          tool, but enough to show how the UI flows.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-medium text-foreground">
          mrv gap analysis
        </h2>
        <p className="text-foreground/85">
          Public research brief on PH climate measurement infrastructure.
          Claude as research-synthesis partner across 30+ source documents —
          structured extraction, source attribution, draft narrative.
        </p>
      </section>
    </div>
  );
}
