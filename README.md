# viberules.dev

Source and static output for [viberules.dev](https://viberules.dev).
This site lives on the `blog` branch of `RaoHai/RaoHai`; the GitHub profile lives on `master`.

## Structure

- `content/`: Markdown articles.
- `scripts/import-yuque.mjs`: Article metadata, import, and HTML generation.
- `public/`: Published pages, styles, and locally stored images.

## Development

```sh
npm ci
npm run dev -- --listen 4174
```

To regenerate pages after editing articles or metadata:

```sh
npm run import:yuque
npm run fonts
```

The import command also fetches public Yuque content and images.
Font subsetting requires Python with `fonttools` and `brotli`; see `fonts/README.md`.

## Deployment

```sh
npm run deploy
```

Deploys `public/` to the existing Cloudflare Pages project `cloud-edgetunnel-raohai`.
Authenticate with Wrangler or supply `CLOUDFLARE_API_TOKEN` through the environment.
Pushing this branch does not automatically deploy the site.
