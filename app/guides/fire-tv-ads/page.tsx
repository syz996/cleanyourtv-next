import type { Metadata } from 'next';
import GuidePage from '@/components/guide-page';
import { fireTvAds as guide } from '@/lib/guides';
import { guideMetadata } from '@/lib/guide-meta';

const path = '/guides/fire-tv-ads';

export const metadata: Metadata = guideMetadata(guide, path);

export default function Page() {
  return <GuidePage guide={guide} path={path} />;
}
