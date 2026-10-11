import { SERIES_NAME, type Book } from "@/data/books";
import { profile } from "@/data/portfolio";

/**
 * Answer-engine friendly copy for each book page, derived only from the book's real data
 * (chapter titles, page counts, the question counts on its cover). No invented claims.
 */

const stripNumber = (title: string) => title.replace(/^\d+\.\s*/, "");

/** Real chapters only (drops appendices, indexes and question banks from topic lists). */
const coreChapters = (b: Book) =>
  b.chapters.filter((c) => /^\d+\./.test(c) && !/question bank|interview questions|appendix/i.test(c));

const questionsLine = (b: Book) =>
  b.highlights.find((h) => /question/i.test(h))?.toLowerCase() ?? "interview questions with answers";

export const whoFor = (b: Book): string[] => {
  const base = [
    "Students in placement season preparing for campus drives and off-campus interviews",
    "Students applying for internships who want one complete, simple resource",
    "Developers preparing for a job switch who need a fast but complete revision",
  ];
  if (b.slug === "fullstack-typescript-nextjs") {
    base[1] = "Students building projects and applying for frontend or full-stack roles";
  }
  return base;
};

export const studyPlan = (b: Book): string[] => {
  const n = b.chapters.length;
  if (b.editions.length > 1) {
    return [
      `${b.editions[0].label} edition: one chapter a day takes about ${n} days.`,
      `${b.editions[1].label} edition: two chapters a day takes about ${Math.ceil(n / 2)} days, good for the last weeks before interviews.`,
      "Read the worked examples, then answer the interview questions without looking before checking the answers.",
    ];
  }
  return [
    `Steady pace: one chapter a day takes about ${n} days.`,
    `Revision pace: two chapters a day takes about ${Math.ceil(n / 2)} days.`,
    "Read the worked examples, then answer the interview questions without looking before checking the answers.",
  ];
};

export const bookFaqs = (b: Book): { q: string; a: string }[] => {
  const core = coreChapters(b).map(stripNumber);
  const first = core.slice(0, 3).join(", ");
  const last = core[core.length - 1];
  const faqs = [
    {
      q: `Is ${b.title} good for placement preparation?`,
      a: `Yes, it was written for students preparing for placements, internships and interviews. It starts from the basics (${first}) and goes all the way to ${last}, with ${questionsLine(b)}.`,
    },
    {
      q: `Is there a free PDF of ${b.title}?`,
      a: `Yes. The free preview PDF on this page has the first ${b.previewChapters} chapters (${b.previewPages} pages). The full book is free on request for now: use the "request full book" button and it's sent to you by email.`,
    },
    {
      q: `How long does it take to finish ${b.shortTitle}?`,
      a: studyPlan(b).slice(0, 2).join(" "),
    },
  ];
  if (b.editions.length > 1) {
    const [full, short] = b.editions;
    faqs.push({
      q: `What is the difference between the ${full.label} and ${short.label} editions?`,
      a: `Both cover the same ${b.chapters.length} chapters. The ${full.label} edition (${full.pages} pages) explains every topic in depth with more examples; the ${short.label} edition (${short.pages} pages) is a faster, revision-friendly version for the weeks just before interviews.`,
    });
  }
  faqs.push({
    q: `Who wrote ${b.title}?`,
    a: `${profile.name}, a Full-Stack Developer and UI/UX Engineer from India. He wrote the ${SERIES_NAME} after struggling with scattered study material before his own placements, to give students one clear resource per subject.`,
  });
  return faqs;
};
