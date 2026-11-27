/**
 * Rome case page: turns the first-floor plan (a plain SVG image rendered by case.js, shape 'plan') into one plan with
 * Existing / Changes / Proposed tabs. The SVG is inlined so its layer groups (.rp-base, .rp-demo, .rp-new) can be
 * switched; room names become HTML so they stay readable at phone widths. If anything fails, the image stays as it is.
 */
(function () {
  const project = (window.WY_PROJECTS || []).find((p) => p.slug === document.body.dataset.project);
  if (!project || !window.fetch || !window.DOMParser) return;
  const plans = (project.features || []).flatMap((f) => f.images || []).filter((x) => x.plan);
  const figures = document.querySelectorAll('figure.is-plan');
  plans.forEach((x, n) => { if (figures[n]) enhance(figures[n], x).catch(() => {}); });

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  async function enhance(fig, x) {
    const res = await fetch(x.src);
    if (!res.ok) throw new Error(res.status);
    const doc = new DOMParser().parseFromString(await res.text(), 'image/svg+xml');
    const svg = doc.documentElement;
    if (svg.nodeName !== 'svg') throw new Error('not svg');
    svg.querySelectorAll('style, title').forEach((s) => s.remove()); // page CSS styles the inline copy
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('role', 'img');
    svg.setAttribute('focusable', 'false');
    const [vx, vy, vw, vh] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);

    const id = `rp-${Math.random().toString(36).slice(2, 8)}`;
    const stage = el('div', 'rp-stage');
    stage.id = `${id}-panel`;
    stage.setAttribute('role', 'tabpanel');
    stage.style.aspectRatio = `${vw} / ${vh}`;
    stage.append(document.importNode(svg, true));
    const live = stage.querySelector('svg');

    // Room names and scale figures as HTML, positioned in the plan's own feet.
    const tags = el('div', 'rp-tags');
    tags.setAttribute('aria-hidden', 'true');
    live.querySelectorAll('text').forEach((t) => {
      const spans = t.querySelectorAll('tspan');
      const text = spans.length ? [...spans].map((s) => s.textContent).join('\n') : t.textContent;
      const cx = parseFloat(t.getAttribute('x')), cy = parseFloat(t.dataset.cy || t.getAttribute('y'));
      const scale = t.classList.contains('rp-scale-label');
      const tag = el('span', scale ? 'rp-tag rp-tag--scale' : ['rp-tag', ...[...t.classList].filter((c) => c.startsWith('is-'))].join(' '), text);
      tag.style.left = `${((cx - vx) / vw) * 100}%`;
      tag.style.top = `${(((scale ? cy - 0.35 : cy) - vy) / vh) * 100}%`;
      tags.append(tag);
      t.remove();
    });
    stage.append(tags);

    const states = x.plan.states;
    const tablist = el('div', 'rp-tabs');
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', 'Plan state');
    const tabs = states.map((s) => {
      const b = el('button', 'rp-tab', s.label);
      b.type = 'button';
      b.id = `${id}-${s.id}`;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', stage.id);
      b.addEventListener('click', () => select(s.id));
      tablist.append(b);
      return b;
    });
    tablist.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const to = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (to == null) return;
      e.preventDefault();
      const k = (to + tabs.length) % tabs.length;
      select(states[k].id);
      tabs[k].focus();
    });

    const L = x.plan.legend || {};
    const legend = el('ul', 'rp-legend');
    const keys = { existing: ['existing'], changes: ['existing', 'removed'], proposed: ['existing', 'new'] };
    const items = Object.fromEntries(['existing', 'removed', 'new'].map((k) => {
      const li = el('li', `rp-legend__item rp-legend__item--${k}`);
      li.append(el('i', 'rp-legend__swatch'), document.createTextNode(L[k] || k));
      legend.append(li);
      return [k, li];
    }));

    function select(sid) {
      const s = states.find((v) => v.id === sid) || states[states.length - 1];
      fig.dataset.state = s.id;
      tabs.forEach((b, k) => {
        const on = states[k] === s;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      stage.setAttribute('aria-labelledby', `${id}-${s.id}`);
      live.setAttribute('aria-label', s.alt || x.alt || '');
      Object.entries(items).forEach(([k, li]) => { li.hidden = !(keys[s.id] || []).includes(k); });
    }

    fig.replaceChildren(tablist, stage, legend);
    fig.classList.add('is-enhanced');
    select(x.plan.initial || states[states.length - 1].id);
  }
})();
