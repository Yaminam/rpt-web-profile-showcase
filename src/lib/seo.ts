import { caseStudies, profile, SITE_URL, type Project } from "@/data/portfolio";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  /** JSON-LD object, serialized into <script type="application/ld+json"> by scripts/prerender.mjs */
  jsonLd: Record<string, unknown>;
};

const PERSON_ID = `${SITE_URL}/#person`;

/** Head tags + structured data for a /projects/<slug> case-study page. */
export function projectSeo(project: Project & { slug: string }): PageSeo {
  const path = `/projects/${project.slug}`;
  const url = `${SITE_URL}${path}`;
  const title = project.seo?.title ?? `${project.name} | ${profile.name}`;
  const description = project.seo?.description ?? project.description;

  const work: Record<string, unknown> = {
    "@type": project.links?.repo ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${url}#project`,
    name: project.name,
    headline: `${project.name} — ${project.tagline}`,
    description: project.description,
    url,
    keywords: project.tech.join(", "),
    author: { "@type": "Person", "@id": PERSON_ID, name: profile.name, url: `${SITE_URL}/` },
    creator: { "@id": PERSON_ID },
  };
  if (project.links?.repo) {
    work.codeRepository = project.links.repo;
    work.programmingLanguage = "TypeScript";
  }
  if (project.links?.demo) work.sameAs = [project.links.demo];

  return {
    path,
    title,
    description,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: "en",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${url}#project` },
          author: { "@id": PERSON_ID },
          breadcrumb: { "@id": `${url}#breadcrumb` },
        },
        work,
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: profile.name, item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: project.name, item: url },
          ],
        },
      ],
    },
  };
}

export const caseStudyPages = (): PageSeo[] => caseStudies.map(projectSeo);
