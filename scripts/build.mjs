import { cp, mkdir, writeFile } from 'node:fs/promises';
await mkdir('public', { recursive:true });
await cp('site', 'public', { recursive:true });
await writeFile('public/.nojekyll', '');
console.log('Static site built in public/');
