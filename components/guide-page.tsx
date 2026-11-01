import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import type { Guide } from '@/lib/guides';
import { allGuides } from '@/lib/guides';
import { SITE_URL } from '@/lib/site';

export default function GuidePage({ guide, path }: { guide: Guide; path: string }) {
  const others = allGuides.filter((g) => g.slug !== guide.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.description,
    dateModified: guide.updated,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { '@type': 'Organization', name: 'CleanYourTV Tool', url: SITE_URL },
    isPartOf: { '@type': 'WebSite', name: 'CleanYourTV Tool', url: SITE_URL },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-white/[.06] bg-[#070c14]">
        <div className="container-x flex items-center justify-between py-4">
          <a href="/" className="font-bold tracking-tight">
            clean<span className="text-lime">your</span>tv <span className="text-slate-500">guide</span>
          </a>
          <a href="/#generator" className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime hover:text-white">
            Build my prompt <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <article className="py-16">
        <div className="container-x max-w-3xl">
          <a href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white">
            <ArrowLeft size={13} /> Back to the generator
          </a>

          <div className="eyebrow mb-4 mt-8">GUIDE / UPDATED {guide.updated}</div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{guide.h1}</h1>
          <p className="muted mt-5 leading-7">{guide.lead}</p>

          {guide.sections.map((s) => (
            <section key={s.h2} className="mt-12">
              <h2 className="text-xl font-semibold tracking-tight">{s.h2}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 leading-7 text-slate-300">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-2.5 text-sm leading-6 text-slate-400">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-lime" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
              {s.code && (
                <pre className="mono mt-4 overflow-x-auto rounded-lg border border-white/10 bg-[#0a1220] p-4 text-[11px] leading-6 text-slate-300">
                  {s.code.join('\n')}
                </pre>
              )}
            </section>
          ))}

          <section className="mt-14 glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Info size={16} className="text-lime" /> Common questions
            </div>
            <div className="mt-5 space-y-5">
              {guide.faq.map((f) => (
                <div key={f.q}>
                  <div className="text-sm font-semibold text-slate-200">{f.q}</div>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="eyebrow mb-4">RELATED GUIDES</div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {others.map((g) => (
                <li key={g.slug}>
                  <a href={`/guides/${g.slug}`} className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm hover:border-lime/25">
                    {g.anchor}
                    <ArrowRight size={14} className="text-lime" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
