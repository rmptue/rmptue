"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const STAGES = ["1 · brief", "2 · queries", "3 · candidates", "4 · outreach"] as const;
type Stage = (typeof STAGES)[number];

const QUERIES = [
  {
    label: "precision",
    q: '"Head of Sales" AND ("Series A" OR "Series B") AND ("PLG" OR "product-led") AND -"recruiter"',
  },
  {
    label: "balanced",
    q: '("Head of Sales" OR "VP Sales") AND ("startup" OR "SaaS") AND ("PLG" OR "self-serve")',
  },
  {
    label: "recall",
    q: '("Sales Lead" OR "Sales Director" OR "Head of Sales") AND ("SaaS" OR "B2B")',
  },
];

const CANDIDATES = [
  {
    name: "M. Reyes",
    role: "Head of Sales · seed-stage SaaS",
    score: 91,
    why: "evidence of building a sales team from scratch at 2 prior cos. PLG-native, last role bridged from self-serve to enterprise.",
  },
  {
    name: "K. Tanaka",
    role: "VP Sales · Series B PLG",
    score: 86,
    why: "right stage match, scaled team from 4 → 22 in 18 months. Slight risk: long tenure suggests less resilience to early-stage chaos.",
  },
  {
    name: "A. Cole",
    role: "Sales Director · Series A",
    score: 78,
    why: "good motion, has hit quota in 3 consecutive roles. Title is a step below ask but trajectory is clear.",
  },
  {
    name: "J. Park",
    role: "Head of Growth · Series C",
    score: 64,
    why: "strong PLG operator but role is growth-shaped not sales-shaped — the transition risk is real.",
  },
];

const REGISTERS = ["warm", "direct", "peer-to-peer"] as const;
type Register = (typeof REGISTERS)[number];

const OUTREACH: Record<Register, string> = {
  warm:
    "hi M — saw your work scaling the team at [prior co], especially the bridge from self-serve to enterprise. we&apos;re building something in an adjacent space and i&apos;d love 20 minutes to compare notes. no pitch unless we both want one. — j",
  direct:
    "Hi M — exploring Head of Sales for a Series-A PLG company (15 ppl, $2M ARR, growing 18% MoM). Comp band $260–290 base + 0.4–0.8% equity. Open to a 30-minute conversation this or next week?",
  "peer-to-peer":
    "M — quick one. building a sales motion from zero at a PLG-native co; you&apos;ve done this twice now. would you take a call to tell me what you&apos;d do differently the third time? happy to swap notes on what i&apos;m seeing on the buyer side. j",
};

export default function TalentSourcerDemo() {
  const [stage, setStage] = useState<Stage>("1 · brief");
  const [register, setRegister] = useState<Register>("warm");
  const [activeCand, setActiveCand] = useState(0);

  return (
    <>
      <Mockup title="talent sourcer · venture studio · head of sales">
        <div className="mb-4 flex flex-wrap gap-1 text-[11px]">
          {STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`rounded px-2.5 py-1 transition-colors ${
                s === stage
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {stage === "1 · brief" && (
          <div className="space-y-3 text-[12.5px]">
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <span className="text-muted">role</span>
              <span className="text-foreground/90">Head of Sales</span>
              <span className="text-muted">company stage</span>
              <span className="text-foreground/90">Series A · PLG SaaS</span>
              <span className="text-muted">team size</span>
              <span className="text-foreground/90">15 (you would be #16)</span>
              <span className="text-muted">must-haves</span>
              <span className="text-foreground/90">
                built from 0→1, PLG → enterprise bridge experience
              </span>
              <span className="text-muted">nice-to-haves</span>
              <span className="text-foreground/90">
                B2B SaaS, founder-led-sales transition
              </span>
              <span className="text-muted">exclusions</span>
              <span className="text-foreground/90">
                pure enterprise sellers, late-stage-only operators
              </span>
            </div>
            <button
              onClick={() => setStage("2 · queries")}
              className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] text-accent hover:bg-accent/20"
            >
              → generate boolean searches
            </button>
          </div>
        )}

        {stage === "2 · queries" && (
          <div className="space-y-3">
            <div className="text-[11px] text-muted">
              claude generated 3 variants — precision-first to recall-first
            </div>
            {QUERIES.map((q, i) => (
              <div
                key={i}
                className="rounded border border-border bg-border/20 p-3"
              >
                <div className="mb-1.5 flex items-center justify-between text-[11px]">
                  <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">
                    {q.label}
                  </span>
                  <span className="text-muted">
                    expected returns: {[12, 38, 142][i]}
                  </span>
                </div>
                <code className="block break-all text-[11.5px] text-foreground/85">
                  {q.q}
                </code>
              </div>
            ))}
            <button
              onClick={() => setStage("3 · candidates")}
              className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] text-accent hover:bg-accent/20"
            >
              → run searches & score
            </button>
          </div>
        )}

        {stage === "3 · candidates" && (
          <div className="grid gap-3 sm:grid-cols-[260px_1fr]">
            <ul className="space-y-1">
              {CANDIDATES.map((c, i) => (
                <li key={c.name}>
                  <button
                    onClick={() => setActiveCand(i)}
                    className={`flex w-full items-center gap-2 rounded px-2 py-2 text-left text-[12px] transition-colors ${
                      i === activeCand
                        ? "bg-accent/15 text-accent"
                        : "hover:bg-border/40"
                    }`}
                  >
                    <span
                      className={`shrink-0 font-mono text-[14px] tabular-nums ${
                        c.score >= 85
                          ? "text-accent"
                          : c.score >= 70
                            ? "text-amber-300"
                            : "text-muted"
                      }`}
                    >
                      {c.score}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-foreground/90">
                        {c.name}
                      </span>
                      <span className="block truncate text-[10.5px] text-muted">
                        {c.role}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="rounded border border-border bg-border/20 p-3">
              <div className="mb-1 text-[11px] text-muted">
                claude · scoring rationale
              </div>
              <p className="text-[12.5px] leading-[1.6] text-foreground/85">
                {CANDIDATES[activeCand].why}
              </p>
              <button
                onClick={() => setStage("4 · outreach")}
                className="mt-3 rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11.5px] text-accent hover:bg-accent/20"
              >
                → draft outreach to {CANDIDATES[activeCand].name}
              </button>
            </div>
          </div>
        )}

        {stage === "4 · outreach" && (
          <div className="space-y-3">
            <div className="flex gap-1 text-[11px]">
              <span className="self-center text-muted">register:</span>
              {REGISTERS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegister(r)}
                  className={`rounded px-2.5 py-1 ${
                    r === register
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="rounded border border-accent/30 bg-accent/5 p-3 text-[12.5px] leading-[1.6] text-foreground/90">
              {OUTREACH[register]}
            </div>
            <div className="text-[11px] text-muted">
              same candidate, same context — three voice registers. operator
              picks the one that fits the relationship.
            </div>
          </div>
        )}
      </Mockup>

      <Flow
        nodes={[
          { label: "role brief", sub: "must/nice/exclude" },
          { label: "claude search-gen", sub: "5 boolean variants", highlight: true },
          { label: "linkedin search", sub: "top N per variant" },
          { label: "claude scorer", sub: "rubric + calibration", highlight: true },
          { label: "claude drafter", sub: "3 voice registers", highlight: true },
        ]}
        direction="right"
      />
    </>
  );
}
