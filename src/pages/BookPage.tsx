import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Check, Download, Mail, ShoppingCart } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import BookCard, { bookRequestMail } from "@/components/BookCard";
import { bookCover, bookPreview, books, SERIES_NAME, seriesStory } from "@/data/books";
import { profile } from "@/data/portfolio";
import { bookFaqs, studyPlan, whoFor } from "@/lib/bookContent";
import NotFound from "./NotFound";

/**
 * /books/:slug: one book of the series. Prerendered per book by scripts/prerender.mjs
 * (head tags + Book JSON-LD from lib/seo.ts → bookSeo).
 */
const BookPage = () => {
  const { slug } = useParams();
  const book = books.find((b) => b.slug === slug);

  useEffect(() => {
    if (book) document.title = book.seo.title;
  }, [book]);

  if (!book) return <NotFound />;

  const others = books.filter((b) => b.slug !== book.slug).slice(0, 3);

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
        <a href="/books" className="btn-ghost py-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> all_books
        </a>
      </header>

      <main className="container mx-auto max-w-6xl space-y-10 pb-20">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            ~/portfolio
          </a>
          <span className="text-neon-cyan"> / </span>
          <a href="/books" className="hover:text-foreground">
            books
          </a>
          <span className="text-neon-cyan"> / </span>
          <span className="text-foreground">{book.slug}</span>
        </nav>

        {/* Cover + summary */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
          <img
            src={bookCover(book.slug)}
            alt={`${book.title} book cover by ${profile.name}`}
            width={847}
            height={1200}
            decoding="async"
            className="mx-auto w-full max-w-[320px] rounded-lg border border-border shadow-neon-cyan"
          />
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-wider text-neon-cyan">
              {SERIES_NAME} · {book.tagline}
            </p>
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">{book.title}</h1>
            <p className="font-mono text-sm text-muted-foreground">
              by{" "}
              <a href="/" className="text-foreground underline decoration-neon-cyan/50 underline-offset-4">
                {profile.name}
              </a>{" "}
              · Full-Stack Developer &amp; UI/UX Engineer
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{book.blurb}</p>

            <ul className="space-y-2">
              {book.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-neon-green" aria-hidden /> {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {book.editions.map((e) => (
                <span key={e.label} className="rounded border border-border bg-muted/40 px-3 py-1 font-mono text-xs">
                  {e.label} edition · {e.pages} pages · PDF
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={bookPreview(book.slug)}
                download
                data-event="book_preview_download"
                data-book={book.slug}
                className="btn-neon"
              >
                <Download className="h-4 w-4" /> download_free_preview
              </a>
              {book.buyUrl ? (
                <a href={book.buyUrl} data-event="book_buy_click" data-book={book.slug} className="btn-neon">
                  <ShoppingCart className="h-4 w-4" /> buy {book.price ? `· ${book.price}` : ""}
                </a>
              ) : (
                <a href={bookRequestMail(book)} data-event="book_request" data-book={book.slug} className="btn-ghost">
                  <Mail className="h-4 w-4" /> request_full_book
                </a>
              )}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Free preview: first {book.previewChapters} chapters ({book.previewPages} pages). Full book: free on request
              for now, sent by email.
            </p>
          </div>
        </section>

        {/* Chapters */}
        <section className="cyber-card p-6 md:p-8">
          <h2 className="mb-2 font-display text-2xl font-bold">What's inside</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            {book.chapters.length} chapters and sections. The ones marked{" "}
            <span className="font-mono text-neon-green">free</span> are in the preview.
          </p>
          <ol className="grid gap-x-8 gap-y-2 md:grid-cols-2">
            {book.chapters.map((c, i) => (
              <li key={c} className="flex items-start justify-between gap-3 border-b border-border/40 py-2 text-sm">
                <span className="text-foreground/90">{c}</span>
                {i < book.previewChapters && (
                  <span className="shrink-0 rounded border border-neon-green/40 bg-neon-green/10 px-1.5 font-mono text-[10px] text-neon-green">
                    free
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Who it's for + study plan */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="cyber-card p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-bold">Who this book is for</h2>
            <ul className="space-y-3">
              {whoFor(book).map((w) => (
                <li key={w} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" aria-hidden /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="cyber-card p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-bold">Study plan for placements</h2>
            <ol className="space-y-3">
              {studyPlan(book).map((s, i) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-mono text-neon-cyan">{String(i + 1).padStart(2, "0")}</span> {s}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ: plain text in the DOM for search and answer engines */}
        <section className="space-y-3">
          <h2 className="mb-2 font-display text-2xl font-bold">{book.shortTitle}: questions students ask</h2>
          {bookFaqs(book).map((f, i) => (
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

        {/* Author story (short) */}
        <section className="rounded-lg border border-neon-cyan/25 bg-neon-cyan/5 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold">{seriesStory.heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{seriesStory.paragraphs[0]}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{seriesStory.paragraphs[3]}</p>
          <p className="mt-4 font-mono text-sm text-neon-cyan">— {profile.name}</p>
        </section>

        {/* More books */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold">More from the {SERIES_NAME}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
          <a href="/books" className="btn-ghost text-xs">
            see_all_books
          </a>
        </section>
      </main>

      <footer className="border-t border-neon-cyan/15 py-8 text-center font-mono text-xs text-muted-foreground">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        <a href="/" className="hover:text-foreground">
          {profile.name}
        </a>{" "}
        · {book.title} · All rights reserved{" "}
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

export default BookPage;
