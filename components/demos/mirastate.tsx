"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Domain = "all" | "climate" | "ph" | "probability" | "finance" | "biology" | "fictional";

const DOMAINS: { key: Domain; label: string; color: string }[] = [
  { key: "all", label: "all", color: "bg-foreground/40" },
  { key: "climate", label: "🌊 climate", color: "bg-sky-400" },
  { key: "ph", label: "🇵🇭 philippines", color: "bg-amber-400" },
  { key: "probability", label: "🎲 probability", color: "bg-emerald-400" },
  { key: "finance", label: "💸 finance", color: "bg-violet-400" },
  { key: "biology", label: "🧬 biology", color: "bg-rose-400" },
  { key: "fictional", label: "🚀 fictional", color: "bg-fuchsia-400" },
];

type Sim = {
  title: string;
  domain: Exclude<Domain, "all">;
  shape: "threshold" | "time" | "agent" | "cascade";
  note: string;
};

const SIMS: Sim[] = [
  { title: "Ocean Acidification", domain: "climate", shape: "threshold", note: "2026→2100, RCP 8.5, pteropod & coral dissolution" },
  { title: "Glacier Retreat", domain: "climate", shape: "time", note: "6 systems · SSP scenarios" },
  { title: "Coral Bleaching", domain: "climate", shape: "threshold", note: "Degree Heating Weeks model" },
  { title: "Typhoon Intensity vs Damage", domain: "ph", shape: "cascade", note: "animated cyclone + PH history" },
  { title: "The Big One · West Valley Fault 7.2M", domain: "ph", shape: "cascade", note: "17 districts · MMEIRS-calibrated casualties" },
  { title: "Manila Sea Level Rise", domain: "ph", shape: "threshold", note: "barangay-level inundation map" },
  { title: "EDSA Traffic", domain: "ph", shape: "agent", note: "agent-based jam formation" },
  { title: "Sabong Math", domain: "ph", shape: "threshold", note: "bookmaker vig + house edge" },
  { title: "Party-List Allocation", domain: "ph", shape: "cascade", note: "COMELEC formula simulator" },
  { title: "Monty Hall Problem", domain: "probability", shape: "threshold", note: "doors + 10k simulation" },
  { title: "Death Note · P(Capture)", domain: "probability", shape: "cascade", note: "Bayesian detective sim · 3 suspects · 12 evidence cards" },
  { title: "Simpson's Paradox", domain: "probability", shape: "threshold", note: "Berkeley + kidney stones + batting" },
  { title: "Bayesian Updating", domain: "probability", shape: "time", note: "Beta prior + binomial likelihood" },
  { title: "Birthday Paradox", domain: "probability", shape: "threshold", note: "calendar collision lights" },
  { title: "Compound Interest vs Inflation", domain: "finance", shape: "time", note: "PH instruments · BSP CPI" },
  { title: "Peso Buying Power 1980→2026", domain: "finance", shape: "time", note: "BSP CPI + 8 concrete goods" },
  { title: "Startup Runway", domain: "finance", shape: "time", note: "burn vs raise · PH/USD toggle" },
  { title: "Drug Half-Life & Steady State", domain: "biology", shape: "time", note: "6 real PK presets" },
  { title: "VO₂ Max Decline", domain: "biology", shape: "time", note: "age + training curves" },
  { title: "Allometric Scaling", domain: "biology", shape: "threshold", note: "Kleiber's law + ECG by body size" },
  { title: "Square-Cube Law", domain: "fictional", shape: "threshold", note: "0.1×–10× creature · bone-shatter at 150 MPa" },
  { title: "Spaghettification", domain: "fictional", shape: "threshold", note: "Schwarzschild radius · BH tidal force" },
  { title: "Rubber-Arm Physics", domain: "fictional", shape: "agent", note: "verlet chain · Gomu-Gomu inspired" },
];

const SHAPE_LABEL: Record<Sim["shape"], string> = {
  threshold: "threshold",
  time: "time",
  agent: "agent",
  cascade: "cascade",
};

