let currentSlide = 0;

function showSlide(index) {
  let slides = document.getElementsByClassName("carousel-item");
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
}

function nextSlide() {
  let totalSlides = document.getElementsByClassName("carousel-item").length;
  showSlide((currentSlide + 1) % totalSlides);
}

window.onload = function () {
  showSlide(0);
  setInterval(nextSlide, 4000);
};
