import Link from "next/link";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Anonymized AI-assisted analyst work.",
};

const studies = [
  {
    slug: "cos-venture-studio-assessment",
    title: "Chief of Staff assessment — venture studio",
    blurb:
      "Three deliverables in 48 hours for an applied-AI CoS role. Claude as analyst across funnel rebuild, talent sourcing, and a 5-minute strategic walkthrough.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="fade-up space-y-8">
      <header className="space-y-3">
        <SectionLabel>case studies</SectionLabel>
        <p className="max-w-[64ch] leading-[1.7] text-foreground/80">
          Anonymized work product. The interesting question is which
          sub-tasks Claude handles cleanly and which need human editorial —
          frame these as &quot;what the model did vs. what I did.&quot;
        </p>
      </header>

      <ul className="space-y-3">
        {studies.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/case-studies/${s.slug}`}
              className="block rounded border border-border bg-border/10 p-5 transition-colors hover:border-accent/40 hover:bg-border/20"
            >
              <h2 className="text-[15px] font-medium text-foreground hover:text-accent">
                {s.title}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.65] text-foreground/80">
                {s.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
