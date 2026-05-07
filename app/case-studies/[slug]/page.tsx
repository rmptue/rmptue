import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const studies = ["cos-venture-studio-assessment"];

export function generateStaticParams() {
  return studies.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " "),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!studies.includes(slug)) notFound();
  const { default: Body } = await import(
    `@/content/case-studies/${slug}.mdx`
  );
  return (
    <article className="fade-up space-y-6">
      <Link
        href="/case-studies"
        className="inline-block text-[13px] text-muted underline-offset-4 hover:text-accent hover:underline"
      >
        ← case studies
      </Link>
      <Body />
    </article>
  );
}
