export default function decorate(block) {
  const rows = Array.from(block.children);

  const tabLabels = rows
    .map((row) => {
      const firstCell = row.children[0];
      return firstCell ? firstCell.textContent.trim() : '';
    })
    .filter(Boolean);

  block.textContent = '';

  const tabList = document.createElement('ul');
  tabList.className = 'tabs-list';

  function getCardCategory(card) {
    const bodies = card.querySelectorAll('.cards-card-body');
    const categoryBody = bodies[bodies.length - 1];

    if (!categoryBody) {
      return '';
    }

    return categoryBody.textContent.trim().toLowerCase();
  }

  function filterCards(selectedTab) {
    const cards = document.querySelectorAll('.cards.tab-cards ul li');
    const selected = selectedTab.toLowerCase();

    cards.forEach((card) => {
      const category = getCardCategory(card);

      if (selected === 'all' || category === selected) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  tabLabels.forEach((label, index) => {
    const li = document.createElement('li');
    li.className = 'tabs-item';

    const button = document.createElement('button');
    button.className = 'tabs-button';
    button.setAttribute('type', 'button');
    button.textContent = label;

    if (index === 0) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      const buttons = block.querySelectorAll('.tabs-button');

      buttons.forEach((btn) => {
        btn.classList.remove('active');
      });

      button.classList.add('active');
      filterCards(label);
    });

    li.append(button);
    tabList.append(li);
  });

  block.append(tabList);

  filterCards('All');
}
