---
title: "Search + tags"
description: "Search across post titles, tags, and the body text."
pubDate: 2026-02-17
tags: ["search", "tags", "astro"]
---

The search page fetches a build-time JSON index generated from your posts.

Try searches like:

- `astro`
- `tag:astro`
- `tag:tags search`

Want faster or fuzzier search?

- Swap the client filter for a library like Fuse.js.
- Or generate a smaller index (title/description only).
