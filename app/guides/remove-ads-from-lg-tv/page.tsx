import type { Metadata } from 'next';
import GuidePage from '@/components/guide-page';
import { lgWebos as guide } from '@/lib/guides';
import { guideMetadata } from '@/lib/guide-meta';

const path = '/guides/remove-ads-from-lg-tv';

export const metadata: Metadata = guideMetadata(guide, path);

export default function Page() {
  return <GuidePage guide={guide} path={path} />;
}
