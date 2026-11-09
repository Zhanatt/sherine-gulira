/* ===== Настройки ===== */
const CONFIG = {
  // URL веб-приложения Google Apps Script (см. README.md). Пока пусто — включён ДЕМО-режим.
  rsvpEndpoint: '',
  // ДЕМО: пока нет rsvpEndpoint, форма просто показывает «Рахмат!» и никуда не отправляет.
  // Перед рассылкой гостям — вписать rsvpEndpoint (тогда демо отключится само).
  demo: true,
  eventDate: '2026-11-21T18:00:00+06:00',
  calendar: { year: 2026, month: 11, mark: 21 },
  texts: {
    sending: 'Жөнөтүлүүдө…',
    done: 'Рахмат! Жообуңуз кабыл алынды.',
    error: 'Ката кетти. Кайра аракет кылыңыз.',
    needName: 'Аты-жөнүңүздү жазыңыз',
    needAnswer: 'Жоопту тандаңыз',
  },
};

const WEEKDAYS = {
  ky: ['Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш', 'Жк'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};

/* ===== Иконки: Tabler (MIT), Hugeicons (MIT), Lucide Lab (ISC) — линия 1px цвета шампань ===== */
const ICONS = {
  welcome: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path pathLength="1" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/><path pathLength="1" d="M12 6L8.707 9.293a1 1 0 0 0 0 1.414l.543.543c.69.69 1.81.69 2.5 0l1-1a3.18 3.18 0 0 1 4.5 0l2.25 2.25m-7 3l2 2M15 13l2 2"/></g>',
  rings: '<g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1"><circle pathLength="1" cx="8.5" cy="16.5" r="5.5" stroke-linecap="round"/><circle pathLength="1" cx="15.5" cy="16.5" r="5.5" stroke-linecap="round"/><path pathLength="1" d="M12 9s4-1.853 4-4.861C16 2.958 15.158 2 14 2c-.947 0-1.579.412-2 1.235C11.579 2.412 10.947 2 10 2c-1.158 0-2 .958-2 2.139C8 7.147 12 9 12 9Z"/></g>',
  dinner: '<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 3v12h-5c-.023-3.681.184-7.406 5-12m0 12v6h-1v-3M8 4v17M5 4v3a3 3 0 1 0 6 0V4"/>',
  night: '<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992zm5 1a2 2 0 0 0 2 2a2 2 0 0 0-2 2a2 2 0 0 0-2-2a2 2 0 0 0 2-2m2 7h2m-1-1v2"/>',
  venue: '<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 21h18M3 10h18M5 6l7-3l7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3"/>',
  letter: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path pathLength="1" d="M10.5 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path pathLength="1" d="m3 7l9 6l2.983-1.989L21 7m-3 15l3.35-3.284a2.143 2.143 0 0 0 .005-3.071a2.24 2.24 0 0 0-3.129-.006l-.224.22l-.223-.22a2.24 2.24 0 0 0-3.128-.006a2.143 2.143 0 0 0-.006 3.071z"/></g>',
  heart: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" pathLength="1" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/>',
  gift: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path pathLength="1" d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v13"/><path pathLength="1" d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5"/></g>',
  music: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path pathLength="1" d="M3 17a3 3 0 1 0 6 0a3 3 0 1 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path pathLength="1" d="M9 17V4h10v13M9 8h10"/></g>',
  rose: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path pathLength="1" d="M18 9.52a4.04 4.04 0 1 1 2-3.47"/><circle pathLength="1" cx="17" cy="7.8" r="2"/><path pathLength="1" d="m14 2.5l-2 1.3a6 6 0 1 0 6 10.4l2-1.2a4 4 0 0 0-4-6.95"/><path pathLength="1" d="M9.77 12C4 15 2 22 2 22"/><path pathLength="1" d="M13 20s-5 3-9.2-2c0 0 5.2-3 9.2 2"/></g>',
};
const iconSvg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
document.querySelectorAll('[data-ico]').forEach(el => { el.innerHTML = iconSvg(el.dataset.ico); });

/* ===== Календарь: месяц тоя, день обведён сердечком ===== */
const HEART = '<svg class="cal-heart" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
  + '<path pathLength="1" d="M24 5a19 19 0 1 1 0 38a19 19 0 1 1 0-38"/></svg>';
function renderCalendar(lang) {
  const { year, month, mark } = CONFIG.calendar;
  const first = (new Date(year, month - 1, 1).getDay() + 6) % 7; // понедельник = 0
  const days = new Date(year, month, 0).getDate();
  let cells = WEEKDAYS[lang].map(d => `<span class="cal-wd">${d}</span>`).join('');
  for (let i = 0; i < first; i++) cells += '<span class="cal-day"></span>';
  for (let d = 1; d <= days; d++) {
    cells += d === mark ? `<span class="cal-day cal-day-mark">${HEART}${d}</span>` : `<span class="cal-day">${d}</span>`;
  }
  document.getElementById('cal').innerHTML = cells;
}

/* ===== Кыргызский орнамент «кочкор мүйүз»: раскрывается, как росток ===== */
(function ornaments() {
  const motif = [
    ['M60 58V30', 0],
    ['M60 46C54 40 44 42 44 50 44 55 50 56 52 52', .35], ['M60 46C66 40 76 42 76 50 76 55 70 56 68 52', .35],
    ['M60 30C60 14 46 6 34 10 22 14 20 30 30 36 38 41 46 34 42 27 39 22 32 24 33 29', .55],
    ['M60 30C60 14 74 6 86 10 98 14 100 30 90 36 82 41 74 34 78 27 81 22 88 24 87 29', .55],
    ['M60 30C56 24 56 18 60 12 64 18 64 24 60 30', 1],
  ];
  const paths = (list, sw) => list.map(([d, delay]) => `<path d="${d}" pathLength="1" stroke-width="${sw}" style="--d:${delay}s"/>`).join('');
  const horns = `<svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g class="orn-grow">${paths(motif, 1.6)}</g></svg>`;
  const band = `<svg viewBox="0 0 300 44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    ${paths([['M112 31H20', .2], ['M188 31H280', .2],
      ['M20 31c-7 0-10-7-5-9 4-1.5 6 3 3 4.5', 1.1], ['M280 31c7 0 10-7 5-9-4-1.5-6 3-3 4.5', 1.1],
      ['M70 31c-1-5 1-9 5-10 0 5-2 8-5 10', 1.25], ['M230 31c1-5-1-9-5-10 0 5 2 8 5 10', 1.25]], 1.1)}
    <g transform="translate(112.8 -5) scale(.62)"><g class="orn-grow">${paths(motif, 1.8)}</g></g>
  </svg>`;
  document.querySelectorAll('.orn-horns').forEach(el => { el.innerHTML = horns; });
  document.querySelectorAll('.orn-band').forEach(el => { el.innerHTML = band; });
})();

/* ===== Язык: кыргызский по умолчанию, русский по кнопке ===== */
const RU = {
  open: 'Нажмите, чтобы открыть',
  envKicker: 'Приглашение', envScript: 'на шерине',
  kicker: 'Приглашение на шерине',
  turnIs: 'в этот раз очередь', hostLoc: 'у Гулиры',
  ringSub: 'ОЧЕРЕДЬ',
  dearTitle: 'Дорогие участники шерине!',
  dear: 'Наша очередная встреча уже совсем скоро!',
  invite: 'В этот раз очередь Гулиры. Приглашаем вас на тёплый вечер за щедрым дастарханом.',
  getting: 'шерине',
  dateLine: '21 ноября 2026 года', weekday: 'Суббота',
  until: 'До встречи осталось', uD: 'дней', uH: 'часов', uM: 'минут', uS: 'секунд',
  timing: 'Программа вечера',
  t1: 'Сбор гостей', t2: 'Дастархан', t3: 'Песни и веселье', t5: 'Завершение вечера',
  venue: 'Место встречи', venueName: 'Кафе «Ак-Өргө»',
  address: 'г. Бишкек, пр. Чуй, 150', map: 'Открыть карту',
  details: 'Детали',
  d1h: 'Подарки', d1: 'Подарки не обязательны. Главное — ваше присутствие и хорошее настроение.',
  d2h: 'Следующая очередь', d2: 'В конце вечера вместе решим, у кого пройдёт следующая шерине.',
  wish: 'Посидим в тёплой компании, наговоримся вдоволь и ещё больше укрепим нашу дружбу.',
  regards: 'С уважением,',
  hosts: 'Гулира',
  adTitle: 'Хотите такое же приглашение?',
  adText: 'Сделаю сайт-приглашение любой сложности — пишите:',
  scrollHint: 'Листайте вниз', rsvpBtn: 'Ответить на приглашение',
  rsvp: 'Анкета', rsvpSub: 'Пожалуйста, подтвердите своё участие',
  nameLabel: 'Ваше имя и фамилия', namePh: 'Например: Асель Мамбетова',
  question: 'Если придёте с супругом(ой), укажите имена обоих',
  a1: 'Обязательно приду', a2: 'Придём с супругом(ой)', a3: 'Не смогу прийти',
  submit: 'Отправить ответ',
};
const TEXTS_RU = {
  sending: 'Отправляем…',
  done: 'Спасибо! Ваш ответ принят.',
  error: 'Произошла ошибка. Попробуйте ещё раз.',
  needName: 'Укажите ваше имя',
  needAnswer: 'Выберите ответ',
};
let LANG = 'ky';
const texts = () => (LANG === 'ru' ? TEXTS_RU : CONFIG.texts);

function setLang(lang) {
  LANG = lang === 'ru' ? 'ru' : 'ky';
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.dataset.ky === undefined) el.dataset.ky = el.innerHTML; // кыргызский текст — из самой разметки
    el.innerHTML = LANG === 'ru' ? RU[el.dataset.i18n] ?? el.dataset.ky : el.dataset.ky;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      const store = 'ky' + attr.replace(/-/g, '');
      if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(attr);
      el.setAttribute(attr, LANG === 'ru' ? RU[key] ?? el.dataset[store] : el.dataset[store]);
    });
  });
  document.querySelectorAll('.lang [data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  renderCalendar(LANG);
  if (window.ringLang) ringLang(LANG);
  if (window.layoutSnake) layoutSnake();
  const note = document.querySelector('.form-note');
  if (note) note.textContent = '';
  try { localStorage.setItem('lang', LANG); } catch (e) { /* приватный режим — просто не запоминаем */ }
}
(function langSwitch() {
  const box = document.querySelector('.lang');
  ['pointerdown', 'touchstart'].forEach(ev => box.addEventListener(ev, e => e.stopPropagation(), { passive: true }));
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) { e.stopPropagation(); setLang(b.dataset.lang); }
  });
  let saved = 'ky';
  try { saved = localStorage.getItem('lang') || 'ky'; } catch (e) { /* нет доступа к хранилищу */ }
  setLang(saved);
  const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 80);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== Появление элементов по скроллу ===== */
