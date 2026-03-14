/* eslint-disable */

export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  block.classList.add('carousel-adventure');

  const track = document.createElement('div');
  track.className = 'carousel-adventure-track';

  // original slides
  slides.forEach((slide) => {
    slide.classList.add('carousel-adventure-slide');
    track.appendChild(slide);
  });

  // clone first slide for smooth looping
  const firstClone = slides[0].cloneNode(true);
  firstClone.classList.add('carousel-adventure-slide', 'is-clone');
  track.appendChild(firstClone);

  block.innerHTML = '';
  block.appendChild(track);

  let currentSlide = 0;
  let isTransitioning = false;

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-adventure-btn carousel-adventure-btn-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = '&#8249;';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-adventure-btn carousel-adventure-btn-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '&#8250;';

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-adventure-dots';

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-adventure-dot';
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      if (isTransitioning) return;
      currentSlide = index;
      updateDots();
      moveToSlide();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function updateDots() {
    const activeIndex = currentSlide === slides.length ? 0 : currentSlide;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  function moveToSlide() {
    isTransitioning = true;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  nextButton.addEventListener('click', () => {
    if (isTransitioning) return;
    currentSlide += 1;
    updateDots();
    moveToSlide();
  });

  prevButton.addEventListener('click', () => {
    if (isTransitioning) return;
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    updateDots();
    moveToSlide();
  });

  track.addEventListener('transitionend', () => {
    // if moved to cloned first slide, jump back to real first slide instantly
    if (currentSlide === slides.length) {
      track.style.transition = 'none';
      currentSlide = 0;
      track.style.transform = 'translateX(0)';
      updateDots();

      // force reflow so transition resets properly
      track.offsetHeight;
    }

    isTransitioning = false;
  });

  block.appendChild(prevButton);
  block.appendChild(nextButton);
  block.appendChild(dotsWrap);

  track.style.transform = 'translateX(0)';
  updateDots();
}
