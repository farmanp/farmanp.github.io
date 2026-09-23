import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(process.argv.includes('--production') ? 'public' : 'site');
const port = Number(process.env.PORT || 3000);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.jpg':'image/jpeg' };
createServer(async (req, res) => {
 try {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let path = resolve(root, '.' + pathname);
  if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); return res.end('Forbidden'); }
  if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
  const data = await readFile(path); res.writeHead(200, { 'Content-Type':types[extname(path)] || 'application/octet-stream', 'Cache-Control':'no-cache' }); res.end(data);
 } catch { res.writeHead(404, { 'Content-Type':'text/plain' }); res.end('Page not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio running at http://localhost:${port}`));
