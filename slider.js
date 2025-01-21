const sliderItems = document.querySelectorAll('[data-carousel-item]');
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');

    let currentIndex = 0;

    function updateCarousel(index) {
      sliderItems.forEach((item, i) => {
        item.classList.toggle('block', i === index);
        item.classList.toggle('hidden', i !== index);
      });
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
      updateCarousel(currentIndex);
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      updateCarousel(currentIndex);
    });

   