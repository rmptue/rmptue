"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Action = "approve" | "edit" | "reject" | null;

export default function SentinelDemo() {
  const [action, setAction] = useState<Action>(null);

  return (
    <>
      <Mockup title="sentinel · review queue">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between text-[11px] text-muted">
            <span>3 in queue · 1 shown</span>
            <span>presence: focused</span>
          </div>

          <div className="rounded border border-border bg-border/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-[11px]">
              <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-amber-300">
                medium
              </span>
              <span className="rounded bg-border/60 px-1.5 py-0.5 text-muted">
                slack · #project-x
              </span>
              <span className="ml-auto text-muted">2m ago</span>
            </div>
            <p className="mb-3 text-foreground/90">
              <span className="text-muted">@maria:</span> hey can you push the
              specs review to friday? something came up on my end.
            </p>

            <div className="mb-3 rounded border border-accent/30 bg-accent/5 p-2.5">
              <div className="mb-1 text-[11px] text-accent">
                claude draft · 0.4s
              </div>
              <p className="text-foreground/85">
                friday works. i&apos;ll keep the doc open if you want to drop
                comments async beforehand. let me know if anything shifts again.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAction("approve")}
                className="rounded border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] text-accent hover:bg-accent/20"
              >
                ✓ approve & send
              </button>
              <button
                onClick={() => setAction("edit")}
                className="rounded border border-border bg-border/30 px-3 py-1 text-[11px] text-foreground/80 hover:bg-border/50"
              >
                edit
              </button>
              <button
                onClick={() => setAction("reject")}
                className="rounded border border-border bg-border/30 px-3 py-1 text-[11px] text-muted hover:bg-border/50"
              >
                discard
              </button>
            </div>

            {action && (
              <div className="mt-3 text-[11px] text-muted">
                {action === "approve" && "→ sent. logged to audit. queue: 2 remaining."}
                {action === "edit" && "→ opened in editor."}
                {action === "reject" && "→ discarded. claude flagged for retraining."}
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
