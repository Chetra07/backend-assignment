// Initialize current slide index
let currentSlide = 0;

// Function to show a specific slide by index
function showSlide(index) {
  let slides = document.querySelectorAll(".carousel-item");
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
}

// Function to show the next slide
function nextSlide() {
  let totalSlides = document.querySelectorAll(".carousel-item").length;
  showSlide((currentSlide + 1) % totalSlides);
}

// Fetch data from the API and populate the slider
fetch(
  "http://localhost/web-assignment-main/backend/api/product/fetch_pop_slider.php"
)
  .then((response) => response.json())
  .then((data) => {
    const carouselContainer = document.querySelector(".carousel");

    if (Array.isArray(data.product)) {
      data.product.forEach((product) => {
        const slide = `
                    <div class="carousel-item">
                        <div class="slide-main">
                            <div class="slider-left-img">
                                <img src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="${product.pro_name}" />
                            </div>
                            <div class="slide-right-text">
                                <div class="main-text">
                                    <h1>${product.pro_name}</h1>
                                    <div class="text-discount">
                                        <p>${product.pro_cal} Calories</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        carouselContainer.innerHTML += slide;
      });

      showSlide(0);
      setInterval(nextSlide, 4000);
    } else {
      console.error("Data retrieved is not in the expected format");
    }
  })
  .catch((error) => console.error("Error fetching products:", error));
function fetchDiscountProducts() {
  fetch(
    "http://localhost/web-assignment-main/backend/api/product/fetch_all_pop_pro.php"
  )
    .then((response) => response.json())
    .then((data) => {
      const discountContainer = document.querySelector(
        ".row-style-all-discount"
      );

      if (Array.isArray(data.product)) {
        data.product.forEach((product) => {
          const productCard = `
                        <div class="col-sm-12 col-md-4 col-lg-3" style="padding-top: 30px">
                            <div class="product-cart-all-discount">
                                <a class="product-card-link-all-discount">
                                    <img class="cart-image-all-disocunt" src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="${product.pro_name}" />
                                    <h3>${product.pro_name}</h3>
                                    <p>${product.pro_cal} Calories</p>
                                    <div class="discount-tag">
                                        
                                        <div class="right">
                                            <p class="price-right">${product.pro_price}$</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
          discountContainer.innerHTML += productCard;
        });
      } else {
        console.error("Data retrieved is not in the expected format");
      }
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Call the function to fetch and display discount products
fetchDiscountProducts();
