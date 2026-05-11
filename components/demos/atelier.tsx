"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type PersonaKey = "strategist" | "designer" | "builder" | "critic" | "qa";

const PERSONAS: { key: PersonaKey; name: string; icon: string; question: string; not: string }[] = [
  {
    key: "strategist",
    name: "Strategist",
    icon: "◆",
    question: "What's the actual problem and what should the answer look like?",
    not: "code · design · build",
  },
  {
    key: "designer",
    name: "Designer",
    icon: "▲",
    question: "How should this be structured?",
    not: "implement",
  },
  {
    key: "builder",
    name: "Builder",
    icon: "●",
    question: "Make the thing.",
    not: "skip design · re-litigate strategy",
  },
  {
    key: "critic",
    name: "Critic",
    icon: "✦",
    question: "Is this good, and is it the right approach?",
    not: "QA-test · rewrite the work",
  },
  {
    key: "qa",
    name: "QA / Scribe",
    icon: "■",
    question: "Does it work, and is it documented?",
    not: "review for taste",
  },
];

type TaskState = "queued" | "in-progress" | "done";

type Task = {
  id: string;
  title: string;
  project: string;
  persona: PersonaKey;
  state: TaskState;
  nextDefault: PersonaKey | "done";
  nextProposed: PersonaKey | "done";
  reason?: string;
};

const INITIAL_TASKS: Task[] = [
  {
    id: "T1",
    title: "Define Atelier Phase 2 MCP server architecture",
    project: "atelier",
    persona: "strategist",
    state: "done",
    nextDefault: "designer",
    nextProposed: "designer",
  },
  {
    id: "T2",
    title: "Design Atelier MCP tool surface + schema",
    project: "atelier",
    persona: "designer",
    state: "in-progress",
    nextDefault: "builder",
    nextProposed: "builder",
  },
  {
    id: "T3",
    title: "Draft Mirastate sim #76 brief — Tarsier habitat",
    project: "mirastate",
    persona: "strategist",
    state: "queued",
    nextDefault: "builder",
    nextProposed: "designer",
    reason:
      "this sim is a cascade shape — needs design pass for view structure before coding",
  },
  {
    id: "T4",
    title: "Implement bunk-bed dialogue tree (Phase 0.6)",
    project: "freedom-park",
    persona: "builder",
    state: "queued",
    nextDefault: "critic",
    nextProposed: "critic",
  },
  {
    id: "T5",
    title: "Review Sentinel v1 audit-log schema",
    project: "sentinel",
    persona: "critic",
    state: "queued",
    nextDefault: "qa",
    nextProposed: "strategist",
    reason: "critic spotted a missing requirement — needs scoping reset, not QA",
  },
];

const PERSONA_COLOR: Record<PersonaKey, { bg: string; text: string; dot: string }> = {
  strategist: { bg: "bg-violet-400/15 border-violet-400/40", text: "text-violet-300", dot: "bg-violet-400" },
  designer: { bg: "bg-sky-400/15 border-sky-400/40", text: "text-sky-300", dot: "bg-sky-400" },
  builder: { bg: "bg-emerald-400/15 border-emerald-400/40", text: "text-emerald-300", dot: "bg-emerald-400" },
  critic: { bg: "bg-amber-400/15 border-amber-400/40", text: "text-amber-300", dot: "bg-amber-400" },
  qa: { bg: "bg-rose-400/15 border-rose-400/40", text: "text-rose-300", dot: "bg-rose-400" },
};

const STATE_LABEL: Record<TaskState, string> = {
  queued: "queued",
  "in-progress": "in-progress",
  done: "done",
};

const TABS = ["queue", "personas", "pipeline"] as const;
type Tab = (typeof TABS)[number];

