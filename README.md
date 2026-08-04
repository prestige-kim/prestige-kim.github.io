# Myeongseong Kim — Portfolio

Personal portfolio for Myeongseong Kim, built with Next.js/vinext and deployed
automatically to GitHub Pages.

The live site is intended to be available at
`https://prestige-kim.github.io/` after the GitHub Pages workflow completes.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run dev
npm run build
```

## Useful commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm run lint`: run ESLint
- `npm test`: build and verify the rendered page

## Deployment

Every push to `main` runs `.github/workflows/pages.yml`. The workflow builds a
static export and publishes `dist/client` with GitHub Pages.
