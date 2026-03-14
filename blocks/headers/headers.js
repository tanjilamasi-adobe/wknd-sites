function createLangSelector() {
  const langWrap = document.createElement('div');
  langWrap.className = 'headers-lang';

  const btn = document.createElement('button');
  btn.className = 'headers-lang-btn';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `
    <span class="headers-lang-flag">🇺🇸</span>
    <span>EN-US</span>
    <span class="headers-lang-chevron"></span>
  `;

  const menu = document.createElement('div');
  menu.className = 'headers-lang-menu';

  const options = [
    { label: 'EN-US', flag: '🇺🇸' },
    { label: 'EN-GB', flag: '🇬🇧' },
    { label: 'FR-FR', flag: '🇫🇷' },
  ];

  options.forEach((item) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.textContent = `${item.flag} ${item.label}`;
    option.addEventListener('click', () => {
      btn.innerHTML = `
        <span class="headers-lang-flag">${item.flag}</span>
        <span>${item.label}</span>
        <span class="headers-lang-chevron"></span>
      `;
      langWrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    menu.appendChild(option);
  });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langWrap.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  langWrap.append(btn, menu);
  return langWrap;
}

function getNavSection(block) {
  return [...block.children].find((row) => row.classList.contains('nav-links')) || null;
}

function getSearchLink(block) {
  const links = [...block.querySelectorAll('a')];
  return links.find((link) => link.textContent.trim().toLowerCase().includes('search')) || null;
}

function createSearch(searchLink) {
  const wrap = document.createElement('div');
  wrap.className = 'headers-search';

  const link = document.createElement('a');
  link.href = searchLink ? searchLink.href : '#';

  const icon = document.createElement('span');
  icon.className = 'headers-search-icon';

  const text = document.createElement('span');
  text.textContent = 'Search';

  link.append(icon, text);
  wrap.append(link);

  return wrap;
}

function markActiveLink(nav) {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  [...nav.querySelectorAll('a')].forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    if (currentPath === linkPath) {
      link.classList.add('is-active');
    }
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const logoRow = rows[0];
  const navRow = getNavSection(block) || rows[1];
  const searchLink = getSearchLink(block);

  const logoImg = logoRow.querySelector('img');
  const logoAnchor = logoRow.querySelector('a') || document.createElement('a');
  logoAnchor.href = logoAnchor.getAttribute('href') || '/';

  if (logoImg && !logoAnchor.contains(logoImg)) {
    logoAnchor.textContent = '';
    logoAnchor.appendChild(logoImg);
  }

  const topbar = document.createElement('div');
  topbar.className = 'headers-topbar';

  const topbarInner = document.createElement('div');
  topbarInner.className = 'headers-topbar-inner';

  const signIn = document.createElement('a');
  signIn.className = 'headers-signin';
  signIn.href = '#';
  signIn.textContent = 'Sign In';

  const langSelector = createLangSelector();

  topbarInner.append(signIn, langSelector);
  topbar.append(topbarInner);

  const main = document.createElement('div');
  main.className = 'headers-main';

  const brand = document.createElement('div');
  brand.className = 'headers-brand';
  if (logoImg) {
    brand.append(logoAnchor);
  }

  const toggle = document.createElement('button');
  toggle.className = 'headers-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.innerHTML = '<span></span>';

  const right = document.createElement('div');
  right.className = 'headers-right';

  const nav = document.createElement('nav');
  nav.className = 'headers-nav';

  if (navRow) {
    [...navRow.querySelectorAll('a')].forEach((link, index) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      if (index === 0) {
        a.classList.add('is-active');
      }
      nav.append(a);
    });
  }

  markActiveLink(nav);

  const search = createSearch(searchLink);

  right.append(nav, search);
  main.append(brand, toggle, right);

  block.textContent = '';
  block.append(topbar, main);

  toggle.addEventListener('click', () => {
    block.classList.toggle('is-menu-open');
  });

  document.addEventListener('click', (e) => {
    const lang = block.querySelector('.headers-lang');
    if (lang && !lang.contains(e.target)) {
      lang.classList.remove('is-open');
      const btn = lang.querySelector('.headers-lang-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  let lastScrollY = window.scrollY;

  function onScroll() {
    const currentY = window.scrollY;

    if (currentY > 10) {
      block.classList.add('is-scrolled');
    } else {
      block.classList.remove('is-scrolled');
    }

    if (currentY <= 20) {
      block.classList.remove('is-compact');
    } else if (currentY > lastScrollY) {
      block.classList.add('is-compact');
    } else if (currentY < lastScrollY) {
      block.classList.remove('is-compact');
    }

    lastScrollY = currentY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
