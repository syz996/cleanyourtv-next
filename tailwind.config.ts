import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink: '#080D17', panel: '#111A2B', lime: '#C7F36B' }, boxShadow: { glow: '0 0 50px rgba(199,243,107,.12)' } } }, plugins: [] };
export default config;
