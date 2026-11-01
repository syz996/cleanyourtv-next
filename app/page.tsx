import SiteHeader from '@/components/site-header';
import Hero from '@/components/hero';
import PromptGenerator from '@/components/prompt-generator';
import Compatibility from '@/components/compatibility';
import Steps from '@/components/steps';
import Safety from '@/components/safety';
import SiteFooter from '@/components/site-footer';
import { SITE_URL, REPO_URL } from '@/lib/site'
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

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return <main className="min-h-screen overflow-hidden">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <SiteHeader /><Hero /><PromptGenerator /><Compatibility /><Steps /><Safety /><SiteFooter /></main>;
}
