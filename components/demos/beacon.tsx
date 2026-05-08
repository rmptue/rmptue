"use client";
import { useState } from "react";
import { Mockup } from "../Mockup";
import { Flow } from "../Flow";

type AccountKey = "all" | "personal-1" | "personal-2" | "university" | "work";

const ACCOUNTS: { key: AccountKey; label: string; color: string }[] = [
  { key: "all", label: "all", color: "bg-foreground/40" },
  { key: "personal-1", label: "personal · primary", color: "bg-emerald-400" },
  { key: "personal-2", label: "personal · secondary", color: "bg-sky-400" },
  { key: "university", label: "university", color: "bg-violet-400" },
  { key: "work", label: "work", color: "bg-amber-400" },
];

type Email = {
  id: string;
  account: Exclude<AccountKey, "all">;
  from: string;
  subject: string;
  preview: string;
  age: string;
  urgency: "low" | "medium" | "high";
  unread: boolean;
  suggested: string;
};

const EMAILS: Email[] = [
  {
    id: "e1",
    account: "work",
    from: "ops@acme-payroll.com",
    subject: "Q2 SOC2 evidence package — due in 5 days",
    preview:
      "Reminder: please review the attached checklist and upload items 1–7 to the secure portal.",
    age: "11m",
    urgency: "high",
    unread: true,
    suggested:
      "Thanks — saw the checklist. I'll have items 1–4 to you by Wednesday and the rest by Friday. Will flag if anything blocks.",
  },
  {
    id: "e2",
    account: "university",
    from: "registrar@uni.edu",
    subject: "Thesis advisor sign-off form — action required",
    preview:
      "Your advisor needs to countersign the attached form before the May 20 deadline.",
    age: "1h",
    urgency: "high",
    unread: true,
    suggested:
      "Hi — forwarding to my advisor today. Will have the signed form back to you before Friday. Let me know if anything else is needed.",
  },
  {
    id: "e3",
    account: "personal-1",
    from: "noreply@stripe.com",
    subject: "Receipt for your subscription · $20.00",
    preview:
      "Your monthly Stripe subscription was charged successfully. View invoice attached.",
    age: "3h",
    urgency: "low",
    unread: true,
    suggested: "(no reply needed — receipt only)",
  },
  {
    id: "e4",
    account: "work",
    from: "@maria",
    subject: "Re: specs review — push to friday?",
    preview: "hey can you push the specs review to friday? something came up.",
    age: "5h",
    urgency: "medium",
    unread: true,
    suggested:
      "friday works. i'll keep the doc open for async comments before then. let me know if anything shifts.",
  },
  {
    id: "e5",
    account: "personal-2",
    from: "alumni@univ.ph",
    subject: "Batch reunion update — venue locked",
    preview:
      "We've confirmed the venue for the May 24 reunion. Headcount confirmation needed by May 15.",
    age: "8h",
    urgency: "low",
    unread: false,
    suggested: "Confirming attendance — count me in. Let me know if you need anything from my end.",
  },
  {
    id: "e6",
    account: "university",
    from: "library@uni.edu",
    subject: "Reserved item ready for pickup",
    preview:
      "The book you reserved is now available at the front desk. Hold expires in 7 days.",
    age: "1d",
    urgency: "low",
    unread: false,
    suggested: "(walk-in pickup — no reply)",
  },
];

type Event = {
  id: string;
  day: number; // 0..4 (mon..fri)
  start: number; // hour 8..18
  duration: number; // hours
  title: string;
  category: "interview" | "work" | "personal" | "university" | "other";
  account: Exclude<AccountKey, "all">;
  conflict?: boolean;
};

