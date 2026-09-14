---
name: Goli Pavan Sai Krishna
description: A warm AI lab lit from within; a live network behind the name, every block of work glowing with its evidence.
colors:
  soot: "#140D0A"
  umber: "#1B120E"
  umber-2: "#251812"
  glass: "#F7EBDD"
  glass-dim: "#D6C3B2"
  glass-mute: "#A88F7C"
  amber: "#FF9A3C"
  amber-hot: "#FFC877"
  white-hot: "#FFF3D6"
  ember: "#E0501F"
  cobalt: "#17318F"
  cobalt-ink: "#EEF2FF"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Avenir Next, Segoe UI, sans-serif"
    fontSize: "clamp(3.5rem, 10.2vw, 10rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.04em"
    fontVariation: "\"wdth\" 100, \"wght\" 700"
  headline:
    fontFamily: "Bricolage Grotesque, Avenir Next, Segoe UI, sans-serif"
    fontSize: "clamp(3rem, 8.4vw, 7.25rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Bricolage Grotesque, Avenir Next, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 4.1vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  subtitle:
    fontFamily: "Bricolage Grotesque, Avenir Next, Segoe UI, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.3rem, 2.3vw, 1.95rem)"
    fontWeight: 350
    lineHeight: 1.35
  body:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "0.98rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Bricolage Grotesque, Avenir Next, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
rounded:
  thumb: "0.7rem"
  lightbox-image: "0.9rem"
  frame: "1.25rem"
  card: "1.6rem"
  field-lip: "clamp(1.75rem, 4vw, 3.5rem)"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  section: "clamp(6rem, 12vw, 11rem)"
  card-pad: "clamp(1.25rem, 3.5vw, 3rem)"
  stack-gap: "1.25rem"
  container: "90rem"
components:
  button-molten:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.soot}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-molten-hover:
    backgroundColor: "{colors.white-hot}"
    textColor: "{colors.soot}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.glass}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-ghost-hover:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.soot}"
  button-soot:
    backgroundColor: "{colors.soot}"
    textColor: "{colors.glass}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 1.15rem"
    height: "2.75rem"
  tag:
    backgroundColor: "rgba(255, 154, 60, 0.04)"
    textColor: "{colors.glass-dim}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 0.95rem"
  tag-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.soot}"
  tag-cobalt:
    textColor: "{colors.cobalt-ink}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.15rem"
  glow-card:
    backgroundColor: "#1C130E"
    textColor: "{colors.glass}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  thumb:
    backgroundColor: "{colors.umber-2}"
    rounded: "{rounded.thumb}"
  frame:
    backgroundColor: "{colors.umber-2}"
    rounded: "{rounded.frame}"
  nav-toggle:
    backgroundColor: "rgba(247, 235, 221, 0.08)"
    textColor: "{colors.glass}"
    rounded: "50%"
    size: "2.9rem"
  lightbox-button:
    backgroundColor: "rgba(247, 235, 221, 0.08)"
    textColor: "{colors.glass}"
    rounded: "50%"
    size: "3rem"
---

# Design System: Goli Pavan Sai Krishna

## Overview

**Creative North Star: "The Lab Lit From Within"**

This is a warm AI lab at night: a soot-and-umber room with drifting amber light, where a live node network thinks behind the name and every block of evidence sits in a card with a light travelling around its edge. The origin is a glassblowing hot shop (the name cools from white heat, bullet marks are drawn threads of hot glass, screenshots get an annealed glass edge). The user then redirected it toward a living network and glowing, highlighted surfaces. What ships is both worlds: glass-shop heat as the material, network and neon glow as the effects.

The density is generous. Type runs at viewport scale, sections breathe (6 to 11rem of vertical padding), and project cards give the screenshot and the claims equal weight. Light does the work that lines and boxes would do in a cooler system. Headings glow and get a drawn bar underneath, figures glow amber, and tags are glass beads that turn molten on hover. The page changes colour twice, the way glass cools. First comes a cobalt field for the stack, then an amber field for contact, and each rises over the previous section with a rounded lip.

