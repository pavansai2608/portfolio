/* =============================================================
   Portfolio renderer — the hot shop
   All copy lives in content.json; this file maps it to the DOM
   and runs the motion. Content stays visible if motion never runs.
   ============================================================= */
(() => {
  'use strict';

  /* ---------- helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (v) =>
    String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const setText = (sel, value) => {
    const el = $(sel);
    if (el) el.textContent = value ?? '';
  };

  const setHTML = (sel, html) => {
    const el = $(sel);
    if (el) el.innerHTML = html;
  };

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const MOTION = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- icons (authored SVG, one stroke weight) ---------- */

  const svg = (body, cls = '') =>
    `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

  const ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>`,
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>'),
    arrow: svg('<path d="M7 17 17 7M9 7h8v8"/>'),
    down: svg('<path d="M12 5v14M6 13l6 6 6-6"/>', 'icon-down'),
    left: svg('<path d="M15 5 8 12l7 7"/>'),
    right: svg('<path d="m9 5 7 7-7 7"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  };

  /* ---------- numbers: find, wrap, count ---------- */

  // A figure inside prose: optional currency, digits with commas/decimals,
  // optional K/M magnitude and %, x or + suffix. Not preceded by a letter or
  // digit, so "p99" and "k3s" are left alone.
  const NUM_RE = /(?<![A-Za-z0-9.])(£|\$|₹)?(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(K|M)?(%|x|\+)?(?![A-Za-z0-9])/g;

  const wrapNumbers = (text) => {
    const src = String(text ?? '');
    let out = '';
    let last = 0;
    src.replace(NUM_RE, (m, cur, int, dec, mag, suf, idx) => {
      out += esc(src.slice(last, idx));
      out += `<span class="num" data-count>${esc(m)}</span>`;
      last = idx + m.length;
      return m;
    });
    return out + esc(src.slice(last));
  };

  /** Parse "540K+" into parts so a count can re-render the same format. */
  const parseReading = (str) => {
    const m = /^(\D*?)(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(.*)$/.exec(String(str).trim());
    if (!m) return null;
    const [, pre, int, dec = '', post] = m;
    return {
      pre, post,
      target: parseFloat(int.replace(/,/g, '') + dec),
      decimals: dec ? dec.length - 1 : 0,
      commas: int.includes(','),
    };
  };

  const formatReading = (r, v) => {
    let s = v.toFixed(r.decimals);
    if (r.commas) {
      const [i, d] = s.split('.');
      s = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : '');
    }
    return r.pre + s + r.post;
  };

  const prettyUrl = (url) => String(url ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const shortName = (name) => String(name ?? '').split(' — ')[0];

  /* ---------- renderers ---------- */

  function renderMeta(meta) {
    if (!meta) return;
    if (meta.title) document.title = meta.title;
    const d = $('meta[name="description"]');
    if (d && meta.description) d.setAttribute('content', meta.description);
  }

  function renderNav(nav, hero, contact) {
    const items = nav || [];
    setHTML('#nav-links', items
      .map((i) => `<li><a class="link-draw" href="${esc(i.href)}" data-nav>${esc(i.label)}</a></li>`)
      .join(''));
    setHTML('#menu-links', items
      .map((i) => `<li><a href="${esc(i.href)}" data-menu-link>${esc(i.label)}</a></li>`)
      .join(''));
    if (hero?.name) setText('#nav-mark', hero.name);
    if (contact?.heading) setText('#nav-cta', contact.heading);
    const mail = $('#menu-email');
    if (mail && contact?.email) {
      mail.href = `mailto:${contact.email}`;
      mail.textContent = contact.email;
    }
  }

  /** The name, split into lines, words and characters for the cooling. */
  function renderHero(hero) {
    if (!hero) return;
    const h1 = $('#hero-name');
    const words = String(hero.name || '').trim().split(/\s+/);
    const cut = Math.ceil(words.length / 2);
    const lines = [words.slice(0, cut), words.slice(cut)].filter((l) => l.length);
    let n = 0;
    h1.setAttribute('aria-label', hero.name || '');
    h1.innerHTML = lines
      .map((line) => `<span class="hl" aria-hidden="true">${line
        .map((word) => `<span class="hw">${[...word]
          .map((c) => `<span class="ch" style="--i:${n++}">${esc(c)}</span>`)
          .join('')}</span>`)
        .join(' ')}</span>`)
      .join('');

    setText('#hero-tagline', hero.tagline);

    setHTML('#hero-ctas', (hero.ctas || [])
      .map((c, i) => c.style === 'primary'
        ? `<a class="btn btn-molten" href="${esc(c.href)}" style="--i:${i}">${esc(c.label)}${ICONS.down}</a>`
        : `<a class="link-draw" href="${esc(c.href)}" style="--i:${i}">${esc(c.label)}</a>`)
      .join(''));
  }

  function renderHeroPieces(projects) {
    setHTML('#hero-pieces', (projects || [])
      .map((p, i) => `<li><a class="hp" href="#${esc(p.id)}" style="--i:${i}">
          <span class="hp-name"><span>${esc(shortName(p.name))}</span></span>
          <span class="hp-cat">${esc(p.category)}</span>
        </a></li>`)
      .join(''));
  }

  function renderAbout(about) {
    if (!about) return;
    setText('#about-heading', about.heading);
    setText('#about-bio', about.bio);
    // Education is set as a few composed lines, not a key/value table.
    const edu = about.education || {};
    const place = [edu.specialization, edu.institution].filter(Boolean).join(', ');
    const when = [edu.duration, edu.year ? `currently in ${edu.year}` : '', edu.cgpa ? `CGPA ${edu.cgpa}` : '']
      .filter(Boolean).join(', ');
    setHTML('#edu-rows', [
      edu.degree ? `<h3 class="edu-degree">${edu.label ? `<span class="sr-only">${esc(edu.label)}: </span>` : ''}${esc(edu.degree)}</h3>` : '',
      place ? `<p class="edu-line">${esc(place)}</p>` : '',
      when ? `<p class="edu-line">${esc(when)}</p>` : '',
    ].join(''));
  }

  function framePanel(p) {
    const shots = p.images || [];
    const first = shots[0];
    const thumbs = shots.length > 1
      ? `<ul class="thumbs" role="list">${shots
        .map((sh, i) => `<li style="--i:${i}"><button type="button" class="thumb" data-lightbox="${esc(p.id)}" data-index="${i}" data-cursor="view"
            aria-label="Open screenshot ${i + 1} of ${shots.length}: ${esc(sh.alt)}">
            <img src="${esc(sh.src)}" alt="" loading="lazy" decoding="async" width="${esc(sh.w)}" height="${esc(sh.h)}" />
          </button></li>`)
        .join('')}</ul>`
      : '';
    return `<div class="frame">
        <button type="button" class="frame-btn" data-lightbox="${esc(p.id)}" data-index="0" data-cursor="view"
          aria-label="Open screenshot 1 of ${shots.length}: ${esc(first.alt)}">
          <span class="frame-img"><img src="${esc(first.src)}" alt="${esc(first.alt)}" loading="lazy" decoding="async"
               width="${esc(first.w || 1600)}" height="${esc(first.h || 900)}" /></span>
        </button>
        <span class="frame-rim" aria-hidden="true"></span>
      </div>
      ${thumbs}
      <p class="frame-cap">${esc(first.alt)}</p>`;
  }

  /** A piece without screenshots shows its headline reading as the object. */
  function platePanel(p) {
    const m = p.metric;
    if (!m) return '';
    return `<div class="frame">
        <div class="plate">
          <div class="plate-inner">
            <span class="plate-value" data-count-big>${esc(m.value)}</span>
            <span class="plate-unit">${esc(m.unit)}</span>
            <span class="plate-cap">${esc(m.caption)}</span>
          </div>
        </div>
        <span class="frame-rim" aria-hidden="true"></span>
      </div>`;
  }

  function pieceLinks(p) {
    const out = [];
    if (p.links?.github) {
      out.push(`<a class="btn btn-ghost" href="${esc(p.links.github)}" target="_blank" rel="noopener noreferrer">
        ${ICONS.github}Source<span class="sr-only"> code for ${esc(p.name)}</span></a>`);
    }
    if (p.links?.demo) {
      out.push(`<a class="btn btn-molten" href="${esc(p.links.demo)}" target="_blank" rel="noopener noreferrer">
        Live demo<span class="sr-only"> of ${esc(p.name)}</span>${ICONS.arrow}</a>`);
    }
    return out.join('');
  }

  const tagList = (items, label) =>
    `<ul class="tags" role="list" aria-label="${esc(label)}" data-reveal="tags">${(items || [])
      .map((t, i) => `<li class="tag" style="--i:${Math.min(i, 14)}">${esc(t)}</li>`)
      .join('')}</ul>`;

  function renderWork(work) {
    if (!work) return;
    setText('#work-heading', work.heading);
    setText('#work-note', work.note);

    setHTML('#projects', (work.projects || [])
      .map((p, idx) => {
        const hasShots = (p.images || []).length > 0;
        const classes = ['piece', 'glow-card', idx % 2 ? 'is-flip' : '', hasShots ? '' : 'is-plate'].filter(Boolean).join(' ');
        return `<article class="${classes}" id="${esc(p.id)}" aria-labelledby="${esc(p.id)}-name">
          <div class="piece-media" data-reveal="media">
            ${hasShots ? framePanel(p) : platePanel(p)}
          </div>
          <div class="piece-copy">
            <h3 class="piece-name" id="${esc(p.id)}-name" data-reveal="title">${esc(p.name)}</h3>
            <p class="piece-cat" data-reveal>${esc(p.category)}</p>
            ${p.description ? `<p class="piece-lead" data-reveal>${esc(p.description)}</p>` : ''}
            <ul class="piece-bullets" role="list">
              ${(p.bullets || []).map((b) => `<li data-reveal>${wrapNumbers(b)}</li>`).join('')}
            </ul>
            ${tagList(p.tech, `Built with, ${shortName(p.name)}`)}
            <div class="piece-links" data-reveal>${pieceLinks(p)}</div>
            ${p.links?.demoNote ? `<p class="piece-note" data-reveal>${ICONS.info}<span>${esc(p.links.demoNote)}</span></p>` : ''}
          </div>
        </article>`;
      })
      .join(''));
  }

  function renderStack(stack) {
    if (!stack) return;
    setText('#stack-heading', stack.heading);
    setHTML('#stack-groups', (stack.groups || [])
      .map((g) => `<div class="stack-card glow-card" data-tilt="7">
        <h3 class="stack-name" data-reveal>${esc(g.name)}</h3>
        ${tagList(g.items, g.name)}
      </div>`)
      .join(''));
  }

  function renderContact(contact) {
    if (!contact) return;
    setText('#contact-heading', contact.heading);
    setHTML('#contact-cta', `
      <a class="btn btn-soot" href="mailto:${esc(contact.email)}">${esc(contact.emailCta)}${ICONS.mail}</a>
      <a class="contact-email link-draw" href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>`);
    setHTML('#contact-links', (contact.links || [])
      .map((l) => {
        const icon = ICONS[l.icon] || ICONS.arrow;
        const inner = `<span class="channel-icon">${icon}</span>
          <span class="channel-text"><span class="channel-label">${esc(l.label)}</span><span class="channel-handle">${esc(l.handle || prettyUrl(l.href))}</span></span>`;
        return l.available && l.href
          ? `<li data-reveal><a class="channel glow-card" data-tilt="6" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${inner}<span class="channel-arrow">${ICONS.arrow}</span></a></li>`
          : `<li data-reveal><div class="channel glow-card" aria-disabled="true">${inner}</div></li>`;
      })
      .join(''));
  }

  function renderFooter(footer) {
    if (!footer) return;
    setText('#footer-copy', `© ${new Date().getFullYear()} ${footer.copyright}`);
    setText('#footer-note', footer.note);
  }

  /** Wrap each word of a heading in a mask so it can rise into place. */
  function splitTitles() {
    $$('[data-reveal="title"]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map((w, i) => `<span class="wm"><span class="w" style="--i:${i}">${esc(w)}</span></span>`)
        .join(' ');
    });
  }

  /* ---------- count-ups ---------- */

  const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  /** Count a figure up from zero in its own format; the exact text is restored at the end. */
  function countUp(el, duration) {
    const final = el.dataset.final || el.textContent;
    el.dataset.final = final;
    const r = parseReading(final);
    if (!r || !MOTION) { el.textContent = final; return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      el.textContent = formatReading(r, r.target * easeOutExpo(p));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = final;
    };
    el.textContent = formatReading(r, 0);
    requestAnimationFrame(tick);
  }

  /* ---------- scroll reveals ---------- */

  function initReveal() {
    const targets = $$('[data-reveal]');
    const figures = $$('.num[data-count], [data-count-big]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    // Siblings that arrive together stagger, capped so nothing drags.
    const groups = new Map();
    targets.forEach((el) => {
      if (el.dataset.reveal === 'title') return;
      const key = el.closest('.piece-copy, .section-head, .about-grid, .stack-card, .contact-grid') || el.parentElement;
      const list = groups.get(key) || [];
      list.push(el);
      groups.set(key, list);
    });
    groups.forEach((list) => list.forEach((el, i) => el.style.setProperty('--d', `${Math.min(i * 80, 480)}ms`)));

    // Titles rise through a clipping mask; once risen the mask is lifted so the glow can spread.
    const reveal = (el) => {
      if (el.classList.contains('is-in')) return;
      el.classList.add('is-in');
      if (el.dataset.reveal === 'title') window.setTimeout(() => el.classList.add('is-settled'), 1900);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        reveal(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((el) => io.observe(el));

    // Fallback: anything whose top has entered the viewport is revealed on
    // scroll, so no element can stay hidden if an observer never fires.
    let pending = targets.slice();
    let ticking = false;
    const sweep = () => {
      ticking = false;
      const limit = window.innerHeight * 0.96;
      pending = pending.filter((el) => {
        if (el.classList.contains('is-in')) return false;
        if (el.getBoundingClientRect().top < limit) { reveal(el); return false; }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onSweep);
    };
    const onSweep = () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } };
    window.addEventListener('scroll', onSweep, { passive: true });
    window.setTimeout(sweep, 1400);

    if (!MOTION) return;
    const counter = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const big = e.target.hasAttribute('data-count-big');
        window.setTimeout(() => countUp(e.target, big ? 1600 : 1200), big ? 300 : 250);
        counter.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    figures.forEach((el) => counter.observe(el));
  }

  /* ---------- hero: an interactive network of nodes, signals travelling its links ---------- */

  function initNetwork(hero) {
    const canvas = $('#network');
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const LINK = 150;
    const REACH = 210;
    let w = 0;
    let h = 0;
    let nodes = [];
    let pulses = [];
    const mouse = { x: -9999, y: -9999, active: false };

    // One pre-rendered glow sprite, drawn at any size; far cheaper than shadowBlur.
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 48;
    const sc = sprite.getContext('2d');
    const grad = sc.createRadialGradient(24, 24, 0, 24, 24, 24);
    grad.addColorStop(0, 'rgba(255, 246, 225, 1)');
    grad.addColorStop(0.22, 'rgba(255, 190, 110, 0.95)');
    grad.addColorStop(0.5, 'rgba(255, 130, 45, 0.35)');
    grad.addColorStop(1, 'rgba(255, 110, 30, 0)');
    sc.fillStyle = grad;
    sc.fillRect(0, 0, 48, 48);

    const build = () => {
      const b = canvas.getBoundingClientRect();
      w = b.width;
      h = b.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(w * ratio));
      canvas.height = Math.max(1, Math.round(h * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Phones get a denser, brighter network so the signature still reads at 390px.
      const count = w < 768
        ? Math.round(clamp((w * h) / 7000, 45, 70))
        : Math.round(clamp((w * h) / 12000, 26, 105));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.8 + Math.random() * 1.6,
        ox: 0,
        oy: 0,
        glow: 0,
      }));
      pulses = [];
    };

    const pos = (n) => [n.x + n.ox, n.y + n.oy];

    const spawnPulse = () => {
      const a = nodes[(Math.random() * nodes.length) | 0];
      if (!a) return;
      const [ax, ay] = pos(a);
      let best = null;
      let bestD = LINK * LINK;
      for (const b of nodes) {
        if (b === a) continue;
        const [bx, by] = pos(b);
        const d2 = (ax - bx) ** 2 + (ay - by) ** 2;
        if (d2 < bestD && Math.random() > 0.35) { best = b; bestD = d2; }
      }
      if (best) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.01 });
    };

    const step = (dt) => {
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -30) n.x = w + 30; else if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = h + 30; else if (n.y > h + 30) n.y = -30;
        let tx = 0;
        let ty = 0;
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < REACH && d > 1) {
            const f = 1 - d / REACH;
            tx = (dx / d) * f * 26;
            ty = (dy / d) * f * 26;
          }
          n.glow += ((d < REACH ? 1 - d / REACH : 0) - n.glow) * 0.12;
        } else {
          n.glow *= 0.9;
        }
        n.ox += (tx - n.ox) * 0.08;
        n.oy += (ty - n.oy) * 0.08;
      }
      pulses = pulses.filter((p) => (p.t += p.speed * dt) < 1);
      if (pulses.length < (w < 768 ? 4 : 9) && Math.random() < 0.08 * dt) spawnPulse();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const baseA = w < 768 ? 0.36 : 0.24;
      for (let i = 0; i < nodes.length; i++) {
        const [ax, ay] = pos(nodes[i]);
        for (let j = i + 1; j < nodes.length; j++) {
          const [bx, by] = pos(nodes[j]);
          const d2 = (ax - bx) ** 2 + (ay - by) ** 2;
          if (d2 > LINK * LINK) continue;
          const t = 1 - Math.sqrt(d2) / LINK;
          const lit = Math.max(nodes[i].glow, nodes[j].glow);
          ctx.strokeStyle = `rgba(255, ${Math.round(150 + 60 * lit)}, ${Math.round(60 + 60 * lit)}, ${(t * (baseA + 0.45 * lit)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
      if (mouse.active) {
        for (const n of nodes) {
          const [x, y] = pos(n);
          const d = Math.hypot(mouse.x - x, mouse.y - y);
          if (d > REACH) continue;
          ctx.strokeStyle = `rgba(255, 214, 150, ${((1 - d / REACH) * 0.5).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.9;
        ctx.drawImage(sprite, mouse.x - 22, mouse.y - 22, 44, 44);
      }
      for (const n of nodes) {
        const [x, y] = pos(n);
        const s = n.r * (7 + 7 * n.glow);
        ctx.globalAlpha = 0.55 + 0.45 * n.glow;
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      for (const p of pulses) {
        const [ax, ay] = pos(p.a);
        const [bx, by] = pos(p.b);
        const x = ax + (bx - ax) * p.t;
        const y = ay + (by - ay) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        ctx.globalAlpha = fade;
        ctx.drawImage(sprite, x - 9, y - 9, 18, 18);
      }
      ctx.globalAlpha = 1;
    };

    build();
    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { build(); if (!MOTION) draw(); }, 150);
    });

    if (!MOTION) { draw(); return; }

    if (FINE_POINTER) {
      hero.addEventListener('pointermove', (e) => {
        const b = canvas.getBoundingClientRect();
        mouse.x = e.clientX - b.left;
        mouse.y = e.clientY - b.top;
        mouse.active = true;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { mouse.active = false; });
    }
    // A click or tap sends a ripple through the network.
    hero.addEventListener('pointerdown', (e) => {
      const b = canvas.getBoundingClientRect();
      const cx = e.clientX - b.left;
      const cy = e.clientY - b.top;
      for (const n of nodes) {
        const dx = n.x - cx;
        const dy = n.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 260) {
          const f = (1 - d / 260) * 2.4;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
          n.glow = 1;
        }
      }
      for (let i = 0; i < 6; i++) spawnPulse();
    });

    let running = false;
    let visible = true;
    let last = performance.now();
    const loop = (now) => {
      if (!visible || document.hidden) { running = false; return; }
      const dt = Math.min(3, (now - last) / 16.67);
      last = now;
      // Without a mouse, a spark roams the open space so the network still reaches and lights up.
      if (!FINE_POINTER) {
        mouse.active = true;
        mouse.x = w * (0.62 + 0.3 * Math.sin(now / 2900));
        mouse.y = h * (0.5 + 0.38 * Math.sin(now / 4100 + 1.2));
      }
      // Burst velocity settles back to a slow drift.
      for (const n of nodes) {
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 0.35) { n.vx *= 0.96; n.vy *= 0.96; }
      }
      step(dt);
      draw();
      requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(loop);
    };
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    start();
  }

  /* ---------- section backgrounds: slow drifting warm light ---------- */

  function initSectionBgs() {
    $$('.section').forEach((s) => {
      const bg = document.createElement('div');
      bg.className = 'section-bg';
      bg.setAttribute('aria-hidden', 'true');
      const n = clamp(Math.round(s.offsetHeight / 850), 2, 9);
      let html = '';
      for (let i = 0; i < n; i++) {
        const top = ((i + 0.5) / n) * 100;
        const side = i % 2 ? 'right' : 'left';
        html += `<span class="orb" style="top:${top.toFixed(1)}%;${side}:${(-16 + Math.random() * 20).toFixed(1)}vmax;--dur:${(18 + Math.random() * 14).toFixed(1)}s;--delay:${(-Math.random() * 20).toFixed(1)}s"></span>`;
      }
      bg.innerHTML = html;
      s.prepend(bg);
    });
  }

  /* ---------- glowing cards: travelling border light, cursor spotlight, tilt ---------- */

  function initCards() {
    const cards = $$('.glow-card');
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver((entries) => entries.forEach((e) => {
        const { width, height } = e.contentRect;
        e.target.style.setProperty('--diag', `${Math.ceil(Math.hypot(width, height)) + 60}px`);
      }));
      cards.forEach((c) => ro.observe(c));
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => {
        e.target.classList.toggle('in-view', e.isIntersecting);
      }), { rootMargin: '10% 0px' });
      cards.forEach((c) => io.observe(c));
      $$('.section').forEach((s) => io.observe(s));
    }
    if (!FINE_POINTER) return;
    cards.forEach((c) => {
      const tilt = MOTION ? Number(c.dataset.tilt || 0) : 0;
      let raf = 0;
      c.addEventListener('pointermove', (e) => {
        const b = c.getBoundingClientRect();
        const x = e.clientX - b.left;
        const y = e.clientY - b.top;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          c.style.setProperty('--sx', `${Math.round(x)}px`);
          c.style.setProperty('--sy', `${Math.round(y)}px`);
          if (tilt) {
            c.style.setProperty('--rx', `${((0.5 - y / b.height) * tilt).toFixed(2)}deg`);
            c.style.setProperty('--ry', `${((x / b.width - 0.5) * tilt).toFixed(2)}deg`);
          }
        });
      });
      c.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        ['--sx', '--sy', '--rx', '--ry'].forEach((p) => c.style.removeProperty(p));
      });
    });
  }

  /* ---------- scroll: hero depth planes, frames, fields, nav ---------- */

  function initScroll() {
    const hero = $('#top');
    const light = $('.hero-light');
    const network = $('.hero-network');
    const inner = $('.hero-inner');
    const nav = $('#nav');
    const fields = $$('.field');
    const frames = $$('.piece-media .frame');
    const links = $$('[data-nav]');
    const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    const wide = window.matchMedia('(min-width: 900px)');

    const onScreen = new Set();
    if (MOTION && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      }, { rootMargin: '10% 0px' });
      frames.forEach((f) => io.observe(f));
    }

    let px = 0;
    let py = 0;
    if (MOTION && FINE_POINTER && hero) {
      hero.addEventListener('pointermove', (e) => {
        px = e.clientX / window.innerWidth - 0.5;
        py = e.clientY / window.innerHeight - 0.5;
        queue();
      }, { passive: true });
    }

    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Nav: solid once the page moves, tucked away while reading downward.
      if (nav) {
        nav.classList.toggle('is-solid', y > 24);
        const menuOpen = $('#nav-toggle')?.getAttribute('aria-expanded') === 'true';
        if (!menuOpen && y > 240 && y > lastY + 4) nav.classList.add('is-hidden');
        else if (y < lastY - 4 || y <= 240 || menuOpen) nav.classList.remove('is-hidden');
      }
      lastY = y;

      // Section spy.
      const probe = y + vh * 0.4;
      let active = null;
      sections.forEach((s) => { if (s.offsetTop <= probe) active = s.id; });
      if (vh + y >= document.documentElement.scrollHeight - 4 && sections.length) active = sections[sections.length - 1].id;
      links.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === `#${active}` ? 'true' : 'false'));

      if (!MOTION) return;

      // Hero depth: far light, the network drifting and softening as you leave.
      if (hero && y < hero.offsetHeight + 100) {
        const deep = wide.matches;
        if (light) light.style.transform = `translate3d(${(px * -10).toFixed(1)}px, ${(y * 0.12).toFixed(1)}px, 0)`;
        if (network) {
          network.style.transform = `translate3d(${(px * 14).toFixed(1)}px, ${(y * 0.3 + py * 10).toFixed(1)}px, 0)`;
          network.style.filter = deep && y > 8 ? `blur(${Math.min(y / 110, 5).toFixed(1)}px)` : '';
        }
        if (inner) {
          inner.style.transform = `translate3d(0, ${(y * 0.1).toFixed(1)}px, 0)`;
          inner.style.opacity = String(clamp(1 - y / (hero.offsetHeight * 1.1), 0, 1).toFixed(3));
        }
      }

      // Screenshots drift inside their frames.
      onScreen.forEach((f) => {
        const b = f.getBoundingClientRect();
        const off = clamp((b.top + b.height / 2 - vh / 2) * -0.02, -5, 5);
        f.style.setProperty('--py', `${off.toFixed(1)}px`);
      });

      // Colour fields rise like a sheet of glass sliding over the bench.
      fields.forEach((f) => {
        const top = f.getBoundingClientRect().top;
        const p = clamp((vh - top) / (vh * 0.6), 0, 1);
        if (p <= 0) return;
        f.style.transform = p >= 1 ? '' : `scale(${(0.94 + 0.06 * easeOutExpo(p)).toFixed(4)})`;
      });
    };
    const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    update();
  }

  /* ---------- frames respond to the pointer ---------- */

  function initFrames() {
    if (!FINE_POINTER || !MOTION) return;
    $$('.piece-media .frame').forEach((f) => {
      let raf = 0;
      f.addEventListener('pointermove', (e) => {
        const b = f.getBoundingClientRect();
        const mx = clamp(((e.clientX - b.left) / b.width) * 2 - 1, -1, 1);
        const my = clamp(((e.clientY - b.top) / b.height) * 2 - 1, -1, 1);
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          f.style.setProperty('--mx', mx.toFixed(3));
          f.style.setProperty('--my', my.toFixed(3));
          f.style.setProperty('--rx', `${(-my * 2.4).toFixed(2)}deg`);
          f.style.setProperty('--ry', `${(mx * 3.2).toFixed(2)}deg`);
        });
      });
      f.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        ['--mx', '--my', '--rx', '--ry'].forEach((prop) => f.style.removeProperty(prop));
      });
    });
  }

  /* ---------- nav menu ---------- */

  function initMenu() {
    const toggle = $('#nav-toggle');
    const menu = $('#menu');
    if (!toggle || !menu) return;
    const setOpen = (open) => {
      menu.hidden = !open;
      document.body.classList.toggle('is-locked', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      $('#nav')?.classList.remove('is-hidden');
      if (open && MOTION) {
        $$('li, .menu-email', menu).forEach((el, n) => el.animate(
          [{ opacity: 0, transform: 'translateY(28px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'none' }],
          { duration: 700, delay: 60 + n * 60, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }));
      }
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('[data-menu-link], .menu-email', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth >= 900 && !menu.hidden) setOpen(false); });
  }

  /* ---------- lightbox: the screenshot grows out of its frame ---------- */

  function initLightbox(projects) {
    const galleries = {};
    (projects || []).forEach((p) => { galleries[p.id] = p.images || []; });
    const triggers = $$('[data-lightbox]');
    if (!triggers.length) return;

    const el = document.createElement('div');
    el.className = 'lightbox';
    el.hidden = true;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'lb-title');
    el.innerHTML = `
      <div class="lb-bar">
        <p id="lb-title" class="lb-title"></p>
        <button type="button" class="lb-btn" data-lb="close" aria-label="Close viewer">${ICONS.close}</button>
      </div>
      <div class="lb-stage">
        <button type="button" class="lb-btn lb-prev" data-lb="prev" aria-label="Previous screenshot">${ICONS.left}</button>
        <figure class="lb-figure">
          <img id="lb-img" alt="" />
          <figcaption class="lb-cap"><span id="lb-count" class="lb-count"></span><span id="lb-cap"></span></figcaption>
        </figure>
        <button type="button" class="lb-btn lb-next" data-lb="next" aria-label="Next screenshot">${ICONS.right}</button>
      </div>
      <div class="lb-foot">
        <ul id="lb-dots" class="lb-dots" role="list"></ul>
      </div>`;
    document.body.appendChild(el);

    const img = $('#lb-img', el);
    const cap = $('#lb-cap', el);
    const count = $('#lb-count', el);
    const dots = $('#lb-dots', el);
    const title = $('#lb-title', el);
    const prev = $('[data-lb="prev"]', el);
    const next = $('[data-lb="next"]', el);
    const closeBtn = $('[data-lb="close"]', el);
    const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

    let shots = [];
    let i = 0;
    let origin = null;
    let closing = false;

    const paint = (dir = 0) => {
      const shot = shots[i];
      if (!shot) return;
      img.width = shot.w || 1600;
      img.height = shot.h || 900;
      img.src = shot.src;
      img.alt = shot.alt || '';
      count.textContent = `${i + 1} of ${shots.length}`;
      cap.textContent = shot.alt || '';
      $$('.lb-dot', dots).forEach((b) => b.setAttribute('aria-current', Number(b.dataset.i) === i ? 'true' : 'false'));
      prev.disabled = i === 0;
      next.disabled = i === shots.length - 1;
      prev.hidden = next.hidden = shots.length < 2;
      if (dir && MOTION) {
        img.animate(
          [{ opacity: 0, transform: `translateX(${dir * 40}px) scale(0.98)`, filter: 'blur(6px)' },
           { opacity: 1, transform: 'none', filter: 'none' }],
          { duration: 520, easing: ease });
      }
    };

    const buildDots = () => {
      dots.innerHTML = shots
        .map((_, n) => `<li><button type="button" class="lb-dot" data-i="${n}" aria-label="Show screenshot ${n + 1} of ${shots.length}"></button></li>`)
        .join('');
      dots.hidden = shots.length < 2;
      $$('.lb-dot', dots).forEach((b) => b.addEventListener('click', () => {
        const n = Number(b.dataset.i);
        const dir = Math.sign(n - i);
        i = n;
        paint(dir);
      }));
    };

    const open = (id, index, trigger) => {
      shots = galleries[id] || [];
      if (!shots.length) return;
      i = clamp(index, 0, shots.length - 1);
      origin = trigger;
      const piece = trigger.closest('.piece');
      title.textContent = piece ? ($('.piece-name', piece)?.textContent || '') : '';
      buildDots();
      paint();
      el.hidden = false;
      document.body.classList.add('is-locked');
      closeBtn.focus({ preventScroll: true });

      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: MOTION ? 380 : 150, easing: 'ease-out' });
      if (!MOTION) return;
      // FLIP: start the viewer image at the trigger's box, then let it grow.
      const from = (trigger.querySelector('img') || trigger).getBoundingClientRect();
      const run = () => {
        const to = img.getBoundingClientRect();
        if (!to.width) return;
        const sx = from.width / to.width;
        const sy = from.height / to.height;
        const tx = from.left + from.width / 2 - (to.left + to.width / 2);
        const ty = from.top + from.height / 2 - (to.top + to.height / 2);
        img.animate(
          [{ transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`, borderRadius: '1.25rem', filter: 'brightness(0.7)' },
           { transform: 'none', borderRadius: '0.9rem', filter: 'none' }],
          { duration: 700, easing: ease });
      };
      if (img.complete && img.naturalWidth) requestAnimationFrame(run);
      else img.addEventListener('load', () => requestAnimationFrame(run), { once: true });
      $$('.lb-bar, .lb-foot, .lb-cap, .lb-prev, .lb-next', el).forEach((p, n) => p.animate(
        [{ opacity: 0, transform: `translateY(${n === 0 ? -14 : 14}px)` }, { opacity: 1, transform: 'none' }],
        { duration: 600, delay: 180 + n * 40, easing: ease, fill: 'backwards', composite: 'add' }));
    };

    const close = () => {
      if (el.hidden || closing) return;
      closing = true;
      const done = () => {
        el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        el.hidden = true;
        img.removeAttribute('src');
        closing = false;
        document.body.classList.remove('is-locked');
        if (origin && origin.focus) origin.focus({ preventScroll: true });
      };
      if (!MOTION) { done(); return; }
      const target = (origin?.querySelector('img') || origin)?.getBoundingClientRect();
      const now = img.getBoundingClientRect();
      const inView = target && target.bottom > 0 && target.top < window.innerHeight && now.width;
      const toFrame = inView
        ? `translate(${target.left + target.width / 2 - (now.left + now.width / 2)}px, ${target.top + target.height / 2 - (now.top + now.height / 2)}px) scale(${target.width / now.width}, ${target.height / now.height})`
        : 'scale(0.94)';
      img.animate([{ transform: 'none', opacity: 1 }, { transform: toFrame, opacity: inView ? 0.6 : 0 }],
        { duration: 380, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' });
      el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: 'ease-in', fill: 'forwards' })
        .finished.then(done, done);
    };

    const step = (d) => {
      const n = i + d;
      if (n < 0 || n >= shots.length) return;
      i = n;
      paint(d);
    };

    triggers.forEach((t) => t.addEventListener('click', () => open(t.dataset.lightbox, Number(t.dataset.index || 0), t)));
    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    closeBtn.addEventListener('click', close);
    el.addEventListener('click', (e) => { if (e.target === el || e.target.classList.contains('lb-stage')) close(); });

    document.addEventListener('keydown', (e) => {
      if (el.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'Tab') {
        const f = [closeBtn, prev, next, ...$$('.lb-dot', dots)].filter((b) => !b.hidden && !b.disabled && b.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- cursor: a spark with a trailing ring (fine pointers only) ---------- */

  function initCursor() {
    const c = $('#cursor');
    if (!c || !FINE_POINTER || !MOTION) return;
    const dot = $('.cursor-dot', c);
    const ring = $('.cursor-ring', c);
    document.documentElement.classList.add('has-cursor');
    c.classList.add('is-hidden');

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let running = false;
    const LINK = 'a, button, [role="button"], .tag';

    const frame = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      if (Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2) requestAnimationFrame(frame);
      else running = false;
    };

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      c.classList.remove('is-hidden');
      const t = e.target instanceof Element ? e.target : null;
      const view = !!t?.closest('[data-cursor="view"]');
      c.classList.toggle('is-view', view);
      c.classList.toggle('is-link', !view && !!t?.closest(LINK));
      c.classList.toggle('on-light', !!t?.closest('.field-amber') && !t?.closest('.glow-card'));
      if (!running) { running = true; requestAnimationFrame(frame); }
    }, { passive: true });
    document.addEventListener('pointerleave', () => c.classList.add('is-hidden'));
    window.addEventListener('blur', () => c.classList.add('is-hidden'));
  }

  /* ---------- boot ---------- */

  async function boot() {
    const root = document.documentElement;
    root.classList.add('js');
    if (MOTION) root.classList.add('motion');

    let content;
    try {
      const res = await fetch('content.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      content = await res.json();
    } catch (err) {
      console.error('Could not load content.json —', err);
      root.classList.remove('motion', 'js');
      const notice = $('#load-error');
      if (notice) notice.hidden = false;
      return;
    }

    const projects = content.work?.projects || [];
    renderMeta(content.meta);
    renderNav(content.nav, content.hero, content.contact);
    renderHero(content.hero);
    renderHeroPieces(projects);
    renderAbout(content.about);
    renderWork(content.work);
    renderStack(content.stack);
    renderContact(content.contact);
    renderFooter(content.footer);
    splitTitles();

    const hero = $('#top');
    initReveal();
    initFrames();
    initMenu();
    initLightbox(projects);
    initCursor();
    initSectionBgs();
    initCards();
    initNetwork(hero);
    initScroll();

    // The focal moment waits for the display face, never longer than 900ms.
    const fontsReady = document.fonts?.ready || Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => window.setTimeout(r, 900))]).then(() => {
      requestAnimationFrame(() => {
        hero.classList.add('is-live');
        hero.dispatchEvent(new Event('hero:live'));
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