const EVENTS: Event[] = [
  { id: "v1", day: 0, start: 9, duration: 1, title: "weekly all-hands", category: "work", account: "work" },
  { id: "v2", day: 0, start: 14, duration: 1.5, title: "specs review", category: "work", account: "work" },
  { id: "v3", day: 1, start: 10, duration: 1, title: "interview · series-A startup", category: "interview", account: "personal-1" },
  { id: "v4", day: 1, start: 14, duration: 2, title: "ph 201 lecture", category: "university", account: "university" },
  { id: "v5", day: 2, start: 11, duration: 1, title: "1:1 with kenji", category: "work", account: "work", conflict: true },
  { id: "v6", day: 2, start: 11.5, duration: 0.5, title: "thesis advisor sync", category: "university", account: "university", conflict: true },
  { id: "v7", day: 2, start: 16, duration: 1, title: "gym · push day", category: "personal", account: "personal-1" },
  { id: "v8", day: 3, start: 9, duration: 1.5, title: "client check-in", category: "work", account: "work" },
  { id: "v9", day: 3, start: 14, duration: 1, title: "interview · panel round", category: "interview", account: "personal-1" },
  { id: "v10", day: 4, start: 10, duration: 1, title: "1:1 with maria", category: "work", account: "work" },
  { id: "v11", day: 4, start: 13, duration: 2, title: "library work block", category: "personal", account: "personal-1" },
  { id: "v12", day: 4, start: 17, duration: 2, title: "batch reunion", category: "personal", account: "personal-2" },
];

const CAT_COLOR: Record<Event["category"], { bg: string; bar: string; label: string }> = {
  interview: { bg: "bg-rose-400/15 border-rose-400/40", bar: "bg-rose-400", label: "text-rose-300" },
  work: { bg: "bg-amber-400/15 border-amber-400/40", bar: "bg-amber-400", label: "text-amber-300" },
  personal: { bg: "bg-emerald-400/15 border-emerald-400/40", bar: "bg-emerald-400", label: "text-emerald-300" },
  university: { bg: "bg-violet-400/15 border-violet-400/40", bar: "bg-violet-400", label: "text-violet-300" },
  other: { bg: "bg-foreground/10 border-border", bar: "bg-foreground/40", label: "text-muted" },
};

const URG = {
  low: "bg-border/60 text-muted",
  medium: "bg-amber-400/15 text-amber-300",
  high: "bg-rose-400/15 text-rose-300",
};

const TABS = ["inbox", "calendar", "claude"] as const;
type Tab = (typeof TABS)[number];

