# Goli Pavan Sai Krishna — Portfolio

A one-page portfolio for an AI/ML engineer. Static site: HTML + Tailwind CSS + vanilla JS.
No framework, no template, no runtime dependencies.

---

## Editing content

**All text lives in [`content.json`](content.json).** That is the only file you need to
touch to update the site — bio, projects, tech stack, links, stats, headings, everything.
`index.html` is an empty shell and `app.js` maps the JSON onto it.

Change a value, refresh the page. No rebuild required.

```
content.json
├── meta       page title + meta description
├── nav        header links
├── hero       badge, name, tagline, intro, stats, CTA buttons
├── about      bio paragraph + education spec rows
├── work       the three project entries
├── stack      tech grouped by category
├── contact    email, GitHub, LinkedIn
└── footer     copyright + note
```

### Adding a project
Append an object to `work.projects`. Cards alternate left/right automatically.
`metric` drives the big number on the placeholder panel.

### Adding real screenshots
Each project currently renders a generated placeholder panel showing its headline metric.
To swap in a real image, add an `"image": "images/your-shot.png"` key to that project in
`content.json` and render it in `shotPanel()` in `app.js`.

---

## Running locally

The page fetches `content.json`, and browsers block `fetch` over `file://`. So open it
through a local server rather than double-clicking `index.html`:

```bash
npm run serve          # python3 -m http.server 8000
```

Then visit **http://localhost:8000**.

(If you do open `index.html` directly, the page shows a notice with this same command.)

---

## Changing the design

Design tokens — colours, fonts, motion — are declared once in the `@theme` block of
[`src/input.css`](src/input.css). After editing, rebuild the stylesheet:

```bash
npm run build          # one-off minified build -> styles.css
npm run dev            # rebuild on every save
```

`styles.css` is committed, so the site works without ever running a build.

### Design system

| | |
|---|---|
| Ground | `#0B0A09` warm near-black (not blue-slate) |
| Primary accent | `#F2A03D` signal amber |
| Secondary accent | `#62D3A4` verified mint — used for "measured / passing" states |
| Display | Space Grotesk |
| Body | IBM Plex Sans |
| Mono | JetBrains Mono — labels, stats, tech tags |

Accessibility: all body text meets WCAG AA (lowest measured ratio 5.23:1), every
interactive target is ≥44px, focus rings are visible, and `prefers-reduced-motion`
disables the scroll reveals. The page has no horizontal scroll at 375px.

---

## Deploying

Configured for Vercel as a static site ([`vercel.json`](vercel.json)):

```bash
vercel login           # first time only, opens a browser
vercel --prod
```

Or `npm run deploy`. Vercel runs `npm run build` and serves the repo root.

---

## Files

```
index.html      structural shell (no copy)
content.json    ← all site copy lives here
app.js          renders content.json into the shell
src/input.css   design tokens + components (Tailwind source)
styles.css      compiled output (committed)
vercel.json     deployment config
```