export default function MirastateDemo() {
  const [domain, setDomain] = useState<Domain>("all");
  const visible =
    domain === "all" ? SIMS : SIMS.filter((s) => s.domain === domain);

  const counts = DOMAINS.slice(1).reduce<Record<string, number>>((acc, d) => {
    acc[d.key] = SIMS.filter((s) => s.domain === d.key).length;
    return acc;
  }, {});

  return (
    <>
      <Mockup title="mirastate.com · 75 sims live · 23 shown">
        <div className="mb-3 grid grid-cols-4 gap-2 text-[11px] sm:grid-cols-5">
          <div className="rounded border border-border bg-border/20 px-2 py-1.5">
            <div className="font-mono text-[14px] text-accent">75</div>
            <div className="text-[10px] text-muted">live sims</div>
          </div>
          <div className="rounded border border-border bg-border/20 px-2 py-1.5">
            <div className="font-mono text-[14px] text-foreground">6</div>
            <div className="text-[10px] text-muted">domains</div>
          </div>
          <div className="rounded border border-border bg-border/20 px-2 py-1.5">
            <div className="font-mono text-[14px] text-amber-300">22</div>
            <div className="text-[10px] text-muted">🇵🇭 sims</div>
          </div>
          <div className="rounded border border-border bg-border/20 px-2 py-1.5">
            <div className="font-mono text-[14px] text-foreground">4</div>
            <div className="text-[10px] text-muted">sim shapes</div>
          </div>
          <div className="hidden rounded border border-border bg-border/20 px-2 py-1.5 sm:block">
            <div className="font-mono text-[14px] text-foreground">~$0</div>
            <div className="text-[10px] text-muted">hosting cost</div>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5 text-[11px]">
          {DOMAINS.map((d) => (
            <button
              key={d.key}
              onClick={() => setDomain(d.key)}
              className={`flex items-center gap-1.5 rounded border px-2 py-1 transition-colors ${
                domain === d.key
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-border/20 text-muted hover:text-foreground"
              }`}
            >
              <span className={`size-1.5 rounded-full ${d.color}`} />
              {d.label}
              {d.key !== "all" && (
                <span className="font-mono text-[9.5px] text-muted">
                  {counts[d.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {visible.slice(0, 12).map((s) => {
            const d = DOMAINS.find((dd) => dd.key === s.domain)!;
            return (
              <div
                key={s.title}
                className="rounded border border-border bg-border/15 p-2.5 transition-colors hover:border-accent/40"
              >
                <div className="mb-1 flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${d.color}`} />
                  <span className="font-mono text-[9.5px] text-muted">
                    {SHAPE_LABEL[s.shape]}
                  </span>
                </div>
                <div className="truncate text-[12.5px] font-medium text-foreground">
                  {s.title}
                </div>
                <div className="mt-0.5 line-clamp-2 text-[10.5px] text-muted">
                  {s.note}
                </div>
              </div>
            );
          })}
        </div>

        {visible.length > 12 && (
          <div className="mt-2 text-center text-[10.5px] text-muted">
            +{visible.length - 12} more in this domain
          </div>
        )}

        <div className="mt-4 rounded border border-accent/30 bg-accent/5 p-2.5 text-[11px] leading-[1.55] text-accent/90">
          <div className="mb-0.5 font-mono text-[10px] uppercase tracking-wide text-accent/70">
            note
          </div>
          The visualization IS the output — these are not chart-with-sliders.
          Filipino-rooted angle is the moat: no other explorables site has
          serious PH-context sims.
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "sim brief", sub: "shape + domain + sources" },
          { label: "claude code", sub: "scaffolds HTML/Canvas/D3", highlight: true },
          { label: "iterate visual", sub: "human taste pass" },
          { label: "claude methodology", sub: "draft + cite", highlight: true },
          { label: "ship", sub: "self-contained html · static cdn" },
        ]}
        direction="right"
      />
    </>
  );
}
