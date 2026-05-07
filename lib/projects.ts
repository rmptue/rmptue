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
    title: "Meeting Copilot",
    slug: "meeting-copilot",
    status: "live",
    category: "productivity",
    oneliner:
      "Faster-Whisper for transcription, Claude for real-time correction of names, technical terms, and meeting context — running locally on a single laptop.",
    role: "Sole engineer",
    year: "2025",
    stack: ["Claude Sonnet", "Faster-Whisper", "Python", "ffmpeg", "local GPU"],
    ai_components: [
      "Faster-Whisper STT (local, GPU)",
      "Claude Sonnet correction layer over rolling chunks",
      "allow-list system prompt that refuses to fabricate sections",
    ],
    featured: true,
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
  },
  {
    title: "Vital",
    slug: "vital",
    status: "concept",
    category: "lifestyle",
    oneliner:
      "Android health tracker — point your camera at a meal, get nutrition breakdown via Claude vision; logs feed into VANTAGE&apos;s nightly digest.",
    role: "Builder",
    year: "2026",
    stack: ["React Native", "Claude vision", "Supabase", "VANTAGE Discord digests"],
    ai_components: [
      "Claude vision: meal photo → ingredient list → macros estimate",
      "weight + activity logging with weekly Claude-narrated review",
      "feeds the personal-AI bot for context-aware health prompts",
    ],
    featured: true,
    order: 9,
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
    order: 10,
  },
  {
    title: "Freedom Park",
    slug: "freedom-park",
    status: "active",
    category: "creative-lab",
    oneliner:
      "Solo cozy college-life pixel-art sim where Claude is design partner, Gemini paints backgrounds, and Aseprite handles revisions — an AI-collaborative asset pipeline.",
    role: "Solo dev",
    year: "2026",
    stack: ["Godot 4", "GDScript", "Claude Sonnet", "Gemini", "Aseprite"],
    ai_components: [
      "Claude for design, dialogue, GDScript scaffolding",
      "Gemini for painted isometric backgrounds",
      "iterative prompt design for spatial-aware sprite edits",
    ],
    hero: "/projects/freedom-park/classroom.png",
    featured: true,
    order: 11,
  },
  {
    title: "Altograph",
    slug: "altograph",
    status: "live",
    category: "creative-lab",
    oneliner:
      "Solo environmental analytics consultancy with a public CCET (climate budget) explorer as the flagship credibility artifact.",
    role: "Founder",
    year: "2024–2026",
    stack: ["HTML/CSS/JS", "Claude Code", "Render", "Formspree"],
    ai_components: [
      "Claude Code for data-pipeline scaffolding",
      "Claude for MRV analysis drafting and SEO content",
    ],
    links: [{ label: "altographanalytics.com", href: "https://altographanalytics.com" }],
    featured: true,
    order: 12,
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
    order: 13,
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
    order: 14,
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
