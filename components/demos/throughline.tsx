"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const TABS = ["interview", "offer analysis", "match"] as const;
type Tab = (typeof TABS)[number];

export default function ThroughlineDemo() {
  const [tab, setTab] = useState<Tab>("interview");
  return (
    <>
      <Mockup variant="phone" title="throughline">
        <div className="mb-3 flex gap-1 text-[10.5px]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded px-2 py-1 ${
                t === tab
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "interview" && (
          <div className="space-y-3">
            <div className="rounded bg-border/30 p-2.5 text-[12px]">
              <div className="mb-1 text-[10.5px] text-muted">throughline · coach</div>
              you&apos;ve done 3 system-design rounds for staff roles. this one&apos;s for a forward-deployed AI eng — i&apos;ll lean on claude-app-architecture. ready?
            </div>
            <div className="rounded bg-accent/10 p-2.5 text-[12px] text-accent">
              <div className="mb-1 text-[10.5px] text-accent/70">you</div>
              go.
            </div>
            <div className="rounded bg-border/30 p-2.5 text-[12px]">
              <div className="mb-1 text-[10.5px] text-muted">throughline · coach</div>
              design a customer-support agent that hands off to a human cleanly. the trick is the handoff state. start with the data model.
            </div>
            <input
              placeholder="type your answer…"
              className="w-full rounded border border-border bg-border/20 px-3 py-1.5 text-[12px] text-foreground placeholder:text-muted focus:border-accent/40 focus:outline-none"
            />
          </div>
        )}

        {tab === "offer analysis" && (
          <div className="space-y-2.5 text-[12px]">
            <div className="rounded border border-dashed border-border p-3 text-muted">
              📄 senior-ai-engineer-stripe.pdf · uploaded
            </div>
            <div className="rounded bg-border/30 p-2.5">
              <div className="mb-1 text-[10.5px] text-muted">throughline analysis</div>
              base $245k · equity $180k/yr · sign-on $50k. base is 8% under your benchmark for SF staff-level AI eng; equity offsets it. negotiation lever: ask for $260k base or $30k more sign-on.
            </div>
            <button className="w-full rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent">
              → draft negotiation script
            </button>
          </div>
        )}

        {tab === "match" && (
          <div className="space-y-1.5 text-[12px]">
            <div className="text-[10.5px] text-muted">3 high-match openings</div>
            {[
              { c: "Anthropic", r: "Forward Deployed AI Eng", s: 91 },
              { c: "Decagon", r: "Founding AI Eng", s: 88 },
              { c: "Sierra", r: "Senior AI Eng · Agents", s: 85 },
            ].map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded border border-border bg-border/20 p-2"
              >
                <span className="font-mono text-[14px] text-accent tabular-nums">{m.s}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-foreground/90">{m.r}</div>
                  <div className="text-[10.5px] text-muted">{m.c}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Mockup>

      <Flow
        nodes={[
          { label: "user profile", sub: "persistent memory", highlight: true },
          { label: "interview loop", sub: "rubric scoring" },
          { label: "offer analysis", sub: "comp benchmark", highlight: true },
          { label: "match feed", sub: "scored openings" },
        ]}
        direction="right"
      />
    </>
  );
}
