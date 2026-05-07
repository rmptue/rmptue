"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const SOURCES = [
  {
    id: "DENR-2024-CCC",
    title: "DENR Climate Change Commission · 2024 progress report",
    type: "agency report",
  },
  {
    id: "PSA-2023-GHG",
    title: "PSA · 2023 GHG inventory release",
    type: "agency data",
  },
  {
    id: "ADB-2024-MRV",
    title: "ADB MRV readiness assessment · PH",
    type: "donor review",
  },
  {
    id: "UPLB-2025-FOREST",
    title: "UPLB CFNR · forest carbon registry pilot",
    type: "academic",
  },
];

const EXTRACTIONS: Record<string, { agency: string; instrument: string; coverage: string; cadence: string; gap: string; quote: string }> = {
  "DENR-2024-CCC": {
    agency: "DENR-CCC",
    instrument: "national emissions inventory",
    coverage: "energy + IPPU; AFOLU partial",
    cadence: "biennial (de jure) · 4-yr lag (de facto)",
    gap: "AFOLU activity data not stated; latest publishable inventory is 2020",
    quote:
      "\"AFOLU data integration remains under development pending finalization of the 2020 land-use change layer.\"",
  },
  "PSA-2023-GHG": {
    agency: "PSA",
    instrument: "GHG inventory",
    coverage: "energy sector only",
    cadence: "annual",
    gap: "AFOLU and waste sectors not covered by PSA mandate",
    quote:
      "\"This release covers the energy sector. Other sectors fall under the technical responsibility of DENR and DA.\"",
  },
  "ADB-2024-MRV": {
    agency: "cross-agency",
    instrument: "MRV system readiness",
    coverage: "framework exists; operational capacity uneven",
    cadence: "not stated in source",
    gap: "no shared data layer between DENR / PSA / DA; bilateral data-sharing only",
    quote:
      "\"Inter-agency data flows remain ad-hoc; no centralized MRV data platform was identified.\"",
  },
  "UPLB-2025-FOREST": {
    agency: "DENR-FMB · pilot",
    instrument: "forest carbon registry",
    coverage: "pilot scale, 4 LGUs",
    cadence: "annual within pilot scope",
    gap: "pilot has not transitioned to national rollout; no published timeline",
    quote:
      "\"Following the 2024 pilot, scale-up funding remains pending and no rollout schedule has been issued.\"",
  },
};

const GAP_MATRIX = [
  { instrument: "energy emissions", denr: "✓ partial", psa: "✓ annual", da: "—", afolu: "—" },
  { instrument: "forestry / AFOLU", denr: "△ delayed", psa: "—", da: "△ partial", afolu: "✓ pilot" },
  { instrument: "waste sector", denr: "△ partial", psa: "—", da: "—", afolu: "—" },
  { instrument: "shared MRV layer", denr: "✗", psa: "✗", da: "✗", afolu: "✗" },
];

const TABS = ["1 · sources", "2 · extraction", "3 · gap matrix", "4 · brief"] as const;
type Tab = (typeof TABS)[number];

