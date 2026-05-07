"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Msg = { from: "you" | "bot"; text: string; typing?: boolean };

const SCRIPT: Msg[] = [
  { from: "you", text: "!brief" },
  {
    from: "bot",
    text:
      "morning brief · 7:00am\n\n— BTC 67,200 (+1.4% / 24h) · ETH 3,480 (-0.6%)\n— AI: Anthropic ships Claude Skills GA · OpenAI internal memo on agent tooling leaks\n— Climate: PH BBB submission window opens; CCET v2 spec dropped\n— Personal: Job Radar surfaced 3 new high-fit roles overnight (top: $RM_VAR_1$)",
  },
  { from: "you", text: "what should i prioritize today" },
  {
    from: "bot",
    text:
      "by your active-projects list:\n1. freedom park phase 0.5b — bunk bed sprite revision is unblocked\n2. job radar — 3 new roles to triage (none urgent, but apply window closes friday)\n3. mrv gap analysis — claude has a draft outline ready for your review\n\nlow-priority: 11 unread #general messages. nothing time-sensitive.",
  },
];

export default function VantageDemo() {
  const [shown, setShown] = useState<Msg[]>([SCRIPT[0]]);
  const [i, setI] = useState(0);

  function next() {
    if (i + 1 >= SCRIPT.length) {
      setShown([SCRIPT[0]]);
      setI(0);
      return;
    }
    setShown((s) => [...s, SCRIPT[i + 1]]);
    setI(i + 1);
  }

  return (
    <>
      <Mockup variant="discord" title="discord · @vantage">
        <div className="space-y-3">
          {shown.map((m, idx) => (
            <div key={idx} className="flex gap-3">
              <div
                className={`size-7 shrink-0 rounded-full text-center text-[11px] leading-7 ${
                  m.from === "bot"
                    ? "bg-accent/20 text-accent"
                    : "bg-border text-foreground/80"
                }`}
              >
                {m.from === "bot" ? "v" : "j"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-[11px] text-muted">
                  {m.from === "bot" ? "vantage · bot" : "joshua"}
                </div>
                <div className="whitespace-pre-wrap text-foreground/90">
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={next}
            className="mt-2 rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] text-accent hover:bg-accent/20"
          >
            {i + 1 >= SCRIPT.length ? "↺ replay" : "→ next message"}
          </button>
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "discord", sub: "input" },
          { label: "n8n", sub: "command parser" },
          { label: "context", sub: "vault + notion", highlight: true },
          { label: "claude haiku", sub: "answer", highlight: true },
          { label: "discord", sub: "reply" },
        ]}
        direction="right"
      />
    </>
  );
}