const DAYS = ["mon", "tue", "wed", "thu", "fri"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function BeaconDemo() {
  const [tab, setTab] = useState<Tab>("inbox");
  const [account, setAccount] = useState<AccountKey>("all");
  const [activeEmail, setActiveEmail] = useState<string>("e1");

  const filtered =
    account === "all"
      ? EMAILS
      : EMAILS.filter((e) => e.account === account);

  const cur = EMAILS.find((e) => e.id === activeEmail) ?? EMAILS[0];

  return (
    <>
      <Mockup title="beacon · v0 · 4 accounts · last sync 47s ago">
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
            mcp · 15 tools exposed
          </span>
        </div>

        {tab === "inbox" && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 text-[10.5px]">
              {ACCOUNTS.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setAccount(a.key)}
                  className={`flex items-center gap-1.5 rounded border px-2 py-1 transition-colors ${
                    account === a.key
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-border bg-border/20 text-muted hover:text-foreground"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${a.color}`} />
                  {a.label}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-[280px_1fr]">
              <ul className="space-y-1">
                {filtered.map((e) => {
                  const acct = ACCOUNTS.find((a) => a.key === e.account);
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => setActiveEmail(e.id)}
                        className={`w-full rounded px-2 py-2 text-left transition-colors ${
                          e.id === activeEmail
                            ? "bg-accent/15"
                            : "hover:bg-border/40"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`size-1.5 shrink-0 rounded-full ${acct?.color}`}
                          />
                          <span className="truncate font-mono text-[10px] text-muted">
                            {e.from}
                          </span>
                          <span
                            className={`ml-auto rounded px-1 py-px text-[9.5px] ${URG[e.urgency]}`}
                          >
                            {e.urgency}
                          </span>
                          <span className="font-mono text-[10px] text-muted">
                            {e.age}
                          </span>
                        </div>
                        <div
                          className={`mt-0.5 truncate text-[12px] ${
                            e.unread
                              ? "font-medium text-foreground"
                              : "text-foreground/70"
                          }`}
                        >
                          {e.subject}
                        </div>
                        <div className="truncate text-[10.5px] text-muted">
                          {e.preview}
                        </div>
                      </button>
                    </li>
                  );
                })}
                {filtered.length === 0 && (
                  <li className="rounded border border-dashed border-border p-3 text-center text-[11px] text-muted">
                    no messages in this view
                  </li>
                )}
              </ul>

              <div className="space-y-3">
                <div className="rounded border border-border bg-border/20 p-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-muted">
                      from
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] ${URG[cur.urgency]}`}
                    >
                      {cur.urgency}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-foreground/90">
                    {cur.from}
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-foreground">
                    {cur.subject}
                  </div>
                  <p className="mt-2 text-[12px] leading-[1.55] text-foreground/80">
                    {cur.preview}
                  </p>
                </div>

                <div className="rounded border border-accent/30 bg-accent/5 p-3">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent/70">
                    claude · suggested reply
                  </div>
                  <p className="text-[12px] leading-[1.55] text-foreground/90">
                    {cur.suggested}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <button className="rounded border border-accent/40 bg-accent/10 px-2.5 py-1 text-accent hover:bg-accent/20">
                      ✓ approve
                    </button>
                    <button className="rounded border border-border bg-border/30 px-2.5 py-1 text-foreground/80 hover:bg-border/50">
                      edit
                    </button>
                    <button className="rounded border border-border bg-border/30 px-2.5 py-1 text-muted hover:bg-border/50">
                      block sender
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "calendar" && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-[10.5px] text-muted">
              <span className="font-mono uppercase tracking-wide">legend:</span>
              {(Object.keys(CAT_COLOR) as Event["category"][]).map((c) => (
                <span key={c} className="flex items-center gap-1.5">
                  <span className={`size-2 rounded-sm ${CAT_COLOR[c].bar}`} />
                  <span className={CAT_COLOR[c].label}>{c}</span>
                </span>
              ))}
            </div>

            <div className="overflow-x-auto rounded border border-border bg-border/10">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[40px_repeat(5,1fr)] border-b border-border bg-border/30 text-[10.5px]">
                  <div />
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      className="border-l border-border px-2 py-1.5 text-center font-mono uppercase text-muted"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-[40px_repeat(5,1fr)]">
                  <div className="flex flex-col text-[9.5px] text-muted">
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="h-9 border-b border-border/40 pr-1 pt-0.5 text-right font-mono"
                      >
                        {h}:00
                      </div>
                    ))}
                  </div>

                  {DAYS.map((_, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="relative border-l border-border"
                      style={{ height: `${HOURS.length * 36}px` }}
                    >
                      {HOURS.map((h) => (
                        <div
                          key={h}
                          className="h-9 border-b border-border/40"
                        />
                      ))}
                      {EVENTS.filter((e) => e.day === dayIdx).map((e) => {
                        const top = (e.start - HOURS[0]) * 36;
                        const height = e.duration * 36;
                        const c = CAT_COLOR[e.category];
                        return (
                          <div
                            key={e.id}
                            className={`absolute left-0.5 right-0.5 overflow-hidden rounded border ${c.bg} px-1.5 py-1 text-[10px] leading-tight`}
                            style={{ top, height: Math.max(height - 2, 16) }}
                            title={e.title}
                          >
                            <div className={`mb-0.5 flex items-center gap-1`}>
                              <span className={`size-1 rounded-full ${c.bar}`} />
                              <span className="font-mono text-[9px] text-muted">
                                {e.start}
                                {e.duration < 1 ? `:${(e.duration * 60).toFixed(0)}` : ""}
                              </span>
                              {e.conflict && (
                                <span className="ml-auto font-mono text-[9px] text-rose-300">
                                  ⚠
                                </span>
                              )}
                            </div>
                            <div
                              className={`truncate ${c.label} font-medium`}
                            >
                              {e.title}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] text-muted">
              <span>
                <span className="font-mono text-foreground">{EVENTS.length}</span> events this week
              </span>
              <span>·</span>
              <span>
                <span className="font-mono text-rose-300">
                  {EVENTS.filter((e) => e.conflict).length}
                </span>{" "}
                conflicts
              </span>
              <span>·</span>
              <span>
                <span className="font-mono text-rose-300">
                  {EVENTS.filter((e) => e.category === "interview").length}
                </span>{" "}
                interviews
              </span>
              <span>·</span>
              <span>
                <span className="font-mono text-amber-300">
                  {EVENTS.filter((e) => e.category === "work").length}
                </span>{" "}
                work
              </span>
            </div>
          </div>
        )}

        {tab === "claude" && (
          <div className="space-y-3">
            <div className="font-mono text-[10.5px] text-muted">
              claude desktop · 2026-05-08 · 7:14 am
            </div>

            <div className="rounded border border-accent/30 bg-accent/5 p-3">
              <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wide text-accent/70">
                ⚠ urgents · today
              </div>
              <ul className="space-y-1.5 text-[12px]">
                <li className="flex gap-2">
                  <span className="font-mono text-rose-300">[high]</span>
                  <div className="flex-1">
                    <span className="text-foreground/90">
                      SOC2 evidence package — Q2, due in 5 days
                    </span>
                    <span className="ml-2 font-mono text-[10px] text-muted">
                      work
                    </span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-rose-300">[high]</span>
                  <div className="flex-1">
                    <span className="text-foreground/90">
                      thesis advisor sign-off — May 20 deadline
                    </span>
                    <span className="ml-2 font-mono text-[10px] text-muted">
                      university
                    </span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-amber-300">[med]</span>
                  <div className="flex-1">
                    <span className="text-foreground/90">
                      specs review — maria asked to push to friday
                    </span>
                    <span className="ml-2 font-mono text-[10px] text-muted">
                      work
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded border border-rose-400/40 bg-rose-400/5 p-3">
              <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wide text-rose-300/80">
                ⚠ calendar conflicts
              </div>
              <p className="text-[12px] leading-[1.55] text-foreground/85">
                Wednesday 11:00 — <span className="text-amber-300">1:1 with kenji</span> overlaps with{" "}
                <span className="text-violet-300">thesis advisor sync</span>.
                The advisor sync is 30 minutes; suggest moving the 1:1 to 11:30
                or pushing to thursday.
              </p>
              <button className="mt-2 rounded border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] text-accent hover:bg-accent/20">
                draft reschedule message
              </button>
            </div>

            <div className="rounded border border-border bg-border/20 p-3">
              <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wide text-muted">
                ✎ drafts queued · 4
              </div>
              <ul className="space-y-1 text-[11.5px] text-foreground/80">
                <li>· reply to ops@acme-payroll.com — SOC2 schedule</li>
                <li>· reply to registrar@uni.edu — thesis form forwarded</li>
                <li>· reply to @maria — friday works</li>
                <li>· reply to alumni@univ.ph — confirming attendance</li>
              </ul>
            </div>

            <div className="rounded border border-border bg-border/20 p-3">
              <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wide text-muted">
                ⌘ this week
              </div>
              <p className="text-[12px] leading-[1.55] text-foreground/85">
                <span className="text-rose-300">2 interviews</span> on tuesday
                and thursday — both for series-A AI eng roles. Block focus time
                wednesday evening for prep. Two work conflicts to resolve before
                wednesday.
              </p>
            </div>
          </div>
        )}
      </Mockup>

      <Flow
        nodes={[
          { label: "imap + ics", sub: "4 accounts" },
          { label: "sync daemon", sub: "apscheduler · readonly" },
          { label: "sqlite", sub: "local store" },
          { label: "mcp server", sub: "15 read tools", highlight: true },
          { label: "claude", sub: "triage + drafts", highlight: true },
        ]}
        direction="right"
      />
    </>
  );
}