export default function MRVGapAnalysisDemo() {
  const [tab, setTab] = useState<Tab>("1 · sources");
  const [src, setSrc] = useState(SOURCES[0].id);

  return (
    <>
      <Mockup title="mrv gap analysis · PH climate-measurement infrastructure">
        <div className="mb-4 flex flex-wrap gap-1 text-[11px]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-2.5 py-1 transition-colors ${
                t === tab
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "1 · sources" && (
          <div className="space-y-2">
            <div className="text-[11px] text-muted">
              4 of 12 seed-corpus documents shown
            </div>
            {SOURCES.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded border border-border bg-border/20 px-3 py-2"
              >
                <span className="font-mono text-[10.5px] text-muted">{s.id}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12.5px] text-foreground/90">
                    {s.title}
                  </div>
                  <div className="text-[10.5px] text-muted">{s.type}</div>
                </div>
                <span className="text-[11px] text-accent">✓ extracted</span>
              </div>
            ))}
          </div>
        )}

        {tab === "2 · extraction" && (
          <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
            <ul className="space-y-1">
              {SOURCES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setSrc(s.id)}
                    className={`w-full rounded px-2 py-1.5 text-left text-[11.5px] transition-colors ${
                      s.id === src
                        ? "bg-accent/15 text-accent"
                        : "text-muted hover:bg-border/40 hover:text-foreground"
                    }`}
                  >
                    <div className="truncate">{s.title}</div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <div className="rounded border border-border bg-border/20 p-3 text-[12px]">
                <div className="mb-2 text-[11px] text-muted">
                  claude structured extraction
                </div>
                <div className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1">
                  <span className="text-muted">agency</span>
                  <span className="text-foreground/90">
                    {EXTRACTIONS[src].agency}
                  </span>
                  <span className="text-muted">instrument</span>
                  <span className="text-foreground/90">
                    {EXTRACTIONS[src].instrument}
                  </span>
                  <span className="text-muted">coverage</span>
                  <span className="text-foreground/90">
                    {EXTRACTIONS[src].coverage}
                  </span>
                  <span className="text-muted">cadence</span>
                  <span className="text-foreground/90">
                    {EXTRACTIONS[src].cadence}
                  </span>
                  <span className="text-muted">gap</span>
                  <span className="text-amber-300">{EXTRACTIONS[src].gap}</span>
                </div>
              </div>
              <div className="rounded border border-accent/30 bg-accent/5 p-3 text-[11.5px] italic text-accent/90">
                citation: {EXTRACTIONS[src].quote}
              </div>
            </div>
          </div>
        )}

        {tab === "3 · gap matrix" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="text-left text-muted">
                  <th className="border-b border-border py-2 pr-3 font-normal">
                    instrument
                  </th>
                  <th className="border-b border-border py-2 pr-3 font-normal">
                    DENR
                  </th>
                  <th className="border-b border-border py-2 pr-3 font-normal">
                    PSA
                  </th>
                  <th className="border-b border-border py-2 pr-3 font-normal">
                    DA
                  </th>
                  <th className="border-b border-border py-2 font-normal">
                    AFOLU pilot
                  </th>
                </tr>
              </thead>
              <tbody>
                {GAP_MATRIX.map((r) => (
                  <tr key={r.instrument} className="border-b border-border/50">
                    <td className="py-2 pr-3 text-foreground/85">
                      {r.instrument}
                    </td>
                    {[r.denr, r.psa, r.da, r.afolu].map((cell, i) => (
                      <td
                        key={i}
                        className={`py-2 pr-3 ${
                          cell.startsWith("✓")
                            ? "text-accent"
                            : cell.startsWith("△")
                              ? "text-amber-300"
                              : cell.startsWith("✗")
                                ? "text-red-300/70"
                                : "text-muted"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 text-[11px] text-muted">
              ✓ covered · △ partial / delayed · ✗ explicit gap · — out of scope
            </div>
          </div>
        )}

        {tab === "4 · brief" && (
          <div className="space-y-3 text-[12.5px] leading-[1.65] text-foreground/85">
            <p>
              Philippine MRV infrastructure has the framework but not the
              operational layer. Three patterns recur across the source
              corpus:
            </p>
            <ol className="ml-4 list-decimal space-y-1.5">
              <li>
                AFOLU data integration is{" "}
                <span className="rounded bg-accent/15 px-1 text-[11px] text-accent">
                  [r:DENR-2024-CCC]
                </span>{" "}
                explicitly delayed — affecting 23% of national emissions by
                volume.
              </li>
              <li>
                No shared MRV data layer exists{" "}
                <span className="rounded bg-accent/15 px-1 text-[11px] text-accent">
                  [r:ADB-2024-MRV]
                </span>{" "}
                — bilateral agency data-sharing only.
              </li>
              <li>
                Forest carbon registry has reached pilot scale only{" "}
                <span className="rounded bg-accent/15 px-1 text-[11px] text-accent">
                  [r:UPLB-2025-FOREST]
                </span>{" "}
                with no published rollout timeline.
              </li>
            </ol>
            <div className="rounded border border-accent/30 bg-accent/5 p-2 text-[11px] text-accent">
              ✓ validator pass · 3 claims · 3 cited · 0 unsourced
            </div>
          </div>
        )}
      </Mockup>

      <Flow
        nodes={[
          { label: "source corpus", sub: "30+ documents" },
          { label: "claude extract", sub: "typed JSON + cite", highlight: true },
          { label: "claim store", sub: "indexed by source" },
          { label: "claude synth", sub: "cross-source gaps", highlight: true },
          { label: "public brief", sub: "auditable claims" },
        ]}
        direction="right"
      />
    </>
  );
}
