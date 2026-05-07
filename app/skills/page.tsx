import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Skills & Prompts",
  description:
    "Custom Claude skills, prompt-engineering case studies, and context-engineering patterns.",
};

export default function SkillsPage() {
  return (
    <div className="fade-up space-y-14">
      <header className="space-y-3">
        <SectionLabel>skills &amp; prompts</SectionLabel>
        <p className="max-w-[64ch] leading-[1.7] text-foreground/80">
          Three working layers of my AI practice: custom Claude skills I&apos;ve
          authored, the specific prompt-engineering tricks that make
          production systems behave, and the context-engineering patterns
          that let small models do work that usually requires large ones.
        </p>
      </header>

      <section className="space-y-5">
        <h2 className="text-[17px] font-medium text-foreground">
          <span className="mr-2 text-accent">1.</span> custom claude skills
        </h2>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            skill-creator usage and patterns
          </h3>
          <p className="text-foreground/85">
            Used Anthropic&apos;s skill-creator skill to author and tune
            personal skills. The interesting pattern is treating the skill
            description as a router contract: terse, trigger-keyword-rich,
            with explicit non-triggers — the description gates whether the
            skill loads, so it has to be sharper than the body.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            jd-analyst skill
          </h3>
          <p className="text-foreground/85">
            A scoring skill for evaluating job postings against multiple
            resume variants. Encodes a fixed rubric, the variant library, and
            the discretion rules for when to apply / skip / save-for-later.
            Triggers on any pasted JD or fit-score language. Powers the Job
            Radar pipeline.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            personalized-AI skill pattern
          </h3>
          <p className="text-foreground/85">
            A skill template that encodes a user&apos;s team-specific
            vocabulary, recurring artifacts, reviewers, and process — the
            pieces that don&apos;t live in the codebase but shape every
            request. Travels with the user&apos;s copy of the skill instead
            of leaking into a shared system prompt.
          </p>
        </article>
      </section>

      <section className="space-y-5">
        <h2 className="text-[17px] font-medium text-foreground">
          <span className="mr-2 text-accent">2.</span> prompt engineering case studies
        </h2>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            allow-list correction prompt (Meeting Copilot)
          </h3>
          <p className="text-foreground/85">
            &quot;Don&apos;t make things up&quot; is a non-instruction. The
            fix: an explicit allow-list of permitted output sections plus a
            hard rule that the model must refuse any section not represented
            in the source chunk. Killed template-fabrication bugs that survived
            three rounds of softer instructions.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            citation-anchored generation (BPS Generator)
          </h3>
          <p className="text-foreground/85">
            For structured-data-to-narrative tasks, the prompt requires every
            quantitative claim to cite the source row inline. A second pass
            programmatically validates that every cited row exists. Unsourced
            claims fail the validator, not just the eyeball test.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            stable rubric scoring (Job Radar)
          </h3>
          <p className="text-foreground/85">
            High-volume scoring drifts. Defenses: frozen system prompt,
            deterministic temperature, a calibration set of 20 hand-scored
            postings re-scored on every prompt change, and divergence-from-
            calibration as the regression metric. Drift gets caught before it
            poisons the corpus.
          </p>
        </article>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            spatial-aware sprite editing (Freedom Park)
          </h3>
          <p className="text-foreground/85">
            Asking a generation model to &quot;edit the bunk-bed sprite&quot;
            failed three ways. The fix was a preservation list (what must not
            change), a viewpoint constraint (forced isometric), and predicted
            spatial conflicts named in the prompt before the model produced
            them. Three iterations to lock the pattern.
          </p>
        </article>
      </section>

      <section className="space-y-5">
        <h2 className="text-[17px] font-medium text-foreground">
          <span className="mr-2 text-accent">3.</span> context engineering patterns
        </h2>

        <article className="space-y-2">
          <h3 className="text-[14px] font-medium text-foreground">
            keyword-routed vault injection
          </h3>
          <p className="text-foreground/85">
            The VANTAGE Vault pattern. A keyword → file map injected via
            userPreferences. When I mention a project, Claude pulls the right
            note without me re-explaining. Deterministic retrieval beats
            semantic search at this size.
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
            higher-leverage use is encoding routing logic — &quot;if the user
            mentions X, load Y first&quot; — so the right context lands in
            the prompt before the model has to ask for it.
          </p>
        </article>
      </section>
    </div>
  );
}
