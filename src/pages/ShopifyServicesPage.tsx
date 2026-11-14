import React from "react";
import ServiceLanding from "@/components/ServiceLanding";
import { shopifyServices } from "@/data/portfolio";

/** /hire/shopify: secondary hire page for Shopify theme development (the tech /hire page is primary). */
const ShopifyServicesPage = () => (
  <ServiceLanding
    data={shopifyServices}
    slug="shopify"
    command="~/hire/shopify --theme-dev"
    kicker="Shopify · Liquid · Online Store 2.0"
    termsHeading="Shopify terms in one line each"
    faqHeading="Shopify developer FAQ"
    footerLabel="Shopify developer"
    resume={{ href: "/Shreyash_Tripathi_Resume_Shopify.pdf", label: "resume_shopify_developer.pdf", event: "resume_shopify_download" }}
    ctaEvent="shopify_project_click"
  />
);

export default ShopifyServicesPage;
