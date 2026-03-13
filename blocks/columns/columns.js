export default function decorate(block) {
  const firstRow = block.firstElementChild;

  if (!firstRow) {
    return;
  }

  const cols = Array.from(firstRow.children);
  block.classList.add(`columns-${cols.length}-cols`);

  const rows = Array.from(block.children);

  rows.forEach((row) => {
    const rowCols = Array.from(row.children);

    rowCols.forEach((col) => {
      const picture = col.querySelector('picture');

      if (!picture) {
        return;
      }

      const pictureWrapper = picture.closest('div');

      if (pictureWrapper && pictureWrapper.children.length === 1) {
        pictureWrapper.classList.add('columns-img-col');
      }
    });
  });
}
