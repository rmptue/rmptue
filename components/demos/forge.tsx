"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const EXPERIMENTS = [
  {
    title: "offline meeting analyzer",
    status: "active",
    detail:
      "screen-share + audio capture → fully-local Whisper + Nemotron3:33b → markdown brief. zero cloud round-trips. flagship experiment.",
  },
  {
    title: "vault-RAG benchmark",
    status: "active",
    detail:
      "compare deterministic-keyword retrieval (vault current) vs local-embed retrieval over the same corpus on real claude-style questions.",
  },
  {
    title: "draft-chain quality",
    status: "queued",
    detail:
      "do nemotron drafts → claude polishes outperform claude-only on long-form? cost vs quality curve.",
  },
  {
    title: "voice-to-vantage",
    status: "queued",
    detail:
      "local whisper-streaming + on-device intent parsing → discord call to vantage. latency budget: 1.2s.",
  },
  {
    title: "doc-vision local",
    status: "queued",
    detail:
      "screenshot → local-vision LLM → structured extraction. for sensitive docs that can't leave the laptop.",
  },
  {
    title: "model-of-the-day",
    status: "queued",
    detail:
      "pull a fresh open-weights model weekly, run it through the standard suite, archive the score sheet.",
  },
];

export default function ForgeDemo() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Mockup title="forge · local-LLM lab · 6 experiments">
        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <ul className="space-y-1">
            {EXPERIMENTS.map((e, i) => (
              <li key={e.title}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full rounded px-2.5 py-1.5 text-left text-[12px] transition-colors ${
                    i === active
                      ? "bg-accent/15 text-accent"
                      : "text-foreground/80 hover:bg-border/40"
                  }`}
                >
                  <div className="truncate">{e.title}</div>
                  <div
                    className={`text-[10.5px] ${
                      e.status === "active" ? "text-accent/70" : "text-muted"
                    }`}
                  >
                    {e.status}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="rounded border border-border bg-border/20 p-3">
            <div className="mb-2 text-[12px] font-medium text-foreground">
              {EXPERIMENTS[active].title}
            </div>
            <p className="text-[12px] leading-[1.6] text-foreground/85">
              {EXPERIMENTS[active].detail}
            </p>
          </div>
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "ollama", sub: "local server" },
          { label: "nemotron3:33b", sub: "open weights", highlight: true },
          { label: "experiment harness", sub: "task + rubric", highlight: true },
          { label: "scoresheet", sub: "vs hosted claude" },
        ]}
        direction="right"
      />
    </>
  );
}
