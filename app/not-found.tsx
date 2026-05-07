import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fade-up space-y-4">
      <p className="text-foreground">
        <span className="text-accent">$</span> 404 — page not found
      </p>
      <p className="text-muted">that route doesn&apos;t exist.</p>
      <Link
        href="/"
        className="inline-block text-accent underline-offset-4 hover:underline"
      >
        ← home
      </Link>
    </div>
  );
}
