function decorateAdventureTabs(block) {
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

function decorateClimbingTabs(block) {
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

  function normalizeClassName(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function getClimbingTeaserWrappers() {
    return Array.from(document.querySelectorAll('.teaser-wrapper')).filter(
      (wrapper) => wrapper.querySelector('.teaser.australia-article'),
    );
  }

  function filterClimbingTeasers(selectedTab) {
    const selected = normalizeClassName(selectedTab);
    const teaserWrappers = getClimbingTeaserWrappers();

    teaserWrappers.forEach((wrapper) => {
      const teaser = wrapper.querySelector('.teaser.australia-article');

      if (!teaser) {
        return;
      }

      if (teaser.classList.contains(selected)) {
        wrapper.style.display = '';
      } else {
        wrapper.style.display = 'none';
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
      filterClimbingTeasers(label);
    });

    li.append(button);
    tabList.append(li);
  });

  block.append(tabList);

  if (tabLabels.length) {
    filterClimbingTeasers(tabLabels[0]);
  }
}

export default function decorate(block) {
  if (block.classList.contains('climbing-tab')) {
    decorateClimbingTabs(block);
    return;
  }

  decorateAdventureTabs(block);
}
