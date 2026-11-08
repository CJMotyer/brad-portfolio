# Brad Motyer — Actor & Singer

A static actor portfolio built with Next.js, React, and plain CSS. Includes a first-person biography, seven credited production photos, 15 theatre credits, training, skills, contact details, and a downloadable résumé.

## Develop

Requires Node.js 22.13+ (CI uses Node.js 24).

```bash
npm ci
npm run dev
```

Development runs on http://localhost:3000, bound to loopback.

## Build and verify

```bash
npm run lint
npm run build
npm run typecheck
npm run check:static
npm audit
```

`npm run build` always generates a static export in `out/`. Upload only `out/` to your static host. No Node.js server, database, API, Cloudflare Worker, or environment secrets are needed on the host. `build:pages` is an alias for the same build.

Preview the actual exported files, without Next.js:

```bash
npm start
```

The local review server serves only `out/` on http://127.0.0.1:3000. Stop the development server first, or use `PORT=4173 npm start`. It is a local preview utility, not a production server.

To verify a repository subpath:

```bash
NEXT_PUBLIC_BASE_PATH=/brad-portfolio npm run build
NEXT_PUBLIC_BASE_PATH=/brad-portfolio npm run check:static
NEXT_PUBLIC_BASE_PATH=/brad-portfolio PORT=4173 npm start
```

Open http://127.0.0.1:4173/brad-portfolio/. Use the same base path for building, checking, and previewing. Rebuild without `NEXT_PUBLIC_BASE_PATH` to restore a domain-root export.

## GitHub Pages CI

`.github/workflows/deploy-pages.yml` runs dependency auditing, lint, static build, TypeScript, and export validation on pull requests and pushes to `main`. Pull requests validate without deploying. Pushes to `main` and manual workflow runs on `main` upload only `out/` and deploy through the `github-pages` environment.

When ready to publish, configure the GitHub repository under **Settings → Pages → Build and deployment → Source → GitHub Actions**. The workflow reads the Pages base path, supporting repository URLs and custom domains. This local project has not been pushed or deployed, so the workflow has not run on GitHub yet.

## Content and assets

- `app/data/portfolio.ts`: theatre credits, gallery captions, photographers, and image paths.
- `app/page.tsx`: biography, homepage, training, skills, navigation, and contact information.
- `app/layout.tsx`: page title, description, and favicon.
- `app/globals.css`: responsive styling.
- `public/images/`: optimized WebP photographs served by the website.
- `assets/originals/`: unchanged supplied originals, renamed by subject or production; excluded from the site export. `assets/README.md` records their supplied filenames and credits.
- `public/brad-motyer-resume.pdf`: unchanged supplied résumé with a stable filename.

The biography is based on the résumé; photo captions and photographer credits come from the supplied filenames. No production dates or home location have been added. Add a media section when a performance video is available.

## Dependency maintenance

Versions are pinned in `package.json` and `package-lock.json`. The scoped `minimatch` override fixes [GHSA-g3hv-75wg-m249](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249) in the TypeScript ESLint parser’s dependency tree. The caller uses the supported named `minimatch` API. Remove the override once the upstream dependency range includes a patched release. Keep auditing the entire dependency tree, including build tools.

ESLint 9.39.5 is retained because the installed React, import, and accessibility lint plugins do not yet declare ESLint 10 compatibility. npm emits a deprecation warning for ESLint 9; lint checks pass, and this development tool is not included in the exported site. Revisit it when those plugins support ESLint 10.

The assignment requests a Wix URL. Confirm that GitHub Pages is accepted before submitting a Pages URL.
