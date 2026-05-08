export type ProjectStatus =
  | "live"
  | "active"
  | "shipped"
  | "concept"
  | "prototype";

export type ProjectCategory =
  | "personal-ai"
  | "productivity"
  | "analytics"
  | "lifestyle"
  | "creative-lab";

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  "personal-ai": "personal ai systems",
  productivity: "productivity & comms",
  analytics: "analytics & scoring",
  lifestyle: "lifestyle & decisions",
  "creative-lab": "creative & lab",
};

export type Project = {
  title: string;
  slug: string;
  status: ProjectStatus;
  category: ProjectCategory;
  oneliner: string;
  role: string;
  year: string;
  stack: string[];
  ai_components: string[];
  links?: { label: string; href: string }[];
  hero?: string;
  featured: boolean;
  order: number;
};

export const projects: Project[] = [
  {
    title: "VANTAGE",
    slug: "vantage",
    status: "live",
    category: "personal-ai",
    oneliner:
      "Claude-powered chief of staff running 24/7 on Discord, with full context over my Obsidian vault and Notion workspace.",
    role: "Sole engineer",
    year: "2025–2026",
    stack: ["Claude Haiku", "n8n.cloud", "Railway", "Notion API", "Discord API", "Python"],
    ai_components: [
      "Claude Haiku for every conversational turn",
      "context assembly from GitHub-synced Obsidian vault + on-demand Notion reads",
      "deterministic command parser routes before invoking the LLM",
    ],
    featured: true,
    order: 1,
  },
  {
    title: "Vault",
    slug: "vault",
    status: "live",
    category: "personal-ai",
    oneliner:
      "Keyword-routed Obsidian vault designed as the long-term memory layer for Claude — the substrate every other project here reads from.",
    role: "Builder & architect",
    year: "2024–2026",
    stack: ["Obsidian", "MCP filesystem", "Claude (userPreferences)", "GitHub sync"],
    ai_components: [
      "userPreferences keyword-routing map for deterministic retrieval",
      "MCP filesystem read/write/search/edit",
      "daily-note session bullets for cross-conversation reconstruction",
    ],
    featured: true,
    order: 2,
  },
  {
    title: "Sentinel",
    slug: "sentinel",
    status: "shipped",
    category: "personal-ai",
    oneliner:
      "10-module Python system that watches my comms surfaces and uses Claude to classify, draft, and route responses — keeping me responsive without breaking focus.",
    role: "Sole engineer",
    year: "2025",
    stack: ["Claude Sonnet", "Claude Haiku", "Python", "SQLite"],
    ai_components: [
      "Claude as routing brain for every inbound message",
      "Haiku-classifies → Sonnet-drafts cost pattern",
      "human-in-the-loop review queue before send",
    ],
    featured: true,
    order: 3,
  },
  {
    title: "Beacon",
    slug: "beacon",
    status: "live",
    category: "personal-ai",
    oneliner:
      "Local Windows app that aggregates email + calendar across multiple accounts and exposes the unified view to Claude as an MCP server — 15 read tools, zero server-side mutations.",
    role: "Sole engineer",
    year: "2026",
    stack: [
      "Python",
      "Tkinter",
      "SQLite",
      "MCP",
      "IMAP",
      "ICS",
      "apscheduler",
    ],
    ai_components: [
      "MCP server with 15 read tools — Claude queries inbox + calendar on demand",
      "rule-based event categorizer (interview / work / personal / other) with manual overrides",
      "auto-detect calendar invites from email — VEVENT extracted from text/calendar MIME parts",
    ],
    featured: true,
    order: 3.5,
  },
  {
    title: "Talent Sourcer",
    slug: "talent-sourcer",
    status: "prototype",
    category: "personal-ai",
    oneliner:
      "Claude turns a role brief into Boolean LinkedIn searches, scores returned profiles against the role rubric, and drafts outreach in three voice registers.",
    role: "Sole engineer",
    year: "2026",
    stack: ["Claude Sonnet", "Python", "LinkedIn search", "Streamlit-style UI"],
    ai_components: [
      "Claude generates Boolean search variants from a role brief",
      "candidate profiles scored against role-specific rubric (0–100)",
      "outreach draft in three registers: warm / direct / peer-to-peer",
    ],
    featured: true,
    order: 4,
  },
  {
    title: "Meeting Copilot",
    slug: "meeting-copilot",
    status: "live",
    category: "productivity",
    oneliner:
      "Faster-Whisper for transcription plus a local Ollama + Gemma 4 correction layer that fixes acronyms, glossary terms, and silence hallucination — fully local, zero API cost, runs on a single laptop.",
    role: "Sole engineer",
    year: "2025",
    stack: ["Ollama", "Gemma 4", "Faster-Whisper", "Python", "ffmpeg", "local GPU"],
    ai_components: [
      "Faster-Whisper STT (local, GPU)",
      "Gemma 4 via Ollama as the correction layer — local inference, zero per-call cost",
      "allow-list system prompt that refuses to fabricate sections",
      "session glossary injected per meeting to preserve acronyms verbatim",
    ],
    featured: true,
    order: 5,
  },
  {
    title: "Bob Coach",
    slug: "bob-coach",
    status: "shipped",
    category: "productivity",
    oneliner:
      "Anti-pattern detector for AI-pair-programming session histories — flags the moves that derail an agentic coding session before they compound.",
    role: "Solo hackathon entry",
    year: "2026",
    stack: ["Claude Sonnet", "MCP", "Python", "session-history parser"],
    ai_components: [
      "Claude scoring each session-turn against a fixed anti-pattern rubric",
      "structured-output detection (over-eager refactors, scope drift, premature mocking)",
      "session-level summary + per-turn flags surfaced to the operator",
    ],
    featured: true,
    order: 6,
  },
  {
    title: "Job Radar",
    slug: "job-radar",
    status: "live",
    category: "analytics",
    oneliner:
      "Local job aggregator that scores every posting against multiple resume variants using Claude Haiku — a personal LLM scoring pipeline for high-volume document evaluation.",
    role: "Sole engineer",
    year: "2026",
    stack: ["Claude Haiku", "Python", "SerpAPI", "RSS", "SQLite", "Next.js dashboard"],
    ai_components: [
      "Claude Haiku per-variant rubric scorer (0–100)",
      "frozen system prompt + deterministic temperature",
      "calibration set + weekly drift regression",
    ],
    featured: true,
    order: 7,
  },
  {
    title: "BPS Generator",
    slug: "bps-generator",
    status: "shipped",
    category: "analytics",
    oneliner:
      "Claude-powered tool that turns structured P&L data into MD&A-style commentary — ~90% automation of a recurring narrative-generation task.",
    role: "Sole engineer",
    year: "2025",
    stack: ["Claude Sonnet", "Python", "pandas", "review UI"],
    ai_components: [
      "Claude Sonnet structured-data-to-narrative generator",
      "citation-anchored prompt — every claim traces to a source row",
      "post-generation validator flags unsourced claims",
    ],
    featured: true,
    order: 8,
  },
  {
    title: "Glance",
    slug: "glance",
    status: "concept",
    category: "analytics",
    oneliner:
      "Mobile analytics for non-technical operators — point at a dashboard, get the headline insight in plain language and the question to ask next.",
    role: "Builder",
    year: "2026",
    stack: ["React Native", "Claude Sonnet", "Supabase", "chart-vision pipeline"],
    ai_components: [
      "Claude vision over rendered chart images for insight extraction",
      "narrative explainer with comparable-period framing",
      "next-question suggester anchored to the rendered metric set",
    ],
    featured: true,
    order: 9,
  },
  {
    title: "MRV Gap Analysis",
    slug: "mrv-gap-analysis",
    status: "prototype",
    category: "analytics",
    oneliner:
      "Public research brief on Philippine climate-measurement infrastructure. Claude as research-synthesis partner across 30+ source documents — structured extraction, citation attribution, gap matrix.",
    role: "Sole researcher",
    year: "2026",
    stack: ["Claude Sonnet", "Python", "PDF extractor", "structured-output parser"],
    ai_components: [
      "parallel Claude calls extracting structured claims from each source",
      "citation-anchored gap statements — every gap traces to a source paragraph",
      "comparative gap matrix across agencies and instrument types",
    ],
    featured: true,
    order: 10,
  },
  {
    title: "Vital",
    slug: "vital",
    status: "concept",
    category: "lifestyle",
    oneliner:
      "Personal health database connected to the Vault — log meals via Claude vision, gym sessions via voice, daily activity passively. Claude narrates trends and suggests the next workout.",
    role: "Builder",
    year: "2026",
    stack: [
      "React Native",
      "Claude vision",
      "Claude Sonnet",
      "Supabase",
      "Vault sync",
      "VANTAGE digests",
    ],
    ai_components: [
      "Claude vision: meal photo → ingredient list → macros estimate",
      "voice → structured workout log (sets, reps, RPE) via Sonnet",
      "weekly Claude-narrated review: burn, surplus/deficit, what changed",
      "next-workout suggester reads training history + fatigue from logs",
      "vault sync — Claude reads health context in any conversation",
    ],
    featured: true,
    order: 11,
  },
  {
    title: "Throughline",
    slug: "throughline",
    status: "concept",
    category: "lifestyle",
    oneliner:
      "AI career coach with persistent context — interview practice, offer analysis, and job matching that compound across months of conversation.",
    role: "Builder",
    year: "2026",
    stack: ["React Native", "Supabase", "Claude Sonnet", "shared design system"],
    ai_components: [
      "persistent user-profile memory the chat reads on every turn",
      "interview practice loop with role-specific rubric scoring",
      "offer analysis: parse offer letter → comp benchmark → negotiation script",
    ],
    featured: true,
    order: 12,
  },
  {
    title: "Freedom Park",
    slug: "freedom-park",
    status: "active",
    category: "creative-lab",
    oneliner:
      "Solo cozy college-life pixel-art sim. Claude is design partner, Gemini paints backgrounds, Aseprite handles revisions — an AI-collaborative asset pipeline.",
    role: "Solo dev",
    year: "2026",
    stack: ["Godot 4", "GDScript", "Claude Sonnet", "Gemini", "Pixellab AI", "Aseprite"],
    ai_components: [
      "Claude for design, dialogue, GDScript scaffolding",
      "Gemini for painted isometric backgrounds",
      "iterative prompt design for spatial-aware sprite edits",
    ],
    hero: "/projects/freedom-park/classroom.png",
    featured: true,
    order: 13,
  },
  {
    title: "CCET Explorer",
    slug: "ccet-explorer",
    status: "live",
    category: "creative-lab",
    oneliner:
      "Public visualization of the Philippine national climate budget. Claude Code did the data-pipeline scaffolding; the dataset and views are designed for non-technical readers.",
    role: "Builder",
    year: "2024–2026",
    stack: ["HTML/CSS/JS", "Claude Code", "Render", "DBM CCET dataset"],
    ai_components: [
      "Claude Code for ETL scaffolding from raw DBM CCET tables",
      "Claude for chart-narration drafts surfaced alongside each view",
    ],
    featured: true,
    order: 14,
  },
  {
    title: "Forge",
    slug: "forge",
    status: "prototype",
    category: "creative-lab",
    oneliner:
      "Local-LLM lab — Ollama + Nemotron3:33b. Six experiments scoped; flagship is an offline meeting-video analyzer that never round-trips to a hosted model.",
    role: "Solo experimenter",
    year: "2026",
    stack: ["Ollama", "Nemotron3:33b", "Python", "ffmpeg", "local GPU"],
    ai_components: [
      "fully-local LLM inference for sensitive workflows",
      "vision + transcription pipeline for offline meeting analysis",
      "experiment dashboard tracking quality vs hosted Claude",
    ],
    featured: true,
    order: 15,
  },
  {
    title: "Helm",
    slug: "helm",
    status: "prototype",
    category: "creative-lab",
    oneliner:
      "Paper-trading bot for futures — Claude as the discretionary layer over a deterministic signal pipeline. Sandbox only, never lives.",
    role: "Solo experimenter",
    year: "2026",
    stack: ["Python", "Claude Sonnet", "broker paper API", "TimescaleDB"],
    ai_components: [
      "deterministic signal pipeline emits candidate trades",
      "Claude as discretionary filter — rejects setups that don&apos;t pass the prompt&apos;s rubric",
      "post-trade journal entry generated per fill, indexed for review",
    ],
    featured: true,
    order: 16,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getByCategory(): { category: ProjectCategory; items: Project[] }[] {
  const order: ProjectCategory[] = [
    "personal-ai",
    "productivity",
    "analytics",
    "lifestyle",
    "creative-lab",
  ];
  return order.map((category) => ({
    category,
    items: getFeatured().filter((p) => p.category === category),
  }));
}
