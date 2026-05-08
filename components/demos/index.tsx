import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const REGISTRY: Record<string, ComponentType> = {
  vantage: dynamic(() => import("./vantage")),
  vault: dynamic(() => import("./vault")),
  sentinel: dynamic(() => import("./sentinel")),
  beacon: dynamic(() => import("./beacon")),
  "talent-sourcer": dynamic(() => import("./talent-sourcer")),
  "meeting-copilot": dynamic(() => import("./meeting-copilot")),
  "bob-coach": dynamic(() => import("./bob-coach")),
  "job-radar": dynamic(() => import("./job-radar")),
  "bps-generator": dynamic(() => import("./bps-generator")),
  "mrv-gap-analysis": dynamic(() => import("./mrv-gap-analysis")),
  vital: dynamic(() => import("./vital")),
  throughline: dynamic(() => import("./throughline")),
  glance: dynamic(() => import("./glance")),
  "freedom-park": dynamic(() => import("./freedom-park")),
  "ccet-explorer": dynamic(() => import("./ccet-explorer")),
  forge: dynamic(() => import("./forge")),
  helm: dynamic(() => import("./helm")),
};

export function getDemoFor(slug: string): ComponentType | null {
  return REGISTRY[slug] ?? null;
}
