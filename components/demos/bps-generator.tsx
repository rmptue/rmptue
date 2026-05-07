"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const ROWS = [
  { account: "revenue", q3: 14_820, q2: 13_670, delta: 8.4 },
  { account: "cogs", q3: 6_210, q2: 5_810, delta: 6.9 },
  { account: "gross_margin_%", q3: 58.1, q2: 57.5, delta: 0.6, isPct: true },
  { account: "opex", q3: 4_180, q2: 4_240, delta: -1.4 },
  { account: "operating_income", q3: 4_430, q2: 3_620, delta: 22.4 },
];

const NARRATIVE: { id: string; text: string }[] = [
  {
    id: "revenue.q3-2025",
    text:
      "Revenue grew 8.4% quarter-on-quarter [r:revenue.q3-2025], outpacing the prior cadence as category mix continued to shift toward higher-margin lines.",
  },
  {
    id: "gross_margin_%.q3-2025",
    text:
      "Gross margin expanded 60 bps to 58.1% [r:gross_margin_%.q3-2025], driven primarily by mix rather than unit-cost compression on the input side.",
  },
  {
    id: "opex.q3-2025",
    text:
      "Opex contracted 1.4% [r:opex.q3-2025] reflecting the headcount slowdown enacted at end-Q2; the savings flowed through to operating income.",
  },
  {
    id: "operating_income.q3-2025",
    text:
      "Operating income lifted 22.4% [r:operating_income.q3-2025] — the largest sequential gain of the trailing four quarters.",
  },
];

export default function BPSGeneratorDemo() {
  const [shown, setShown] = useState(0);
  return (
    <>
      <Mockup title="bps generator · q3-2025 commentary">
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="text-left text-muted">
                <th className="border-b border-border py-1.5 pr-3 font-normal">account</th>
                <th className="border-b border-border py-1.5 pr-3 text-right font-normal">q3</th>
                <th className="border-b border-border py-1.5 pr-3 text-right font-normal">q2</th>
                <th className="border-b border-border py-1.5 text-right font-normal">Δ%</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {ROWS.map((r) => (
                <tr key={r.account}>
                  <td className="py-1 pr-3 text-foreground/85">{r.account}</td>
                  <td className="py-1 pr-3 text-right text-foreground/85 tabular-nums">
                    {r.isPct ? `${r.q3}%` : r.q3.toLocaleString()}
                  </td>
                  <td className="py-1 pr-3 text-right text-muted tabular-nums">
                    {r.isPct ? `${r.q2}%` : r.q2.toLocaleString()}
                  </td>
                  <td
                    className={`py-1 text-right tabular-nums ${
                      r.delta > 0 ? "text-accent" : "text-amber-300"
                    }`}
                  >
                    {r.delta > 0 ? "+" : ""}
                    {r.delta}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setShown((s) => Math.min(s + 1, NARRATIVE.length))}
          className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] text-accent hover:bg-accent/20"
          disabled={shown >= NARRATIVE.length}
        >
          {shown === 0
            ? "→ generate commentary"
            : shown < NARRATIVE.length
              ? "→ next paragraph"
              : "✓ complete"}
        </button>
        {shown >= NARRATIVE.length && (
          <button
            onClick={() => setShown(0)}
            className="ml-2 rounded border border-border bg-border/30 px-3 py-1.5 text-[12px] text-muted hover:bg-border/50"
          >
            ↺ reset
          </button>
        )}

        <div className="mt-4 space-y-3">
          {NARRATIVE.slice(0, shown).map((n) => (
            <p key={n.id} className="text-foreground/90">
              {n.text.split(/(\[r:[^\]]+\])/).map((part, i) =>
                part.startsWith("[r:") ? (
                  <span
                    key={i}
                    className="ml-0.5 rounded bg-accent/15 px-1 text-[11px] text-accent"
                  >
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </p>
          ))}
        </div>
        {shown >= NARRATIVE.length && (
          <div className="mt-3 rounded border border-accent/30 bg-accent/5 px-3 py-2 text-[11px] text-accent">
            ✓ validator pass · 4 claims · 4 cited · 0 unsourced
          </div>
        )}
      </Mockup>

      <Flow
        nodes={[
          { label: "P&L source", sub: "normalized table" },
          { label: "preprocess", sub: "deltas + ratios" },
          { label: "claude sonnet", sub: "with citation contract", highlight: true },
          { label: "validator", sub: "every claim cited", highlight: true },
          { label: "review UI", sub: "analyst polishes" },
        ]}
        direction="right"
      />
    </>
  );
}
