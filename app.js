(() => {
  'use strict';
  const IMG = '';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, props = {}, ...kids) => {
    const n = Object.assign(document.createElement(tag), props);
    kids.flat().forEach(k => k != null && n.append(k));
    return n;
  };
  const svg = d => { const t = document.createElement('template'); t.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`; return t.content.firstChild; };
  const PLUS = '<path d="M12 5v14M5 12h14"/>';
  const money = v => '$' + v.toFixed(2);
  const clean = n => n.replace(/\s*\*$/, '');
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* House favorites shown in the big photo rail. `item` must match a menu name. */
  const SIGNATURES = [
    { item: 'The Classic', img: 'images/stock/breakfast.jpg', tag: 'All day', d: 'Two eggs any style with ham, bacon or sausage, hashbrowns and toast.' },
    { item: 'Eggs Benedict', img: 'images/stock/benedict.jpg', tag: 'Breakfast', d: 'Poached eggs and ham on an English muffin, covered in hollandaise.' },
    { item: 'Cheeseburger', img: 'images/stock/burger.jpg', tag: 'Famous burgers', d: 'Lettuce, tomato, onions, dill relish and mayo, with your choice of side.' },
    { item: 'Buttermilk Pancakes', img: 'images/stock/pancakes.jpg', tag: 'Griddle', d: 'A stack of three. Make them tutti frutti with berries and whipped cream.' },
    { item: 'Holy Cow Rib Eye Steak', img: 'images/stock/steak-fries.jpg', tag: 'After 4 pm', d: '14 oz, hand cut and cooked the way you like it.' },
    { item: 'Specialty Pie', img: 'images/stock/pie-slice.jpg', tag: 'Homemade', d: "Ask what's fresh today. A la mode if you like." },
  ];
  const SECTION_PHOTO = {
    breakfast: 'images/stock/bacon-eggs.jpg', lunch: 'images/stock/burger-dark.jpg',
    dinner: 'images/stock/steak.jpg', sweets: 'images/stock/pie.jpg',
  };

  /* ---------- intro curtain ---------- */
  const reveal = () => { root.classList.add('loaded'); document.querySelectorAll('.hero .reveal').forEach((n, i) => { n.style.setProperty('--d', (0.5 + i * 0.12) + 's'); n.classList.add('in'); }); };
  if (document.readyState === 'complete') setTimeout(reveal, 500);
  else addEventListener('load', () => setTimeout(reveal, 500));
  setTimeout(reveal, 2600); // never leave the curtain down

  /* ---------- theme ---------- */
  const themeBtn = $('#themeToggle');
  const paintTheme = () => {
    const dark = root.dataset.theme !== 'light';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    $('meta[name="theme-color"]').content = dark ? '#0E0B09' : '#F6EFE4';
  };
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('sq-theme', root.dataset.theme); } catch (e) {}
    paintTheme();
  });
  paintTheme();

  /* ---------- hours ---------- */
  const fmt = t => {
    let [h, m] = t.split(':').map(Number);
    const ap = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return h + (m ? ':' + String(m).padStart(2, '0') : '') + ' ' + ap;
  };
  const mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const nowThere = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: SITE.timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
    }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return { day: SITE.hours.findIndex(h => h.day === p.weekday), minutes: +p.hour * 60 + +p.minute };
  };
  const paintHours = () => {
    const { day, minutes } = nowThere();
    const today = SITE.hours[day];
    $('#hoursTable tbody').replaceChildren(...[1, 2, 3, 4, 5, 6, 0].map(i => {
      const h = SITE.hours[i];
      return el('tr', { className: i === day ? 'today' : '' }, el('td', { textContent: h.day }), el('td', { textContent: `${fmt(h.open)} – ${fmt(h.close)}` }));
    }));
    $('#todayHours').textContent = `${fmt(today.open)} – ${fmt(today.close)}`;
    const open = minutes >= mins(today.open) && minutes < mins(today.close);
    $('#openDot').className = 'dot ' + (open ? 'open' : 'closed');
    let text;
    if (open) text = mins(today.close) - minutes <= 60 ? `Open now · closing at ${fmt(today.close)}` : `Open now until ${fmt(today.close)}`;
    else if (minutes < mins(today.open)) text = `Closed · opens today at ${fmt(today.open)}`;
    else { const n = SITE.hours[(day + 1) % 7]; text = `Closed · opens ${fmt(n.open)} ${n.day}`; }
    $('#openText').textContent = text;
  };
  paintHours();
  setInterval(paintHours, 60000);

  const paintTimes = () => {
    const { day, minutes } = nowThere();
    const today = SITE.hours[day];
    const opts = [];
    const start = Math.max(Math.ceil((minutes + 20) / 15) * 15, mins(today.open) + 15);
    const end = mins(today.close) - 15;
    if (minutes >= mins(today.open) && minutes < end) opts.push(['As soon as possible', 'ASAP (about 20 minutes)']);
    for (let t = start; t <= end; t += 15) {
      const label = fmt(`${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`);
      opts.push([`Today at ${label}`, `Today, ${label}`]);
    }
    if (!opts.length) { const n = SITE.hours[(day + 1) % 7]; opts.push([`${n.day} morning`, `We're closed right now. Call after ${fmt(n.open)} ${n.day}`]); }
    $('#pickupTime').replaceChildren(...opts.map(([v, l]) => el('option', { value: v, textContent: l })));
  };
  paintTimes();

  /* ---------- marquee ---------- */
  const words = ['Breakfast all day', 'Handmade burgers', 'Homemade pie', 'Bottomless coffee', 'Out on the deck', 'Friday night prime rib', 'Take-out any time'];
  const marquee = $('#marquee');
  for (let i = 0; i < 2; i++) words.forEach(w => marquee.append(el('span', { textContent: w })));

  /* ---------- cart ---------- */
  const prices = new Map();
  MENU.forEach(s => s.groups.forEach(g => g.items.forEach(it => prices.set(clean(it.n), it.price))));
  const cart = new Map();
  try { (JSON.parse(sessionStorage.getItem('sq-cart')) || []).forEach(([k, v]) => cart.set(k, v)); } catch (e) {}
  const toastEl = $('#toast');
  let toastTimer;
  const toast = msg => { toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200); };
  const count = () => [...cart.values()].reduce((a, c) => a + c.qty, 0);
  const total = () => [...cart.values()].reduce((a, c) => a + c.qty * (c.price || 0), 0);
  const setQty = (name, qty) => {
    if (qty <= 0) cart.delete(name); else cart.set(name, { qty, price: prices.get(name) });
    try { sessionStorage.setItem('sq-cart', JSON.stringify([...cart])); } catch (e) {}
    paintCart();
  };
  const addItem = (name, btn) => {
    setQty(name, (cart.get(name)?.qty || 0) + 1);
    toast(`Added ${name}`);
    if (btn) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
  };
  const drawer = $('#drawer');
  const paintCart = () => {
    const rows = [...cart].map(([name, c]) => {
      const minus = el('button', { type: 'button', textContent: '−', ariaLabel: `One less ${name}` });
      const plus = el('button', { type: 'button', textContent: '+', ariaLabel: `One more ${name}` });
      minus.onclick = () => setQty(name, c.qty - 1);
      plus.onclick = () => setQty(name, c.qty + 1);
      return el('li', {}, el('span', { className: 'cname', textContent: name }),
        c.price ? el('span', { textContent: money(c.price * c.qty) }) : null,
        el('span', { className: 'stepper' }, minus, el('output', { textContent: c.qty }), plus));
    });
    if (total() > 0) rows.push(el('li', { className: 'cart-total' }, el('span', { textContent: 'Estimated total' }), el('span', { textContent: money(total()) })));
    $('#cartList').replaceChildren(...rows);
    const n = count();
    $('#cartEmpty').hidden = n > 0;
    $('#navCount').hidden = n === 0;
    $('#navCount').textContent = n;
    $('#fab').hidden = n === 0 || drawer.open;
    $('#fabText').textContent = `View order · ${n}`;
  };

  /* ---------- star ratings ----------
     TEST MODE: votes are saved on this visitor's own device only
     (localStorage), so each person sees just their own vote. To share
     counts between all visitors, replace get() and vote() in `ratings`
     with calls to a database. One vote per item per device: voting
     again changes the rating, it does not add a second vote. */
  const ratings = {
    mine: (() => { try { return JSON.parse(localStorage.getItem('sq-ratings')) || {}; } catch (e) { return {}; } })(),
    get(id) { const m = this.mine[id] || 0; return { count: m ? 1 : 0, avg: m, mine: m }; },
    vote(id, n) { this.mine[id] = n; try { localStorage.setItem('sq-ratings', JSON.stringify(this.mine)); } catch (e) {} },
  };
  const STAR = '<path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.6 9.7l5.8-.8z"/>';
  const stars = (id, label = id) => {
    const wrap = el('span', { className: 'rate' });
    const group = el('span', { className: 'rate-stars', role: 'group', ariaLabel: `Rate ${label}` });
    const meta = el('span', { className: 'rate-meta' });
    const fill = n => btns.forEach((b, i) => b.classList.toggle('on', i < n));
    const paint = () => {
      const r = ratings.get(id);
      fill(Math.round(r.avg));
      btns.forEach((b, i) => b.setAttribute('aria-pressed', r.mine === i + 1));
      meta.textContent = r.count ? `${r.avg.toFixed(1)} · ${r.count} vote${r.count > 1 ? 's' : ''}` : '';
    };
    const btns = [1, 2, 3, 4, 5].map(n => {
      const b = el('button', { type: 'button', ariaLabel: `${n} star${n > 1 ? 's' : ''}` }, svg(STAR));
      b.onclick = () => {
        const first = !ratings.get(id).mine;
        ratings.vote(id, n);
        paint();
        toast(first ? `Thanks for rating ${label}` : 'Your rating was updated');
      };
      b.onmouseenter = () => fill(n);
      return b;
    });
    group.onmouseleave = paint;
    group.append(...btns);
    wrap.append(group, meta);
    paint();
    return wrap;
  };
  $('#visitRate').append(stars('__visit', 'your visit'));

  /* ---------- signatures rail ---------- */
  const rail = $('#sigRail');
  SIGNATURES.forEach((s, i) => {
    const btn = el('button', { className: 'pill', type: 'button' }, svg(PLUS), 'Add to order');
    btn.onclick = () => addItem(s.item, btn);
    rail.append(el('article', { className: 'sig reveal' },
      el('img', { src: IMG + s.img, alt: s.item, loading: 'lazy' }),
      el('span', { className: 'sig-num', textContent: String(i + 1).padStart(2, '0') }),
      el('span', { className: 'sig-tag', textContent: s.tag }),
      el('div', { className: 'sig-body' }, el('h3', { textContent: s.item }), el('p', { textContent: s.d }), btn)));
  });
  $$('.sig', rail).forEach((c, i) => c.style.setProperty('--d', `${Math.min(i, 3) * 0.09}s`));
  const railStep = dir => rail.scrollBy({ left: dir * (rail.firstElementChild.offsetWidth + 24), behavior: reduced ? 'auto' : 'smooth' });
  $('#sigPrev').onclick = () => railStep(-1);
  $('#sigNext').onclick = () => railStep(1);

  /* ---------- menu ---------- */
  const tabs = $('#menuTabs');
  const panels = $('#menuPanels');
  MENU.forEach((sec, i) => {
    const tab = el('button', { className: 'tab', type: 'button', id: `tab-${sec.id}`, role: 'tab', textContent: sec.label });
    tab.setAttribute('aria-controls', `panel-${sec.id}`);
    tab.setAttribute('aria-selected', i === 0);
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.onclick = () => selectTab(sec.id, true);
    tabs.append(tab);
    const panel = el('div', { id: `panel-${sec.id}`, role: 'tabpanel', hidden: i !== 0 });
    panel.setAttribute('aria-labelledby', tab.id);
    sec.groups.forEach(g => {
      const items = el('div', { className: 'items' }, g.items.map(it => {
        const add = el('button', { className: 'add', type: 'button', ariaLabel: `Add ${clean(it.n)} to order` }, svg(PLUS));
        add.onclick = () => addItem(clean(it.n), add);
        const row = el('div', { className: 'item' },
          el('div', { className: 'item-body' },
            el('div', { className: 'item-name' }, it.n, it.tag ? el('span', { className: 'tag', textContent: it.tag }) : null, stars(clean(it.n))),
            it.d ? el('p', { className: 'item-desc', textContent: it.d }) : null),
          it.price ? el('span', { className: 'item-price', textContent: money(it.price) }) : null, add);
        row.dataset.search = `${it.n} ${it.d || ''} ${it.tag || ''} ${g.name}`.toLowerCase();
        return row;
      }));
      panel.append(el('div', { className: 'group' }, el('h3', { textContent: g.name }),
        g.note ? el('p', { className: 'group-note', textContent: g.note }) : null, items));
    });
    panels.append(panel);
  });
  const noResults = el('p', { className: 'no-results', hidden: true });
  panels.append(noResults);
  let activeTab = MENU[0].id;
  const photo = $('#menuPhoto');
  const selectTab = (id, scroll) => {
    activeTab = id;
    $$('.tab', tabs).forEach(t => { const on = t.id === `tab-${id}`; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    $('#menuSearch').value = '';
    filterMenu();
    const sec = MENU.find(s => s.id === id);
    $('#menuPhotoNote').textContent = sec.note || '';
    photo.style.opacity = 0;
    setTimeout(() => { photo.src = IMG + SECTION_PHOTO[id]; photo.onload = () => photo.style.opacity = 1; }, 250);
    if (scroll) {
      const top = $('.menu-body').getBoundingClientRect().top + scrollY - 150;
      if (scrollY > top) scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    }
  };
  tabs.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const all = $$('.tab', tabs);
    const next = all[(all.indexOf(document.activeElement) + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
    next.focus(); next.click();
  });
  const filterMenu = () => {
    const raw = $('#menuSearch').value.trim();
    const q = raw.toLowerCase();
    let hits = 0;
    MENU.forEach(sec => {
      const panel = $(`#panel-${sec.id}`);
      let panelHits = 0;
      $$('.group', panel).forEach(g => {
        let n = 0;
        $$('.item', g).forEach(it => { const show = !q || it.dataset.search.includes(q); it.hidden = !show; if (show) n++; });
        g.hidden = n === 0;
        panelHits += n;
      });
      panel.hidden = q ? panelHits === 0 : sec.id !== activeTab;
      hits += panelHits;
    });
    noResults.hidden = !q || hits > 0;
    noResults.textContent = `Nothing matches "${raw}". Give us a call and ask.`;
  };
  $('#menuSearch').addEventListener('input', filterMenu);

  /* ---------- gallery + lightbox ---------- */
  const shots = GALLERY.filter(g => g.src && !g.small);
  const lightbox = $('#lightbox');
  let lbIndex = 0;
  const showShot = i => {
    lbIndex = (i + shots.length) % shots.length;
    const img = $('#lightboxImg');
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    img.src = IMG + shots[lbIndex].src;
    img.alt = shots[lbIndex].caption;
    $('#lightboxCap').textContent = shots[lbIndex].caption;
  };
  $('#galleryGrid').append(...shots.map((g, i) => {
    const b = el('button', { className: 'shot reveal', type: 'button', ariaLabel: `View photo: ${g.caption}` },
      el('img', { src: IMG + g.src, alt: g.caption, loading: 'lazy' }), el('span', { textContent: g.caption }));
    b.style.setProperty('--d', `${(i % 4) * 0.07}s`);
    b.onclick = () => { showShot(i); lightbox.showModal(); };
    return b;
  }));
  $('#lbPrev').onclick = () => showShot(lbIndex - 1);
  $('#lbNext').onclick = () => showShot(lbIndex + 1);
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') showShot(lbIndex - 1);
    if (e.key === 'ArrowRight') showShot(lbIndex + 1);
  });

  /* ---------- dialogs ---------- */
  $$('dialog').forEach(d => {
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
    d.addEventListener('close', paintCart);
  });
  const form = $('#orderForm');
  const confirmBox = $('#confirm');
  const showForm = on => { form.hidden = !on; confirmBox.hidden = on; $('#cartList').style.display = on ? '' : 'none'; };
  const openOrder = () => { showForm(true); paintTimes(); drawer.showModal(); paintCart(); };
  $('#openOrder').onclick = openOrder;
  $$('[data-open-order]').forEach(b => b.onclick = openOrder);

  /* ---------- order form ---------- */
  const err = $('#formError');
  const summarize = d => [
    `Pickup order for ${d.name}`, `Phone: ${d.phone}`, `Pickup: ${d.time}`, '',
    ...[...cart].map(([n, c]) => `${c.qty} x ${n}`),
    ...(total() > 0 ? ['', `Estimated total: ${money(total())}`] : []),
    ...(d.notes ? ['', `Notes: ${d.notes}`] : []),
  ].join('\n');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    Object.keys(d).forEach(k => d[k] = String(d[k]).trim());
    const fail = m => { err.textContent = m; err.hidden = false; };
    if (!cart.size) return fail('Your order is empty. Add something from the menu first.');
    if (!d.name) { form.elements.name.focus(); return fail('Please add a name for the order.'); }
    if (d.phone.replace(/\D/g, '').length < 10) { form.elements.phone.focus(); return fail('Please add a phone number we can reach you at.'); }
    err.hidden = true;
    const summary = summarize(d);
    $('#orderSummary').textContent = summary;
    let sent = false;
    if (SITE.orderEndpoint) {
      try {
        const res = await fetch(SITE.orderEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, order: summary }) });
        sent = res.ok;
      } catch (x) { sent = false; }
    }
    $('#confirmTitle').textContent = sent ? 'Order sent' : 'Almost done';
    $('#confirmLead').textContent = sent
      ? `Thanks, ${d.name}. We have your order and will call ${d.phone} if we have questions.`
      : `Call us at ${SITE.phone} and read off the order below. We'll have it ready for you.`;
    $('#editOrder').hidden = sent;
    if (sent) { cart.clear(); setQty('', 0); form.reset(); }
    showForm(false);
    $('.drawer-body').scrollTop = 0;
  });
  $('#editOrder').onclick = () => showForm(true);
  $('#copyOrder').onclick = async () => {
    try { await navigator.clipboard.writeText($('#orderSummary').textContent); toast('Order copied'); }
    catch (x) { toast('Could not copy. Select the text instead.'); }
  };

  /* ---------- mobile nav ---------- */
  const overlay = $('#overlayNav');
  const menuToggle = $('#menuToggle');
  const setOverlay = on => {
    overlay.hidden = !on;
    menuToggle.setAttribute('aria-expanded', on);
    menuToggle.setAttribute('aria-label', on ? 'Close navigation' : 'Open navigation');
    document.body.style.overflow = on ? 'hidden' : '';
    nav.classList.toggle('solid', on || scrollY > 40);
  };
  const nav = $('#nav');
  menuToggle.onclick = () => setOverlay(overlay.hidden);
  $$('a', overlay).forEach(a => a.addEventListener('click', () => setOverlay(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) setOverlay(false); });

  /* ---------- scroll: nav, parallax, reveal, counters ---------- */
  const toTop = $('#toTop');
  toTop.onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  const parallax = $$('[data-parallax]');
  let lastY = 0, ticking = false;
  const frame = () => {
    ticking = false;
    const y = scrollY;
    nav.classList.toggle('solid', y > 40 || !overlay.hidden);
    nav.classList.toggle('hide', y > lastY && y > 700 && overlay.hidden);
    root.classList.toggle('nav-hidden', nav.classList.contains('hide'));
    lastY = y;
    toTop.hidden = y < 600;
    if (reduced) return;
    const vh = innerHeight;
    parallax.forEach(p => {
      const r = p.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const offset = (r.top + r.height / 2 - vh / 2) * -parseFloat(p.dataset.parallax);
      p.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame);
  frame();

  const countUp = b => {
    const target = parseFloat(b.dataset.count), dec = +(b.dataset.decimals || 0), suffix = b.dataset.suffix || '';
    if (reduced) return;
    const t0 = performance.now(), dur = 1500;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      b.textContent = (target * e).toFixed(dec) + (k === 1 ? suffix : '');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    $$('[data-count]', en.target).forEach(countUp);
    io.unobserve(en.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach(n => io.observe(n));

  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'story', 'signatures', 'menu', 'gallery', 'visit'].forEach(id => spy.observe(document.getElementById(id)));

  paintCart();
  $('#year').textContent = new Date().getFullYear();
})();
