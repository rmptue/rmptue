"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type File = { path: string; body: string };

const FILES: File[] = [
  {
    path: "_core/keyword-router.md",
    body: `# keyword router

bps / financial-narrative      → work/projects/bps-generator.md
vantage / chief of staff       → builds/vantage/_index.md
freedom park / godot           → builds/freedom-park/_index.md
mrv / climate measurement      → consultancy/mrv-research/index.md`,
  },
  {
    path: "builds/vantage/_index.md",
    body: `# VANTAGE — personal AI chief of staff

status: phase 3 done, phase 4 planned
stack: claude haiku, n8n, railway, notion, discord
core idea: routing layer is the product. claude is the helper.

## active threads
- phase 4: wealth tracking (notion db + portfolio queries)
- phase 5: model routing, voice input, arxiv digest`,
  },
  {
    path: "daily/2026-05-08.md",
    body: `# 2026-05-08

### claude session
- discussed portfolio site rebrand: warmer accent, interactive demos
- decided: add upcoming projects as "concept" status, not hidden
- next: ship rmptue.vercel.app v2 with mockups for every project`,
  },
];

export default function VaultDemo() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Mockup title="obsidian · ~/vantage">
        <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
          <ul className="space-y-1 text-[12px]">
            {FILES.map((f, i) => (
              <li key={f.path}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full truncate rounded px-2 py-1 text-left transition-colors ${
                    i === active
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:bg-border/40 hover:text-foreground"
                  }`}
                >
                  {f.path}
                </button>
              </li>
            ))}
          </ul>
          <pre className="overflow-x-auto rounded border border-border bg-border/20 p-3 text-[12px] leading-[1.55] text-foreground/85">
            {FILES[active].body}
          </pre>
        </div>
      </Mockup>
      <Flow
        nodes={[
          { label: "you mention 'BPS'", sub: "in any chat" },
          { label: "userPrefs router", sub: "keyword → file", highlight: true },
          { label: "MCP read", sub: "load the right note", highlight: true },
          { label: "claude responds", sub: "with full context" },
        ]}
        direction="right"
      />
    </>
  );
}
