import { Github, ArrowUpRight } from 'lucide-react';
import { allGuides } from '@/lib/guides';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[.07] bg-[#060a12] py-10">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-start">
          <div>
            <a href="/#top" className="font-bold tracking-tight">
              clean<span className="text-lime">your</span>tv <span className="text-slate-500">guide</span>
            </a>
            <p className="mt-2 max-w-md text-xs leading-5 text-slate-600">
              An independent community guide. Not affiliated with or endorsed by the official Clean Your TV project or its maintainers.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-slate-500">
            <a href="/#generator" className="hover:text-white">Prompt generator</a>
            <a href="/#compatibility" className="hover:text-white">Compatibility</a>
            <a href="/#safety" className="hover:text-white">Safety</a>
            <a href="https://github.com/Gathin23/cleanyourtv" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
              Official GitHub <Github size={13} /><ArrowUpRight size={11} />
            </a>
          </div>
        </div>

        <nav aria-label="Platform guides" className="mt-8 border-t border-white/[.06] pt-6">
          <div className="eyebrow mb-3">GUIDES</div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {allGuides.map((g) => (
              <li key={g.slug}>
                <a href={`/guides/${g.slug}`} className="text-xs text-slate-500 hover:text-white">
                  {g.anchor}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 border-t border-white/[.06] pt-5 text-[10px] text-slate-700">
          © 2026 Clean Your TV Guide. Built for clarity, not unattended device changes.
        </div>
      </div>
    </footer>
  );
}