// Runs after `astro build`. Replaces 'unsafe-inline' in the CSP script-src in
// dist/_headers with a sha256 hash of every inline script the build emitted,
// so the browser runs exactly those scripts and nothing injected.
import {createHash} from 'node:crypto';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const headersPath = path.join(dist, '_headers');

const htmlFiles = async (dir) => {
	const entries = await readdir(dir, {withFileTypes: true});
	const nested = await Promise.all(
		entries.map((entry) => {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) return htmlFiles(full);
			return entry.name.endsWith('.html') ? [full] : [];
		}),
	);
	return nested.flat();
};

// Inline scripts only: a <script> without src. JSON data blocks never run, so
// CSP ignores them and they need no hash.
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const DATA_TYPE = /\stype=["']?application\/(ld\+)?json/;

const hashes = new Set();
for (const file of await htmlFiles(dist)) {
	const html = await readFile(file, 'utf8');
	for (const [, attributes, body] of html.matchAll(INLINE_SCRIPT)) {
		if (DATA_TYPE.test(attributes) || body.length === 0) continue;
		hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
	}
}

const headers = await readFile(headersPath, 'utf8');
const scriptSrc = /(script-src [^;\n]*)'unsafe-inline'/;
if (!scriptSrc.test(headers)) {
	throw new Error("csp-hashes: no 'unsafe-inline' in a script-src in dist/_headers");
}
const sorted = [...hashes].sort().join(' ');
await writeFile(headersPath, headers.replace(scriptSrc, `$1${sorted}`));
console.log(`csp-hashes: ${hashes.size} inline script hashes written to dist/_headers`);
