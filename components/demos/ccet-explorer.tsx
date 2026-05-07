"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const VIEWS = ["agency", "strategy", "year-over-year"] as const;
type View = (typeof VIEWS)[number];

const AGENCY_DATA = [
  { name: "DPWH", v: 92, c: 412 },
  { name: "DA", v: 71, c: 89 },
  { name: "DENR", v: 64, c: 38 },
  { name: "DOTr", v: 48, c: 124 },
  { name: "DepEd", v: 22, c: 18 },
  { name: "LGUs (consolidated)", v: 18, c: 67 },
];

const STRATEGY_DATA = [
  { name: "adaptation", v: 78, c: 528 },
  { name: "mitigation", v: 28, c: 188 },
  { name: "cross-cutting", v: 9, c: 32 },
];

const YOY_DATA = [
  { y: "2020", c: 412 },
  { y: "2021", c: 478 },
  { y: "2022", c: 542 },
  { y: "2023", c: 689 },
  { y: "2024", c: 748 },
];

const NARRATIONS: Record<View, string> = {
  agency:
    "DPWH dominates the climate budget by volume — most of it is adaptation infrastructure (flood control, road resiliency). Watch for: this concentration means a single agency&apos;s execution rate determines national CCET-tagged delivery.",
  strategy:
    "Adaptation outweighs mitigation roughly 3:1 — typical for a country exposed to typhoon and sea-level risk. The cross-cutting bucket is small but growing; it&apos;s where multi-purpose infrastructure (drainage that also reduces methane) gets tagged.",
  "year-over-year":
    "Tagged climate spend has grown ~80% from 2020 to 2024. Caveat: some of the rise is improved tagging compliance, not new spend — the methodology page covers how to read this curve.",
};

export default function CCETExplorerDemo() {
  const [view, setView] = useState<View>("agency");
  const yMax = 800;

  return (
    <>
      <Mockup title="ccet explorer v0.1 · PH national climate budget">
        <div className="mb-4 flex flex-wrap items-center gap-1 text-[12px]">
          <span className="mr-2 self-center text-muted">view:</span>
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded px-2.5 py-1 transition-colors ${
                v === view
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {view === "agency" && (
          <div className="space-y-1.5">
            {AGENCY_DATA.map((r) => (
              <div key={r.name} className="flex items-center gap-2 text-[12.5px]">
                <span className="w-44 truncate text-foreground/85">{r.name}</span>
                <div className="flex-1 overflow-hidden rounded bg-border/30">
                  <div
                    className="h-2.5 bg-accent/60"
                    style={{ width: `${r.v}%` }}
                  />
                </div>
                <span className="w-16 text-right font-mono text-muted tabular-nums">
                  ₱{r.c}B
                </span>
              </div>
            ))}
          </div>
        )}

        {view === "strategy" && (
          <div className="space-y-2">
            {STRATEGY_DATA.map((r) => (
              <div key={r.name} className="flex items-center gap-2 text-[12.5px]">
                <span className="w-32 text-foreground/85">{r.name}</span>
                <div className="flex-1 overflow-hidden rounded bg-border/30">
                  <div
                    className="h-3 bg-accent/60"
                    style={{ width: `${r.v}%` }}
                  />
                </div>
                <span className="w-16 text-right font-mono text-muted tabular-nums">
                  ₱{r.c}B
                </span>
              </div>
            ))}
          </div>
        )}

        {view === "year-over-year" && (
          <div className="relative h-[180px] w-full">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <polyline
                fill="none"
                stroke="#5fd9e8"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
                points={YOY_DATA.map(
                  (d, i) =>
                    `${(i / (YOY_DATA.length - 1)) * 96 + 2},${100 - (d.c / yMax) * 80 - 5}`,
                ).join(" ")}
              />
              {YOY_DATA.map((d, i) => {
                const cx = (i / (YOY_DATA.length - 1)) * 96 + 2;
                const cy = 100 - (d.c / yMax) * 80 - 5;
                return (
                  <circle
                    key={d.y}
                    cx={cx}
                    cy={cy}
                    r="0.9"
                    fill="#5fd9e8"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
            {YOY_DATA.map((d, i) => {
              const xPct = (i / (YOY_DATA.length - 1)) * 96 + 2;
              const yPct = 100 - (d.c / yMax) * 80 - 5;
              return (
                <div key={d.y}>
                  <span
                    className="absolute -translate-x-1/2 -translate-y-full pb-1.5 font-mono text-[10.5px] text-foreground"
                    style={{ left: `${xPct}%`, top: `${yPct}%` }}
                  >
                    ₱{d.c}B
                  </span>
                  <span
                    className="absolute -translate-x-1/2 pt-2 font-mono text-[10.5px] text-muted"
                    style={{ left: `${xPct}%`, bottom: 0 }}
                  >
                    {d.y}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 rounded border border-accent/30 bg-accent/5 p-3 text-[12px] leading-[1.6] text-accent/90">
          <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wide text-accent/70">
            claude narration
          </div>
          {NARRATIONS[view]}
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "DBM raw", sub: "ccet-tagged budget" },
          { label: "claude code ETL", sub: "schema + cleaning", highlight: true },
          { label: "cleaned dataset", sub: "agency × strategy × yr" },
          { label: "claude narration", sub: "per-view caption", highlight: true },
          { label: "explorer", sub: "public site" },
        ]}
        direction="right"
      />
    </>
  );
}
