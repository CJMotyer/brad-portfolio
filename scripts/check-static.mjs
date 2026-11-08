import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin = 'https://static.example';
const home = `${origin}${basePath}/`;
const index = await readFile(resolve(root, 'index.html'), 'utf8');
assert(index.includes('Brad Motyer'), 'The homepage must contain rendered content.');
await stat(resolve(root, '404.html'));
assert(!index.includes('/_next/image?'), 'Export must not use the server image optimizer.');
assert(!index.includes('localhost:'), 'Export must not reference the development server.');
const ids = new Set([...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
let checked = 0;

async function checkReference(reference, pageUrl) {
  const url = new URL(reference.replaceAll('&amp;', '&'), pageUrl);
  if (['mailto:', 'tel:', 'data:'].includes(url.protocol)) return;
  assert.equal(url.origin, origin, `Unexpected external dependency: ${reference}`);
  assert(!basePath || url.pathname.startsWith(`${basePath}/`), `Asset escapes the deployment subpath: ${url.pathname}`);
  const relative = decodeURIComponent(url.pathname.slice(basePath.length)).replace(/^\//, '');
  let filename = resolve(root, relative);
  assert(filename === resolve(root) || filename.startsWith(root), `Asset escapes export: ${reference}`);
  if ((await stat(filename)).isDirectory()) filename = resolve(filename, 'index.html');
  await stat(filename);
  if (url.hash && url.pathname === new URL(home).pathname) {
    assert(ids.has(decodeURIComponent(url.hash.slice(1))), `Broken section link: ${url.hash}`);
  }
  checked++;
}

for (const match of index.matchAll(/\b(?:src|href)="([^"]+)"/g)) await checkReference(match[1], home);
async function checkStyles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = resolve(directory, entry.name);
    if (entry.isDirectory()) await checkStyles(filename);
    else if (entry.name.endsWith('.css')) {
      const css = await readFile(filename, 'utf8');
      for (const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
        const cssUrl = new URL(filename.slice(root.length), home);
        await checkReference(match[1], cssUrl);
      }
    }
  }
}
await checkStyles(resolve(root, '_next/static'));
assert(!(await readdir(root)).includes('assets'), 'Original source assets must not be published.');
console.log(`Static export verified: HTML, 404 page, and ${checked} links/assets (${basePath || '/'}).`);
