'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Check, Copy, RefreshCw, Terminal, WandSparkles } from 'lucide-react';

type Agent = 'Claude Code' | 'Codex' | 'Gemini Antigravity';
type Tier = 'Full guidance' | 'Cleanup-only' | 'Not supported';
type CopyState = 'idle' | 'copied' | 'failed';

const AGENTS: Agent[] = ['Claude Code', 'Codex', 'Gemini Antigravity'];
const BRANDS = ['Sony', 'TCL', 'Hisense', 'Xiaomi', 'Philips', 'Other / not sure'];
const PLATFORMS = [
  'Google TV',
  'Android TV',
  'Fire TV',
  'Samsung Tizen',
  'LG webOS',
  'Roku OS',
  'Other / not sure',
];
const VERSIONS = ['Android 8+', 'Android 7 or older', 'Not sure', 'Not applicable'];
const CONNECTIONS = ['Same Wi-Fi', 'Wireless debugging', 'Tailscale', 'Not set up yet'];

const DEFAULTS = {
  agent: 'Claude Code' as Agent,
  brand: 'Sony',
  platform: 'Google TV',
  version: 'Android 8+',
  connection: 'Same Wi-Fi',
};

function getTier(platform: string, version: string): Tier {
  if (platform === 'Fire TV') return 'Cleanup-only';
  if (platform === 'Samsung Tizen' || platform === 'LG webOS' || platform === 'Roku OS') {
    return 'Not supported';
  }
  if (
    (platform === 'Android TV' || platform === 'Google TV') &&
    (version === 'Android 8+' || version === 'Not sure')
  ) {
    return 'Full guidance';
  }
  return 'Not supported';
}

/**
 * 平台本身就决定了品牌时，返回被锁定的品牌，否则返回 null。
 * 只锁 Samsung Tizen / LG webOS 这两组明确的写法冲突；
 * Roku OS 和 Fire TV 的整机品牌可能真是 TCL、Hisense、Toshiba，保留用户自选。
 */
function getBrandLock(platform: string): string | null {
  if (platform === 'Samsung Tizen') return 'Samsung';
  if (platform === 'LG webOS') return 'LG';
  return null;
}

