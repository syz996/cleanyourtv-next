import type { Metadata } from 'next';
import type { Guide } from '@/lib/guides';
import { SITE_URL } from '@/lib/site';

export function guideMetadata(guide: Guide, path: string): Metadata {
  // 图还没做得出来时，先把它换成 '/og/home.png'，标题和描述就已经分开了
  const image = `/og/guides/${guide.slug}.png`;

  return {
    title: guide.title, // 不加后缀，layout 的 template 会自动拼
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${path}`,
      title: guide.title,
      description: guide.description,
      images: [{ url: image, width: 1200, height: 630, alt: guide.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [image],
    },
  };
}
