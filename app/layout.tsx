import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Clean Your TV GitHub — Prompt Generator for Claude Code & Codex',
  description: 'Build a careful, model-aware prompt for the Clean Your TV project. Check compatibility and review every change before you apply it.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
