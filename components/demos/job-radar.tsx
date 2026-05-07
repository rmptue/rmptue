"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const VARIANTS = ["ai-engineer", "applied-ml", "analytics-eng"] as const;
type Variant = (typeof VARIANTS)[number];

type Job = {
  title: string;
  company: string;
  scores: Record<Variant, number>;
  flags?: string[];
};

const JOBS: Job[] = [
  {
    title: "Senior AI Engineer · Agents",
    company: "Stripe",
    scores: { "ai-engineer": 92, "applied-ml": 71, "analytics-eng": 44 },
  },
  {
    title: "Applied Scientist · Foundation Models",
    company: "Anthropic",
    scores: { "ai-engineer": 88, "applied-ml": 95, "analytics-eng": 42 },
  },
  {
    title: "Forward Deployed Engineer",
    company: "Decagon",
    scores: { "ai-engineer": 86, "applied-ml": 64, "analytics-eng": 58 },
  },
  {
    title: "Senior Analytics Engineer",
    company: "Ramp",
    scores: { "ai-engineer": 51, "applied-ml": 47, "analytics-eng": 89 },
  },
  {
    title: "ML Ops Engineer · Sr",
    company: "Notion",
    scores: { "ai-engineer": 74, "applied-ml": 78, "analytics-eng": 62 },
    flags: ["onsite-only · SF"],
  },
];

function scoreColor(n: number) {
  if (n >= 85) return "text-accent";
  if (n >= 70) return "text-amber-300";
  return "text-muted";
}

export default function JobRadarDemo() {
  const [variant, setVariant] = useState<Variant>("ai-engineer");
  const sorted = [...JOBS].sort(
    (a, b) => b.scores[variant] - a.scores[variant],
  );

  return (
    <>
      <Mockup title="job radar · 2,341 scored postings · last sync 14m ago">
        <div className="mb-3 flex flex-wrap gap-1 text-[11px]">
          <span className="mr-2 self-center text-muted">resume variant:</span>
          {VARIANTS.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`rounded px-2.5 py-1 transition-colors ${
                v === variant
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <ul className="space-y-1.5">
          {sorted.map((j, i) => {
            const s = j.scores[variant];
            return (
              <li
                key={i}
                className="flex items-center gap-3 rounded border border-border bg-border/20 px-3 py-2"
              >
                <div
                  className={`shrink-0 font-mono text-[15px] tabular-nums ${scoreColor(s)}`}
                >
                  {s}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-foreground/90">{j.title}</div>
                  <div className="truncate text-[11px] text-muted">
                    {j.company}
                    {j.flags && (
                      <span className="ml-2 text-amber-300/80">
                        ⚑ {j.flags.join(" · ")}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 text-[11px] text-muted">
          calibration MAD: 4.2 · drift threshold: 8.0 · ✓ stable
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "ingest", sub: "serpapi + rss" },
          { label: "normalize", sub: "+ dedupe" },
          { label: "claude haiku", sub: "rubric × variant", highlight: true },
          { label: "calibration check", sub: "regression test", highlight: true },
          { label: "dashboard", sub: "ranked + filterable" },
        ]}
        direction="right"
      />
    </>
  );
}
