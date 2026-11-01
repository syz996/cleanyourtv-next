import { ArrowUpRight, CheckCircle2, CircleHelp, ShieldAlert, Tv } from 'lucide-react';

const items = [
  { name: 'Android TV / Google TV', desc: 'Android 8.0 or newer', status: 'Full guidance', tone: 'good', icon: CheckCircle2 },
  { name: 'Amazon Fire TV', desc: 'Cleanup guidance only · no launcher swap', status: 'Limited', tone: 'warn', icon: CircleHelp },
  { name: 'Samsung Tizen', desc: 'Not covered by the Android TV workflow', status: 'Unsupported', tone: 'bad', icon: ShieldAlert },
  { name: 'LG webOS', desc: 'Not covered by the Android TV workflow', status: 'Unsupported', tone: 'bad', icon: ShieldAlert },
  { name: 'Roku OS', desc: 'Notcovered by the Android TV workflow', status: 'Unsupported', tone: 'bad', icon: ShieldAlert },
];

// 三档不支持平台的替代做法，纯静态文本，无交互
const alternatives = [
  {
    platform: 'Samsung Tizen',
    setting: 'Privacy Choices',
    fallbackNote: 'Menu naming varies by year and region — check Settings › Support › About on your set.',
    points: [
      'Turn off Interest-Based Advertising in Settings › Privacy Choices. It does not remove ACR tracking, which has no user-facing opt-out on Tizen.',
      'Reset the advertising ID rather than hunting for a tracking toggle.',
      'Replace the default launcher is not possible; removing preinstalled apps requires a signed sideload, which breaks warranty terms.',
    ],
  },
  {
    platform: 'LG webOS',
    setting: 'Additional Settings › General',
    fallbackNote: 'On webOS 6 and newer the path sits under Settings › General › Additional Settings.',
    points: [
      'Disable Live Plus to stop automatic content recognition. This is the closest equivalent to the Android TV privacy work.',
      'Turn off AI Recommendations where your model exposes it.',
      'Launcher swaps are not supported on webOS; there is no ADB-equivalent access without developer mode.',
    ],
  },
  {
    platform: 'Roku OS',
    setting: 'Settings › Privacy',
    fallbackNote: 'Roku labels these items slightly differently across player and TV product lines.',
    points: [
      'Set the advertising tracking preference to limit ad tracking in Settings › Privacy.',
      'Disable Smart TV experience to stop input-based viewing suggestions.',
      'Roku has no package manager reachable by ADB; the Android TV workflow does not map to it.',
    ],
  },
];

export default function Compatibility() {
  return (
    <section id="compatibility" className="border-y border-white/[.06] bg-[#0b1320] py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow mb-4">02 / DEVICE CHECK</div>
            <h2 className="section-title">
              Know before
              <br />
              <span className="text-lime">you connect.</span>
            </h2>
            <p className="muted mt-5 max-w-md leading-7">
              Not every smart TV runs Android. Check the platform first so you don&apos;t follow
              instructions that were never designed for your device.
            </p>
            <a href="https://cleanyour.tv/tvs" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-lime hover:text-white">
              Check the official model directory <ArrowUpRight size={15} />
            </a>
            <div className="mt-12 flex items-center gap-4 rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
                <Tv size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold">Exact model matters</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">
                  Brand alone cannot confirm support. Always verify your model and OS version.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.name} className="glass flex items-center gap-4 rounded-xl p-4 transition hover:-translate-y-0.5 hover:border-white/20">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[.04] text-slate-300">
                  <item.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.desc}</div>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] ${
                    item.tone === 'good'
                      ? 'bg-lime/10 text-lime'
                      : item.tone === 'warn'
                        ? 'bg-amber-300/10 text-amber-200'
                        : 'bg-red-400/10 text-red-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 全宽区块：不放进上面的 grid，否则会挤进右栏 */}
        <div className="mt-14">
          <div className="eyebrow mb-3">NOT ON ANDROID TV?</div>
          <h3 className="text-2xl font-semibold tracking-tight">
            What you can still do on an unsupported platform
          </h3>
          <p className="muted mt-3 max-w-2xl text-sm leading-7">
            None of these replace the Android TV cleanup. They reduce ad tracking inside the
            platform&apos;s own settings and leave the device fully supported by its manufacturer.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {alternatives.map((alt) => (
              <div key={alt.platform} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-amber-200" />
                  <div className="text-sm font-semibold">{alt.platform}</div>
                </div>
                <div className="mono mt-3 text-[10px] uppercase tracking-[.14em] text-slate-500">
                  Start at
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-300">{alt.setting}</div>
                <ul className="mt-4 space-y-3">
                  {alt.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                      <span className="text-xs leading-5 text-slate-400">{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-white/[.06] pt-3 text-[10px] leading-4 text-slate-600">
                  {alt.fallbackNote}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/[.08] bg-white/[.025] p-4">
            <p className="text-xs leading-5 text-slate-500">
              Equipment varies by model, firmware and region. Walk through each menu on the actual
              TV before publishing a fixed path, and treat any setting name that does not appear on
              your set as unavailable rather than hidden. Where a path is uncertain, stick to the
              two items that reduce ad tracking and leave the rest alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
