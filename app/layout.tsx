import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/site'

const TITLE = 'Clean Your TV GitHub: Prompt Generator for Claude Code' // 54 字符
const DESC =
  'Paste one prompt into Claude Code, Codex or Gemini Antigravity to strip ads from Android TV / Google TV. No root, fully reversible.'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og/home.png'],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