The user has explicitly rejected: monospace as the dominant face, terminal or console framing, status-light or instrument-panel motifs, grid overlays and scanlines, anything that reads as technical documentation, a plain document-like page, and an unexplained hero object (the earlier molten-glass orb).

**Key Characteristics:**
- Warm dark ground (soot, umber) with one hot accent family (amber, amber-hot, white-hot, ember).
- Two full-bleed colour fields (cobalt, amber) that rise over the page with a rounded top lip.
- An interactive 2D canvas node network across the hero, masked away from the text column.
- Glow cards on every block, with a rotating conic border light, a cursor spotlight, and optional tilt.
- Neon highlights: glowing section titles with a drawn gradient bar, glowing figures, bead tags, a glowing active nav link.
- Choreographed motion that is gated entirely behind `prefers-reduced-motion: no-preference`.

## Colors

The palette is a furnace-lit room: warm near-black grounds, cream "glass" text, one amber heat family, and a single cold counter-field of cobalt.

### Primary
- **Molten Amber** (amber): the one accent. Used for the primary pill button, tag and channel-arrow hover fills, the active lightbox dot, text selection, and every amber orb and glow. It also serves as the ground of the contact field.
- **Hot Amber** (amber-hot): lighter heat for text on dark grounds. Used for glowing figures, project categories, channel handles, the active nav link, the menu email, the lightbox counter, and the focus ring.
- **White Heat** (white-hot): the brightest point of any light. Used as the crest of every conic border light, the leading end of bullet threads and title bars, the cursor dot, and the molten button's hover wipe.
- **Ember** (ember): the cooling trailing end of every heat gradient (bullet threads, title bars, card border gradients, hero light falloff). Never used as a flat fill.

### Secondary
- **Night Cobalt** (cobalt): ground of the Tech Stack field, lifted by a lighter blue radial at the top-left. Cards in this field swap to a translucent cobalt interior with a pale blue spotlight.
- **Cobalt Ink** (cobalt-ink): text and titles inside the cobalt field.

### Neutral
- **Soot** (soot): the deepest ground. Used for the footer, the solid nav (at 92% alpha), the soot button, and text and title colour inside the amber field.
- **Umber** (umber): page ground and menu ground.
- **Umber Bench** (umber-2): the backing behind screenshot frames and thumbnails while images load.
- **Glass** (glass): primary text, display type, and the ghost button's hover wipe.
- **Glass Dim** (glass-dim): secondary text such as the tagline, bullets, tags, section notes, and nav links at rest.
- **Glass Mute** (glass-mute): tertiary italic text such as hero project categories, frame captions, the demo note, and the footer.

### Named Rules
**The One Heat Rule.** Every warm light on the page is one gradient family, running from white-hot through amber to ember. A new glow uses that family. It never introduces another hue.

**The Cooling Fields Rule.** The page changes ground only twice: umber, then cobalt (stack), then amber (close). Fields rise over the previous section with a rounded top lip (`field-lip`) and a 1px white inset highlight. They are not alternating stripes.

**The Inverted Field Rule.** Inside the amber field, titles and text turn soot, the title bar runs from soot to scorch brown, and the title glow becomes white-hot. Cards stay dark islands, so their contents keep glass text and the cursor keeps its light-ground styling off them.

## Typography

**Display Font:** Bricolage Grotesque (with Avenir Next, Segoe UI, sans-serif), a self-hosted variable face (wght 200–800, wdth 75–100%)
**Body Font:** Source Serif 4 (with Iowan Old Style, Georgia, serif), self-hosted with a true italic

**Character:** A tight, heavy grotesque shouts names and titles at near-poster scale, with negative tracking and sub-1 line-height. A literary serif carries every sentence, which keeps the lab humane rather than technical. Italic serif is the secondary voice for categories, notes and captions.

