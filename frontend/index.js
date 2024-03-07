// script.js
function initMap() {
  // Create a map centered at a specific location
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// popular products
var likeBtns = document.querySelectorAll(".like-btn");
likeBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("fas");
    this.classList.toggle("far");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.querySelector(".slider-dots");

  let index = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");
  dots[0].classList.add("active");

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => goToSlide(index - 1));
  nextBtn.addEventListener("click", () => goToSlide(index + 1));

  // Autoplay functionality
  setInterval(() => {
    goToSlide(index + 1);
  }, 8000); // Adjust the interval (in milliseconds) as needed

  function goToSlide(i) {
    if (i < 0) {
      index = slides.length - 1;
    } else if (i >= slides.length) {
      index = 0;
    } else {
      index = i;
    }

    // Update the transform property to show the correct slide
    slider.style.transform = `translateX(${-index * 100}%)`;

    // Update the active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", index === i);
    });
  }
});
// using for scroll
document.addEventListener("DOMContentLoaded", function () {
  var scrollButton = document.getElementById("scrollButton");

  window.onscroll = function () {
    showScrollButton();
  };

  function showScrollButton() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  }

  scrollButton.onclick = function () {
    scrollToTop();
  };

  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});


