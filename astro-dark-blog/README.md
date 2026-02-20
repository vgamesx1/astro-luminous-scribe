# Astro Dark Blog

A simple Astro blog starter with:
- ✅ Dark mode toggle (persists with `localStorage`)
- ✅ Tags + tag pages
- ✅ Client-side search (title/description/tags + post text)

## Requirements

- Node.js `v18.20.8`+ (Astro supports even-numbered Node versions; see Astro docs)

## Run locally

```bash
npm install
npm run dev
```

## Add posts

Create Markdown files in `src/content/blog/`.

Frontmatter example:

```yaml
---
title: "My Post"
description: "Short summary"
pubDate: 2026-02-19
tags: ["astro", "notes"]
---
```

## Build

```bash
npm run build
npm run preview
```
## CMS (Decap CMS)

This project includes **Decap CMS** (formerly Netlify CMS) at:

- `/admin/`

### Local editing

Run Astro + the Decap proxy server:

```bash
npm run dev
```

In another terminal:

```bash
npm run cms
```

Then open:

- `http://localhost:4321/admin/`

(Decap CMS local editing works via `local_backend: true` + `decap-server`.)

### Production auth / backend

The default config uses:

- `backend: git-gateway`

This is the easiest setup on **Netlify** (enable **Identity** + **Git Gateway**, then invite users).  
If you’re not using Netlify, switch the `backend` in `public/admin/config.yml` to GitHub/GitLab/etc (see Decap CMS backend docs).
