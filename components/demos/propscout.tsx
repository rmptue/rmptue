"use client";
import { useEffect, useRef, useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const current = options.find((o) => o.value === value)?.label ?? value;
  return (
    <div className="block" ref={ref}>
      <span className="text-[10.5px] text-muted">{label}</span>
      <div className="relative mt-0.5">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="flex w-full items-center justify-between rounded border border-border bg-border/20 px-2 py-1 text-left text-foreground/90 hover:border-accent/40"
        >
          <span className="truncate">{current}</span>
          <span className="ml-2 shrink-0 text-[9.5px] text-muted">▾</span>
        </button>
        {open && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded border border-border bg-[#181715] py-1 shadow-lg shadow-black/40">
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`block w-full px-2.5 py-1 text-left transition-colors ${
                    o.value === value
                      ? "bg-accent/15 text-accent"
                      : "text-foreground/85 hover:bg-border/40"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type Sector = "all" | "medical" | "retail" | "industrial" | "office";
type State = "all" | "QLD" | "NSW" | "VIC" | "WA" | "SA";

type Listing = {
  id: string;
  title: string;
  address: string;
  sector: Exclude<Sector, "all">;
  state: Exclude<State, "all">;
  price: string;
  yield_pct: number | null;
  tenanted: boolean;
  floor: number;
  filterScore: number;
  aiScore: number;
  rationale: string;
};

const LISTINGS: Listing[] = [
  {
    id: "L1",
    title: "Medical Suite · Greenslopes Private",
    address: "Greenslopes, QLD",
    sector: "medical",
    state: "QLD",
    price: "$1.45M",
    yield_pct: 6.8,
    tenanted: true,
    floor: 142,
    filterScore: 92,
    aiScore: 96,
    rationale:
      "Tenanted medical at 6.8% gross yield on a long lease — exact profile of the &apos;Brisbane medical, $500k–$1.5M, tenanted&apos; brief. Above-target yield is the unlock.",
  },
  {
    id: "L2",
    title: "Specialist Consulting Suite",
    address: "Spring Hill, QLD",
    sector: "medical",
    state: "QLD",
    price: "POA",
    yield_pct: 7.2,
    tenanted: true,
    floor: 98,
    filterScore: 88,
    aiScore: 93,
    rationale:
      "POA list but yield-implied price ($892K @ 7.2%) sits inside band. Inner-Brisbane specialist tenant — low default risk profile.",
  },
  {
    id: "L3",
    title: "Industrial Warehouse",
    address: "Eagle Farm, QLD",
    sector: "industrial",
    state: "QLD",
    price: "$1.8M",
    yield_pct: 6.1,
    tenanted: true,
    floor: 1240,
    filterScore: 81,
    aiScore: 72,
    rationale:
      "Hits the price + tenanted filters but sector doesn&apos;t match the medical brief. Strong asset, wrong client.",
  },
  {
    id: "L4",
    title: "Mixed-Use Ground Floor",
    address: "Fortitude Valley, QLD",
    sector: "retail",
    state: "QLD",
    price: "$2.1M",
    yield_pct: 5.4,
    tenanted: true,
    floor: 210,
    filterScore: 64,
    aiScore: 55,
    rationale:
      "Above target price, retail not medical, lower yield. Filter caught it on the &apos;tenanted&apos; + state — AI re-rank flags it as a poor fit.",
  },
  {
    id: "L5",
    title: "Office Floor · CBD",
    address: "Brisbane CBD, QLD",
    sector: "office",
    state: "QLD",
    price: "$1.3M",
    yield_pct: 5.8,
    tenanted: false,
    floor: 180,
    filterScore: 58,
    aiScore: 41,
    rationale:
      "Vacant office at 5.8% asking yield — wrong sector and wrong tenancy posture for this brief. Likely a wrong-keyword leak through the filter.",
  },
];

export default function PropScoutDemo() {
  const [sector, setSector] = useState<Sector>("medical");
  const [state, setState] = useState<State>("QLD");
  const [aiOn, setAiOn] = useState(true);
  const [activeId, setActiveId] = useState("L1");

  const filtered = LISTINGS.filter(
    (l) =>
      (sector === "all" || l.sector === sector) &&
      (state === "all" || l.state === state),
  );
  const sorted = [...filtered].sort((a, b) =>
    aiOn ? b.aiScore - a.aiScore : b.filterScore - a.filterScore,
  );
  const active = LISTINGS.find((l) => l.id === activeId) ?? sorted[0];

  return (
    <>
      <Mockup title="propscout · 226 listings · 5 cities">
        <div className="mb-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[11.5px] sm:grid-cols-4">
            <Select<Sector>
              label="sector"
              value={sector}
              onChange={setSector}
              options={[
                { value: "all", label: "all" },
                { value: "medical", label: "medical / consulting" },
                { value: "retail", label: "retail" },
                { value: "industrial", label: "industrial" },
                { value: "office", label: "office" },
              ]}
            />
            <Select<State>
              label="state"
              value={state}
              onChange={setState}
              options={[
                { value: "all", label: "all" },
                { value: "QLD", label: "QLD" },
                { value: "NSW", label: "NSW" },
                { value: "VIC", label: "VIC" },
                { value: "WA", label: "WA" },
                { value: "SA", label: "SA" },
              ]}
            />
            <div className="block">
              <span className="text-[10.5px] text-muted">price</span>
              <div className="mt-0.5 rounded border border-border bg-border/20 px-2 py-1 text-foreground/80">
                $500k – $1.5M
              </div>
            </div>
            <div className="block">
              <span className="text-[10.5px] text-muted">tenanted</span>
              <div className="mt-0.5 rounded border border-border bg-border/20 px-2 py-1 text-foreground/80">
                ✓ leased
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button
              onClick={() => setAiOn((s) => !s)}
              className={`rounded border px-2.5 py-1 transition-colors ${
                aiOn
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-border/30 text-muted hover:text-foreground"
              }`}
            >
              {aiOn ? "✓ AI re-rank ON" : "AI re-rank OFF"}
            </button>
            <span className="font-mono text-[10.5px] text-muted">
              {aiOn
                ? "haiku · ~$0.0014 / search · passcode-gated"
                : "deterministic filter only · free"}
            </span>
            <span className="ml-auto text-[10.5px] text-muted">
              {sorted.length} matches
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_280px]">
          <ul className="space-y-1.5">
            {sorted.map((l, i) => {
              const score = aiOn ? l.aiScore : l.filterScore;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => setActiveId(l.id)}
                    className={`flex w-full items-center gap-3 rounded border px-3 py-2 text-left transition-colors ${
                      l.id === active.id
                        ? "border-accent/40 bg-accent/10"
                        : "border-border bg-border/15 hover:border-accent/30"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-muted">#{i + 1}</span>
                    <span
                      className={`shrink-0 font-mono text-[14px] tabular-nums ${
                        score >= 85
                          ? "text-accent"
                          : score >= 70
                            ? "text-amber-300"
                            : "text-muted"
                      }`}
                    >
                      {score}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12.5px] text-foreground/90">
                        {l.title}
                      </div>
                      <div className="truncate text-[10.5px] text-muted">
                        {l.address} · {l.price}
                        {l.yield_pct ? ` · ${l.yield_pct}% yield` : ""}
                        {l.tenanted ? " · tenanted" : " · vacant"}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="space-y-2">
            <div className="rounded border border-border bg-border/20 p-3 text-[12px]">
              <div className="text-[10.5px] text-muted">selected</div>
              <div className="mt-0.5 font-medium text-foreground">
                {active.title}
              </div>
              <div className="mt-1 grid grid-cols-[max-content_1fr] gap-x-2 gap-y-0.5 font-mono text-[10.5px]">
                <span className="text-muted">price</span>
                <span className="text-foreground/85">{active.price}</span>
                <span className="text-muted">yield</span>
                <span className="text-foreground/85">
                  {active.yield_pct ? `${active.yield_pct}%` : "—"}
                </span>
                <span className="text-muted">floor</span>
                <span className="text-foreground/85">{active.floor} m²</span>
                <span className="text-muted">sector</span>
                <span className="text-foreground/85">{active.sector}</span>
              </div>
            </div>

            {aiOn && (
              <div className="rounded border border-accent/30 bg-accent/5 p-3">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent/70">
                  haiku · why this fits
                </div>
                <p className="text-[11.5px] leading-[1.55] text-foreground/90">
                  {active.rationale}
                </p>
              </div>
            )}
          </div>
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "scraped corpus", sub: "226 listings · 5 cities" },
          { label: "php filter", sub: "15 fields · sub-second" },
          { label: "yield fallback", sub: "rent ÷ % when POA" },
          { label: "claude haiku", sub: "re-rank + rationale", highlight: true },
          { label: "ranked results", sub: "passcode-gated", highlight: true },
        ]}
        direction="right"
      />
    </>
  );
}
