"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type Turn = {
  role: "user" | "assistant";
  content: string;
  flags?: { label: string; severity: "low" | "high" }[];
};

const TURNS: Turn[] = [
  { role: "user", content: "the auth tests are failing. fix them." },
  {
    role: "assistant",
    content:
      "I'll refactor the auth module to use dependency injection and add a mock provider. While I'm here, I'll also restructure the test suite to use fixtures.",
    flags: [
      { label: "scope drift — was asked to fix, proposing refactor", severity: "high" },
      { label: "premature mocking before reading the failure", severity: "high" },
    ],
  },
  {
    role: "user",
    content: "no. just look at the failure first.",
  },
  {
    role: "assistant",
    content:
      "Reading the test output. The failure is in `verify_token` — the signature check is using HS256 but the token is signed with RS256. Single-line fix in `auth/jwt.py:42`.",
    flags: [{ label: "good — root cause + minimal fix", severity: "low" }],
  },
];

export default function BobCoachDemo() {
  const [showFlags, setShowFlags] = useState(true);
  return (
    <>
      <Mockup title="bob coach · session review">
        <div className="mb-3 flex items-center justify-between text-[11px]">
          <span className="text-muted">claude code · session 2026-05-08-001</span>
          <button
            onClick={() => setShowFlags((s) => !s)}
            className={`rounded border px-2 py-0.5 ${
              showFlags
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border text-muted"
            }`}
          >
            {showFlags ? "✓ flags on" : "flags off"}
          </button>
        </div>
        <div className="space-y-3">
          {TURNS.map((t, i) => (
            <div key={i} className="space-y-1.5">
              <div className="text-[11px] text-muted">
                {t.role === "user" ? "you" : "claude"}
              </div>
              <div className="text-foreground/90">{t.content}</div>
              {showFlags &&
                t.flags?.map((f, j) => (
                  <div
                    key={j}
                    className={`flex gap-2 rounded border px-2 py-1 text-[11px] ${
                      f.severity === "high"
                        ? "border-red-500/30 bg-red-500/5 text-red-300"
                        : "border-accent/30 bg-accent/5 text-accent"
                    }`}
                  >
                    <span>{f.severity === "high" ? "⚠" : "✓"}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "session log", sub: "claude code history" },
          { label: "turn parser", sub: "user/assistant pairs" },
          { label: "claude scorer", sub: "rubric over each turn", highlight: true },
          { label: "flag detector", sub: "anti-patterns", highlight: true },
          { label: "review UI", sub: "operator triages" },
        ]}
        direction="right"
      />
    </>
  );
}
