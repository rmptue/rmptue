"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

const TABS = ["raw whisper", "claude corrected"] as const;

export default function MeetingCopilotDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("raw whisper");
  const isRaw = tab === "raw whisper";
  return (
    <>
      <Mockup title="meeting copilot · live">
        <div className="mb-3 flex gap-1 text-[11px]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-2.5 py-1 transition-colors ${
                t === tab
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-2.5 font-mono text-[12px] leading-[1.6]">
          <div>
            <span className="mr-2 text-muted">[00:14]</span>
            <span className="text-muted">speaker_1:</span>{" "}
            {isRaw ? (
              <span className="text-foreground/85">
                let&apos;s walk through{" "}
                <span className="bg-red-500/15 text-red-300">OK-R&apos;s</span>{" "}
                for q3 and the{" "}
                <span className="bg-red-500/15 text-red-300">Atlus</span>{" "}
                migration in{" "}
                <span className="bg-red-500/15 text-red-300">Manilla</span>
              </span>
            ) : (
              <span className="text-foreground/90">
                let&apos;s walk through{" "}
                <span className="bg-accent/15 text-accent">OKRs</span> for q3
                and the{" "}
                <span className="bg-accent/15 text-accent">Atlas</span>{" "}
                migration in{" "}
                <span className="bg-accent/15 text-accent">Manila</span>
              </span>
            )}
          </div>

          <div>
            <span className="mr-2 text-muted">[00:21]</span>
            <span className="text-muted">silence·gap·</span>{" "}
            {isRaw ? (
              <span className="bg-red-500/15 text-red-300">
                Thank you. Thanks for watching.
              </span>
            ) : (
              <span className="text-muted italic">[silence — dropped]</span>
            )}
          </div>

          <div>
            <span className="mr-2 text-muted">[00:34]</span>
            <span className="text-muted">speaker_2:</span>{" "}
            <span className="text-foreground/90">
              right, and we should have the action-items doc ready by friday.
            </span>
          </div>

          <div>
            <span className="mr-2 text-muted">[00:42]</span>
            <span className="text-muted">speaker_1:</span>{" "}
            {isRaw ? (
              <span className="text-foreground/85">
                <span className="bg-red-500/15 text-red-300">
                  uh, like, you know,
                </span>{" "}
                great. let&apos;s also talk about the q4 roadmap before we
                wrap.
              </span>
            ) : (
              <span className="text-foreground/90">
                great. let&apos;s also talk about the q4 roadmap before we
                wrap.{" "}
                <span className="text-[10.5px] text-muted italic">
                  [filler stripped]
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-3 text-[11px] text-muted">
          {isRaw
            ? "raw whisper output. acronym corruption, silence hallucination, filler verbatim."
            : "ollama / gemma 4 correction (local). glossary preserved, low-confidence dropped, filler stripped."}
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "audio capture", sub: "30s rolling chunks" },
          { label: "faster-whisper", sub: "STT, GPU local" },
          { label: "confidence gate", sub: "drop low-conf" },
          { label: "ollama / gemma 4", sub: "local correction · $0", highlight: true },
          { label: "transcript", sub: "diarized + corrected" },
        ]}
        direction="right"
      />
    </>
  );
}
