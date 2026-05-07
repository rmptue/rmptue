"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const TABS = [
  { id: "meal", label: "meal" },
  { id: "workout", label: "workout" },
  { id: "activity", label: "activity" },
  { id: "review", label: "review" },
  { id: "coach", label: "coach" },
] as const;
type Tab = (typeof TABS)[number]["id"];

export default function VitalDemo() {
  const [tab, setTab] = useState<Tab>("meal");
  const [mealStep, setMealStep] = useState(0);
  const [voiceTyping, setVoiceTyping] = useState(false);
  const [workoutLogged, setWorkoutLogged] = useState(false);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <Mockup variant="phone" title="vital">
          <div className="mb-3 flex flex-wrap gap-1 text-[10px]">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded px-1.5 py-1 ${
                  t.id === tab
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "meal" && (
            <div className="min-h-[340px] space-y-3">
              {mealStep === 0 && (
                <>
                  <div className="text-[10.5px] text-muted">today · 12:42pm</div>
                  <div className="flex flex-col items-center gap-2 py-4">
                    <div className="flex size-28 items-center justify-center rounded-2xl border border-dashed border-border bg-border/20 text-[24px] text-muted">
                      📷
                    </div>
                    <div className="text-[12px] text-foreground/85">
                      log a meal
                    </div>
                  </div>
                  <button
                    onClick={() => setMealStep(1)}
                    className="w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-[12px] text-accent hover:bg-accent/20"
                  >
                    take photo
                  </button>
                </>
              )}
              {mealStep === 1 && (
                <>
                  <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-amber-500/40 via-orange-500/40 to-red-500/40" />
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-accent">
                      <span>claude vision · identifying</span>
                      <span className="cursor-blink inline-block w-1.5 bg-accent" />
                    </div>
                  </div>
                  <button
                    onClick={() => setMealStep(2)}
                    className="w-full rounded-lg border border-border bg-border/30 px-4 py-2 text-[12px] text-foreground/80 hover:bg-border/50"
                  >
                    → done (demo)
                  </button>
                </>
              )}
              {mealStep === 2 && (
                <>
                  <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-amber-500/40 via-orange-500/40 to-red-500/40" />
                  <div className="text-[12px] text-foreground/90">
                    chicken adobo, rice, fried egg
                  </div>
                  <ul className="space-y-1 text-[11px]">
                    {[
                      ["calories", "~ 720 kcal"],
                      ["protein", "38 g"],
                      ["carbs", "62 g"],
                      ["fat", "34 g"],
                    ].map(([k, v]) => (
                      <li key={k} className="flex justify-between">
                        <span className="text-muted">{k}</span>
                        <span className="font-mono">{v}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded border border-accent/30 bg-accent/5 p-2 text-[10.5px] text-accent">
                    ✓ logged · synced to vault
                  </div>
                  <button
                    onClick={() => setMealStep(0)}
                    className="w-full rounded-lg border border-border bg-border/30 px-4 py-2 text-[12px] text-muted hover:bg-border/50"
                  >
                    ↺ replay
                  </button>
                </>
              )}
            </div>
          )}

          {tab === "workout" && (
            <div className="min-h-[340px] space-y-3">
              <div className="text-[10.5px] text-muted">log via voice</div>
              <div className="rounded-lg border border-border bg-border/20 p-3">
                <div className="mb-2 flex items-center gap-2 text-[10.5px] text-muted">
                  <span
                    className={`size-2 rounded-full ${voiceTyping ? "bg-red-400 animate-pulse" : "bg-muted"}`}
                  />
                  {voiceTyping ? "listening" : "tap mic"}
                </div>
                <p className="text-[12px] italic text-foreground/85">
                  &quot;four sets of squats, 80 kilos, 8 reps. last set was
                  rough — RPE 9.&quot;
                </p>
              </div>

              {!workoutLogged ? (
                <button
                  onClick={() => {
                    setVoiceTyping(true);
                    setTimeout(() => {
                      setVoiceTyping(false);
                      setWorkoutLogged(true);
                    }, 800);
                  }}
                  className="w-full rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-[12px] text-accent hover:bg-accent/20"
                >
                  → parse with claude
                </button>
              ) : (
                <>
                  <div className="rounded border border-accent/30 bg-accent/5 p-3">
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-accent/70">
                      claude · structured
                    </div>
                    <div className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 text-[11px]">
                      <span className="text-muted">exercise</span>
                      <span className="text-foreground/90">back squat</span>
                      <span className="text-muted">sets × reps</span>
                      <span className="text-foreground/90">4 × 8</span>
                      <span className="text-muted">load</span>
                      <span className="font-mono text-foreground/90">80 kg</span>
                      <span className="text-muted">RPE</span>
                      <span className="font-mono text-amber-300">9 (high)</span>
                      <span className="text-muted">volume</span>
                      <span className="font-mono text-foreground/90">2,560 kg</span>
                    </div>
                  </div>
                  <div className="text-[10.5px] text-muted">
                    ✓ logged · vault synced · fatigue +1
                  </div>
                  <button
                    onClick={() => setWorkoutLogged(false)}
                    className="w-full rounded-lg border border-border bg-border/30 px-4 py-2 text-[12px] text-muted hover:bg-border/50"
                  >
                    ↺ replay
                  </button>
                </>
              )}
            </div>
          )}

          {tab === "activity" && (
            <div className="min-h-[340px] space-y-3">
              <div className="text-[10.5px] text-muted">today · passive</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: "steps", v: "8,420", sub: "of 10k" },
                  { l: "active min", v: "47", sub: "vs 60" },
                  { l: "kcal burn", v: "2,180", sub: "tdee" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded border border-border bg-border/20 p-2"
                  >
                    <div className="text-[9.5px] text-muted">{s.l}</div>
                    <div className="font-mono text-[14px] text-foreground">
                      {s.v}
                    </div>
                    <div className="text-[9.5px] text-muted">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-1 text-[10.5px] text-muted">
                  hr zones · 7d
                </div>
                <div className="flex gap-0.5">
                  {[
                    { z: 1, w: 32, c: "bg-foreground/30" },
                    { z: 2, w: 28, c: "bg-accent/40" },
                    { z: 3, w: 22, c: "bg-accent/60" },
                    { z: 4, w: 12, c: "bg-amber-300/60" },
                    { z: 5, w: 6, c: "bg-red-400/60" },
                  ].map((z) => (
                    <div
                      key={z.z}
                      className={`h-3 ${z.c}`}
                      style={{ width: `${z.w}%` }}
                      title={`zone ${z.z}`}
                    />
                  ))}
                </div>
                <div className="mt-1 flex justify-between font-mono text-[9.5px] text-muted">
                  <span>z1</span>
                  <span>z2</span>
                  <span>z3</span>
                  <span>z4</span>
                  <span>z5</span>
                </div>
              </div>

              <div className="rounded border border-border bg-border/20 p-2 text-[11px]">
                <div className="mb-0.5 text-[10px] text-muted">weight</div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[14px] text-foreground">
                    74.2 kg
                  </span>
                  <span className="font-mono text-[10.5px] text-accent">
                    ↓ 0.4 / 7d
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "review" && (
            <div className="min-h-[340px] space-y-3">
              <div className="text-[10.5px] text-muted">
                claude · weekly review · 2026-w19
              </div>

              <div className="space-y-2 rounded border border-accent/30 bg-accent/5 p-3 text-[11.5px] leading-[1.55] text-foreground/90">
                <p>
                  Net deficit of{" "}
                  <span className="font-mono text-accent">~2,800 kcal</span>{" "}
                  this week — sustainable. Training volume up{" "}
                  <span className="font-mono text-accent">+18%</span> over last
                  week, mostly from added squat work.
                </p>
                <p>
                  Two flags. RPE on tuesday squats was{" "}
                  <span className="font-mono text-amber-300">9</span> — that
                  matches the poor sleep on monday (
                  <span className="font-mono">5h 20m</span>). Carb intake on
                  wednesday and thursday was below the threshold you set, which
                  tracks with the lower energy log on those days.
                </p>
              </div>

              <div className="rounded border border-border bg-border/20 p-2.5 text-[11px]">
                <div className="mb-1 text-[10px] text-muted">
                  cited from logs
                </div>
                <ul className="space-y-0.5 font-mono text-[10.5px] text-foreground/75">
                  <li>· workout · 2026-05-05 · squats RPE 9</li>
                  <li>· sleep · 2026-05-04 · 5h 20m</li>
                  <li>· meal · 2026-05-06 · carbs 142g (target 220g)</li>
                </ul>
              </div>
            </div>
          )}

          {tab === "coach" && (
            <div className="min-h-[340px] space-y-3">
              <div className="text-[10.5px] text-muted">
                claude · suggested session · today
              </div>

              <div className="rounded border border-accent/30 bg-accent/5 p-3">
                <div className="mb-1 text-[12px] font-medium text-accent">
                  upper · push focus · 50 min
                </div>
                <p className="text-[10.5px] leading-[1.5] text-foreground/85">
                  legs were heavy tuesday and your sleep was off; today is a
                  push day, lower volume, primary at RPE 7.
                </p>
              </div>

              <ul className="space-y-1 text-[11px]">
                {[
                  { ex: "bench press", set: "4 × 6", load: "70 kg @ RPE 7" },
                  { ex: "ohp", set: "3 × 8", load: "42 kg" },
                  { ex: "incline db press", set: "3 × 10", load: "20 kg ea" },
                  { ex: "tricep pushdown", set: "3 × 12", load: "to failure" },
                ].map((x) => (
                  <li
                    key={x.ex}
                    className="flex items-center justify-between rounded border border-border bg-border/20 px-2 py-1.5"
                  >
                    <span className="text-foreground/90">{x.ex}</span>
                    <span className="font-mono text-[10px] text-muted">
                      {x.set}
                    </span>
                    <span className="font-mono text-[10px] text-foreground/70">
                      {x.load}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <button className="flex-1 rounded border border-accent/40 bg-accent/10 py-1.5 text-[11px] text-accent hover:bg-accent/20">
                  ✓ accept
                </button>
                <button className="flex-1 rounded border border-border bg-border/30 py-1.5 text-[11px] text-foreground/80 hover:bg-border/50">
                  modify
                </button>
                <button className="rounded border border-border bg-border/30 px-3 py-1.5 text-[11px] text-muted hover:bg-border/50">
                  skip
                </button>
              </div>
            </div>
          )}
        </Mockup>

        <div className="hidden self-center text-[11px] text-muted sm:block">
          <div className="space-y-2 font-mono">
            <div>↺ tabs · meal / workout / activity</div>
            <div>+ weekly review · claude narrates</div>
            <div>+ coach · next-workout suggester</div>
            <div>↳ all logs sync to vault</div>
          </div>
        </div>
      </div>

      <Flow
        nodes={[
          { label: "log surfaces", sub: "meal · gym · activity" },
          {
            label: "claude vision + voice",
            sub: "structured logs",
            highlight: true,
          },
          { label: "supabase", sub: "personal db" },
          { label: "vault sync", sub: "claude reads health context", highlight: true },
          {
            label: "weekly review",
            sub: "+ workout suggester",
            highlight: true,
          },
        ]}
        direction="right"
      />
    </>
  );
}
