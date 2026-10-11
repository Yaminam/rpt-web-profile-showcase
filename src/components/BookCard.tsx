import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { bookCover, bookPreview, type Book } from "@/data/books";
import { profile } from "@/data/portfolio";

/** Pre-filled email asking for the full book (free on request, for now). */
export const bookRequestMail = (b: Book) => {
  const subject = `Full book request: ${b.title}`;
  const editions = b.editions.map((e) => e.label).join(" / ");
  const body = [
    "Hi Shreyash,",
    "",
    `I read the free preview of "${b.title}" and I'd like the full book.`,
    "",
    `Edition (${editions}):`,
    "My name:",
    "What I'm preparing for (internship / placements / job switch):",
    "",
    "Thanks!",
  ].join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const pagesLabel = (b: Book) => b.editions.map((e) => `${e.label}: ${e.pages} pages`).join(" · ");

/** Cover + summary card used on /books and the home page. */
const BookCard = ({ book }: { book: Book }) => (
  <article className="cyber-card group flex h-full flex-col overflow-hidden">
    <a href={`/books/${book.slug}`} className="block overflow-hidden border-b border-border/60 bg-terminal-bg">
      <img
        src={bookCover(book.slug)}
        alt={`${book.title} book cover by ${profile.name}`}
        width={847}
        height={1200}
        loading="lazy"
        decoding="async"
        className="aspect-[847/1200] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </a>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <span className="font-mono text-[11px] uppercase tracking-wider text-neon-cyan">{book.tagline}</span>
      <h3 className="font-display text-lg font-bold leading-snug">
        <a href={`/books/${book.slug}`} className="hover:text-neon-cyan">
          {book.title}
        </a>
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{book.blurb}</p>
      <p className="font-mono text-[11px] text-muted-foreground">{pagesLabel(book)}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href={bookPreview(book.slug)}
          download
          data-event="book_preview_download"
          data-book={book.slug}
          className="btn-neon py-2 text-xs"
        >
          <Download className="h-4 w-4" /> free_preview
        </a>
        <a href={`/books/${book.slug}`} className="btn-ghost py-2 text-xs">
          details <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </article>
);

export default BookCard;
