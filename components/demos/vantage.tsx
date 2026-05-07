"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Msg = { from: "you" | "bot"; text: string };
type Command = "!brief" | "!ask" | "!add" | "!remind";

const SCRIPTS: Record<Command, Msg[]> = {
  "!brief": [
    { from: "you", text: "!brief" },
    {
      from: "bot",
      text:
        "morning brief · 7:00am\n\n— BTC 67,200 (+1.4%) · ETH 3,480 (-0.6%)\n— AI: Anthropic ships Claude Skills GA · OpenAI internal memo on agent tooling leaks\n— Climate: PH BBB submission window opens; CCET v2 spec dropped\n— Personal: Job Radar surfaced 3 new high-fit roles overnight",
    },
  ],
  "!ask": [
    { from: "you", text: "!ask what's blocking freedom park" },
    {
      from: "bot",
      text:
        "from builds/freedom-park/_index.md (last edited 2026-05-07):\n\nphase 0.5b is unblocked since the bunk-bed sprite revision shipped tuesday. next blocker is the dialogue tree wiring for scene 2 — godot signal plumbing, not art. estimated 4–6 hours of focused work.",
    },
  ],
  "!add": [
    { from: "you", text: "!add idea: claude vision over my screenshots folder" },
    {
      from: "bot",
      text:
        "logged to _core/idea-bank.md under 'doc-vision local'.\n\ncross-link suggestion: this overlaps with forge experiment #5. want me to merge or keep separate?",
    },
  ],
  "!remind": [
    { from: "you", text: "!remind me thursday 9am: review mrv brief draft" },
    {
      from: "bot",
      text:
        "scheduled · thursday 2026-05-15 · 9:00am\n\nwill ping in #personal with: 'review mrv brief draft' plus the latest version pulled from consultancy/mrv-research/draft-v0.2.md",
    },
  ],
};

const COMMANDS: { cmd: Command; desc: string }[] = [
  { cmd: "!brief", desc: "morning briefing" },
  { cmd: "!ask", desc: "query the vault" },
  { cmd: "!add", desc: "log an idea" },
  { cmd: "!remind", desc: "schedule a ping" },
];

export default function VantageDemo() {
  const [history, setHistory] = useState<Msg[]>([]);
  const [pending, setPending] = useState<Command | null>(null);

  function trigger(cmd: Command) {
    const script = SCRIPTS[cmd];
    setHistory((h) => [...h, script[0]]);
    setPending(cmd);
    setTimeout(() => {
      setHistory((h) => [...h, script[1]]);
      setPending(null);
    }, 600);
  }

  function reset() {
    setHistory([]);
    setPending(null);
  }

  return (
    <>
      <Mockup variant="discord" title="discord · @vantage · DM">
        <div className="space-y-3">
          {history.length === 0 && (
            <div className="rounded border border-dashed border-border p-4 text-center text-[12px] text-muted">
              try a command below
            </div>
          )}
          {history.map((m, idx) => (
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
          {pending && (
            <div className="flex gap-3">
              <div className="size-7 shrink-0 rounded-full bg-accent/20 text-center text-[11px] leading-7 text-accent">
                v
              </div>
              <div className="text-[11px] text-muted">
                vantage typing
                <span className="cursor-blink ml-1 inline-block w-1.5 bg-accent" />
              </div>
            </div>
          )}

          <div className="space-y-2 border-t border-border pt-3">
            <div className="text-[11px] text-muted">commands</div>
            <div className="flex flex-wrap gap-2">
              {COMMANDS.map((c) => (
                <button
                  key={c.cmd}
                  onClick={() => trigger(c.cmd)}
                  disabled={!!pending}
                  className="rounded border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11.5px] text-accent hover:bg-accent/20 disabled:opacity-40"
                >
                  <span className="font-mono">{c.cmd}</span>
                  <span className="ml-2 text-[10.5px] text-accent/70">
                    {c.desc}
                  </span>
                </button>
              ))}
              {history.length > 0 && (
                <button
                  onClick={reset}
                  className="ml-auto rounded border border-border bg-border/30 px-2.5 py-1 text-[10.5px] text-muted hover:bg-border/50"
                >
                  ↺ clear
                </button>
              )}
            </div>
          </div>
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "discord", sub: "input" },
          { label: "n8n parser", sub: "command vs free-form" },
          { label: "context", sub: "vault + notion", highlight: true },
          { label: "claude haiku", sub: "answer", highlight: true },
          { label: "discord", sub: "reply" },
        ]}
        direction="right"
      />
    </>
  );
}
