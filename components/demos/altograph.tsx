"use client";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

export default function AltographDemo() {
  return (
    <>
      <Mockup title="altographanalytics.com · CCET explorer v0.1">
        <div className="space-y-3">
          <div className="text-[11px] text-muted">
            Philippine national budget · Climate Change Expenditure Tagging · 2024
          </div>

          <div className="space-y-1.5">
            {[
              { name: "DPWH", v: 92, c: 412 },
              { name: "DA", v: 71, c: 89 },
              { name: "DENR", v: 64, c: 38 },
              { name: "DOTr", v: 48, c: 124 },
              { name: "DepEd", v: 22, c: 18 },
              { name: "LGUs (consolidated)", v: 18, c: 67 },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-2 text-[11.5px]">
                <span className="w-44 truncate text-foreground/85">{r.name}</span>
                <div className="flex-1 overflow-hidden rounded bg-border/30">
                  <div
                    className="h-2 bg-accent/60"
                    style={{ width: `${r.v}%` }}
                  />
                </div>
                <span className="w-16 text-right font-mono text-muted tabular-nums">
                  ₱{r.c}B
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://altographanalytics.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] text-accent hover:bg-accent/20"
          >
            open the live explorer ↗
          </a>
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "DBM data", sub: "ccet tagged budget" },
          { label: "claude code", sub: "pipeline scaffold", highlight: true },
          { label: "cleaned dataset", sub: "agency × strategy" },
          { label: "explorer", sub: "public site" },
        ]}
        direction="right"
      />
    </>
  );
}
