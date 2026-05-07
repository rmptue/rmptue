"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type ChartKind = "weekly-revenue" | "checkout-funnel" | "ltv-cohort" | "channel-mix";

type Insight = {
  kind: ChartKind;
  label: string;
  headline: string;
  caveat: string;
  nextQ: string;
};

const INSIGHTS: Insight[] = [
  {
    kind: "weekly-revenue",
    label: "weekly revenue",
    headline: "revenue dipped 12% week-over-week",
    caveat:
      "the drop is concentrated in monday & tuesday, both north america. last week's parallel days were near a regional promo that ended sunday — this looks like comparison-base distortion, not a true decline.",
    nextQ: "what's the four-week trailing trend if we exclude promo days?",
  },
  {
    kind: "checkout-funnel",
    label: "checkout funnel",
    headline: "checkout drop-off is concentrated at the address step",
    caveat:
      "62% reach payment but only 41% reach review — the address validation rolled out wednesday. flat-vs-prior is a weak read until 7 days post-rollout.",
    nextQ:
      "what's the address-step abandonment rate split by mobile vs desktop?",
  },
  {
    kind: "ltv-cohort",
    label: "ltv by cohort",
    headline: "march cohort is pacing 18% above february at day 60",
    caveat:
      "march was the first cohort with the new onboarding email sequence. positive signal, but march lapped a holiday so absolute LTV may be elevated relative to february's natural baseline.",
    nextQ: "isolate march users acquired post-holiday and re-compare.",
  },
  {
    kind: "channel-mix",
    label: "channel mix",
    headline: "paid social share is up 9 points; organic is flat",
    caveat:
      "the paid push correlates with a campaign launch on the 14th. organic-flat alongside paid-up means you're buying the marginal session rather than seeing demand expansion.",
    nextQ:
      "what's blended cac vs paid-only cac, and is the trend healthy?",
  },
];

const FUNNEL = [
  { stage: "viewed cart", v: 100 },
  { stage: "address", v: 78 },
  { stage: "payment", v: 62 },
  { stage: "review", v: 41 },
  { stage: "purchased", v: 38 },
];

const COHORTS = [
  { c: "jan", d30: 22, d60: 31 },
  { c: "feb", d30: 24, d60: 33 },
  { c: "mar", d30: 28, d60: 39 },
];

const CHANNELS = [
  { name: "organic", a: 38, b: 38 },
  { name: "paid social", a: 22, b: 31 },
  { name: "paid search", a: 21, b: 18 },
  { name: "referral", a: 11, b: 9 },
  { name: "direct", a: 8, b: 4 },
];

export default function GlanceDemo() {
  const [i, setI] = useState(0);
  const cur = INSIGHTS[i];

  return (
    <>
      <Mockup variant="phone" title="glance">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {INSIGHTS.map((x, idx) => (
              <button
                key={x.kind}
                onClick={() => setI(idx)}
                className={`rounded px-2 py-0.5 text-[10px] ${
                  idx === i
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>

          {cur.kind === "weekly-revenue" && (
            <div>
              <div className="mb-1 font-mono text-[10px] text-muted">
                weekly revenue · 8w
              </div>
              <div className="relative h-[64px] w-full">
                <svg
                  viewBox="0 0 100 64"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <polyline
                    fill="none"
                    stroke="#5fd9e8"
                    strokeWidth="0.7"
                    vectorEffect="non-scaling-stroke"
                    points="2,42 14,38 26,32 38,26 50,22 62,18 74,24 86,42"
                  />
                  {[42, 38, 32, 26, 22, 18, 24, 42].map((y, idx) => (
                    <circle
                      key={idx}
                      cx={2 + idx * 12}
                      cy={y}
                      r="0.9"
                      fill="#5fd9e8"
                    />
                  ))}
                </svg>
              </div>
            </div>
          )}

          {cur.kind === "checkout-funnel" && (
            <div className="space-y-1">
              <div className="mb-1 font-mono text-[10px] text-muted">
                checkout funnel · 7d
              </div>
              {FUNNEL.map((s, idx) => (
                <div key={s.stage} className="flex items-center gap-2 text-[10.5px]">
                  <span className="w-16 truncate text-foreground/80">
                    {s.stage}
                  </span>
                  <div className="flex-1 overflow-hidden rounded bg-border/40">
                    <div
                      className={`h-2 ${idx === 2 ? "bg-amber-300/70" : "bg-accent/60"}`}
                      style={{ width: `${s.v}%` }}
                    />
                  </div>
                  <span className="w-7 text-right font-mono text-muted tabular-nums">
                    {s.v}%
                  </span>
                </div>
              ))}
            </div>
          )}

          {cur.kind === "ltv-cohort" && (
            <div>
              <div className="mb-1 font-mono text-[10px] text-muted">
                ltv $ · day 30 vs day 60
              </div>
              <div className="space-y-1.5">
                {COHORTS.map((c) => (
                  <div key={c.c} className="flex items-center gap-2 text-[10.5px]">
                    <span className="w-8 text-foreground/80">{c.c}</span>
                    <div className="flex flex-1 gap-0.5">
                      <div
                        className="h-2 bg-accent/30"
                        style={{ width: `${c.d30 * 2}%` }}
                      />
                      <div
                        className="h-2 bg-accent/80"
                        style={{ width: `${(c.d60 - c.d30) * 2}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-mono text-muted tabular-nums">
                      ${c.d30}/${c.d60}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex gap-3 font-mono text-[9.5px] text-muted">
                <span>
                  <span className="mr-1 inline-block size-2 rounded-sm bg-accent/30 align-middle" />
                  d30
                </span>
                <span>
                  <span className="mr-1 inline-block size-2 rounded-sm bg-accent/80 align-middle" />
                  d60
                </span>
              </div>
            </div>
          )}

          {cur.kind === "channel-mix" && (
            <div>
              <div className="mb-1 font-mono text-[10px] text-muted">
                channel share · prev → curr
              </div>
              <div className="space-y-1.5">
                {CHANNELS.map((c) => {
                  const delta = c.b - c.a;
                  return (
                    <div
                      key={c.name}
                      className="flex items-center gap-2 text-[10.5px]"
                    >
                      <span className="w-20 text-foreground/80">{c.name}</span>
                      <div className="flex-1 overflow-hidden rounded bg-border/40">
                        <div
                          className="h-2 bg-accent/60"
                          style={{ width: `${c.b * 2.5}%` }}
                        />
                      </div>
                      <span
                        className={`w-10 text-right font-mono tabular-nums ${
                          delta > 0
                            ? "text-accent"
                            : delta < 0
                              ? "text-amber-300"
                              : "text-muted"
                        }`}
                      >
                        {delta > 0 ? "+" : ""}
                        {delta}pt
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rounded border border-accent/30 bg-accent/5 p-2.5">
            <div className="mb-0.5 font-mono text-[10px] uppercase tracking-wide text-accent/70">
              insight
            </div>
            <div className="text-[12px] font-medium text-accent">
              {cur.headline}
            </div>
            <p className="mt-1 text-[11px] leading-[1.5] text-foreground/85">
              {cur.caveat}
            </p>
          </div>

          <div className="rounded border border-border bg-border/20 p-2 text-[11px]">
            <div className="mb-0.5 font-mono text-[10px] text-muted">
              next question
            </div>
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