export default function PromptGenerator() {
  const [agent, setAgent] = useState<Agent>(DEFAULTS.agent);
  const [brand, setBrand] = useState(DEFAULTS.brand);
  const [platform, setPlatform] = useState(DEFAULTS.platform);
  const [version, setVersion] = useState(DEFAULTS.version);
  const [connection, setConnection] = useState(DEFAULTS.connection);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const tier = getTier(platform, version);
  const brandLock = getBrandLock(platform);
  const effectiveBrand = brandLock ?? brand;
  const brandOptions = brandLock ? [brandLock, 'Other / not sure'] : BRANDS;

  const prompt = useMemo(() => {
    if (tier === 'Not supported') {
      return `I have a ${effectiveBrand} TV running ${platform}. Before suggesting any changes, explain why this platform is not supported by the Android TV workflow. Do not provide ADB debloating commands or a substitute script. Suggest only safe, platform-appropriate alternatives such as reviewing router-level DNS or built-in privacy settings. Clearly distinguish verified facts from assumptions.`;
    }

    return `Act as a cautious technical guide for the official Gathin23/cleanyourtv project. I use ${agent} and have a ${effectiveBrand} ${platform} device (${version}). Connection context: ${connection}.\n\nFirst, read the official project documentation and its current PROMPT.md. Do not invent commands or create a new debloating script. Explain the supported workflow for this exact device profile and identify anything that cannot be verified.\n\nBefore any change:\n1. Check connectivity and inspect the installed package list; present findings for review.\n2. Explain the purpose and risk of each proposed package change individually. Never batch-disable packages.\n3. Use only the official repository's documented tools where applicable.\n4. Do not execute anything until I explicitly approve each individual action.\n5. Record the original state and explain the documented rollback method, including how to re-enable a disabled package.\n6. Skip uncertain or potentially critical system packages and explain why.\n\nDo not root, flash firmware, uninstall system apps, or make irreversible changes. If model-specific support is uncertain, stop and ask me to verify the exact model.`;
  }, [agent, effectiveBrand, platform, version, connection, tier]);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);

    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState('copied');
      timer.current = setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('failed');
      timer.current = setTimeout(() => setCopyState('idle'), 4000);
    }
  }

  function reset() {
    setAgent(DEFAULTS.agent);
    setBrand(DEFAULTS.brand);
    setPlatform(DEFAULTS.platform);
    setVersion(DEFAULTS.version);
    setConnection(DEFAULTS.connection);
    setCopyState('idle');
    if (timer.current) clearTimeout(timer.current);
  }

  return (
    <section id="generator" className="relative py-24">
      <div className="glow-orb absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-cyan-400/[.06]" />
      <div className="container-x relative">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-4">01 / PROMPT BUILDER</div>
            <h2 className="section-title">
              Your setup.
              <br />
              <span className="text-lime">
                A ready-made prompt for the Clean Your TV GitHub workflow.
              </span>
            </h2>
            <p className="muted mt-4 max-w-xl leading-7">
              Choose your assistant and TV environment. Get a tailored instruction set that
              prioritizes inspection, explicit approval and rollback.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-xs text-slate-400">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime" />
            Runs locally in your browser
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          {/* ---------- 左侧：配置面板 ---------- */}
          <div className="glass rounded-2xl p-6 md:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div className="font-semibold">Configure your prompt</div>
              <WandSparkles size={18} className="text-lime" />
            </div>

            <label className="mb-2 block text-xs font-medium text-slate-400">AI ASSISTANT</label>
            <div className="mb-5 grid grid-cols-3 gap-2">
              {AGENTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAgent(a)}
                  className={`rounded-lg border px-2 py-3 text-xs transition ${
                    agent === a
                      ? 'border-lime/50 bg-lime/10 text-lime'
                      : 'border-white/10 bg-[#0b1321] text-slate-400 hover:border-white/25'
                  }`}
                >
                  {a === 'Claude Code' ? 'Claude' : a === 'Gemini Antigravity' ? 'Gemini' : 'Codex'}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs text-slate-400">TV BRAND</label>
                <select
                  className="field disabled:cursor-not-allowed disabled:opacity-60"
                  value={effectiveBrand}
                  onChange={(e) => setBrand(e.target.value)}
                  disabled={brandLock !== null}
                >
                  {brandOptions.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                {brandLock ? (
                  <p className="mt-2 text-[10px] leading-4 text-slate-600">
                    Brand follows the selected platform.
                  </p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">TV PLATFORM</label>
                <select
                  className="field"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  {PLATFORMS.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">ANDROID VERSION</label>
                <select
                  className="field"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                >
                  {VERSIONS.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">CONNECTION</label>
                <select
                  className="field"
                  value={connection}
                  onChange={(e) => setConnection(e.target.value)}
                >
                  {CONNECTIONS.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>

            <div
              className="mt-6 rounded-xl border p-4"
              style={{
                borderColor:
                  tier === 'Full guidance'
                    ? 'rgba(199,243,107,.25)'
                    : tier === 'Cleanup-only'
                      ? 'rgba(251,191,36,.25)'
                      : 'rgba(248,113,113,.25)',
                background:
                  tier === 'Full guidance'
                    ? 'rgba(199,243,107,.05)'
                    : tier === 'Cleanup-only'
                      ? 'rgba(251,191,36,.05)'
                      : 'rgba(248,113,113,.05)',
              }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                {tier === 'Full guidance' ? (
                  <Check size={16} className="text-lime" />
                ) : (
                  <AlertTriangle
                    size={16}
                    className={tier === 'Cleanup-only' ? 'text-amber-300' : 'text-red-300'}
                  />
                )}{' '}
                {tier}
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {tier === 'Full guidance'
                  ? 'Android TV / Google TV profile selected. Confirm your exact model against the official compatibility list before proceeding.'
                  : tier === 'Cleanup-only'
                    ? 'Fire TV selected. Keep guidance limited to cleanup; do not suggest launcher replacement.'
                    : 'This platform/version is not covered by the Android TV workflow. The generated text will explain safer alternatives instead.'}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-white"
              >
                <RefreshCw size={13} /> Reset
              </button>
              <span className="mono text-[10px] text-slate-600">LIVE CONFIGURATION</span>
            </div>
          </div>

          {/* ---------- 右侧：prompt 输出 ---------- */}
          <div className="glass flex min-h-[560px] flex-col overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-lime" />
                <span className="text-sm font-semibold">Generated prompt</span>
              </div>
              <span className="mono text-[10px] text-slate-500">
                MARKDOWN · {prompt.length} CHARS
              </span>
            </div>

            <div className="flex-1 bg-[#080f1c] p-5 md:p-6">
              <div className="mb-4 flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-full bg-red-400/70" />
                <i className="h-2 w-2 rounded-full bg-amber-300/70" />
                <i className="h-2 w-2 rounded-full bg-lime/80" />
                <span className="mono ml-2 text-[10px] text-slate-600">
                  clean-your-tv-prompt.txt
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={prompt}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.85] text-slate-300"
                >
                  {prompt}
                </motion.pre>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[.08] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="text-[11px] leading-5 text-slate-500">
                {copyState === 'failed'
                  ? 'Clipboard blocked by the browser. Select the prompt text and copy it manually.'
                  : 'Review the generated instructions before sharing them with an AI assistant.'}
              </div>
              <button
                type="button"
                onClick={copy}
                className="btn-primary !rounded-lg !py-3 text-xs"
              >
                {copyState === 'copied' ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : copyState === 'failed' ? (
                  <>
                    <AlertTriangle size={14} /> Select and copy
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy prompt
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-600">
          Compatibility labels are preliminary guidance, not a guarantee. Verify the exact model in
          the official project before taking action.
        </p>
      </div>
    </section>
  );
}
