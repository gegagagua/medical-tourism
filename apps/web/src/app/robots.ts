import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/metadata';

// AI SEO: we explicitly list the major LLM crawlers so our stance is in writing. All of them
// get the same policy as traditional search engines — allow public routes, disallow the
// authenticated areas and the API. If we ever want to opt a specific AI crawler out, we flip
// its block to `disallow: '/'`.
const AUTH_PATHS = ['/account', '/clinic', '/console', '/admin', '/api'];

const AI_AGENTS = [
  'GPTBot', // OpenAI's crawler
  'OAI-SearchBot', // ChatGPT Search
  'ChatGPT-User', // on-demand fetches by ChatGPT
  'ClaudeBot', // Anthropic — model training
  'Claude-Web', // Anthropic — on-demand fetches
  'anthropic-ai', // older Anthropic agent string
  'PerplexityBot', // Perplexity search index
  'Perplexity-User', // Perplexity on-demand
  'Google-Extended', // Gemini / Vertex AI training signal
  'Applebot-Extended', // Apple AI training signal
  'Bytespider', // ByteDance / Doubao
  'CCBot', // Common Crawl (feeds many LLMs)
  'Meta-ExternalAgent', // Meta AI
  'Amazonbot', // Amazon
  'cohere-ai', // Cohere
  'FacebookBot', // Meta prefetch
  'Diffbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: AUTH_PATHS },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: AUTH_PATHS })),
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-en.xml`,
      `${SITE_URL}/sitemap-de.xml`,
      `${SITE_URL}/sitemap-ru.xml`,
      `${SITE_URL}/sitemap-he.xml`,
    ],
    host: SITE_URL,
  };
}
