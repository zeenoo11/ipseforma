<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1efe43d1-18c2-4dfc-95cc-e770536d666e

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Known issues

Recorded so future work doesn't trip over the same things. Fix when convenient.

### astro-paper submodule has no `.gitmodules`
The `astro-paper/` directory is tracked as a gitlink (mode `160000`) pointing at commit `f3005328…`, but the repo has no `.gitmodules` file. A fresh clone will leave `astro-paper/` empty and `git submodule update --init` will fail with `no submodule mapping found`.

**Workaround until fixed**: clone `astropaper/astro-paper` manually into `astro-paper/` and check out `f3005328…`, or add a `.gitmodules` entry:
```
[submodule "astro-paper"]
    path = astro-paper
    url = https://github.com/satnaing/astro-paper.git
```

### `npm run lint` reports astro-paper internal TS errors
Root `tsc --noEmit` walks into `astro-paper/src/**` and fails on Astro-only module specifiers (`astro:content`, `@/config`, `@/assets/icons/*.svg`, `import.meta.env`). These are valid inside Astro's own type environment but invalid under the root tsconfig.

**Workaround**: ignore the astro-paper errors — the root homepage code itself is clean. Proper fix is either adding `"exclude": ["astro-paper"]` to root `tsconfig.json`, or letting astro-paper own its type checking via its own `npm --prefix astro-paper run lint`.

### 3 high-severity npm audit vulnerabilities
`picomatch` (ReDoS / method injection) and `vite` (path traversal + dev WebSocket file read). All are dev-only surfaces; a simple `npm audit fix` resolves them but may bump Vite within the 6.x line — run and verify `npm run build`/`dev` still work before committing the lockfile bump.

### Local blog serving vs. `blog.ipseforma.com`
The homepage link points to the external subdomain (`https://blog.ipseforma.com`). Locally, `npm run dev` and `npm run preview` also serve the astro-paper build under `/blog` (see `vite.config.ts`) so you can preview without touching DNS. Production deployment of the blog subdomain is a separate concern (Cloudflare Pages recommended).

