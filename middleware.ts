/**
 * Vercel Routing Middleware (root middleware.ts convention; framework-agnostic, runs on Node.js).
 *
 * Crawlers don't run JavaScript, so GA4's browser tag never sees them. This logs visits
 * from AI and search crawlers to GA4 as an `ai_crawler_visit` event through the
 * Measurement Protocol, after the response is on its way (waitUntil). Human requests
 * pass straight through. No-ops until GA4_API_SECRET is set in the Vercel project.
 */
import { next, waitUntil } from "@vercel/functions";

const MEASUREMENT_ID = "G-JKKJRK91DN";

// [bot name, user-agent token, category]. First match wins, so specific tokens come first.
const BOTS: [string, RegExp, "ai" | "search"][] = [
  ["ChatGPT-User", /ChatGPT-User/i, "ai"],
  ["OAI-SearchBot", /OAI-SearchBot/i, "ai"],
  ["GPTBot", /GPTBot/i, "ai"],
  ["Claude-User", /Claude-User/i, "ai"],
  ["Claude-SearchBot", /Claude-SearchBot/i, "ai"],
  ["ClaudeBot", /ClaudeBot|anthropic-ai|Claude-Web/i, "ai"],
  ["Perplexity-User", /Perplexity-User/i, "ai"],
  ["PerplexityBot", /PerplexityBot/i, "ai"],
  ["Google-CloudVertexBot", /Google-CloudVertexBot/i, "ai"],
  ["Gemini", /Gemini-Deep-Research|GoogleAgent/i, "ai"],
  ["MistralAI-User", /MistralAI-User/i, "ai"],
  ["DuckAssistBot", /DuckAssistBot/i, "ai"],
  ["Meta-AI", /meta-externalagent|meta-externalfetcher/i, "ai"],
  ["Bytespider", /Bytespider/i, "ai"],
  ["Amazonbot", /Amazonbot/i, "ai"],
  ["Applebot", /Applebot/i, "ai"],
  ["CCBot", /CCBot/i, "ai"],
  ["cohere-ai", /cohere-ai|cohere-training/i, "ai"],
  ["YouBot", /YouBot/i, "ai"],
  ["Diffbot", /Diffbot/i, "ai"],
  ["Googlebot", /Googlebot|Google-InspectionTool/i, "search"],
  ["Bingbot", /bingbot|BingPreview/i, "search"],
  ["YandexBot", /YandexBot/i, "search"],
  ["DuckDuckBot", /DuckDuckBot/i, "search"],
];

export const config = {
  runtime: "nodejs",
  // Pages and crawler-facing text files only; images, scripts and styles never hit this.
  matcher: ["/", "/projects/:path*", "/robots.txt", "/llms.txt", "/sitemap.xml"],
};

export default function middleware(request: Request) {
  const secret = process.env.GA4_API_SECRET;
  const ua = request.headers.get("user-agent") ?? "";
  const bot = secret ? BOTS.find(([, pattern]) => pattern.test(ua)) : undefined;

  if (bot) {
    const [botName, , category] = bot;
    const { pathname } = new URL(request.url);
    waitUntil(
      fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${secret}`,
        {
          method: "POST",
          body: JSON.stringify({
            // One stable pseudo-client per bot, so GA4 counts each crawler as one "user".
            client_id: `bot.${botName.toLowerCase()}`,
            non_personalized_ads: true,
            events: [
              {
                name: "ai_crawler_visit",
                params: {
                  bot_name: botName,
                  bot_category: category,
                  page_path: pathname,
                  engagement_time_msec: 1,
                },
              },
            ],
          }),
        }
      ).catch(() => {
        /* analytics must never break a page load */
      })
    );
  }

  return next();
}
