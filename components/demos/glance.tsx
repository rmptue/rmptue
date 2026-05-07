"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const INSIGHTS = [
  {
    headline: "revenue dipped 12% week-over-week",
    detail:
      "the drop is concentrated in monday & tuesday, both north america. last week's parallel days were near a regional promo that ended sunday — this looks like comparison-base distortion, not a true decline.",
    nextQ: "what's the four-week trailing trend if we exclude promo days?",
  },
  {
    headline: "checkout conversion held steady at 2.8%",
    detail:
      "no movement vs last 30d. but the new checkout flow rolled out wednesday — flat-vs-prior is a weak read until you have at least 7 days post-rollout.",
    nextQ: "isolate post-rollout sessions and compare to the prior cohort.",
  },
];

export default function GlanceDemo() {
  const [i, setI] = useState(0);
  const cur = INSIGHTS[i];
  return (
    <>
      <Mockup variant="phone" title="glance">
        <div className="space-y-3">
          <div className="text-[10.5px] text-muted">weekly revenue · last 8w</div>
          <svg viewBox="0 0 280 80" className="w-full">
            <polyline
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              points="0,55 35,48 70,40 105,32 140,28 175,22 210,30 245,52"
            />
            {[0, 35, 70, 105, 140, 175, 210, 245].map((x, idx) => (
              <circle
                key={x}
                cx={x}
                cy={[55, 48, 40, 32, 28, 22, 30, 52][idx]}
                r="2.5"
                fill="#22d3ee"
              />
            ))}
          </svg>

          <div className="rounded border border-accent/30 bg-accent/5 p-3">
            <div className="mb-1 text-[10.5px] uppercase tracking-wide text-accent/70">
              insight
            </div>
            <div className="text-[13px] font-medium text-accent">
              {cur.headline}
            </div>
            <p className="mt-1.5 text-[11.5px] leading-[1.55] text-foreground/85">
              {cur.detail}
            </p>
          </div>

          <div className="rounded border border-border bg-border/20 p-2.5 text-[11.5px]">
            <div className="mb-0.5 text-[10.5px] text-muted">next question</div>
            <div className="text-foreground/85">{cur.nextQ}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setI((i + INSIGHTS.length - 1) % INSIGHTS.length)}
              className="flex-1 rounded border border-border bg-border/30 py-1.5 text-[11px] text-muted hover:bg-border/50"
            >
              ← prev
            </button>
            <button
              onClick={() => setI((i + 1) % INSIGHTS.length)}
              className="flex-1 rounded border border-accent/40 bg-accent/10 py-1.5 text-[11px] text-accent hover:bg-accent/20"
            >
              next chart →
            </button>
          </div>
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "dashboard", sub: "any chart, any tool" },
          { label: "screenshot", sub: "tap to capture" },
          { label: "claude vision", sub: "read the chart", highlight: true },
          { label: "narrate", sub: "headline + caveat", highlight: true },
          { label: "next-q", sub: "what to ask next" },
        ]}
        direction="right"
      />
    </>
  );
}
