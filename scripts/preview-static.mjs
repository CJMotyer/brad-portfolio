import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.pdf': 'application/pdf', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// A local review server for the exported files; not a production server.
await stat(resolve(root, 'index.html'));
const server = createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end();
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (basePath && pathname === basePath) {
      response.writeHead(308, { Location: `${basePath}/` });
      return response.end();
    }
    if (basePath && !pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404);
      return response.end();
    }
    const relative = pathname.slice(basePath.length).replace(/^\/+/, '');
    let filename = resolve(root, relative);
    if (filename !== root.replace(/\/$/, '') && !filename.startsWith(root)) throw new Error('Outside export');
    if ((await stat(filename)).isDirectory()) filename = resolve(filename, 'index.html');
    const actual = await realpath(filename);
    if (!actual.startsWith(root.endsWith(sep) ? root : root + sep)) throw new Error('Outside export');
    const content = await readFile(actual);
    response.writeHead(200, { 'Content-Type': types[extname(actual)] || 'application/octet-stream', 'Content-Length': content.length });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    const fallback = await readFile(resolve(root, '404.html')).catch(() => Buffer.from('Not found'));
    response.end(request.method === 'HEAD' ? undefined : fallback);
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${port}${basePath}/`));
