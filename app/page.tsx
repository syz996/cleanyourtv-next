import SiteHeader from '@/components/site-header';
import Hero from '@/components/hero';
import PromptGenerator from '@/components/prompt-generator';
import Compatibility from '@/components/compatibility';
import Steps from '@/components/steps';
import Safety from '@/components/safety';
import SiteFooter from '@/components/site-footer';
import { SITE_URL, SITE_NAME, REPO_URL } from '@/lib/site'
import type { Metadata } from 'next'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CleanYourTV Prompt Generator',
  url: SITE_URL,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isBasedOn: REPO_URL,
  disambiguatingDescription:
    'Independent third-party guide. Not affiliated with or endorsed by the Clean Your TV project.',
  author: { '@type': 'Organization', name: 'CleanYourTV Tool', url: SITE_URL },
}


const TITLE = 'Clean Your TV GitHub: Prompt Generator for Claude Code'
const DESC =
  'Paste one prompt into Claude Code, Codex or Gemini Antigravity to strip ads from Android TV / Google TV. No root, fully reversible.'
const OG_IMAGE = '/og/home.png'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Clean Your TV — prompt generator for Claude Code' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
}

export default function Home() {
  return <main className="min-h-screen overflow-hidden">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <SiteHeader /><Hero /><PromptGenerator /><Compatibility /><Steps /><Safety /><SiteFooter /></main>;
}
