export default function decorate(block) {
  const container = block.firstElementChild;

  if (!container) {
    return;
  }

  const cols = Array.from(container.children);

  block.classList.add(`teaser-${cols.length}-cols`);

  cols.forEach((col) => {
    const picture = col.querySelector('picture');

    if (picture) {
      col.classList.add('teaser-image');
      return;
    }

    col.classList.add('teaser-body');

    const paragraphs = col.querySelectorAll('p');

    if (paragraphs.length > 0) {
      const firstParagraph = paragraphs[0];

      if (!firstParagraph.querySelector('a')) {
        firstParagraph.classList.add('teaser-label');
      }
    }
  });
}
