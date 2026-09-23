# Farman Pirzada

**I follow the trails hidden in data.**

My personal space for projects, writing, and questions worth following. The site explores data discovery, search, research agents, and the evidence that connects things.

[Portfolio](https://farmanp.github.io/) · [LinkedIn](https://www.linkedin.com/in/farmanp/)

## Run locally

Use Node.js 18 or newer. The current site uses plain HTML, CSS, and JavaScript, with no dependency installation required.

```sh
npm start
```

Open http://localhost:3000. Refresh the browser after editing a file.

## Build and preview

```sh
npm run build
npm run serve
```

The build copies `site/` into `public/` and adds `.nojekyll`. The production preview also uses port 3000, so stop the development server first or set `PORT` to another value.

## Where things live

| File | Purpose |
| --- | --- |
| `site/index.html` | Homepage, selected work, writing cards, and biography |
| `site/styles.css` | Layout, watercolor textures, trail details, and seasonal palettes |
| `site/app.js` | Research briefs, dialogs, and appearance controls |
| `site/assets/` | Profile photo and favicon |
| `scripts/serve.mjs` | Local static server |
| `scripts/build.mjs` | Static build script |

The writing cards currently open working research briefs, not published essays.

## Appearance

Watercolor washes and trail contours change with the season and time of day. Automatic settings use the visitor’s local clock and Northern Hemisphere seasons. The footer lets visitors choose a season or time, toggle gentle motion, or return to automatic settings. Preferences stay in their browser, and reduced-motion preferences are respected.

Fonts load from Google Fonts with system fallbacks. The profile photo is stored locally.

## Publishing

Host the contents of `public/` on a static host. Pushing source changes to `master` does not itself run the deployment command.

The existing `npm run deploy` command builds the site and publishes `public/` to the `gh-pages` branch. It requires the `gh-pages` CLI and GitHub write access; GitHub Pages must be configured to serve that branch. The new local preview and build do not require the legacy dependency installation.

## Project history

This repository began with [Gatsby Simplefolio](https://github.com/cobidev/gatsby-simplefolio) by Jacobo Martínez. The current portfolio is a standalone static implementation. Original Gatsby files remain in `src/` and the root configuration for reference, with `legacy:develop` and `legacy:build` commands. Those commands require the older dependencies and are not part of the current site workflow.

The original [MIT license](LICENSE.md) and attribution are retained.
