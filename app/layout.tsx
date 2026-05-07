import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rmptue.vercel.app"),
  title: {
    default: "Joshua Chua — AI engineer",
    template: "%s · Joshua Chua",
  },
  description:
    "AI engineer and applied-AI builder. Production Claude-powered systems — chiefs of staff, correction pipelines, scoring engines, context substrates.",
  openGraph: {
    title: "Joshua Chua — AI engineer",
    description:
      "Production Claude-powered systems — chiefs of staff, correction pipelines, scoring engines, context substrates.",
    url: "https://rmptue.vercel.app",
    siteName: "Joshua Chua",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Chua — AI engineer",
    description:
      "Production Claude-powered systems — chiefs of staff, correction pipelines, scoring engines, context substrates.",
  },
};

// TODO: wire analytics (Plausible or @vercel/analytics) once domain is final.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col ambient-glow">
        <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-5 py-7 sm:px-8 sm:py-10">
          <header className="mb-10 flex items-center justify-between text-[14px] sm:mb-12">
            <Link
              href="/"
              className="font-mono text-foreground hover:text-accent"
              aria-label="Home"
            >
              <span className="text-accent">$</span> joshua
            </Link>
            <nav className="flex gap-5 text-muted sm:gap-7">
              <Link href="/#projects" className="hover:text-foreground">
                projects
              </Link>
              <Link href="/skills" className="hover:text-foreground">
                prompts
              </Link>
              <Link href="/about" className="hover:text-foreground">
                about
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
