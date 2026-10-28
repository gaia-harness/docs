// Cloudflare Web Analytics: cookieless page views, no consent banner needed.
// Token for docs.gaiaharness.com from the Cloudflare dashboard (Web Analytics).
// Empty means no beacon is added to the build.
export const CF_BEACON_TOKEN = '2ea3e2f2259d41db8a9f1385ad929dd5';

export const cfBeaconAttrs = CF_BEACON_TOKEN
	? {
			type: 'module',
			src: 'https://static.cloudflareinsights.com/beacon.min.js',
			'data-cf-beacon': JSON.stringify({ token: CF_BEACON_TOKEN }),
		}
	: null;
