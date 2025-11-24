export function initCarousel() {
  const container = document.querySelector(".carousel-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!container || !prevBtn || !nextBtn) {
    return;
  }

  const getSlideWidth = () => {
    const slide = container.querySelector('.carousel-slide');
    return slide ? slide.offsetWidth : 0;
  };

  const scrollNext = () => {
    const slideWidth = getSlideWidth();
    if (slideWidth === 0) return;

    const isAtEnd = container.scrollWidth - container.scrollLeft - container.clientWidth < 1;

    if (isAtEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: slideWidth, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    const slideWidth = getSlideWidth();
    if (slideWidth === 0) return;

    if (container.scrollLeft < 1) {
      const endPosition = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: endPosition, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    }
  };

  nextBtn.addEventListener("click", scrollNext);
  prevBtn.addEventListener("click", scrollPrev);
}