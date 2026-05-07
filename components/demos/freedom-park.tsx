"use client";
import Image from "next/image";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Beat =
  | { kind: "line"; who: string; text: string }
  | {
      kind: "choice";
      prompt: string;
      options: { label: string; outcome: string; correct?: boolean }[];
    };

const SCRIPT: Beat[] = [
  { kind: "line", who: "Prof. Lim", text: "Settle down. PH 201 — Philippine History. Find a seat." },
  { kind: "line", who: "Prof. Lim", text: "Today we cover the Cavite Mutiny. Who can tell me the year?" },
  {
    kind: "choice",
    prompt: "answer the prof",
    options: [
      {
        label: "› 1872",
        outcome:
          "Correct. January 20, 1872. Three priests — Gomez, Burgos, Zamora — were executed in February. Read up on Gomburza tonight.",
        correct: true,
      },
      {
        label: "› 1898",
        outcome:
          "1898 was the Spanish-American War. The mutiny was 1872. Read up on Gomburza tonight.",
      },
      {
        label: "› i don't know",
        outcome:
          "Honest answer. The mutiny was 1872 — three priests executed in 1872. We'll come back to it.",
      },
    ],
  },
  { kind: "line", who: "Prof. Lim", text: "Now — what was the spark? Not the mutiny itself. The grievance underneath it." },
  {
    kind: "choice",
    prompt: "respond",
    options: [
      {
        label: "› the abolition of military exemption for arsenal workers",
        outcome: "Yes — that&apos;s the proximate cause. Polo y servicio dragged in workers who had been exempt for decades.",
        correct: true,
      },
      {
        label: "› a peasant revolt",
        outcome: "Not quite. The Cavite Mutiny was workers and soldiers, not peasants. The peasant revolts come later, under a different lens.",
      },
    ],
  },
  { kind: "line", who: "Prof. Lim", text: "Good. Stay with me on this — the consequence matters more than the spark. The execution of Gomburza radicalized an entire generation. Including a young man named José Rizal." },
  { kind: "line", who: "you", text: "(end of demo scene)" },
];

export default function FreedomParkDemo() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<{ stepIdx: number; outcome: string; correct?: boolean } | null>(null);

  const cur = SCRIPT[step];
  const isChoice = cur?.kind === "choice";

  function advance() {
    if (step < SCRIPT.length - 1) setStep(step + 1);
  }

  function pick(outcome: string, correct: boolean | undefined) {
    setPicked({ stepIdx: step, outcome, correct });
  }

  function continueAfterPick() {
    setPicked(null);
    advance();
  }

  function reset() {
    setStep(0);
    setPicked(null);
  }

  return (
    <>
      <Mockup title="freedom park · scene: PH 201 classroom · UPLB">
        <div className="space-y-3">
          <div className="overflow-hidden rounded border border-border">
            <Image
              src="/projects/freedom-park/classroom.png"
              alt="Freedom Park classroom scene with Prof. Lim teaching PH 201"
              width={1366}
              height={768}
              className="h-auto w-full"
            />
          </div>

          <div className="rounded border border-border bg-border/30 p-3">
            {!picked && cur.kind === "line" && (
              <>
                <div className="mb-1.5 text-[11px] text-accent">{cur.who}</div>
                <p className="text-foreground/90">{cur.text}</p>
              </>
            )}

            {!picked && isChoice && cur.kind === "choice" && (
              <div className="space-y-2">
                <div className="text-[11px] text-muted">{cur.prompt}</div>
                {cur.options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => pick(o.outcome, o.correct)}
                    className="block w-full rounded border border-border bg-border/40 px-3 py-1.5 text-left text-[12px] text-foreground/85 hover:border-accent/40 hover:text-accent"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}

            {picked && (
              <div
                className={`rounded border p-2.5 text-[12px] ${
                  picked.correct
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-amber-300/40 bg-amber-300/5 text-amber-300"
                }`}
              >
                <div className="mb-1 text-[11px]">prof. lim</div>
                {picked.outcome}
              </div>
            )}
          </div>

          <div className="flex gap-2 text-[12px]">
            {!picked && !isChoice && step < SCRIPT.length - 1 && (
              <button
                onClick={advance}
                className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent hover:bg-accent/20"
              >
                → continue
              </button>
            )}
            {picked && (
              <button
                onClick={continueAfterPick}
                className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent hover:bg-accent/20"
              >
                → continue
              </button>
            )}
            <button
              onClick={reset}
              className="rounded border border-border bg-border/30 px-3 py-1.5 text-muted hover:bg-border/50"
            >
              ↺ replay
            </button>
            <span className="ml-auto self-center text-[11px] text-muted">
              beat {Math.min(step + 1, SCRIPT.length)} / {SCRIPT.length}
            </span>
          </div>
        </div>
      </Mockup>

      <Flow
        nodes={[
          { label: "design conv.", sub: "claude sonnet" },
          { label: "dialogue", sub: "claude sonnet", highlight: true },
          { label: "backgrounds", sub: "gemini paint", highlight: true },
          { label: "revision", sub: "aseprite (human)" },
          { label: "godot", sub: "in-engine" },
        ]}
        direction="right"
      />
    </>
  );
}
