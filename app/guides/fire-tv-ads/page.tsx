
import type { Metadata } from 'next';
import GuidePage from '@/components/guide-page';
import { fireTvAds as guide } from '@/lib/guides';
import { SITE_URL } from '@/lib/site';

const path = '/guides/fire-tv-ads';

export const metadata: Metadata = guideMetadata(guide, path);

export default function Page() {
  return <GuidePage guide={guide} path={path} />;
}
