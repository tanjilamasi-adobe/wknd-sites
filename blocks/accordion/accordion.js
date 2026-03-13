export default function decorate(block) {
  block.classList.add('accordion');

  const rows = Array.from(block.children);

  rows.forEach((row) => {
    const cols = Array.from(row.children);

    if (cols.length < 2) {
      return;
    }

    const titleContent = cols[0].innerHTML;
    const bodyContent = cols[1].innerHTML;

    const item = document.createElement('div');
    item.className = 'accordion-item';

    const button = document.createElement('button');
    button.className = 'accordion-title';
    button.setAttribute('type', 'button');
    button.setAttribute('aria-expanded', 'false');

    const titleText = document.createElement('span');
    titleText.innerHTML = titleContent;

    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.setAttribute('aria-hidden', 'true');

    button.append(titleText, icon);

    const content = document.createElement('div');
    content.className = 'accordion-content';

    const inner = document.createElement('div');
    inner.className = 'accordion-content-inner';
    inner.innerHTML = bodyContent;

    content.append(inner);
    item.append(button, content);

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      const accordionItems = Array.from(
        block.querySelectorAll('.accordion-item'),
      );

      accordionItems.forEach((accordionItem) => {
        const accordionButton = accordionItem.querySelector('.accordion-title');
        const accordionContent = accordionItem.querySelector('.accordion-content');

        accordionItem.classList.remove('active');

        if (accordionButton) {
          accordionButton.setAttribute('aria-expanded', 'false');
        }

        if (accordionContent) {
          accordionContent.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });

    row.replaceWith(item);
  });
}
