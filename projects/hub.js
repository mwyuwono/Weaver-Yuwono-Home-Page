/**
 * Projects hub: groups window.WY_PROJECTS by window.WY_CATEGORIES. Empty categories are hidden,
 * so new kinds of work (AI tools, built work) appear as soon as an entry is added.
 */
(function () {
  const cats = window.WY_CATEGORIES || [];
  const items = window.WY_PROJECTS || [];
  const sections = document.getElementById('hub-sections');
  const index = document.querySelector('.hub-index');
  if (!sections) return;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const used = cats.map((c) => ({ ...c, items: items.filter((p) => p.category === c.id) })).filter((c) => c.items.length);

  used.forEach((c, ci) => {
    if (index) {
      const a = el('a', null);
      a.href = `#${c.id}`;
      a.append(el('span', null, c.label), el('span', 'hub-index__count', String(c.items.length)));
      index.append(a);
    }

    const sec = el('section', 'hub-section');
    sec.id = c.id;
    const head = el('header', 'hub-section__head');
    head.append(el('h2', 'hub-section__label', c.label));
    if (c.blurb) head.append(el('p', 'hub-section__blurb', c.blurb));
    sec.append(head);

    const list = el('ul', 'hub-list');
    c.items.forEach((p, i) => {
      const li = el('li', 'hub-item');
      const a = el('a', 'hub-item__link');
      const external = Boolean(p.href);
      a.href = external ? p.href : `${p.slug}/`;
      if (external) a.rel = 'noopener';

      const media = el('div', 'hub-item__media');
      const im = el('img');
      im.src = p.card.src;
      if (p.card.srcset) im.srcset = p.card.srcset;
      im.sizes = '(max-width: 760px) 100vw, 560px';
      im.alt = p.card.alt || '';
      im.decoding = 'async';
      im.loading = ci === 0 && i < 2 ? 'eager' : 'lazy';
      media.append(im);

      const text = el('div', 'hub-item__text');
      text.append(el('p', 'case-eyebrow', [p.location, p.year].filter(Boolean).join(' · ')));
      const title = el('h3', 'hub-item__title', p.title);
      title.append(el('span', 'hub-item__arrow', external ? ' ↗' : ' →'));
      text.append(title);
      if (p.headline) text.append(el('p', 'hub-item__headline', p.headline));
      if (p.type) text.append(el('p', 'hub-item__type', p.type));

      a.append(media, text);
      li.append(a);
      list.append(li);
    });
    sec.append(list);
    sections.append(sec);
  });
})();
