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
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;

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

  // Key moves
  if (p.moves && p.moves.length) {
    const sec = el('section', 'case-section');
    sec.append(el('h2', 'case-heading', 'Key design moves'));
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
    sec.append(el('h2', 'case-heading', 'Selected drawings'));
    const grid = el('div', 'case-sheets');
    p.sheets.forEach((s) => {
      const fig = el('figure', 'case-sheet');
      const a = el('a');
      a.href = s.src;
      a.target = '_blank';
      a.rel = 'noopener';
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
})();
