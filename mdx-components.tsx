import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-10 mb-5 text-2xl font-medium tracking-tight text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-xl font-medium tracking-tight text-foreground before:mr-2 before:text-accent before:content-['>']">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-base font-medium tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-[1.7] text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-4 list-outside list-['—__'] space-y-2 text-foreground/90 marker:text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-4 list-outside list-decimal space-y-2 text-foreground/90 marker:text-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-[1.7]">{children}</li>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline-offset-4 hover:underline"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-accent underline-offset-4 hover:underline"
      >
        {children}
      </Link>
    );
  },
  code: ({ children }) => (
    <code className="rounded bg-border/60 px-1.5 py-0.5 text-[0.9em] text-accent">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded border border-border bg-border/30 p-4 text-[13px] leading-[1.6]">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-accent/60 pl-4 text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: ({ children }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
