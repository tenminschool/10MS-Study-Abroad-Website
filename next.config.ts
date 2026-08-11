import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare bindings declared in wrangler.jsonc
// (R2 incremental cache, WORKER_SELF_REFERENCE) and to .dev.vars secrets.
// No-op in production builds.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev().catch((error) => {
  console.warn(
    "[next.config] initOpenNextCloudflareForDev() failed — Cloudflare bindings (R2 incremental cache, " +
      "WORKER_SELF_REFERENCE) and .dev.vars secrets are unavailable in `next dev`; the dev server keeps running. " +
      "Try deleting .wrangler/ or freeing the port it needs, then restart.",
    error
  );
});
