// Post-processes a Docapella build so it can be served from a subpath
// (e.g. https://<user>.github.io/<repo>/) and applies theme.color_mode,
// which Docapella parses but ignores.
//
// Usage (from the project root): node scripts/postbuild.mjs <build-dir> [base-path]
//   base-path: e.g. "/okra-docs-sample". Omit or pass "" to serve from root.
//
// The script is idempotent: running it twice with the same base path is safe.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

const [outDir, rawBase = ""] = process.argv.slice(2);
if (!outDir) {
  console.error("Usage: node scripts/postbuild.mjs <build-dir> [base-path]");
  process.exit(1);
}

const base = rawBase.replace(/\/+$/, "").replace(/^(?!\/|$)/, "/");
const config = readFileSync("docapella.yaml", "utf8");
const domain = (config.match(/^domain:\s*["']?([^"'\s]+)/m) || [])[1];
const colorMode = (config.match(/^\s+color_mode:\s*["']?(\w+)/m) || [])[1] || "auto";

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const encodeSlashes = (s) => s.replace(/\//g, "&#x2f;");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

// --- Base path rewrites ------------------------------------------------------

function prefixHtml(html) {
  if (!base) return html;
  const seg = escapeRe(base.slice(1));
  // A root-relative "/" or "&#x2f;" not followed by another slash (which would
  // be protocol-relative, e.g. //unpkg.com) and not already prefixed.
  const rootRel = `(\\/|&#x2f;)(?!\\/|&#x2f;|${seg}(?:\\/|&#x2f;|"|'|#|\\?))`;

  return html
    // Docapella renders the favicon as "/" + "/_assets/...", which browsers
    // read as a protocol-relative URL to a host called "_assets".
    .replace(/(\shref=")\/&#x2f;_assets/g, `$1${base}/_assets`)
    .replace(new RegExp(`(\\s(?:href|src|poster|action)=")${rootRel}`, "g"), `$1${base}$2`)
    .replace(new RegExp(`(fetch\\(\\s*['"])${rootRel}`, "g"), `$1${base}$2`)
    .replace(canonicalRe(false), `$1${base}/`)
    .replace(canonicalRe(true), `$1${encodeSlashes(base)}&#x2f;`);
}

// Matches the configured domain followed by "/" (canonical and og:url tags),
// in plain or entity-encoded form.
function canonicalRe(encoded) {
  if (!domain) return /$^/;
  const d = encoded ? encodeSlashes(domain) : domain;
  const slash = encoded ? "&#x2f;" : "/";
  const seg = escapeRe(encoded ? encodeSlashes(base.slice(1)) : base.slice(1));
  return new RegExp(`(${escapeRe(d)})${escapeRe(slash)}(?!${seg}(?:${escapeRe(slash)}|"))`, "g");
}

// --- Color mode --------------------------------------------------------------

// Docapella's own head script picks dark or light from a stored preference
// (localStorage "darkModePreference") or the OS setting, and the header toggles
// switch it. To force a mode, store it as the preference before that script
// runs, set the class directly in case storage is blocked, and hide the toggles
// (plus the divider in front of the desktop one).
const COLOR_MODE_MARKER = "data-forced-color-mode";

function forceColorMode(html) {
  if (colorMode !== "dark" && colorMode !== "light") return html;
  if (html.includes(COLOR_MODE_MARKER)) return html;
  const snippet = `
    <script ${COLOR_MODE_MARKER}>
      (function () {
        var mode = ${JSON.stringify(colorMode)};
        try {
          localStorage.setItem("darkModePreference", JSON.stringify({ value: mode, timestamp: Date.now() }));
        } catch (e) {}
        document.documentElement.classList.toggle("dark", mode === "dark");
      })();
    </script>
    <style ${COLOR_MODE_MARKER}>
      [data-dark-mode-toggle], .divider:has(+ [data-dark-mode-toggle]) { display: none !important; }
    </style>`;
  return html.replace(/<head(\s[^>]*)?>/, (tag) => tag + snippet);
}

function prefixCss(css) {
  if (!base) return css;
  const seg = escapeRe(base.slice(1));
  return css.replace(new RegExp(`(url\\(\\s*['"]?)\\/(?!\\/|${seg}\\/)`, "g"), `$1${base}/`);
}

function prefixSearchIndex(json) {
  if (!base) return json;
  const seg = escapeRe(base.slice(1));
  return json.replace(new RegExp(`("page_url":")\\/(?!${seg}(?:\\/|"))`, "g"), `$1${base}/`);
}

let rewritten = 0;
for (const file of walk(outDir)) {
  const ext = extname(file);
  const rewrite =
    ext === ".html" ? (html) => forceColorMode(prefixHtml(html))
    : ext === ".css" ? prefixCss
    : file.endsWith("search.json") ? prefixSearchIndex
    : null;
  if (!rewrite) continue;

  const before = readFileSync(file, "utf8");
  const after = rewrite(before);
  if (after !== before) {
    writeFileSync(file, after);
    rewritten++;
  }
}
console.log(`Applied base path "${base || "/"}" and color mode "${colorMode}" to ${rewritten} files`);
