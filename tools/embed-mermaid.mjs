// Embed distro/vendor/mermaid.min.js into distro/northern-lights.html, between
// the <!-- mermaid:begin --> and <!-- mermaid:end --> markers at the end of
// <body>. Run from the repo root after updating the vendor file:
//
//   node tools/embed-mermaid.mjs
//
// Why it's embedded at all is explained in the viewer's <head>. Re-running is
// safe: whatever sits between the markers is replaced.

import { readFileSync, writeFileSync } from "node:fs";

const HTML = "distro/northern-lights.html";
const VENDOR = "distro/vendor/mermaid.min.js";
const BEGIN = "<!-- mermaid:begin -->";
const END = "<!-- mermaid:end -->";

const html = readFileSync(HTML, "utf8");
const code = readFileSync(VENDOR, "utf8").replace(/\s+$/, "");

// Inside a <script> element these would end it early (or tip the parser into
// its "escaped" state); minified Mermaid has had neither so far.
if (/<\/script|<script/i.test(code)) {
  console.error("mermaid.min.js contains <script or </script -- it can't be embedded as-is.");
  process.exit(1);
}

const a = html.indexOf(BEGIN), b = html.indexOf(END);
if (a < 0 || b < a || html.indexOf(BEGIN, a + 1) >= 0) {
  console.error("Expected exactly one " + BEGIN + " ... " + END + " pair in " + HTML);
  process.exit(1);
}

const version = (code.match(/version:"(\d+\.\d+\.\d+)"/) || [])[1] || "unknown version";

const block = `${BEGIN}
<!--
  Mermaid ${version}, embedded from vendor/mermaid.min.js by
  tools/embed-mermaid.mjs. Stored as inert text and run by startMermaid() the
  first time a page has a diagram. Its license, which must travel with it:

  The MIT License (MIT)

  Copyright (c) 2014 - 2022 Knut Sveidqvist

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  The libraries bundled inside Mermaid keep their own license notes, left
  untouched in the code below.
-->
<script type="text/plain" id="mermaid-src">
${code}
</script>
${END}`;

writeFileSync(HTML, html.slice(0, a) + block + html.slice(b + END.length));
console.log(`Embedded Mermaid ${version} (${(code.length / 1e6).toFixed(2)} MB) into ${HTML}`);
