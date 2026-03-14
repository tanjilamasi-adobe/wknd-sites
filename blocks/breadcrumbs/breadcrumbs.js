export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cols = [...row.children];
  if (cols.length < 2) return;

  const [firstCol, secondCol] = cols;

  firstCol.classList.add('breadcrumbs-home');
  secondCol.classList.add('breadcrumbs-current');
}
