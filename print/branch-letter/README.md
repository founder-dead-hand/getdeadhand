# Branch-manager letter - source

`branch-letter.html` is the source of `public/deadhand-for-the-counter.pdf`. Written
2026-09-17 by lane A. **The 08/27 build had no source at all** - the PDF was the only copy
of its own design, which is how a print piece becomes un-editable. Same gap the counter
sheet closed on 09-02.

## What changed from the 08/27 PDF

One thing: the descriptor now sits under the headline, in red mono caps - *The pocket tool
for field quoting*. `BRAND_STRINGS.md` had this letter marked as the one piece that never
says in a single line what the thing is. Everything else is the 08/27 copy, word for word.

## Rebuild

Open `branch-letter.html` in headless Chromium and print to Letter with background graphics
and zero margins (Playwright: `page.pdf({format:'Letter', printBackground:true,
preferCSSPageSize:true})`).

Then, before anything is printed:

1. **Check it is one page.** `.page` is a flex column with `height:11in` and `.sig` pinned by
   `margin-top:auto`, so the signature always sits on the bottom rule and the page always
   fills. `overflow` is deliberately `visible` - hiding it once let the QR row and the entire
   signature fall off the bottom while the page still looked like it fit.
2. **Decode the QR from a 300dpi render** and confirm it reads
   `https://getdeadhand.com/counter/`. Point the decoder at a code you already trust first;
   a decoder that cannot read a known-good code is not evidence about a new one.

## Assets

- `qr-counter.svg` - 29x29 (version 3), quiet zone included, one path. Not newly generated:
  the module grid was read back out of the 08/27 PDF at 600dpi and re-emitted as vector, so
  it is the same code that has been in circulation, not a new one that happens to point at
  the same URL.
- `logo.png` - wordmark with alpha, copied from `print/counter-sheet/`.
- `fonts-local.css` - the same 24 `@font-face` rules as the counter sheet, pointing at
  `../../public/fonts/`. It is a second copy of that file; both are frozen assets rather than
  rules that drift, so they are left as copies. If a third print piece appears, move them to
  `print/_shared/` and point all three at it.

## Rule

Any change to the descriptor, the credibility line or the price line in `BRAND_STRINGS.md` is
also a change here - walk the list in the same session. Say so in `HANDOFF_LOG.md`.
