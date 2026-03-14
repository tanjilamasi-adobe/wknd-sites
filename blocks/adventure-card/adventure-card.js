export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const labelText = cols[0].textContent.trim();
    const valueText = cols[1].textContent.trim();

    row.textContent = '';

    const label = document.createElement('div');
    label.className = 'adventure-card-label';
    label.textContent = labelText;

    const value = document.createElement('div');
    value.className = 'adventure-card-value';
    value.textContent = valueText;

    row.append(label, value);

    if (labelText.toLowerCase() === 'price') {
      row.classList.add('price-row');
    }
  });
}
