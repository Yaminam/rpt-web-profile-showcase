import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookCard from "@/components/BookCard";
import { books, SERIES_NAME } from "@/data/books";

/** Home-page teaser for the Job-Ready Series: four books + a link to /books. */
const BooksSection = () => (
  <section id="books" className="section-padding">
    <div className="container mx-auto">
      <Reveal>
        <SectionHeading
          index="09."
          command="ls ./books"
          title={`The ${SERIES_NAME}`}
          subtitle="Books I wrote for students and developers preparing for interviews and jobs. Free previews, full books on request."
        />
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.slice(0, 4).map((b, i) => (
          <Reveal key={b.slug} delay={i * 90}>
            <BookCard book={b} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/books" className="btn-neon">
          see_all_{books.length}_books
        </a>
      </div>
    </div>
  </section>
);

export default BooksSection;
