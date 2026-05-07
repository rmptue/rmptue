"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Trade = {
  ts: string;
  symbol: string;
  side: "long" | "short";
  signal: number;
  decision: "taken" | "rejected";
  rationale: string;
};

const TRADES: Trade[] = [
  {
    ts: "10:42:18",
    symbol: "ES",
    side: "long",
    signal: 0.78,
    decision: "taken",
    rationale:
      "regime aligned, breadth confirms, no major macro print within 90 min — passes rubric.",
  },
  {
    ts: "11:14:02",
    symbol: "NQ",
    side: "short",
    signal: 0.81,
    decision: "rejected",
    rationale:
      "signal strong but FOMC minutes hit at 11:30 — rubric blocks discretionary entries inside macro-print windows.",
  },
  {
    ts: "13:08:40",
    symbol: "CL",
    side: "long",
    signal: 0.62,
    decision: "rejected",
    rationale:
      "signal below threshold; rubric requires ≥0.70 unless multi-timeframe confluence exists. confluence absent.",
  },
  {
    ts: "14:22:11",
    symbol: "ES",
    side: "long",
    signal: 0.74,
    decision: "taken",
    rationale: "second entry of the regime, ATR shrinking — pyramid pass.",
  },
];

export default function HelmDemo() {
  const [active, setActive] = useState(0);
  const t = TRADES[active];
  return (
    <>
      <Mockup title="helm · paper portfolio · 2026-05-08">
        <div className="grid grid-cols-3 gap-3 text-[12px]">
          <div className="rounded border border-border bg-border/20 p-2">
            <div className="text-[10.5px] text-muted">net P&amp;L (paper)</div>
            <div className="font-mono text-[15px] text-accent">+$842</div>
          </div>
          <div className="rounded border border-border bg-border/20 p-2">
            <div className="text-[10.5px] text-muted">signals today</div>
            <div className="font-mono text-[15px] text-foreground">14</div>
          </div>
          <div className="rounded border border-border bg-border/20 p-2">
            <div className="text-[10.5px] text-muted">claude-rejected</div>
            <div className="font-mono text-[15px] text-amber-300">9</div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr]">
          <ul className="space-y-1">
            {TRADES.map((x, i) => (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full rounded px-2 py-1.5 text-left text-[11.5px] transition-colors ${
                    i === active
                      ? "bg-accent/15 text-accent"
                      : "text-foreground/80 hover:bg-border/40"
                  }`}
                >
                  <span className="font-mono text-muted">{x.ts}</span>{" "}
                  <span>{x.symbol}</span>{" "}
                  <span className={x.side === "long" ? "text-accent" : "text-amber-300"}>
                    {x.side}
                  </span>{" "}
                  <span
                    className={`ml-1 ${
                      x.decision === "taken" ? "text-accent" : "text-muted"
                    }`}
                  >
                    {x.decision === "taken" ? "✓" : "✗"}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="rounded border border-border bg-border/20 p-3">
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="text-foreground/80">
                {t.symbol} · {t.side} · signal {t.signal}
              </span>
              <span
                className={t.decision === "taken" ? "text-accent" : "text-amber-300"}
              >
                {t.decision === "taken" ? "claude approved" : "claude rejected"}
              </span>
            </div>
            <p className="text-[11.5px] leading-[1.55] text-foreground/85">
              {t.rationale}
            </p>
          </div>
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "market data", sub: "ticks + OHLC" },
          { label: "signal engine", sub: "deterministic" },
          { label: "claude rubric", sub: "discretionary filter", highlight: true },
          { label: "paper exec", sub: "broker sim" },
          { label: "post-trade journal", sub: "indexed for review", highlight: true },
        ]}
        direction="right"
      />
    </>
  );
}
