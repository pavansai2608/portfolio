/* =============================================================
   Portfolio renderer
   All copy lives in content.json — this file only maps it to DOM.
   Edit content.json; you should never need to touch this file.
   ============================================================= */
(() => {
  'use strict';

  /* ---------- helpers ---------- */

  const $ = (sel) => document.querySelector(sel);

  /** Escape untrusted-ish text before injecting as HTML. */
  const esc = (v) =>
    String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  /** Set textContent if the node exists. */
  const setText = (sel, value) => {
    const el = $(sel);
    if (el) el.textContent = value ?? '';
  };

  /** Set innerHTML if the node exists. */
  const setHTML = (sel, html) => {
    const el = $(sel);
    if (el) el.innerHTML = html;
  };

  /** Strip protocol/trailing slash for display. */
  const prettyUrl = (url) =>
    String(url ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');

  /* ---------- icons (inline SVG — never emoji) ---------- */

  const ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-full w-full"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-full w-full"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-full w-full"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m2.5 6.5 8.4 6.1a2 2 0 0 0 2.2 0l8.4-6.1"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></svg>`,
    expand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><path d="M9 3H3v6"/><path d="M3 3l7 7"/><path d="M15 21h6v-6"/><path d="M21 21l-7-7"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-5 w-5"><path d="M15 18l-6-6 6-6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-5 w-5"><path d="M9 6l6 6-6 6"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true" class="h-5 w-5"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><path d="m8 17-5-5 5-5M16 7l5 5-5 5"/></svg>`
  };

  /* ---------- section renderers ---------- */

  function renderMeta(meta) {
    if (!meta) return;
    if (meta.title) document.title = meta.title;
    const d = document.querySelector('meta[name="description"]');
    if (d && meta.description) d.setAttribute('content', meta.description);
  }

  function renderNav(items = []) {
    const desktop = items
      .map(
        (i) => `<li><a class="nav-link" href="${esc(i.href)}" data-nav>${esc(i.label)}</a></li>`
      )
      .join('');
    setHTML('#nav-links', desktop);

    const mobile = items
      .map(
        (i) => `<li>
          <a href="${esc(i.href)}"
             class="flex min-h-[48px] items-center border-b border-ink-800 text-[0.9375rem] font-medium text-bone-200 no-underline transition-colors duration-200 hover:text-amber-400"
             data-mobile-nav>${esc(i.label)}</a>
        </li>`
      )
      .join('');
    setHTML(
      '#mobile-nav-links',
      mobile +
        `<li class="pt-4 pb-2">
           <a href="#contact" class="btn btn-primary w-full" data-mobile-nav>Hire me</a>
         </li>`
    );
  }

  function renderHero(hero) {
    if (!hero) return;

    setHTML(
      '#hero-badge',
      `<span class="pulse-dot" aria-hidden="true"></span>
       <span class="font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-mint-300 uppercase">${esc(
         hero.badge?.text
       )}</span>
       <span class="hidden text-xs text-bone-600 sm:inline">·</span>
       <span class="hidden text-xs text-bone-400 sm:inline">${esc(hero.badge?.detail)}</span>`
    );

    setText('#hero-name', hero.name);
    setText('#hero-tagline', hero.tagline);
    setText('#hero-intro', hero.intro);

    setHTML(
      '#hero-ctas',
      (hero.ctas || [])
        .map((c) => {
          const cls = c.style === 'primary' ? 'btn btn-primary' : 'btn btn-ghost';
          const icon = c.style === 'primary' ? ICONS.arrowRight : '';
          return `<a class="${cls}" href="${esc(c.href)}">${esc(c.label)}${icon}</a>`;
        })
        .join('')
    );

  }

  function renderAbout(about) {
    if (!about) return;
    setText('#about-kicker', about.kicker);
    setText('#about-heading', about.heading);
    setText('#about-bio', about.bio);

    const edu = about.education || {};
    setText('#edu-label', edu.label);
    setHTML(
      '#edu-rows',
      (edu.rows || [])
        .map(
          (r) => `<div class="flex items-baseline justify-between gap-6 px-5 py-3.5">
            <dt class="font-mono text-[0.6875rem] tracking-[0.1em] text-bone-600 uppercase">${esc(
              r.key
            )}</dt>
            <dd class="text-right text-sm font-medium text-bone-50">${esc(r.value)}</dd>
          </div>`
        )
        .join('')
    );
  }

  /** Main screenshot plus a thumbnail strip; any of them opens the lightbox. */
  function shotPanel(p) {
    const shots = p.images || [];
    if (!shots.length) return '';
    const first = shots[0];

    const main = `<button type="button" class="shot-frame group"
        data-lightbox="${esc(p.id)}" data-index="0"
        aria-label="Open screenshot 1 of ${shots.length} for ${esc(p.name)} in a larger view">
      <img src="${esc(first.src)}" alt="${esc(first.alt)}"
           loading="lazy" decoding="async"
           width="${esc(first.w || 1600)}" height="${esc(first.h || 900)}"
           style="aspect-ratio:${esc(first.w || 1600)}/${esc(first.h || 900)}" />
      <span class="shot-veil">
        <span class="shot-hint">${ICONS.expand}Click to enlarge</span>
        <span class="font-mono text-[0.625rem] tracking-[0.14em] text-bone-400 uppercase">${esc(
          p.index
        )}</span>
      </span>
    </button>`;

    // Only worth a strip when there is more than one shot to choose from.
    const strip =
      shots.length > 1
        ? `<ul class="mt-3 flex gap-2" role="list">
            ${shots
              .map(
                (sh, n) => `<li class="flex aspect-[16/10] flex-1 basis-0">
                  <button type="button" class="thumb"
                          data-lightbox="${esc(p.id)}" data-index="${n}"
                          aria-label="Open screenshot ${n + 1} of ${shots.length} for ${esc(
                  p.name
                )} in a larger view">
                    <img src="${esc(sh.src)}" alt="" loading="lazy" decoding="async" />
                  </button>
                </li>`
              )
              .join('')}
          </ul>`
        : '';

    return `<div>${main}${strip}</div>`;
  }

  function projectLinks(p) {
    const gh = p.links?.github;
    const demo = p.links?.demo;
    const out = [];
    if (gh) {
      out.push(
        `<a class="btn btn-ghost !min-h-[44px] !px-4 !text-sm" href="${esc(
          gh
        )}" target="_blank" rel="noopener noreferrer">
           <span class="h-4 w-4">${ICONS.github}</span>Source<span class="sr-only"> code for ${esc(
          p.name
        )} on GitHub</span>
         </a>`
      );
    }
    if (demo) {
      out.push(
        `<a class="btn btn-primary !min-h-[44px] !px-4 !text-sm" href="${esc(
          demo
        )}" target="_blank" rel="noopener noreferrer">
           Live demo<span class="sr-only"> of ${esc(p.name)}</span>${ICONS.external}
         </a>`
      );
    }
    return out.join('');
  }

  function renderWork(work) {
    if (!work) return;
    setText('#work-kicker', work.kicker);
    setText('#work-heading', work.heading);
    setText('#work-note', work.note);

    setHTML(
      '#projects',
      (work.projects || [])
        .map((p, i) => {
          const flip = i % 2 === 1;
          const textOrder = flip ? 'min-w-0 lg:order-2' : 'min-w-0 lg:order-1';
          const shotOrder = flip ? 'min-w-0 lg:order-1' : 'min-w-0 lg:order-2';

          return `<article class="reveal surface spotlight grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10" id="${esc(
            p.id
          )}">
            <div class="${textOrder}">
              <div class="mb-5 flex items-center gap-3">
                <span class="font-mono text-sm font-semibold text-amber-400">${esc(p.index)}</span>
                <span class="h-px w-8 bg-ink-600"></span>
                <span class="label !text-bone-400">${esc(p.category)}</span>
              </div>

              <h3 class="mb-4 text-2xl sm:text-3xl">${esc(p.name)}</h3>

              <p class="mb-5 border-l-2 border-amber-500/60 pl-4 text-[1.0625rem] leading-relaxed font-medium text-bone-50">${esc(
                p.headline
              )}</p>

              <p class="mb-6 max-w-[60ch] text-[0.9375rem] leading-[1.75] text-bone-400">${esc(
                p.description
              )}</p>

              <div class="mb-7">
                <p class="label mb-3">Built with</p>
                <ul class="flex flex-wrap gap-2" role="list">
                  ${(p.tech || []).map((t) => `<li class="chip">${esc(t)}</li>`).join('')}
                </ul>
              </div>

              <div class="flex flex-wrap gap-3">${projectLinks(p)}</div>
            </div>

            <div class="${shotOrder}">${shotPanel(p)}</div>
          </article>`;
        })
        .join('')
    );
  }

  function renderStack(stack) {
    if (!stack) return;
    setText('#stack-kicker', stack.kicker);
    setText('#stack-heading', stack.heading);

    setHTML(
      '#stack-groups',
      (stack.groups || [])
        .map(
          (g, i) => `<div class="reveal grid gap-4 border-b border-ink-800 py-7 first:pt-0 last:border-b-0 sm:grid-cols-[190px_1fr] sm:gap-8"
                          style="--reveal-delay:${i * 70}ms">
            <div class="flex items-baseline gap-3">
              <span class="font-mono text-xs text-amber-500 tabular-nums">${String(i + 1).padStart(
                2,
                '0'
              )}</span>
              <h3 class="text-base font-semibold text-bone-50">${esc(g.name)}</h3>
            </div>
            <ul class="flex flex-wrap gap-2" role="list">
              ${(g.items || []).map((it) => `<li class="chip">${esc(it)}</li>`).join('')}
            </ul>
          </div>`
        )
        .join('')
    );
  }

  function renderContact(contact) {
    if (!contact) return;
    setText('#contact-kicker', contact.kicker);
    setText('#contact-heading', contact.heading);
    setText('#contact-pitch', contact.pitch);

    setHTML(
      '#contact-cta',
      `<a class="btn btn-primary" href="mailto:${esc(contact.email)}">
         <span class="h-[18px] w-[18px]">${ICONS.mail}</span>${esc(contact.emailCta)}
       </a>
       <a class="btn btn-ghost !font-mono !text-[0.8125rem]" href="mailto:${esc(contact.email)}">${esc(
        contact.email
      )}</a>`
    );

    setHTML(
      '#contact-links',
      (contact.links || [])
        .map((l) => {
          const icon = ICONS[l.icon] || ICONS.external;

          if (!l.available || !l.href) {
            return `<li>
              <div class="flex items-center gap-4 rounded-xl border border-dashed border-ink-600 px-5 py-4">
                <span class="h-5 w-5 shrink-0 text-bone-600">${icon}</span>
                <span class="flex-1">
                  <span class="block text-sm font-semibold text-bone-400">${esc(l.label)}</span>
                  <span class="block font-mono text-xs text-bone-600">${esc(l.handle)}</span>
                </span>
              </div>
            </li>`;
          }

          return `<li>
            <a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer"
               class="group spotlight flex items-center gap-4 rounded-xl border border-ink-700 bg-ink-900 px-5 py-4 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-600 hover:bg-ink-850">
              <span class="h-5 w-5 shrink-0 text-bone-200 transition-colors duration-200 group-hover:text-amber-400">${icon}</span>
              <span class="flex-1">
                <span class="block text-sm font-semibold text-bone-50">${esc(l.label)}</span>
                <span class="block font-mono text-xs text-bone-600">${esc(l.handle)}</span>
              </span>
              <span class="text-bone-600 transition-colors duration-200 group-hover:text-amber-400">${
                ICONS.external
              }</span>
            </a>
          </li>`;
        })
        .join('')
    );
  }

  function renderFooter(footer) {
    if (!footer) return;
    setText('#footer-copy', `© ${new Date().getFullYear()} ${footer.copyright}`);
    setText('#footer-note', footer.note);
  }

  /* ---------- behaviour ---------- */

  /**
   * Screenshot lightbox.
   * Built once, reused for every gallery. Traps focus while open,
   * restores it on close, and supports Esc / arrow keys.
   */
  function initLightbox(projects) {
    const galleries = {};
    projects.forEach((p) => { galleries[p.id] = p.images || []; });

    const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
    if (!triggers.length) return;

    const el = document.createElement('div');
    el.className = 'lightbox hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Project screenshot viewer');
    el.innerHTML = `
      <div class="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <p id="lb-title" class="label !text-bone-200"></p>
        <button type="button" class="lb-btn" data-lb="close" aria-label="Close viewer">${ICONS.close}</button>
      </div>
      <div class="relative flex flex-1 items-center justify-center px-3 sm:px-8">
        <button type="button" class="lb-btn absolute top-1/2 left-2 z-10 -translate-y-1/2 sm:left-5" data-lb="prev" aria-label="Previous screenshot">${ICONS.chevronLeft}</button>
        <figure class="lightbox-figure">
          <img id="lb-img" src="" alt="" />
          <figcaption id="lb-cap" class="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-bone-400"></figcaption>
        </figure>
        <button type="button" class="lb-btn absolute top-1/2 right-2 z-10 -translate-y-1/2 sm:right-5" data-lb="next" aria-label="Next screenshot">${ICONS.chevronRight}</button>
      </div>
      <div class="flex flex-col items-center gap-3 px-5 py-5">
        <ul id="lb-dots" class="flex flex-wrap items-center justify-center gap-2" role="list"></ul>
        <p class="hidden font-mono text-[0.6875rem] tracking-[0.12em] text-bone-600 uppercase sm:block">Esc to close · \u2190 \u2192 to browse</p>
      </div>`;
    document.body.appendChild(el);

    const img   = el.querySelector('#lb-img');
    const cap   = el.querySelector('#lb-cap');
    const dots  = el.querySelector('#lb-dots');
    const title = el.querySelector('#lb-title');
    const prev  = el.querySelector('[data-lb="prev"]');
    const next  = el.querySelector('[data-lb="next"]');
    const closeBtn = el.querySelector('[data-lb="close"]');

    let shots = [];
    let i = 0;
    let lastFocused = null;

    /** Numbered indicators — also clickable, so they double as navigation. */
    const buildDots = () => {
      dots.innerHTML = shots
        .map(
          (_, n) => `<li><button type="button" class="lb-dot" data-lb-dot="${n}"
                       aria-label="Show screenshot ${n + 1} of ${shots.length}">${n + 1}</button></li>`
        )
        .join('');
      dots.hidden = shots.length < 2;
      dots.querySelectorAll('[data-lb-dot]').forEach((b) =>
        b.addEventListener('click', () => { i = Number(b.dataset.lbDot); paint(); })
      );
    };

    const paint = () => {
      const shot = shots[i];
      if (!shot) return;
      if (shot.w && shot.h) {
        img.width = shot.w;
        img.height = shot.h;
        img.style.aspectRatio = `${shot.w}/${shot.h}`;
      }
      img.src = shot.src;
      img.alt = shot.alt || '';
      cap.textContent = shot.alt || '';
      dots.querySelectorAll('[data-lb-dot]').forEach((b) =>
        b.setAttribute('aria-current', Number(b.dataset.lbDot) === i ? 'true' : 'false')
      );
      prev.disabled = i === 0;
      next.disabled = i === shots.length - 1;
      prev.hidden = shots.length < 2;
      next.hidden = shots.length < 2;
    };

    const open = (id, index, name, trigger) => {
      shots = galleries[id] || [];
      if (!shots.length) return;
      i = Math.min(Math.max(index, 0), shots.length - 1);
      // Track the trigger explicitly; activeElement is unreliable for
      // programmatic clicks and for mouse clicks in some browsers.
      lastFocused = trigger || document.activeElement;
      title.textContent = name || '';
      buildDots();
      paint();
      el.classList.remove('hidden');
      document.body.classList.add('lb-open');
      requestAnimationFrame(() => el.classList.add('is-open'));
      closeBtn.focus();
    };

    const close = () => {
      el.classList.remove('is-open');
      document.body.classList.remove('lb-open');
      window.setTimeout(() => {
        el.classList.add('hidden');
        img.src = '';
      }, 240);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    const step = (d) => {
      const n = i + d;
      if (n < 0 || n >= shots.length) return;
      i = n;
      paint();
    };

    triggers.forEach((t) =>
      t.addEventListener('click', () => {
        const card = t.closest('article');
        const name = card ? (card.querySelector('h3')?.textContent || '') : '';
        open(t.dataset.lightbox, Number(t.dataset.index || 0), name, t);
      })
    );

    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    closeBtn.addEventListener('click', close);
    el.addEventListener('click', (e) => { if (e.target === el) close(); });

    document.addEventListener('keydown', (e) => {
      if (el.classList.contains('hidden')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const f = [closeBtn, prev, next, ...dots.querySelectorAll('.lb-dot')].filter(
          (b) => !b.hidden && !b.disabled
        );
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /** Cursor-following glow on cards. Pointer-only, skipped for touch. */
  function initSpotlight() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.spotlight').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Opt in to the hidden start state only now that JS is confirmed running.
    document.documentElement.classList.add('js');

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    items.forEach((el) => io.observe(el));

    // Failsafe — if anything is still hidden after 3s, show it.
    window.setTimeout(() => {
      items.forEach((el) => el.classList.add('is-visible'));
    }, 3000);
  }

  function initHeaderAndSpy() {
    const header = $('#site-header');
    const progress = $('#scroll-progress');
    const links = Array.from(document.querySelectorAll('[data-nav]'));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      // Header gains a surface once scrolled off the top.
      if (header) {
        const solid = y > 12;
        header.classList.toggle('bg-ink-950/85', solid);
        header.classList.toggle('backdrop-blur-xl', solid);
        header.classList.toggle('border-ink-800', solid);
        header.classList.toggle('border-transparent', !solid);
      }

      // Scroll progress bar.
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
      }

      // Scroll spy: last section whose top has passed the offset.
      let activeId = null;
      const offset = y + window.innerHeight * 0.4;
      sections.forEach((s) => {
        if (s.offsetTop <= offset) activeId = s.id;
      });

      // At the very bottom the final section can never clear the offset,
      // so claim it explicitly once the page is scrolled out.
      const atBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - 8;
      if (atBottom && sections.length) activeId = sections[sections.length - 1].id;
      links.forEach((a) =>
        a.setAttribute('aria-current', a.getAttribute('href') === `#${activeId}` ? 'true' : 'false')
      );

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  function initMobileMenu() {
    const toggle = $('#nav-toggle');
    const menu = $('#mobile-menu');
    const open = $('#icon-open');
    const close = $('#icon-close');
    if (!toggle || !menu) return;

    const setOpen = (isOpen) => {
      menu.classList.toggle('hidden', !isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      open?.classList.toggle('hidden', isOpen);
      close?.classList.toggle('hidden', !isOpen);
    };

    toggle.addEventListener('click', () =>
      setOpen(toggle.getAttribute('aria-expanded') !== 'true')
    );

    document
      .querySelectorAll('[data-mobile-nav]')
      .forEach((a) => a.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  /* ---------- boot ---------- */

  async function boot() {
    let content;
    try {
      const res = await fetch('content.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      content = await res.json();
    } catch (err) {
      // Most common cause: opened via file:// where fetch is blocked.
      console.error('Could not load content.json —', err);
      const notice = $('#load-error');
      if (notice) {
        notice.classList.remove('hidden');
        notice.classList.add('flex');
      }
      return;
    }

    renderMeta(content.meta);
    renderNav(content.nav);
    renderHero(content.hero);
    renderAbout(content.about);
    renderWork(content.work);
    renderStack(content.stack);
    renderContact(content.contact);
    renderFooter(content.footer);

    // Wire behaviour only after content exists in the DOM.
    initReveal();
    initHeaderAndSpy();
    initMobileMenu();
    initLightbox(content.work?.projects || []);
    initSpotlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
