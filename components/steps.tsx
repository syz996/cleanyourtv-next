import { ArrowRight, ClipboardList, ListChecks, MessageSquareText, Terminal } from 'lucide-react';

const steps = [
  { n: '01', icon: ClipboardList, title: 'Check your device', desc: 'Identify the TV platform, Android version and exact model before connecting anything.' },
  { n: '02', icon: MessageSquareText, title: 'Generate a prompt', desc: 'Choose your coding assistant and connection method. Copy the tailored instructions.' },
  { n: '03', icon: ListChecks, title: 'Review every change', desc: 'Ask your assistant to inspect first. Approve changes individually and keep rollback notes.' },
];

// 命令必须存成字符串常量：写进 JSX 会把 <TV_IP> 当成标签解析
const cmd = {
  pair: 'adb pair <TV_IP>:<PAIRING_PORT>',
  connect: 'adb connect <TV_IP>:<PORT>',
  devices: 'adb devices',
  list: 'adb shell pm list packages',
  disable: 'adb shell pm disable-user --user 0 <PACKAGE_NAME>',
  enable: 'adb shell pm enable <PACKAGE_NAME>',
};

const adbSteps = [
 { n: '1', title: 'Pair, connect and confirm',
  code: [cmd.pair, cmd.connect, cmd.devices],
  desc: 'Android 11 and newer pair with the 6-digit code shown on the TV; on older sets skip the pair line and connect directly. Use the port on the debugging screen — it is usually not 5555. The list must show an entry ending in "device"; "offline" or "unauthorized" means stop here.' },
  {
    n: '2',
    title: 'Record the original state',
    code: [cmd.list],
    desc: 'Save the full output to a text file before anything is disabled. This is your only reliable rollback reference.',
  },
  {
    n: '3',
    title: 'Re-enable if you change your mind',
    code: [cmd.enable],
    desc: 'Disabling uses "pm disable-user --user 0", so the package is never uninstalled. Enabling the same package name restores it without a factory reset.',
  },
];

const adbIssues = [
  {
    t: 'Cannot connect on Android 11 or newer',
    d: 'Wireless debugging exposes two different ports. Run the pair command with the pairing port first, enter the 6-digit code shown on the TV, then connect with the port listed on the debugging screen. That port is usually not 5555.',
  },
  {
    t: 'Same network, still refused',
    d: 'The TV and your computer must be on the same subnet. Guest networks and router AP isolation block ADB even when both devices appear online.',
  },
  {
    t: 'The device shows as unauthorized',
    d: 'Approve the prompt on the TV. If no prompt appeared, toggle Wireless debugging off and on, then restart the ADB server and retry.',
  },
];

export default function Steps() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="mb-14 text-center">
          <div className="eyebrow mb-4">03 / HOW IT WORKS</div>
          <h2 className="section-title">
            Three steps.
            <br />
            <span className="text-lime">No guesswork.</span>
          </h2>
        </div>

        <div className="relative grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="glass group relative rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:border-lime/25">
              <div className="mb-9 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-lime/10 text-lime transition group-hover:bg-lime group-hover:text-ink">
                  <s.icon size={21} />
                </div>
                <span className="mono text-xs text-slate-600">STEP / {s.n}</span>
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{s.desc}</p>
              {i !== 2 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-[#111a2b] text-slate-500 md:grid">
                  <ArrowRight size={13} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Terminal size={19} className="text-lime" />
            <div>
              <div className="font-semibold">Connecting to the TV over ADB</div>
              <div className="mono mt-1 text-[10px] uppercase tracking-[.16em] text-slate-500">
                Five commands cover most of it
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {adbSteps.map((s) => (
              <div key={s.n} className="rounded-xl border border-white/[.08] bg-white/[.02] p-4">
                <div className="mono mb-2 text-[10px] uppercase tracking-[.14em] text-lime">STEP / {s.n}</div>
                <div className="text-sm font-semibold">{s.title}</div>
                <pre className="mono mt-3 overflow-x-auto rounded-lg border border-white/10 bg-[#0a1220] p-3 text-[11px] leading-6 text-slate-300">
                  {s.code.join('\n')}
                </pre>
                <p className="mt-3 text-xs leading-5 text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[.05] p-4">
            <div className="text-xs font-semibold text-amber-200">When it does not connect</div>
            <ul className="mt-3 space-y-3">
              {adbIssues.map((x) => (
                <li key={x.t}>
                  <div className="text-xs font-semibold text-slate-300">{x.t}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{x.d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <span className="text-[11px] text-slate-600">
              Commands follow the official project documentation. Verify flags against the current release before use.
            </span>
            <a href="#generator" className="inline-flex items-center gap-2 text-xs font-semibold text-lime">
              Start with the generator <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
