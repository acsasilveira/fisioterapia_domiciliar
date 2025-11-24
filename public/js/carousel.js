export function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (slides.length === 0) {
    return;
  }
  
  if (!prevBtn || !nextBtn) {
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? "block" : "none";
    });
    return;
  }

  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide, index) => {
      slide.style.display = index === n ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  showSlide(currentSlide);
}
