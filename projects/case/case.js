/**
 * Case page renderer. Each projects/<slug>/index.html sets <body data-project="<slug>">;
 * content comes from projects/projects-data.js (window.WY_PROJECTS).
 */
(function () {
  const slug = document.body.dataset.project;
  const all = window.WY_PROJECTS || [];
  const index = all.findIndex((p) => p.slug === slug);
  const root = document.getElementById('case-root');
  if (index < 0 || !root) return;
  const p = all[index];
  const pages = all.filter((x) => !x.href);
  const pi = pages.indexOf(p);
  const next = pages.length > 1 ? pages[(pi + 1) % pages.length] : null;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const img = (src, alt, srcset, sizes) => {
    const i = el('img');
    i.src = src;
    i.alt = alt || '';
    if (srcset) i.srcset = srcset;
    if (sizes) i.sizes = sizes;
    i.loading = 'lazy';
    i.decoding = 'async';
    return i;
  };

  // Intro
  const intro = el('header', 'case-intro');
  intro.append(el('p', 'case-eyebrow', [p.location, p.year, p.type].filter(Boolean).join(' · ')));
  intro.append(el('h1', 'case-title', p.headline));
  intro.append(el('p', 'case-summary', p.summary));
  const facts = el('dl', 'case-facts');
  (p.facts || []).forEach((f) => {
    const d = el('div', 'case-fact');
    d.append(el('dt', null, f.label), el('dd', null, f.value));
    facts.append(d);
  });
  intro.append(facts);
  root.append(intro);

  // Hero
  if (p.hero) {
    const fig = el('figure', 'case-hero');
    const i = img(p.hero.src, p.hero.alt, p.hero.srcset, '(max-width: 1100px) 100vw, 1040px');
    i.loading = 'eager';
    fig.append(i);
    if (p.hero.caption) fig.append(el('figcaption', null, p.hero.caption));
    root.append(fig);
  }

  // Feature image (optional): one large image with its own heading, opens in the viewer
  if (p.feature) {
    const f = p.feature;
    const sec = el('section', 'case-section');
    sec.append(el('h2', 'case-heading', f.heading));
    const fig = el('figure', 'case-feature');
    const a = el('a');
    a.href = f.full || f.src;
    a.setAttribute('aria-label', `Open ${f.caption || f.heading} full size`);
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      openViewer([{ src: f.src, full: f.full, label: f.heading, title: f.caption || '' }], 0, a);
    });
    a.append(img(f.src, f.alt, null, '(max-width: 1100px) 100vw, 1040px'));
    fig.append(a);
    if (f.caption) fig.append(el('figcaption', null, f.caption));
    sec.append(fig);
    root.append(sec);
  }

  if (p.moves && p.moves.length) {
    const sec = el('section', 'case-section');
    sec.append(el('h2', 'case-heading', 'Approach'));
    const ol = el('ol', 'case-moves');
    p.moves.forEach((m) => {
      const li = el('li');
      li.append(el('h3', null, m.title), el('p', null, m.body));
      ol.append(li);
    });
    sec.append(ol);
    root.append(sec);
  }

  // 3D model
  if (p.model) {
    const sec = el('section', 'case-section');
    sec.append(el('h2', 'case-heading', '3D model'));
    const a = el('a', 'case-model');
    a.href = p.model.href;
    a.append(img(p.model.image, p.model.alt));
    a.append(el('span', 'case-model__cta', 'Open the interactive model'));
    sec.append(a);
    if (p.model.caption) sec.append(el('p', 'case-note', p.model.caption));
    root.append(sec);
  }

  // Drawings
  if (p.sheets && p.sheets.length) {
    const sec = el('section', 'case-section');
    sec.append(el('h2', 'case-heading', 'Drawings'));
    const grid = el('div', 'case-sheets');
    p.sheets.forEach((s, i) => {
      const fig = el('figure', 'case-sheet');
      const a = el('a');
      a.href = s.full || s.src;
      a.setAttribute('aria-label', `Open ${s.label}: ${s.title} full size`);
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        openViewer(p.sheets, i, a);
      });
      a.append(img(s.src, `${s.label}: ${s.title}`, null, '(max-width: 700px) 100vw, 520px'));
      fig.append(a);
      const cap = el('figcaption');
      cap.append(el('span', 'case-sheet__label', s.label), document.createTextNode(s.title));
      fig.append(cap);
      grid.append(fig);
    });
    sec.append(grid);
    if (p.pdf) {
      const link = el('a', 'case-pdf');
      link.href = p.pdf.href;
      link.target = '_blank';
      link.rel = 'noopener';
      link.append(el('span', null, p.pdf.label), el('span', 'case-pdf__meta', p.pdf.meta));
      sec.append(link);
    }
    root.append(sec);
  }

  // Outcome (optional)
  if (p.outcome) {
    const sec = el('section', 'case-section');
    sec.append(el('h2', 'case-heading', 'Outcome'));
    sec.append(el('p', 'case-summary', p.outcome));
    root.append(sec);
  }

  // Footer navigation
  const nav = el('nav', 'case-footer');
  nav.setAttribute('aria-label', 'Projects');
  const back = el('a', null, '← All projects');
  back.href = '../';
  nav.append(back);
  if (next) {
    const n = el('a', 'case-next');
    n.href = `../${next.slug}/`;
    n.append(el('span', 'case-next__label', 'Next project'), el('span', null, `${next.title}, ${next.location}`));
    nav.append(n);
  }
  root.append(nav);

  // Sheet viewer: full-resolution (vector where available), zoom by resizing the image so SVGs re-render crisply.
  function openViewer(sheets, start, opener) {
    let i = start;
    let zoom = 1; // 1 = fit
    const box = el('div', 'viewer');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    const bar = el('div', 'viewer__bar');
    const cap = el('p', 'viewer__caption');
    const btn = (label, text, fn) => {
      const b = el('button', 'viewer__btn', text);
      b.type = 'button';
      b.setAttribute('aria-label', label);
      b.addEventListener('click', fn);
      return b;
    };
    const zoomLabel = el('span', 'viewer__zoom', 'Fit');
    const controls = el('div', 'viewer__controls');
    controls.append(
      btn('Previous sheet', '‹', () => go(-1)),
      btn('Next sheet', '›', () => go(1)),
      btn('Zoom out', '−', () => setZoom(zoom / 1.6)),
      zoomLabel,
      btn('Zoom in', '+', () => setZoom(zoom * 1.6)),
      btn('Fit to screen', 'Fit', () => setZoom(1)),
      btn('Close viewer', 'Close', close)
    );
    bar.append(cap, controls);
    const stage = el('div', 'viewer__stage');
    const pic = el('img', 'viewer__img');
    pic.decoding = 'async';
    stage.append(pic);
    box.append(bar, stage);

    let natural = { w: 1, h: 1 };
    function fitWidth() {
      const sw = stage.clientWidth - 48, sh = stage.clientHeight - 48;
      return Math.max(1, Math.min(sw, (sh * natural.w) / natural.h));
    }
    function setZoom(z, cx, cy) {
      const prev = zoom;
      zoom = Math.min(8, Math.max(1, z));
      const fx = cx == null ? stage.clientWidth / 2 : cx;
      const fy = cy == null ? stage.clientHeight / 2 : cy;
      const px = (stage.scrollLeft + fx) / (pic.offsetWidth || 1);
      const py = (stage.scrollTop + fy) / (pic.offsetHeight || 1);
      pic.style.width = `${Math.round(fitWidth() * zoom)}px`;
      stage.classList.toggle('is-zoomed', zoom > 1);
      zoomLabel.textContent = zoom === 1 ? 'Fit' : `${Math.round(zoom * 100)}%`;
      if (prev !== zoom) {
        stage.scrollLeft = px * pic.offsetWidth - fx;
        stage.scrollTop = py * pic.offsetHeight - fy;
      }
    }
    function show() {
      const s = sheets[i];
      cap.textContent = '';
      cap.append(el('span', 'case-sheet__label', s.label), document.createTextNode(s.title));
      pic.alt = `${s.label}: ${s.title}`;
      zoom = 1;
      pic.style.width = '';
      pic.onload = () => {
        natural = { w: pic.naturalWidth || 1600, h: pic.naturalHeight || 1000 };
        setZoom(1);
      };
      pic.src = s.full || s.src;
    }
    function go(d) { i = (i + d + sheets.length) % sheets.length; show(); }
    function close() {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      box.remove();
      document.documentElement.classList.remove('viewer-open');
      if (opener) opener.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') setZoom(zoom * 1.6);
      else if (e.key === '-') setZoom(zoom / 1.6);
    }
    const onResize = () => setZoom(zoom);
    pic.addEventListener('dblclick', (e) => {
      const r = stage.getBoundingClientRect();
      setZoom(zoom > 1 ? 1 : 3, e.clientX - r.left, e.clientY - r.top);
    });
    stage.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const r = stage.getBoundingClientRect();
      setZoom(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
    // Drag to pan when zoomed.
    let drag = null;
    stage.addEventListener('pointerdown', (e) => {
      if (zoom === 1 || e.pointerType !== 'mouse') return;
      drag = { x: e.clientX, y: e.clientY, l: stage.scrollLeft, t: stage.scrollTop };
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', (e) => {
      if (!drag) return;
      stage.scrollLeft = drag.l - (e.clientX - drag.x);
      stage.scrollTop = drag.t - (e.clientY - drag.y);
    });
    stage.addEventListener('pointerup', () => { drag = null; });
    stage.addEventListener('click', (e) => { if (e.target === stage && zoom === 1) close(); });

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.documentElement.classList.add('viewer-open');
    document.body.append(box);
    show();
    controls.lastChild.focus();
  }
})();