### Hierarchy
- **Display** (700, clamp(3.5rem, 10.2vw, 10rem), 0.86): the hero name only, set at 15.4vw below 768px. It carries a soft amber glow at rest and animates width and weight in the "cool" entrance.
- **Headline** (700, clamp(3rem, 8.4vw, 7.25rem), 0.9): section titles. The contact title is larger (clamp(3.75rem, 12vw, 11rem), 0.84). Menu links reuse this voice at clamp(2.75rem, 13vw, 4.5rem).
- **Title** (700, clamp(2.25rem, 4.1vw, 3.6rem), 0.98): project names. Channel labels run at clamp(1.6rem, 2.8vw, 2.4rem).
- **Subtitle** (600, clamp(1.5rem, 2.6vw, 2.25rem), 1.05): stack group names.
- **Lead** (serif 350, clamp(1.3rem, 2.3vw, 1.95rem), 1.35): hero tagline (34ch) and About bio (clamp(1.3rem, 2.15vw, 1.8rem), 1.5, 40ch). The project lead sits at 1.2rem and 52ch.
- **Body** (serif 400, 1.0625rem, 1.6): bullets at 62ch in glass-dim.
- **Caption** (serif italic, 0.98rem, 1.45): frame captions, demo notes, lightbox captions, all in glass-mute or glass-dim.
- **Label** (display 500–600, 0.875–1.02rem, line-height 1): buttons, tags, nav links, hero project names, the footer.

### Named Rules
**The Serif Speaks, The Grotesque Names Rule.** Sentences are always Source Serif 4, and names, titles and controls are always Bricolage Grotesque. No monospace anywhere.

**The Glowing Figure Rule.** Every number inside a project claim is wrapped as a figure. It renders in amber-hot at weight 600 with lining tabular numerals and a two-layer glow (`0 0 0.6em rgba(255,150,60,0.75), 0 0 0.18em rgba(255,196,120,0.6)`), and it counts up from zero when 60% visible. Figures are the neon of the prose, so they are never bolded without the glow.

## Layout

A single column of full-bleed sections inside a 90rem container with a fluid gutter (`gutter`). Vertical rhythm comes from generous section padding (`section`). The work section has a larger bottom padding (clamp(9rem, 16vw, 15rem)) so the cobalt field can overlap it.

- **Hero:** 100svh, as a grid with the name, tagline and CTAs vertically centred and a row of four project links pinned at the bottom above a 12% glass hairline (2 columns, 4 at ≥900px). The top padding is 6rem (5rem on mobile).
- **About:** at ≥960px a 5fr/7fr grid, where the side column (title plus education card) is sticky at top 7rem beside the bio card. Below 960px the side column dissolves so the order becomes title, bio card, education card.
- **Work:** the section head is title plus italic note (note aligned right at ≥960px). Each project is one glow card in a 7fr/5fr media/copy grid at ≥1024px, alternating sides (`is-flip`). The media column is sticky at top 7rem. Below 1024px the order is name, category, lead, then the screenshot, then bullets, tags and links.
- **Stack:** 1 column, then 2 at ≥700px, then a 6-column grid at ≥1100px where the first three cards span 2 and the rest span 3. A lone odd last card spans the full row.
- **Contact:** a 6/6 grid at ≥1024px, with the CTA column and a list of channel cards.
- **Breakpoints in use:** 700, 767/768, 900 (nav), 960, 1024, 1100px.

## Elevation & Depth

Depth is light, not stacking. Surfaces sit on soft, long, negative-spread drop shadows, and each one also carries an amber ambient glow. Hover responds with more glow and a small lift. Behind all of it, drifting radial orbs and the hero network give parallax depth, and a static warm film grain (7% opacity, fixed) covers everything.

