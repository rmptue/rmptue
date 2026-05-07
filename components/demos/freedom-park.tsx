"use client";
import Image from "next/image";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const DIALOGUE = [
  { who: "Prof. Lim", text: "Settle down. PH 201 — Philippine History. Find a seat." },
  { who: "Prof. Lim", text: "Today we cover the Cavite Mutiny. Who can tell me the year?" },
  { who: "you", text: "› 1872", choice: true },
  { who: "you", text: "› 1898", choice: true },
];

export default function FreedomParkDemo() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <>
      <Mockup title="freedom park · phase 0.5b · UPLB">
        <div className="space-y-3">
          <div className="overflow-hidden rounded border border-border">
            <Image
              src="/projects/freedom-park/classroom.png"
              alt="Freedom Park classroom scene with Prof. Lim teaching PH 201"
              width={1366}
              height={768}
              className="h-auto w-full"
              priority={false}
            />
          </div>

          <div className="rounded border border-border bg-border/30 p-3">
            <div className="mb-1.5 text-[11px] text-accent">
              {DIALOGUE.slice(0, step + 1).filter((d) => !d.choice).slice(-1)[0]?.who}
            </div>
            <p className="text-foreground/90">
              {DIALOGUE.slice(0, step + 1).filter((d) => !d.choice).slice(-1)[0]?.text}
            </p>

            {step >= 1 && !picked && (
              <div className="mt-3 space-y-1.5">
                {DIALOGUE.filter((d) => d.choice).map((c) => (
                  <button
                    key={c.text}
                    onClick={() => setPicked(c.text)}
                    className="block w-full rounded border border-border bg-border/40 px-3 py-1.5 text-left text-[12px] text-foreground/85 hover:border-accent/40 hover:text-accent"
                  >
                    {c.text}
                  </button>
                ))}
              </div>
            )}

            {picked && (
              <div className="mt-3 rounded border border-accent/30 bg-accent/5 p-2.5 text-[12px]">
                <div className="mb-1 text-[11px] text-accent">prof. lim</div>
                {picked.includes("1872")
                  ? "Correct. The mutiny was January 20, 1872. Three priests — Gomez, Burgos, Zamora — were executed in February."
                  : "1898 was the Spanish-American War. The mutiny was 1872. Read up on Gomburza tonight."}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (step < 1) setStep(step + 1);
              }}
              disabled={step >= 1 || picked !== null}
              className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] text-accent hover:bg-accent/20 disabled:opacity-30"
            >
              → continue
            </button>
            <button
              onClick={() => {
                setStep(0);
                setPicked(null);
              }}
              className="rounded border border-border bg-border/30 px-3 py-1.5 text-[12px] text-muted hover:bg-border/50"
            >
              ↺ replay
            </button>
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
