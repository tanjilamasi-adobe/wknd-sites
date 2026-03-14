export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const nav = document.createElement('div');
  nav.className = 'adventure-tab-nav';

  const panels = document.createElement('div');
  panels.className = 'adventure-tab-panels';

  rows.forEach((row, index) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const tabName = cols[0].textContent.trim();
    const contentCell = cols[1];

    const button = document.createElement('button');
    button.className = 'adventure-tab-button';
    button.type = 'button';
    button.textContent = tabName;

    const panel = document.createElement('div');
    panel.className = 'adventure-tab-panel';

    while (contentCell.firstChild) {
      panel.append(contentCell.firstChild);
    }

    if (index === 0) {
      button.classList.add('is-active');
      panel.classList.add('is-active');
    }

    button.addEventListener('click', () => {
      nav.querySelectorAll('.adventure-tab-button').forEach((btn) => {
        btn.classList.remove('is-active');
      });

      panels.querySelectorAll('.adventure-tab-panel').forEach((item) => {
        item.classList.remove('is-active');
      });

      button.classList.add('is-active');
      panel.classList.add('is-active');
    });

    nav.append(button);
    panels.append(panel);
  });

  block.textContent = '';
  block.append(nav, panels);
}
