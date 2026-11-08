# Actor Portfolio — Cinematic

A dark, film-forward single-page portfolio for actors. Built with Vinext/React and plain CSS.

## Customize

- Edit names, credits, biography, and links in `app/page.tsx`.
- Replace the Unsplash image URLs with your own optimized headshots and production stills.
- Replace `/resume.pdf` with a real résumé file in `public/`.
- Swap the reel placeholder for a Vimeo or YouTube embed.
- Adjust the palette at the top of `app/globals.css`.

## Run

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## GitHub Pages

In the GitHub repository, select **Settings → Pages → Build and deployment →
Source → GitHub Actions**. The workflow in `.github/workflows/deploy-pages.yml`
then builds and deploys on pushes to `main`, or manually from the Actions tab.
Each portfolio needs its own GitHub repository and the files pushed there.

The Pages build uses Next.js static export and uploads `out/`. The workflow
gets the base path from GitHub Pages so assets work at both repository URLs
and custom domains. The existing Vinext development and build commands remain
available for other hosts.

To check a repository-path build locally:

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/actor-portfolio-cinematic npm run build:pages
```

Omit `NEXT_PUBLIC_BASE_PATH` for a site hosted at the domain root. Résumé links
are relative to the site; add the actual PDF as `public/resume.pdf`.
