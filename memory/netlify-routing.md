---
name: netlify-routing
description: Removed broken /:splat redirect from netlify.toml that was causing homepage 404s
metadata:
  type: project
---

## What was removed

```toml
[[redirects]]
from = "//*"
to = "/:splat"
status = 301
force = true
```

**Why it was there:** Guard against Lighthouse CI generating double-slash paths (e.g. `//work`) when deploy preview URLs have a trailing slash combined with scroll-restoration.

**Why it was removed:** Netlify normalizes `//` to `/` before pattern matching, so `from = "//*"` effectively became `from = "/*"` — matching every request. When the wildcard captured an empty string (requests to `/`), `to = "/:splat"` produced the literal string `/:splat` instead of `/`. The browser then fetched `https://nandanjp.io/:splat` which 404'd, breaking the homepage and all RSC prefetches.

## How to apply it if ever needed again

Do not use `netlify.toml` for this. Scope it to deploy previews only via a `_redirects` file or Netlify UI, and test that `:splat` substitution actually works before deploying.
