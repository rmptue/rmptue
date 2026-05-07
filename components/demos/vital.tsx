"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const SCREENS = [
  { label: "1 · capture" },
  { label: "2 · analyzing" },
  { label: "3 · breakdown" },
] as const;

export default function VitalDemo() {
  const [screen, setScreen] = useState(0);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <Mockup variant="phone" title="vital">
          <div className="min-h-[320px]">
            {screen === 0 && (
              <div className="flex flex-col items-center justify-between min-h-[300px] py-6">
                <div className="text-[11px] text-muted">today · 12:42pm</div>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex size-32 items-center justify-center rounded-2xl border border-dashed border-border bg-border/20 text-[28px] text-muted">
                    📷
                  </div>
                  <div className="text-foreground/90">log a meal</div>
                </div>
                <button
                  onClick={() => setScreen(1)}
                  className="w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-accent hover:bg-accent/20"
                >
                  take photo
                </button>
              </div>
            )}

            {screen === 1 && (
              <div className="flex flex-col gap-4 min-h-[300px] py-6">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500/30 via-orange-500/30 to-red-500/30" />
                <div className="space-y-1.5 text-[12px]">
                  <div className="flex justify-between text-muted">
                    <span>↑ uploading</span>
                    <span>✓</span>
                  </div>
                  <div className="flex justify-between text-accent">
                    <span>claude vision · identifying</span>
                    <span className="cursor-blink inline-block w-2 bg-accent" />
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>macro estimation</span>
                    <span>—</span>
                  </div>
                </div>
                <button
                  onClick={() => setScreen(2)}
                  className="mt-auto w-full rounded-lg border border-border bg-border/30 px-4 py-2 text-foreground/80 hover:bg-border/50"
                >
                  → done (demo)
                </button>
              </div>
            )}

            {screen === 2 && (
              <div className="flex flex-col gap-3 min-h-[300px] py-2">
                <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-amber-500/40 via-orange-500/40 to-red-500/40" />
                <div className="text-foreground/90">
                  chicken adobo, rice, fried egg
                </div>
                <ul className="space-y-1 text-[12px]">
                  <li className="flex justify-between"><span className="text-muted">calories</span><span className="font-mono">~ 720 kcal</span></li>
                  <li className="flex justify-between"><span className="text-muted">protein</span><span className="font-mono">38 g</span></li>
                  <li className="flex justify-between"><span className="text-muted">carbs</span><span className="font-mono">62 g</span></li>
                  <li className="flex justify-between"><span className="text-muted">fat</span><span className="font-mono">34 g</span></li>
                </ul>
                <div className="rounded border border-accent/30 bg-accent/5 p-2 text-[11px] text-accent">
                  ✓ logged · vantage will include in tomorrow&apos;s digest
                </div>
                <button
                  onClick={() => setScreen(0)}
                  className="mt-auto w-full rounded-lg border border-border bg-border/30 px-4 py-2 text-muted hover:bg-border/50"
                >
                  ↺ replay
                </button>
              </div>
            )}
          </div>
        </Mockup>

        <div className="flex sm:flex-col gap-2 self-center">
          {SCREENS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setScreen(i)}
              className={`rounded border px-3 py-1.5 text-[11px] ${
                i === screen
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <Flow
        nodes={[
          { label: "meal photo", sub: "phone camera" },
          { label: "claude vision", sub: "ingredients", highlight: true },
          { label: "macro estimate", sub: "calories + p/c/f", highlight: true },
          { label: "supabase", sub: "log + history" },
          { label: "vantage digest", sub: "nightly summary" },
        ]}
        direction="right"
      />
    </>
  );
}
