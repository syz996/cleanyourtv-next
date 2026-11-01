import type { Metadata } from 'next';
import GuidePage from '@/components/guide-page';
import { fireTvAds as guide } from '@/lib/guides';
import { SITE_URL } from '@/lib/site';

const path = '/guides/fire-tv-ads';

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: path },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}${path}`,
    title: guide.title,
    description: guide.description,
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: guide.h1 }],
  },
};

export default function Page() {
  return <GuidePage guide={guide} path={path} />;
}