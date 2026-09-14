# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring engineers and engineering hiring managers (ML, MLOps, infrastructure) screening Goli Pavan Sai Krishna for an AI/ML or MLOps role. They arrive from a resume, LinkedIn, or GitHub link, and they read technically: they check whether a claim is backed by a benchmark, a test suite, a repo, or a running demo before they believe it. Confirmed by the user, 2026-09-14.

## Product Purpose

A personal portfolio that lets a technical reviewer decide, quickly and on evidence, whether this engineer is worth an interview. Success is a reviewer who opens a repo or demo, finds that the claim holds, and reaches out.

## Positioning

He ships end to end: takes an ML idea all the way through to deployed, operated infrastructure (Kubernetes, CI/CD pipelines, live demos), not a notebook. Confirmed by the user as the conclusion a visitor should leave with. The supporting truth that makes this credible rather than a slogan: each system measures its own claims (A/B benchmarks, test-gated CI, reported losses as well as wins).

## Operating Context

Reviewers skim first, then verify. The verification ritual is opening GitHub, a live demo, or a screenshot and checking a number. Desktop during work hours is the main reading scene; mobile arrives from LinkedIn and messaging links.

## Capabilities and Constraints

- Existing stack, kept: static HTML, Tailwind CSS v4 CLI, vanilla JS, deployed to Vercel (`vercel --prod --scope pavan-fac7`, `npm run build:dist`).
- All copy is driven from `content.json`; its structure must not be broken (user constraint). New optional fields are allowed; existing ones stay.
- Performance: motion must stay smooth and light; no heavy runtime.
- The MSME Marketplace demo runs on an EC2 instance that is stopped when idle; its catalogue uses seeded test data and stock photography.

## Brand Commitments

- Name: Goli Pavan Sai Krishna.
- User-pinned visual constraints (recorded 2026-09-14, replacing the earlier terminal brief, which the user rejected as robotic and cold; not expanded): visually striking and beautiful rather than clinical; warmth, depth and atmosphere; rich colour with mood and personality; soft light and shadow; expressive display typography; imagery given room to breathe; a composed, not tabulated, layout; choreographed motion where nothing simply appears. Avoid monospace as the dominant face, terminal or console framing, status-light or instrument-panel motifs, grid overlays and scanlines, and anything that reads as technical documentation. Original work. The plain, document-like earlier build was also rejected. Follow-up 2026-09-14 (user rejected the glassblowing build's molten-glass "ball" as unexplained): keep the warm amber/orange palette; the hero carries an interactive particle network; every part should be highlighted with visual effects: glowing cards (animated gradient borders, cursor-follow glow) on every block, animated section backgrounds, neon text highlights on headings, numbers and tags, and 3D tilt and hover on cards and screenshots.

## Evidence on Hand

- Four projects in `content.json`: Bill Auditor (492 tests, zero fabricated citations, 399-clause index, 328-line eval), Predictive Autoscaling (62% p99 cut, 479 to 183 ms, 15 A/B runs, 39 features, 22% of 975 decisions rejected), Customer Segmentation (540K+ transactions, 391K records, 4,334 customers, 0.78 ROC-AUC, 229 customers, £16.5K), MSME Marketplace (11 weaknesses, 133 tests, three services on k3s).
- Thirteen real screenshots in `images/`: nine for the first three projects, and four of MSME Marketplace captured 2026-09-14 from the app running locally on its own seed data (the demo catalogue's product photos are placeholder stock images).
- Live demos and GitHub repos for all four; email, GitHub, LinkedIn.
- Absent, never to be fabricated: employers, work history, testimonials, client names, metrics beyond those above.

## Product Principles

1. Evidence over assertion: every headline number points at something checkable.
2. End-to-end ownership is the story; each project should read as idea to running system.
3. Respect the reviewer's time: skimmable first, verifiable second.
4. Honest reporting, including what did not work, is a feature, not a weakness.

## Accessibility & Inclusion

Full `prefers-reduced-motion` support (user requirement), keyboard-operable lightbox and navigation, 44px touch targets, graceful mobile degradation, content visible without JavaScript-timed motion.
