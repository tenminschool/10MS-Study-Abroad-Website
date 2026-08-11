// OpenNext adapter config for Cloudflare Workers.
//
// The incremental cache is backed by the R2 bucket bound as NEXT_INC_CACHE_R2_BUCKET
// in wrangler.jsonc — that is what backs the `Revalidate 1m` routes (/, /destinations,
// /scholarships) across Worker isolates.

import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