export default function AtelierDemo() {
  const [tab, setTab] = useState<Tab>("queue");
  const [activePersona, setActivePersona] = useState<PersonaKey>("strategist");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTaskId, setActiveTaskId] = useState("T3");
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  function approveRoute(taskId: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, state: "done" as TaskState, nextDefault: t.nextProposed } : t,
      ),
    );
  }

  function resetTasks() {
    setTasks(INITIAL_TASKS);
    setActiveTaskId("T3");
  }

  return (
    <>
      <Mockup title="atelier · 5 personas · vault-resident · local-only">
        <div className="mb-4 flex flex-wrap gap-1 text-[12px]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-3 py-1 transition-colors ${
                t === tab
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto self-center font-mono text-[10.5px] text-muted">
            phase 0 · architecture locked
          </span>
        </div>

        {tab === "queue" && (
          <div className="grid gap-3 sm:grid-cols-[1fr_280px]">
            <div className="space-y-3">
              {(["in-progress", "queued", "done"] as TaskState[]).map((stage) => {
                const stageTasks = tasks.filter((t) => t.state === stage);
                return (
                  <div key={stage}>
                    <div className="mb-1.5 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-wide text-muted">
                      <span>{STATE_LABEL[stage]}</span>
                      <span>{stageTasks.length}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {stageTasks.map((t) => {
                        const c = PERSONA_COLOR[t.persona];
                        return (
                          <li key={t.id}>
                            <button
                              onClick={() => setActiveTaskId(t.id)}
                              className={`block w-full rounded border px-3 py-2 text-left transition-colors ${
                                t.id === activeTaskId
                                  ? "border-accent/40 bg-accent/5"
                                  : "border-border bg-border/15 hover:border-accent/30"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`size-2 rounded-full ${c.dot}`} />
                                <span className={`font-mono text-[10px] ${c.text}`}>
                                  {t.persona}
                                </span>
                                <span className="ml-auto font-mono text-[10px] text-muted">
                                  {t.project}
                                </span>
                              </div>
                              <div className="mt-0.5 text-[12px] text-foreground/90">
                                {t.title}
                              </div>
                              {t.reason && (
                                <div className="mt-1 text-[10.5px] text-amber-300/90">
                                  ⚑ override: {t.reason}
                                </div>
                              )}
                            </button>
                          </li>
                        );
                      })}
                      {stageTasks.length === 0 && (
                        <li className="rounded border border-dashed border-border p-2 text-center text-[10.5px] text-muted">
                          —
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              {activeTask && (
                <>
                  <div className="rounded border border-border bg-border/20 p-3 text-[12px]">
                    <div className="text-[10.5px] text-muted">selected task</div>
                    <div className="mt-0.5 font-medium text-foreground">
                      {activeTask.title}
                    </div>
                    <div className="mt-1 grid grid-cols-[max-content_1fr] gap-x-2 gap-y-0.5 font-mono text-[10.5px]">
                      <span className="text-muted">project</span>
                      <span className="text-foreground/85">{activeTask.project}</span>
                      <span className="text-muted">persona</span>
                      <span className={PERSONA_COLOR[activeTask.persona].text}>
                        {activeTask.persona}
                      </span>
                      <span className="text-muted">state</span>
                      <span className="text-foreground/85">
                        {STATE_LABEL[activeTask.state]}
                      </span>
                    </div>
                  </div>

                  <div className="rounded border border-accent/30 bg-accent/5 p-3">
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent/70">
                      next: routing
                    </div>
                    <div className="space-y-1 text-[11.5px]">
                      <div>
                        <span className="text-muted">default:</span>{" "}
                        <span className="text-foreground/85">
                          {activeTask.nextDefault}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted">proposed:</span>{" "}
                        <span
                          className={
                            activeTask.nextDefault !== activeTask.nextProposed
                              ? "text-amber-300"
                              : "text-foreground/85"
                          }
                        >
                          {activeTask.nextProposed}
                          {activeTask.nextDefault !== activeTask.nextProposed && " ⚑"}
                        </span>
                      </div>
                      {activeTask.reason && (
                        <p className="mt-1 text-[10.5px] leading-[1.5] text-foreground/75">
                          {activeTask.reason}
                        </p>
                      )}
                    </div>
                    {activeTask.state !== "done" && (
                      <div className="mt-2.5 flex gap-1.5">
                        <button
                          onClick={() => approveRoute(activeTask.id)}
                          className="rounded border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10.5px] text-accent hover:bg-accent/20"
                        >
                          ✓ approve route
                        </button>
                        <button className="rounded border border-border bg-border/30 px-2.5 py-1 text-[10.5px] text-foreground/80 hover:bg-border/50">
                          re-route
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={resetTasks}
                    className="w-full rounded border border-border bg-border/30 py-1.5 text-[10.5px] text-muted hover:bg-border/50"
                  >
                    ↺ reset queue
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {tab === "personas" && (
          <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
            <ul className="space-y-1">
              {PERSONAS.map((p) => {
                const c = PERSONA_COLOR[p.key];
                return (
                  <li key={p.key}>
                    <button
                      onClick={() => setActivePersona(p.key)}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors ${
                        p.key === activePersona
                          ? "bg-accent/15"
                          : "hover:bg-border/40"
                      }`}
                    >
                      <span className={`size-2 rounded-full ${c.dot}`} />
                      <span
                        className={`text-[12px] ${
                          p.key === activePersona ? c.text : "text-foreground/85"
                        }`}
                      >
                        {p.icon} {p.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3">
              {(() => {
                const p = PERSONAS.find((x) => x.key === activePersona)!;
                const c = PERSONA_COLOR[p.key];
                return (
                  <>
                    <div className={`rounded border p-3 ${c.bg}`}>
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-wide opacity-70">
                        the question this persona answers
                      </div>
                      <p className={`text-[13px] font-medium ${c.text}`}>
                        {p.question}
                      </p>
                    </div>
                    <div className="rounded border border-border bg-border/20 p-3 text-[11.5px]">
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                        does NOT
                      </div>
                      <p className="text-foreground/85">{p.not}</p>
                    </div>
                    <div className="rounded border border-border bg-border/15 p-3 text-[11px]">
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                        lives at
                      </div>
                      <code className="text-accent/90">
                        .claude/agents/{p.key}.md
                      </code>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {tab === "pipeline" && (
          <div className="space-y-3">
            <div className="text-[11.5px] text-muted">
              project templates · default pipelines (each step overridable with a reason)
            </div>

            {[
              { name: "software-build", pipeline: ["strategist", "designer", "builder", "critic", "qa"] },
              { name: "analytics-deliverable", pipeline: ["strategist", "designer", "builder", "critic", "qa"] },
              { name: "content-piece", pipeline: ["strategist", "builder", "critic", "qa"] },
              { name: "consultancy-engagement", pipeline: ["strategist", "designer", "builder", "critic", "qa"] },
            ].map((tpl) => (
              <div
                key={tpl.name}
                className="rounded border border-border bg-border/15 p-3"
              >
                <div className="mb-2 font-mono text-[11px] text-foreground">
                  {tpl.name}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {tpl.pipeline.map((step, i) => {
                    const c = PERSONA_COLOR[step as PersonaKey];
                    return (
                      <div key={i} className="flex items-center gap-1.5">
                        <span
                          className={`rounded border px-2 py-0.5 text-[10.5px] ${c.bg} ${c.text}`}
                        >
                          {step}
                        </span>
                        {i < tpl.pipeline.length - 1 && (
                          <span className="text-[10.5px] text-muted">→</span>
                        )}
                      </div>
                    );
                  })}
                  <span className="text-[10.5px] text-muted">→ done</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Mockup>

      <Flow
        nodes={[
          { label: "task md", sub: "yaml frontmatter" },
          { label: "claude code", sub: "reads queue", highlight: true },
          { label: "subagent", sub: "persona system prompt", highlight: true },
          { label: "Next: block", sub: "default or override", highlight: true },
          { label: "filesystem", sub: "queued → done" },
        ]}
        direction="right"
      />
    </>
  );
}