function startReveal() {
  const items = document.querySelectorAll('[data-anim]:not(.is-in)');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px' });
  items.forEach(el => io.observe(el));
}

/* ===== Конверт ===== */
(function envelope() {
  const env = document.querySelector('.envelope');
  const block = e => { if (env.dataset.open === 'false') e.preventDefault(); };
  // конверт открывается не только нажатием: колёсиком вниз и свайпом вверх тоже
  const wheelOpen = e => { if (e.deltaY > 8) open(); };
  let startY = null;
  const touchStart = e => { startY = e.touches[0].clientY; };
  const touchMove = e => { if (startY !== null && startY - e.touches[0].clientY > 40) { startY = null; open(); } };
  // печать покачивается, если 3 с ничего не нажали, и потом каждые 6 с
  const seal = env.querySelector('.seal');
  const nudge = () => { seal.classList.remove('nudge'); void seal.offsetWidth; seal.classList.add('nudge'); };
  const nudgeTimer = setTimeout(function n() { if (env.dataset.open === 'false') { nudge(); setTimeout(n, 6000); } }, 3000);
  const keys = e => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key) && env.dataset.open === 'false') {
      e.preventDefault();
      if (e.key === ' ') open();
    }
  };
  function open() {
    if (env.dataset.open === 'true') return;
    env.dataset.open = 'true';
    env.setAttribute('aria-hidden', 'true');
    env.tabIndex = -1;
    document.body.classList.remove('locked');
    removeEventListener('wheel', block);
    removeEventListener('touchmove', block);
    removeEventListener('keydown', keys);
    removeEventListener('wheel', wheelOpen);
    removeEventListener('touchstart', touchStart);
    removeEventListener('touchmove', touchMove);
    clearTimeout(nudgeTimer);
    scrollTo(0, 0);
    setTimeout(startReveal, 700); // пока расходятся половинки конверта
  }
  addEventListener('wheel', block, { passive: false });
  addEventListener('touchmove', block, { passive: false });
  addEventListener('keydown', keys);
  addEventListener('wheel', wheelOpen, { passive: true });
  addEventListener('touchstart', touchStart, { passive: true });
  addEventListener('touchmove', touchMove, { passive: true });
  env.addEventListener('click', open);
  env.focus({ preventScroll: true });
})();

