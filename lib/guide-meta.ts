import type { Metadata } from "next";

const SITE = "https://cleanyourtvtool.site";

export function guideMetadata(g: {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
}): Metadata {
  const url = `${SITE}/guides/${g.slug}`;
  const image = `${SITE}/og/guide?kicker=${encodeURIComponent(
    g.kicker
  )}&title=${encodeURIComponent(g.h1)}`;

  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.description,
      url,
      siteName: "CleanYourTV Tool",
      images: [{ url: image, width: 1200, height: 630, alt: g.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      // 关键：这里是现在复用首页标题的地方
      title: g.title,
      description: g.description,
      images: [image],
    },
  };
}
