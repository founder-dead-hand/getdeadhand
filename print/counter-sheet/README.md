# Counter sheet — source
`counter-sheet.html` is the source of `public/deadhand-counter-sheet.pdf`. Rebuilt 2026-09-02 by the Managing Partner session after the demo total moved to $2,041.52 (the original 08/27 build had no committed source).

Rebuild: open `counter-sheet.html` in headless Chromium and print to Letter with background graphics, zero margins (Playwright: `page.pdf(format='Letter', print_background=True, prefer_css_page_size=True)`). Then render at 300dpi and confirm the QR decodes to `https://dead-hand.app/demo` before anything is printed.

Assets: `logo.png` (wordmark with alpha), `shot-calculator-2x.png` and `shot-estimate-2x.png` (860×1722 product shots — regenerate from the live demo whenever the demo job or price changes; the estimate shot has its dated "good through" line replaced with "good for 30 days" so printed stacks do not expire), `qr.svg` (dead-hand.app/demo), fonts via `../../public/fonts/`.

Rule: every change to `netlify/lib/prices.mjs` in deadhand-app, or to the demo job, is also a counter-sheet change. Say so in HANDOFF_LOG.md.