/* ===== Таймер ===== */
(function countdown() {
  const cells = {};
  document.querySelectorAll('#countdown [data-unit]').forEach(el => { cells[el.dataset.unit] = el; });
  const target = new Date(CONFIG.eventDate).getTime();
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    cells.d.textContent = pad(d); cells.h.textContent = pad(h);
    cells.m.textContent = pad(m); cells.s.textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);
})();

/* ===== Анкета → Google Таблица ===== */
(function rsvp() {
  const box = document.getElementById('rsvp');
  const form = box.querySelector('form');
  const input = form.elements.name;
  const btn = form.querySelector('.form-submit');
  const note = form.querySelector('.form-note');

  input.addEventListener('input', () => input.classList.remove('invalid'));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = input.value.trim();
    const answer = (form.querySelector('input[name="answer"]:checked') || {}).value;
    if (!name) { input.classList.add('invalid'); note.textContent = texts().needName; input.focus(); return; }
    if (!answer) { note.textContent = texts().needAnswer; return; }
    if (!CONFIG.rsvpEndpoint) {
      if (CONFIG.demo) { box.innerHTML = `<p class="form-done">${texts().done}</p>`; return; } // демо: ничего не отправляется
      note.textContent = texts().error; console.warn('Не задан rsvpEndpoint — см. README.md'); return;
    }

    btn.disabled = true;
    note.textContent = texts().sending;
    try {
      // text/plain — «простой» запрос без preflight, Apps Script его принимает
      const res = await fetch(CONFIG.rsvpEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, answer, page: location.href }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) throw new Error(data.error || res.status);
      box.innerHTML = `<p class="form-done">${texts().done}</p>`;
    } catch (err) {
      console.error(err);
      note.textContent = texts().error;
      btn.disabled = false;
    }
  });
})();

