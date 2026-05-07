import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Prompts & Patterns",
  description:
    "Prompt-engineering case studies and context-engineering patterns from production Claude systems.",
};

export default function SkillsPage() {
  return (
    <div className="fade-up space-y-14">
      <header className="space-y-3">
        <SectionLabel>prompts &amp; patterns</SectionLabel>
        <p className="max-w-[64ch] leading-[1.7] text-foreground/80">
          The prompt-engineering moves that make production Claude systems
          behave, plus the context-engineering patterns that let small models
          do work that usually requires large ones. Drawn from the projects
          on the homepage.
        </p>
      </header>

      <section className="space-y-5">
        <h2 className="text-[17px] font-medium text-foreground">
          <span className="mr-2 text-accent">1.</span> prompt engineering case studies
        </h2>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            allow-list correction prompt (Meeting Copilot)
          </h3>
          <p className="text-foreground/85">
            &quot;Don&apos;t make things up&quot; is a non-instruction. The
            fix: an explicit allow-list of permitted output sections plus a
            hard rule that the model must refuse any section not represented
            in the source chunk. Killed template-fabrication bugs that
            survived three rounds of softer instructions.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            citation-anchored generation (BPS Generator, MRV Gap Analysis)
          </h3>
          <p className="text-foreground/85">
            For structured-data-to-narrative tasks, the prompt requires every
            quantitative claim to cite the source row inline. A second pass
            programmatically validates that every cited row exists. Unsourced
            claims fail the validator, not just the eyeball test. Same
            pattern carries into the MRV brief, where every gap statement
            carries a source paragraph.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            stable rubric scoring (Job Radar, Talent Sourcer)
          </h3>
          <p className="text-foreground/85">
            High-volume scoring drifts. Defenses: frozen system prompt,
            deterministic temperature, a calibration set of 20 hand-scored
            items re-scored on every prompt change, and divergence-from-
            calibration as the regression metric. Drift gets caught before
            it poisons the corpus.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            spatial-aware sprite editing (Freedom Park)
          </h3>
          <p className="text-foreground/85">
            Asking a generation model to &quot;edit the bunk-bed sprite&quot;
            failed three ways. The fix was a preservation list (what must
            not change), a viewpoint constraint (forced isometric), and
            predicted spatial conflicts named in the prompt before the model
            produced them. Three iterations to lock the pattern.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            voice-register split (Talent Sourcer)
          </h3>
          <p className="text-foreground/85">
            Outreach drafts in three voice registers — warm, direct,
            peer-to-peer — from the same candidate context. Most outreach
            reads recruiter-formal because the sender is a recruiter and
            that&apos;s their natural register. Naming the register
            explicitly in the prompt unlocks the others cleanly.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            &quot;not stated in source&quot; (MRV Gap Analysis)
          </h3>
          <p className="text-foreground/85">
            Without it, the model fills extraction gaps with plausible-sounding
            inference. With it, gaps stay gaps — which is exactly what a gap
            analysis needs. A magic phrase for any structured-extraction
            workload.
          </p>
        </article>
      </section>

      <section className="space-y-5">
        <h2 className="text-[17px] font-medium text-foreground">
          <span className="mr-2 text-accent">2.</span> context engineering patterns
        </h2>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            keyword-routed vault injection (Vault)
          </h3>
          <p className="text-foreground/85">
            A keyword → file map injected via userPreferences. When I mention
            a project, Claude pulls the right note without me re-explaining.
            Deterministic retrieval beats semantic search at this size.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            github-synced markdown as personal RAG substrate
          </h3>
          <p className="text-foreground/85">
            Vault lives in git, syncs to Railway, gets read by the VANTAGE
            bot at request time. No vector DB, no embedding pipeline,
            human-readable diffs, and reproducible behavior across machines.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            userPreferences as a router, not a config
          </h3>
          <p className="text-foreground/85">
            Most uses of userPreferences encode style preferences. The
            higher-leverage use is encoding routing logic — &quot;if the
            user mentions X, load Y first&quot; — so the right context lands
            in the prompt before the model has to ask for it.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            haiku-routes-to-sonnet (Sentinel)
          </h3>
          <p className="text-foreground/85">
            Haiku classifies first; only response-warranting messages reach
            Sonnet. Drops cost by an order of magnitude versus naive Sonnet-
            on-everything, without measurably hurting draft quality where
            it matters.
          </p>
        </article>
      </section>
    </div>
  );
}
