export default function decorate(block) {
  const rows = [...block.children];
  const items = [];

  rows.forEach((row, index) => {
    /* skip first row: block heading */
    if (index === 0) return;

    const cell = row.children[0];
    if (!cell) return;

    const elements = [...cell.children];
    if (elements.length < 2) return;

    const label = elements[0].innerHTML.trim();
    const value = elements[1].innerHTML.trim();

    items.push(`
      <div class="menu-item">
        <div class="menu-label">${label}</div>
        <div class="menu-value">${value}</div>
      </div>
    `);
  });

  block.innerHTML = `
    <div class="menu-list">
      ${items.join('')}
    </div>
  `;
}
