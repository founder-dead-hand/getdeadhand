# getdeadhand — session rules
> **PORTFOLIO STANDARDS apply here.** Read `G:\My Drive\Managing Partner\PORTFOLIO_STANDARDS.md` before any change — names, source-of-truth per brand, pricing location, the before-any-push gate, voice, encoding, secrets, session lanes. This file carries only the deltas for this repo. If the two disagree, the standards win and this file is wrong. (Added 2026-09-02.)
## Deltas for this repo
- **Brand strings:** every fixed phrase (descriptor, credibility line, price line, taglines) and every surface it lives on is in `G:\My Drive\Dead Hand Calculator\01_Controls\BRAND_STRINGS.md`. Change it there first, then walk the list. Descriptor is *The pocket tool for field quoting.*
- State truth for Dead Hand is `G:\My Drive\Dead Hand Calculator\01_Controls\`; this repo's lane brief is HANDOFF_A_customer-facing.md there.
- Pricing on any page must match `C:\deadhand-app\netlify\lib\prices.mjs` — copy the number from there, never from a doc. Nothing ends in 9.
- Astro; one Layout, one Header, one Footer, one global.css. Entity-ize typographic characters (`&mdash;`, `&middot;`); JSON-LD uses `\u2014`; zero non-ASCII bytes committed.
- Every page: title, description, canonical, JSON-LD where it applies; sitemap `lastmod` updated; verify against the live URL with a cache-buster.
- The Handbuilt Standard applies: 0 stock photos, 0 templates, 0 tracking scripts (the Cloudflare beacon is an open decision — do not add anything else).
- Counter material lives in `public/deadhand-counter-sheet.pdf` and `public/deadhand-for-the-counter.pdf`, page at `/counter`. Regenerate the sheet whenever the demo total or the price changes.
- This lane (A) does not touch anything behind the login; write app findings into HANDOFF_LOG.md for lane B.
