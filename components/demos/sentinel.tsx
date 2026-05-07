"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Msg = {
  from: string;
  source: string;
  body: string;
  urgency: "low" | "medium" | "high";
  topic: string;
  draft: string;
  age: string;
};

const QUEUE: Msg[] = [
  {
    from: "@maria",
    source: "slack · #project-x",
    body:
      "hey can you push the specs review to friday? something came up on my end.",
    urgency: "medium",
    topic: "scheduling",
    draft:
      "friday works. i'll keep the doc open if you want to drop comments async beforehand. let me know if anything shifts again.",
    age: "2m ago",
  },
  {
    from: "ops@stripe.com",
    source: "email",
    body:
      "Reminder: SOC2 evidence package for Q2 is due in 5 days. Please review the attached checklist.",
    urgency: "high",
    topic: "compliance · deadline",
    draft:
      "Thanks — saw the checklist. I'll have items 1–4 to you by Wednesday and the rest by Friday. Will flag if anything blocks.",
    age: "11m ago",
  },
  {
    from: "@kenji",
    source: "teams · 1:1",
    body:
      "no rush — when you have a sec, the q3 forecast deck has a couple of numbers that look stale on slide 14.",
    urgency: "low",
    topic: "review request",
    draft:
      "good catch. those are pre-revision. updated numbers in the doc; will refresh slide 14 today and ping when done.",
    age: "27m ago",
  },
];

type Action = "approve" | "edit" | "reject" | null;
const URG_COLOR = {
  low: "bg-border/60 text-muted",
  medium: "bg-amber-400/15 text-amber-300",
  high: "bg-red-500/15 text-red-300",
};

export default function SentinelDemo() {
  const [active, setActive] = useState(0);
  const [actions, setActions] = useState<(Action | null)[]>([null, null, null]);
  const m = QUEUE[active];

  function setAction(a: Action) {
    setActions((prev) => prev.map((x, i) => (i === active ? a : x)));
  }

  return (
    <>
      <Mockup title="sentinel · review queue · presence: focused">
        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <ul className="space-y-1">
            <li className="px-2 pb-1 text-[10.5px] uppercase tracking-wide text-muted">
              queue · 3
            </li>
            {QUEUE.map((q, i) => (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full rounded px-2 py-2 text-left transition-colors ${
                    i === active
                      ? "bg-accent/15"
                      : "hover:bg-border/40"
                  } ${actions[i] ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] ${URG_COLOR[q.urgency]}`}
                    >
                      {q.urgency}
                    </span>
                    <span className="text-[10.5px] text-muted">{q.age}</span>
                  </div>
                  <div
                    className={`mt-1 truncate text-[12px] ${
                      i === active ? "text-accent" : "text-foreground/85"
                    }`}
                  >
                    {q.from}
                  </div>
                  <div className="truncate text-[10.5px] text-muted">
                    {q.source}
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <div className="rounded border border-border bg-border/20 p-3">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
                <span className={`rounded px-1.5 py-0.5 ${URG_COLOR[m.urgency]}`}>
                  {m.urgency}
                </span>
                <span className="rounded bg-border/60 px-1.5 py-0.5 text-muted">
                  {m.source}
                </span>
                <span className="text-muted">topic: {m.topic}</span>
                <span className="ml-auto text-muted">{m.age}</span>
              </div>
              <p className="text-[12.5px] text-foreground/90">
                <span className="text-muted">{m.from}:</span> {m.body}
              </p>
            </div>

            <div className="rounded border border-accent/30 bg-accent/5 p-3">
              <div className="mb-1 text-[11px] text-accent">
                claude draft · 0.4s
              </div>
              <p className="text-[12.5px] text-foreground/90">{m.draft}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAction("approve")}
                disabled={actions[active] !== null}
                className="rounded border border-accent/40 bg-accent/10 px-3 py-1 text-[11.5px] text-accent hover:bg-accent/20 disabled:opacity-40"
              >
                ✓ approve & send
              </button>
              <button
                onClick={() => setAction("edit")}
                disabled={actions[active] !== null}
                className="rounded border border-border bg-border/30 px-3 py-1 text-[11.5px] text-foreground/80 hover:bg-border/50 disabled:opacity-40"
              >
                edit
              </button>
              <button
                onClick={() => setAction("reject")}
                disabled={actions[active] !== null}
                className="rounded border border-border bg-border/30 px-3 py-1 text-[11.5px] text-muted hover:bg-border/50 disabled:opacity-40"
              >
                discard
              </button>
              <button
                onClick={() => setActions([null, null, null])}
                className="ml-auto rounded border border-border bg-border/30 px-2.5 py-1 text-[10.5px] text-muted hover:bg-border/50"
              >
                ↺ reset queue
              </button>
            </div>

            {actions[active] && (
              <div className="text-[11px] text-muted">
                {actions[active] === "approve" &&
                  "→ sent. logged to audit. claude rubric updated with approval signal."}
                {actions[active] === "edit" && "→ opened in editor."}
                {actions[active] === "reject" &&
                  "→ discarded. flagged for retraining; rubric down-weights this draft pattern."}
              </div>
            )}
          </div>
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "ingestion", sub: "slack/mail/teams" },
          { label: "haiku classify", sub: "urgency + topic", highlight: true },
          { label: "sonnet draft", sub: "candidate reply", highlight: true },
          { label: "review queue", sub: "human in loop" },
          { label: "send", sub: "+ audit log" },
        ]}
        direction="right"
      />
    </>
  );
}
