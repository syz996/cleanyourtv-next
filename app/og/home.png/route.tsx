import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: '#ccff00', display: 'flex' }} />
          <div style={{ fontSize: 26, letterSpacing: 2, color: '#a1a1aa', display: 'flex' }}>
            CLEANYOURTV.GUIDE
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 700, color: '#ffffff', lineHeight: 1.05, display: 'flex' }}>
            Clean Your TV
          </div>
          <div style={{ fontSize: 40, color: '#ccff00', lineHeight: 1.25, display: 'flex' }}>
            Prompt generator for Claude Code
          </div>
          <div style={{ fontSize: 28, color: '#a1a1aa', lineHeight: 1.4, display: 'flex' }}>
            Strip ads from Android TV / Google TV — no root, fully reversible.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {['Android TV', 'Google TV', 'Fire TV', 'Samsung', 'LG webOS'].map((p) => (
            <div
              key={p}
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#e4e4e7',
                border: '2px solid #3f3f46',
                borderRadius: 999,
                padding: '10px 22px',
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}