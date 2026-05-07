export type ProjectStatus =
  | "live"
  | "active"
  | "shipped"
  | "archived"
  | "in-progress";

export type Project = {
  title: string;
  slug: string;
  status: ProjectStatus;
  oneliner: string;
  role: string;
  year: string;
  stack: string[];
  ai_components: string[];
  links?: { label: string; href: string }[];
  featured: boolean;
  order: number;
};

export const projects: Project[] = [
  {
    title: "VANTAGE",
    slug: "vantage",
    status: "live",
    oneliner:
      "Claude-powered chief of staff running 24/7 on Discord, with full context over my Obsidian vault and Notion workspace.",
    role: "Sole engineer",
    year: "2025–2026",
    stack: [
      "Claude Haiku",
      "n8n.cloud",
      "Railway",
      "Notion API",
      "Discord API",
      "Python",
    ],
    ai_components: [
      "Claude Haiku for every conversational turn",
      "context assembly from GitHub-synced Obsidian vault + on-demand Notion reads",
      "deterministic command parser routes before invoking the LLM",
    ],
    featured: true,
    order: 1,
  },
  {
    title: "VANTAGE Vault",
    slug: "vault",
    status: "live",
    oneliner:
      "Keyword-routed Obsidian vault designed as the long-term memory layer for Claude — the substrate every other project here reads from.",
    role: "Builder & architect",
    year: "2024–2026",
    stack: [
      "Obsidian",
      "MCP filesystem",
      "Claude (userPreferences)",
      "GitHub sync",
    ],
    ai_components: [
      "userPreferences keyword-routing map for deterministic retrieval",
      "MCP filesystem read/write/search/edit",
      "daily-note session bullets for cross-conversation reconstruction",
    ],
    featured: true,
    order: 2,
  },
  {
    title: "Meeting Copilot v2",
    slug: "meeting-copilot",
    status: "live",
    oneliner:
      "Faster-Whisper for transcription, Claude for real-time correction of names, technical terms, and meeting context — running locally on a single laptop.",
    role: "Sole engineer",
    year: "2025",
    stack: [
      "Claude Sonnet",
      "Faster-Whisper",
      "Python",
      "ffmpeg",
      "local GPU",
    ],
    ai_components: [
      "Faster-Whisper STT (local, GPU)",
      "Claude Sonnet correction layer over rolling chunks",
      "allow-list system prompt that refuses to fabricate sections",
    ],
    featured: true,
    order: 3,
  },
  {
    title: "Sentinel",
    slug: "sentinel",
    status: "shipped",
    oneliner:
      "10-module Python system that watches my comms surfaces and uses Claude to draft, prioritize, and route responses — keeping me responsive without breaking focus.",
    role: "Sole engineer",
    year: "2025",
    stack: [
      "Claude Sonnet",
      "Claude Haiku",
      "Python",
      "SQLite",
      "OS notification hooks",
    ],
    ai_components: [
      "Claude as routing brain for every inbound message",
      "Haiku-classifies → Sonnet-drafts cost pattern",
      "human-in-the-loop review queue before send",
    ],
    featured: true,
    order: 4,
  },
  {
    title: "Job Radar",
    slug: "job-radar",
    status: "live",
    oneliner:
      "Local job aggregator that scores every posting against multiple resume variants using Claude Haiku — a personal LLM scoring pipeline for high-volume document evaluation.",
    role: "Sole engineer",
    year: "2026",
    stack: [
      "Claude Haiku",
      "Python",
      "SerpAPI",
      "RSS parsers",
      "SQLite",
      "Next.js dashboard",
    ],
    ai_components: [
      "Claude Haiku per-variant rubric scorer (0–100)",
      "frozen system prompt + deterministic temperature for stability",
      "calibration set + weekly regression to detect prompt drift",
    ],
    featured: true,
    order: 5,
  },
  {
    title: "BPS Generator",
    slug: "bps-generator",
    status: "shipped",
    oneliner:
      "Claude-powered tool that turns structured P&L data into the qualitative MD&A-style commentary that finance teams write monthly — ~90% automation of a recurring narrative-generation task.",
    role: "Sole engineer",
    year: "2025",
    stack: [
      "Claude Sonnet",
      "Python",
      "pandas",
      "Streamlit-style review UI",
    ],
    ai_components: [
      "Claude Sonnet structured-data-to-narrative generator",
      "citation-anchored prompt — every claim traces to a source row",
      "post-generation validator flags unsourced claims",
    ],
    featured: true,
    order: 6,
  },
  {
    title: "Freedom Park",
    slug: "freedom-park",
    status: "active",
    oneliner:
      "Solo cozy college-life pixel-art sim where Claude is design partner, Gemini paints backgrounds, and Aseprite handles revisions — an AI-collaborative asset pipeline.",
    role: "Solo dev",
    year: "2026",
    stack: [
      "Godot 4",
      "GDScript",
      "Claude Sonnet",
      "Gemini",
      "Aseprite",
    ],
    ai_components: [
      "Claude for design, dialogue, GDScript scaffolding",
      "Gemini for painted isometric backgrounds",
      "iterative prompt design for spatial-aware sprite edits",
    ],
    featured: true,
    order: 7,
  },
  {
    title: "Altograph + CCET Explorer",
    slug: "altograph",
    status: "live",
    oneliner:
      "Solo environmental analytics consultancy with a public CCET (climate budget) explorer as the flagship credibility artifact.",
    role: "Founder",
    year: "2024–2026",
    stack: ["HTML/CSS/JS", "Claude Code", "Render", "Formspree"],
    ai_components: [
      "Claude Code for data-pipeline scaffolding",
      "Claude for MRV analysis drafting and SEO content",
    ],
    links: [
      { label: "altographanalytics.com", href: "https://altographanalytics.com" },
    ],
    featured: true,
    order: 8,
  },
  {
    title: "Pixelbi",
    slug: "pixelbi",
    status: "archived",
    oneliner:
      "~22 UPLB pixel art works and animated shorts from 2019–2020. The skill-validation context for Freedom Park's AI-collaborative pipeline.",
    role: "Solo artist",
    year: "2019–2020",
    stack: ["Aseprite", "Photoshop"],
    ai_components: [],
    featured: true,
    order: 9,
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
