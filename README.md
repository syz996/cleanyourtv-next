# Clean Your TV Guide — Next.js starter

A polished homepage prototype built with Next.js 15, React 18, TypeScript, Tailwind CSS and Framer Motion.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
```

The project is configured for static export (`out/`) so it can later be deployed to Cloudflare Pages.

## Included

- Responsive homepage with layered dark UI and subtle motion
- Prompt generator with assistant / platform / connection controls
- Live preliminary compatibility state
- Copy-to-clipboard interaction
- Safety-first generated prompt (does not invent or execute device commands)
- Compatibility, workflow and safety sections

## Important implementation notes

- Compatibility is a preliminary UI rule only. It is not an authoritative device database. Verify exact model support against the official project directory before publishing.
- The prompt intentionally directs the selected coding assistant to consult the official repository's current `PROMPT.md`. It does not reproduce or replace official scripts.
- Do not present this prototype's brand/platform examples as verified support claims. Replace them with audited `models.json` data in the next development phase.

## Next development phase

1. Build and audit `models.json` from the official model directory.
2. Verify the official prompt template and supported workflow.
3. Add `/install/claude-code`, `/models`, and `/troubleshooting` pages.
4. Add privacy/about pages, sitemap, robots and structured data.
# cleanyourtv-next