### Shadow Vocabulary
- **Card rest** (`0 26px 56px -30px rgba(0,0,0,0.8), 0 0 46px -22px rgba(255,120,40,0.3)`): the default glow card.
- **Project card rest** (`0 30px 64px -30px rgba(0,0,0,0.85), 0 0 80px -26px rgba(255,120,40,0.45)`): project cards burn brightest.
- **About card rest** (`0 22px 48px -30px rgba(0,0,0,0.75), 0 0 32px -22px rgba(255,120,40,0.2)`): supporting cards sit quieter.
- **Card hover** (`0 34px 70px -30px rgba(0,0,0,0.85), 0 0 70px -18px rgba(255,130,45,0.5), 0 0 0 1px rgba(255,190,120,0.18)`).
- **Frame rest** (`0 34px 64px -34px rgba(0,0,0,0.85), 0 14px 26px -14px rgba(0,0,0,0.6)`), plus a blurred amber pool under the frame. On hover the frame lifts 10px and the pool brightens.
- **Glass edge** (`inset 0 0 0 1px rgba(255,190,120,0.3), inset 0 1px 0 rgba(255,238,215,0.4)`): the warm 1px rim and top highlight on every screenshot. It adds no inner wash.
- **Molten button** (`inset 0 1px 0 rgba(255,246,225,0.55), 0 14px 30px -14px rgba(255,120,40,0.6)`).
- **Field lip** (`0 -40px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.24)`): colour fields cast upward over the section they cover.

### Named Rules
**The Hierarchy of Light Rule.** Glow strength follows importance: project cards are brightest, stack and contact cards take the default, and About cards are quietest. A new card takes the default glow unless it is primary evidence.

**The Glow Plus Shadow Rule.** Every raised surface pairs a dark drop shadow (for depth) with an amber ambient (for heat). A shadow without the warm layer reads as a foreign component.

## Shapes

Soft, generous curves throughout, with no sharp corners on any surface. Cards use a 1.6rem radius and screenshot frames 1.25rem. Thumbnails are 0.7rem and lightbox images 0.9rem. Buttons, tags and the skip link are full pills. Icon buttons (nav toggle, lightbox controls, channel arrow) are circles. Colour fields have only their top corners rounded, to the fluid lip radius. The card border is not a CSS border: it is the 1.5px of card gradient left visible around an inset interior. Marks are rounded bars: bullet threads (0.95rem × 3px) and the title bar (clamp(4rem, 9vw, 7.5rem) × 5px).

## Components

