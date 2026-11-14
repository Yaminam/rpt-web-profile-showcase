import React from "react";
import ServiceLanding from "@/components/ServiceLanding";
import { seoServices } from "@/data/portfolio";

/** /hire/seo: secondary hire page for AI-first SEO, AEO and GEO work (the tech /hire page is primary). */
const SeoServicesPage = () => (
  <ServiceLanding
    data={seoServices}
    slug="seo"
    command="~/hire/seo --ai-first"
    kicker="SEO · AEO · GEO"
    termsHeading="SEO, AEO and GEO in one line each"
    faqHeading="SEO, AEO & GEO FAQ"
    footerLabel="AI-first SEO, AEO & GEO"
    resume={{ href: "/Shreyash_Tripathi_Resume_FullStack_SEO.pdf", label: "resume_fullstack_+_seo.pdf", event: "resume_seo_download" }}
    ctaEvent="seo_project_click"
  />
);

export default SeoServicesPage;
