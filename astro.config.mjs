import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://getdeadhand.com",
  trailingSlash: "always",
  build: {
    // Directory format keeps every URL exactly as it is today:
    // /the-book/ -> the-book/index.html. Netlify's pretty URLs then 301
    // the slashless form, which is what the live site already does.
    format: "directory",
    inlineStylesheets: "never",
  },
  // Keep the markup as authored; parity against the old pages is verified
  // line by line, and whitespace collapsing makes that diff noisier for nothing.
  compressHTML: false,
});
