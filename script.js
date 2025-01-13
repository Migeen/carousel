const carousel = document.querySelector(".carousel");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));

let currentIndex = 0;
let startY = 0;
let currentTranslate = 0;
let isDragging = false;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
    const offset = index - currentIndex;

    slide.style.transform = `translate(-50%, calc(-50% + ${
      offset * 325
    }px)) scale(${1 - Math.abs(offset) * 0.2})`;
    slide.style.zIndex = offset === 0 ? 10 : 10 - Math.abs(offset);
  });
}

function startDrag(event) {
  isDragging = true;
  startY = event.touches ? event.touches[0].clientY : event.clientY;
}

function drag(event) {
  if (!isDragging) return;

  const y = event.touches ? event.touches[0].clientY : event.clientY;
  const delta = y - startY;

  if (Math.abs(delta) > 50) {
    if (delta > 0 && currentIndex > 0) {
      currentIndex -= 1;
    } else if (delta < 0 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    }

    startY = y; // Reset startY to allow smooth dragging
    updateSlides();
  }
}

function endDrag() {
  isDragging = false;
}

carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", endDrag);
carousel.addEventListener("mouseleave", endDrag);

carousel.addEventListener("touchstart", startDrag);
carousel.addEventListener("touchmove", drag);
carousel.addEventListener("touchend", endDrag);

updateSlides();
