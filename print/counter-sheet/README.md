# Counter sheet - source
`counter-sheet.html` is the source of `public/deadhand-counter-sheet.pdf`. Rebuilt 2026-09-02 after the demo total moved to $2,041.52 (the original 08/27 build had no committed source), and again 2026-10-09 at **$2,211.52**.

**The 09/02 rebuild shipped stale.** The demo job had already gone from three hours to four on 2026-08-31 (`deadhand-app` 4da2003), so the sheet chased a number that was two days out of date, and it went live on 09-17 that way. Regenerate the shots from the live demo and read the total off the render - do not take the figure from this file, from the last build, or from a handoff.

Rebuild: open `counter-sheet.html` in headless Chromium and print to Letter with background graphics, zero margins (Playwright: `page.pdf(format='Letter', print_background=True, prefer_css_page_size=True)`). Then render at 300dpi and confirm the QR decodes to `https://dead-hand.app/demo` before anything is printed.

Assets: `logo.png` (wordmark with alpha), `shot-calculator-2x.png` and `shot-estimate-2x.png` (860x1722, which is the 430x861 phone viewport at deviceScaleFactor 2 - regenerate from the live demo whenever the demo job or any rate changes), `qr.svg` (dead-hand.app/demo), fonts via `../../public/fonts/`.

**Two DOM edits before the shots, both deliberate:**

1. `#pValid` - the dated "good through <date>" line becomes "This estimate is good for 30 days." so a printed stack does not expire on a date.
2. `#demoBar` - hidden. It is the demo page's own "Start your own" strip, not part of the app a shop sees; it covers the Additional fees row, and baking a price into PRINTED paper is how paper goes stale (Standards section 3).

The calculator shot is taken with `.screens` scrolled to the bottom, so the total and every per-line margin are in frame. The same `public/deadhand-shot-*.webp` are these PNGs resized to 430x861 - they are on the homepage and `/counter/`, so they go stale together with the paper.

Rule: every change to `netlify/lib/prices.mjs` in deadhand-app, or to the demo job, is also a counter-sheet change. Say so in HANDOFF_LOG.md.
