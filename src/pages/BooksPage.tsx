import React, { useEffect } from "react";
import { ArrowLeft, BookOpen, Download, Mail } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import BookCard from "@/components/BookCard";
import { books, SERIES_NAME, seriesStory } from "@/data/books";
import { profile } from "@/data/portfolio";
import { BOOKS_SEO } from "@/lib/seo";

const steps = [
  { icon: Download, title: "Read the free preview", text: "Every book has a free PDF with the opening pages and the first chapters." },
  { icon: Mail, title: "Request the full book", text: "Liked it? Click \"request full book\" and a ready-made email opens." },
  { icon: BookOpen, title: "Get it by email", text: "I reply with the full PDF. It's free on request for now." },
];

const faqs = [
  {
    q: "Are the books free?",
    a: "The previews are free to download right here. The full books are currently free on request: email me from any book page and I'll send the PDF.",
  },
  {
    q: "Who are the books for?",
    a: "Students preparing for internships and placements, and early-career developers preparing for interviews or a job switch. Each book starts from the basics, so you don't need prior knowledge of the subject.",
  },
  {
    q: "What's the difference between the Complete and Short editions?",
    a: "The Complete edition explains every topic in depth with more examples and practice. The Short edition covers the same chapters in a faster, revision-friendly format.",
  },
  {
    q: "What format are the books in?",
    a: "PDF, readable on a laptop, tablet or phone.",
  },
];

/** /books: the Job-Ready Series index (prerendered; head tags from lib/seo.ts → booksIndexSeo). */
const BooksPage = () => {
  useEffect(() => {
    document.title = BOOKS_SEO.title;
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <CyberBackground />

      <header className="container mx-auto flex items-center justify-between py-6">
        <a href="/" className="group flex items-center gap-2 font-mono font-bold">
          <span className="text-neon-cyan">&gt;_</span>
          <span>
            Shreyash <span className="text-neon-cyan">Tripathi</span>
          </span>
        </a>
        <a href="/" className="btn-ghost py-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> portfolio
        </a>
      </header>

      <main className="container mx-auto max-w-6xl space-y-12 pb-20">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            ~/portfolio
          </a>
          <span className="text-neon-cyan"> / </span>
          <span className="text-foreground">books</span>
        </nav>

        {/* Hero + story */}
        <section className="terminal-window">
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-500/80" />
            <span className="terminal-dot bg-yellow-400/80" />
            <span className="terminal-dot bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/books --series job-ready</span>
          </div>
          <div className="space-y-6 p-6 md:p-10">
            <p className="font-mono text-xs uppercase tracking-wider text-neon-cyan">
              {books.length} books · free previews
            </p>
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
              The {SERIES_NAME}: interview books for developers
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              System Design, DSA in Java, Python and C++, DevOps, Cloud, Salesforce, DBMS, Computer Networks, Operating Systems and Full-Stack
              TypeScript with Next.js, written by {profile.name} in simple language, with worked examples and interview
              questions with answers.
            </p>

            <div className="rounded-lg border border-neon-cyan/25 bg-neon-cyan/5 p-5 md:p-6">
              <h2 className="font-display text-xl font-bold">{seriesStory.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {seriesStory.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-4 font-mono text-sm text-neon-cyan">— {profile.name}</p>
            </div>
          </div>
        </section>

        {/* The books */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">The books</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="cyber-card p-6 md:p-8">
          <h2 className="mb-5 font-display text-2xl font-bold">How it works</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-neon-cyan">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display font-semibold">
                    {i + 1}. {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="mb-2 font-display text-2xl font-bold">Books FAQ</h2>
          {faqs.map((f, i) => (
            <details key={f.q} className="cyber-card group p-5 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display font-semibold">
                <h3>{f.q}</h3>
                <span className="font-mono text-neon-cyan transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </section>
      </main>

      <footer className="border-t border-neon-cyan/15 py-8 text-center font-mono text-xs text-muted-foreground">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        <a href="/" className="hover:text-foreground">
          {profile.name}
        </a>{" "}
        · {SERIES_NAME} · All rights reserved{" "}
        ·{" "}
        <a href="/hire" className="hover:text-foreground">
          hire me: frontend &amp; full-stack
        </a>{" "}
        ·{" "}
        <a href="/hire/seo" className="hover:text-foreground">
          seo, aeo &amp; geo services
        </a>
      </footer>
    </div>
  );
};

export default BooksPage;