/* ===== Шёлк: складки красной ткани ===== */
(function silk() {
  const svg = `<svg viewBox="0 0 400 120" preserveAspectRatio="none">
    <defs>
      <linearGradient id="sA" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#1f120d"/><stop offset=".3" stop-color="#5a3626"/><stop offset=".55" stop-color="#2a1811"/><stop offset=".8" stop-color="#6b4230"/><stop offset="1" stop-color="#1f120d"/>
      </linearGradient>
      <linearGradient id="sB" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3f2519"/><stop offset=".4" stop-color="#1a0f0a"/><stop offset=".7" stop-color="#4f3021"/><stop offset="1" stop-color="#21130d"/>
      </linearGradient>
      <linearGradient id="sH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#f3d08a" stop-opacity="0"/><stop offset=".5" stop-color="#f3d08a" stop-opacity=".55"/><stop offset="1" stop-color="#f3d08a" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g class="fold-c"><path d="M0 70C60 40 110 95 180 62S300 30 400 66V120H0Z" fill="url(#sB)"/></g>
    <g class="fold-b"><path d="M0 84C70 60 130 110 210 80S330 52 400 82V120H0Z" fill="url(#sA)"/>
      <path d="M40 80C100 66 150 100 210 82" fill="none" stroke="url(#sH)" stroke-width="2"/></g>
    <g class="fold-a"><path d="M0 100C80 84 150 118 230 98S350 84 400 100V120H0Z" fill="#2a1811"/>
      <path d="M200 99C260 90 320 86 380 98" fill="none" stroke="url(#sH)" stroke-width="1.5"/></g>
  </svg>`;
  // id градиентов должны быть уникальны на странице — у каждого шёлка свои
  document.querySelectorAll('.silk').forEach((el, i) => {
    el.innerHTML = svg.replace(/id="s([ABH])"/g, `id="s$1${i}"`).replace(/url\(#s([ABH])\)/g, `url(#s$1${i})`);
  });
})();

/* ===== Тайминг: змейка, по ней при прокрутке катится роза ===== */
(function timing() {
  const snake = document.getElementById('snake');
  const items = [...snake.querySelectorAll('.snake-items li')];
  items.forEach(li => li.insertAdjacentHTML('afterbegin', li.dataset.img ? `<img class="si-img" src="${li.dataset.img}" alt="" loading="lazy">` : `<span class="si-icon ico">${iconSvg(li.dataset.icon)}</span>`));
  const base = snake.querySelector('.snake-base');
  const line = snake.querySelector('.snake-line');
  const svg = snake.querySelector('.snake-svg');
  const rose = snake.querySelector('.rose');
  const ROW = 190, TOP = 40;
  let len = 0;

  // волна: изгибы поочерёдно у левого и правого края, пункт — в свободной половине напротив
  window.layoutSnake = function layoutSnake() {
    const W = snake.clientWidth;
    const H = TOP + ROW * items.length + 40;
    snake.style.height = H + 'px';
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const pt = k => ({ x: k % 2 ? W * .82 : W * .18, y: TOP + ROW * k + ROW / 2 });
    let d = `M${W / 2} 0C${W / 2} ${TOP} ${pt(0).x} ${pt(0).y - ROW / 2} ${pt(0).x} ${pt(0).y}`;
    for (let k = 1; k < items.length; k++) {
      const a = pt(k - 1), b = pt(k);
      d += `C${a.x} ${a.y + ROW / 2} ${b.x} ${b.y - ROW / 2} ${b.x} ${b.y}`;
    }
    const last = pt(items.length - 1);
    d += `C${last.x} ${last.y + ROW / 2} ${W / 2} ${H - 30} ${W / 2} ${H}`;
    base.setAttribute('d', d);
    line.setAttribute('d', d);
    len = line.getTotalLength();
    items.forEach((li, k) => {
      const p = pt(k);
      li.style.top = p.y + 'px';
      li.style.left = (k % 2 ? W * .04 : W * .5) + 'px';
    });
    update();
  };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function update() {
    if (!len) return;
    const r = snake.getBoundingClientRect();
    // роза идёт за серединой экрана: верх змейки — 0, низ — 1
    const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * .55 - r.top) / r.height));
    const at = line.getPointAtLength(p * len);
    rose.style.transform = `translate(${at.x}px, ${at.y}px)`;
    line.style.strokeDashoffset = String(1 - p);
    items.forEach(li => { if (parseFloat(li.style.top) <= at.y + 60) li.classList.add('is-in'); });
  }
  let raf = 0;
  const kick = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', () => layoutSnake());
  document.fonts && document.fonts.ready.then(() => layoutSnake());
  layoutSnake();
})();