### Glow Card (signature)
Every content block (project, About bio, education, stack group, contact channel) is a glow card.
- **Border:** a 135° gradient (amber 0.5 at the corners down to 0.1 through the middle, ending in ember 0.45) shows 1.5px around the interior.
- **Travelling light:** a square conic gradient (transparent for 235°, then amber, a white-hot crest and ember) sized to the card diagonal plus 60px, measured by ResizeObserver. It rotates once every 8s, linear. Its `animation-play-state` runs only while the card is within 10% of the viewport. It is hidden below 768px and under reduced motion, where the static gradient border remains.
- **Interior:** a dark 165° umber gradient (#2A1B13 to #1A110D). A 560px amber radial spotlight follows the cursor through `--sx`/`--sy`, on fine pointers only.
- **Tilt:** opt-in with `data-tilt="N"` (maximum degrees). Stack cards use 7 and linked channel cards 6. Project and About cards do not tilt, because their screenshot frames tilt instead. On hover the card rises 6px under perspective(1100px). Tilt is disabled when motion is reduced or the pointer is coarse.
- **Hover:** a stronger glow, a 1px warm ring, and the card's title (project name, stack name, channel label) gains `text-shadow: 0 0 0.5em rgba(255,150,60,0.55)`.
- **Field variants:** in cobalt, the border mixes warm and pale blue and the interior is translucent cobalt with a blue spotlight. In amber, the card stays a dark soot island with a white-hot ambient glow.

### Neon Highlights
- **Section title:** an amber glow at rest (`0 0 0.4em rgba(255,140,50,0.3)`), which turns blue in cobalt and white-hot in amber. A 5px rounded bar sits below it, running white-hot, amber, ember and glowing (soot to scorch in the amber field). The bar draws from scaleX(0) over 1.3s with a 0.45s delay once the title reveals.
- **Figures:** see The Glowing Figure Rule.
- **Nav:** the active section link turns amber-hot with a 14px amber text glow and a full underline.
- **Tags:** hover glow, described under Chips.
- **Card titles:** hover glow, described under Glow Card.

### Buttons
- **Shape:** full pill (999px), 3.25rem tall (small variant 2.75rem), Bricolage 600 at 1rem, with an optional 1.1rem trailing icon.
- **Molten (primary):** an amber fill with soot text and the molten shadow.
- **Ghost:** transparent with a 30% glass inset ring and glass text.
- **Soot:** a soot fill with glass text, used on the amber field.
- **Hover (hover-capable devices):** a fill wipes up from below (white-hot on molten, glass on ghost, #3A2419 on soot) over 0.55s. The button lifts 2px, the icon nudges diagonally (a down icon drops 3px), and a ghost button's text turns soot. Under reduced motion there is no wipe and no lift.
- **Text link:** a 28% currentColor hairline underline, over which a 1.5px full-strength line draws left to right in 0.65s.

### Chips (Tags)
- **Style:** glass beads. A pill in Bricolage 500 at 0.875rem, glass-dim text, a faint cream-to-amber vertical gradient, a 1px top highlight, a 16% warm inset ring and a small drop shadow. Tags in the cobalt field are larger (1rem, 0.72rem × 1.15rem) with cobalt-ink text and white glass.
- **Hover:** they turn molten, with an amber fill, soot text, a 4px rise at 1.04 scale, and a 22px amber halo.
- **Arrival:** they bead in one at a time (38ms stagger, rising from 14px at 0.9 scale with blur).

### Cards / Containers
- **Screenshot frame:** a 1.25rem radius and umber-2 backing, with the glass edge inset. It tilts up to ±2.4°/3.2° toward the pointer, the image parallaxes inside at scale 1.03, and a blurred amber pool sits beneath. On hover it lifts 10px and a separate 1.5px conic rim light rotates every 2.6s. The whole frame is a button that opens the lightbox with the cursor in "View" state.
- **Thumbnails:** a 4-column strip, 0.7rem radius, 16:10 top-cropped. At rest they sit at 0.72 opacity. On hover they reach full opacity, rise 4px and gain an amber-hot ring and glow. They are fully opaque on hover:none devices and on focus.
- **Colour field:** described under The Cooling Fields Rule. While entering the viewport it scales from 0.94 to 1 with scroll.

### Navigation
- **Bar:** fixed, transparent over the hero. Past 24px of scroll it becomes solid soot at 92% with a shadow. Scrolling down past 240px tucks it away and scrolling up brings it back.
- **Desktop (≥900px):** the name mark (Bricolage 700) on the left, then section links in Bricolage 500 glass-dim with a draw-on-hover underline, then a small ghost "Get in touch" pill.
- **Mobile:** a 2.9rem glass circle toggle whose two lines rotate into an X. It opens a full-screen umber menu with an amber radial in the bottom-right, giant Bricolage 700 links, and the amber-hot email at the bottom.

### Hero Network (signature)
- **Canvas:** a 2D canvas spanning the hero behind the type, with DPR capped at 1.5. Nodes are drawn with one pre-rendered amber-to-white glow sprite rather than shadowBlur.
- **Density:** (area / 12000) nodes clamped to 26–105 on desktop, and (area / 7000) clamped to 45–70 below 768px. Links draw within 150px, with alpha scaled by distance at base 0.24 (0.36 on mobile).
- **Reach:** within 210px of the pointer, nodes are pulled up to 26px toward it, brighten and grow, and warm links fan out to a glowing spark. On coarse pointers a roaming attractor traces slow sine paths through the open space and drives the same effect.
- **Signals:** pulses travel along links, capped at 9 on desktop and 4 on mobile. A click or tap bursts nearby nodes outward, lights them, and fires six pulses.
- **Mask:** on desktop a left-to-right fade holds the network at 12–18% behind the text column and full strength from 58%. On mobile a vertical mask keeps it full at the top, 16% through the name, tagline and CTAs, and full again from 72%.
- **Scroll:** the canvas parallaxes (0.3× scroll plus pointer offset) and blurs up to 5px on ≥900px screens as the visitor leaves the hero. The loop stops when the hero is offscreen or the tab is hidden. Under reduced motion one static frame is drawn.

### Section Orbs
Each section gets 2–9 orbs (one per ~850px of height), alternating left and right. They are 44vmax amber radials (every third orb 36vmax and paler) drifting over 18–32s, ease-in-out, alternating. Orbs are cobalt and amber in the cobalt field and white-hot and ember in the amber field. They animate only while their section is in view. Their layer has a vertical edge-fade mask (transparent, then full from 12% to 88%, then transparent) so no orb is cut at a seam. Under reduced motion they are static.

### Lightbox
A fixed dialog at 95% near-black with a faint amber centre radial. The top bar holds the project title and a close button, and the centred image is limited to viewport height minus 13rem. Prev and next circle buttons are overlaid on the image edges. The italic caption carries an amber-hot count. Numbered dots (44px targets) mark the active shot with an amber pill stretched 2.4×. It closes on X, backdrop or Escape, arrow keys page through, focus is trapped, and focus returns to the trigger.

### Cursor
Shown on fine pointers with motion allowed, and it replaces the native cursor. It is an 8px white-hot spark plus a 44px ring (amber-hot at 65%) that trails at 0.2 easing. Over links and tags the ring grows 1.45× with an amber tint. Over screenshots it grows 2.1×, fills amber and shows "View". On the amber field, outside cards, it turns soot.

### Motion Grammar
- **Easing:** `ease-out` cubic-bezier(0.16, 1, 0.3, 1) for nearly everything. Durations are long (0.5–1.9s), so things settle rather than snap.
- **Hero entrance:** the light ignites from 0.55 scale (2.2s). The name "cools" letter by letter (48ms stagger), moving from white-hot at 200 weight and 75% width through amber-hot to glass at 700 and 100%. Then come the tagline, the CTAs and the project row, each lifting 26px from blur. It waits for fonts, for 900ms at most.
- **Reveals:** blocks rise 30px from 8px blur, with sibling stagger of 80ms capped at 480ms. Title words rise through per-word masks from 112% with a 4° tilt, warm-coloured (white-hot in the amber field). The mask lifts after 1.9s so glow can spread. Screenshots open from a 16%/12% inset clip over 1.5s as the image settles from 1.3 scale.
- **Reduced motion:** without `html.motion` there are no entrances, drift, tilt, parallax, cursor, count-ups, card rotation or frame lift. Content still fades in at opacity 0.5s if JS runs, and everything is visible without JS. Hover keeps colour, glow and shadow changes only.

## Do's and Don'ts

### Do:
- **Do** put every new content block in a glow card, and choose its glow level by The Hierarchy of Light Rule.
- **Do** build every warm light from the white-hot, amber, ember family, and pair it with a dark drop shadow.
- **Do** wrap every number in a claim as a glowing, counting figure.
- **Do** pause any perpetual animation (card rotation, orbs, network) when its element is offscreen, and remove it under `prefers-reduced-motion`.
- **Do** mask decorative light (network, orbs) away from text and section edges, so type always sits in clean air.
- **Do** gate cursor-driven effects (spotlight, tilt, reach, custom cursor) to `(hover: hover) and (pointer: fine)`, and give coarse pointers a self-driven or static equivalent.
- **Do** keep touch targets at 44px or more (lightbox dots 2.75rem, toggles 2.9–3rem).

### Don't:
- **Don't** use monospace as a dominant face, terminal or console framing, status lights, instrument-panel motifs, grid overlays or scanlines.
- **Don't** set sentences in Bricolage Grotesque or names and titles in Source Serif 4.
- **Don't** introduce a third colour field or a non-amber accent hue on the umber ground.
- **Don't** place an unexplained decorative object in the hero. The network is the hero's only object.
- **Don't** add an inner colour wash over screenshots; the glass edge is only the 1px warm rim and top highlight.
- **Don't** run the conic card light on screens below 768px.