/* ===== Круг шерине на обложке: очередь проходит по кругу и останавливается на хозяйке ===== */
(function ring() {
  const box = document.getElementById('ring');
  if (!box) return;
  const N = 12, R = 120, C = 150;
  let s = `<svg viewBox="0 0 300 300" aria-hidden="true"><circle class="table" cx="${C}" cy="${C}" r="82"/><circle class="table-in" cx="${C}" cy="${C}" r="64"/>`;
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / N;
    s += `<circle class="seat" cx="${(C + R * Math.cos(a)).toFixed(1)}" cy="${(C + R * Math.sin(a)).toFixed(1)}" r="13"/>`;
  }
  s += `<text class="ring-sub" x="${C}" y="${C - 14}" text-anchor="middle" data-ring-sub>КЕЗЕК</text><text x="${C}" y="${C + 16}" text-anchor="middle">Гулира</text></svg>`;
  box.innerHTML = s;
  const seats = [...box.querySelectorAll('.seat')];
  const light = i => seats.forEach((el, k) => { el.classList.toggle('on', k === i); el.setAttribute('r', k === i ? 17 : 13); });
  light(0);
  window.ringSpin = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 1, delay = 90;
    const go = () => { light(i % N); i++; delay += 14; if (i <= N + 1) setTimeout(go, delay); };
    setTimeout(go, 900);
  };
  const sub = box.querySelector('[data-ring-sub]');
  window.ringLang = lang => { sub.textContent = lang === 'ru' ? RU.ringSub : 'КЕЗЕК'; };
  window.ringLang(LANG);
})();
document.querySelector('.envelope').addEventListener('click', () => window.ringSpin && window.ringSpin());

/* ===== Прогресс прокрутки и плавающая кнопка «Жооп берүү» ===== */
(function scrollHelpers() {
  const bar = document.querySelector('.progress span');
  const btn = document.querySelector('.rsvp-float');
  const rsvp = document.getElementById('rsvp');
  let raf = 0;
  function update() {
    raf = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    const answered = !rsvp.querySelector('form');
    const rsvpReached = rsvp.getBoundingClientRect().top < innerHeight * .9;
    btn.classList.toggle('show', !document.body.classList.contains('locked') && scrollY > innerHeight * .5 && !rsvpReached && !answered);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick);
  btn.addEventListener('click', e => {
    e.preventDefault();
    rsvp.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  update();
})();
