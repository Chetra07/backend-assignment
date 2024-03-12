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
  // dots[0].classList.add("active");

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

// Fetch data from the API
// fetch('http://localhost/p1/api/product/read.php')
fetch("http://localhost/web-assignment-main/backend/api/product/read.php")
  .then((response) => response.json())
  .then((data) => {
    // Filter products with discount and exclude those with category "Slider"
    const filteredProducts = data.product.filter((product) => {
      return product.pro_dis > 0 && product.category_name !== "Slider";
    });

    // Reference to the container where product cards will be added
    const productContainer = document.getElementById("productContainer");

    // Loop through each product and create HTML for product cards
    filteredProducts.forEach((product) => {
      const productCard = `
            <div class="col-sm-12 col-md-4 col-lg-3" style="padding-top: 30px">
                <div class="product-card">
                    <div class="discount">
                        <p class="discount-text">${product.pro_dis}%</p>
                    </div>

                    <div class="heart-icon">
                        <i class="far fa-heart like-btn"></i>
                    </div>
                    <a class="product-card-link" href="../frontend/pages/detail-products/detail-product.html">
                        <img class="cart-image" src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="${product.pro_name}" />
                        <h3>${product.pro_name}</h3>
                        <p>${product.pro_cal} Calories</p>
                        <h4>${product.pro_price}$</h4>
                    </a>
                    <div class="add-to-cart">
                        <i class="icon fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
            </div>
        `;
      // Append the product card HTML to the container
      productContainer.innerHTML += productCard;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

fetch(
  "http://localhost/web-assignment-main/backend/api/product/fetch_popular.php"
)
  .then((response) => response.json())
  .then((data) => {
    const products = data.product; // Assuming the API response contains a 'product' array

    // Reference to the container where product cards will be added
    const productContainer1 = document.getElementById("productContainer1");

    // Loop through each product and create HTML for product cards
    products.forEach((product) => {
      const productCard = `
                        <div class="col-sm-12 col-md-4 col-lg-3" style="padding-top: 30px">
                            <div class="product-card">
                                ${
                                  product.pro_dis > 0
                                    ? `
                    <div class="discount">
                        <p class="discount-text">${product.pro_dis}%</p>
                    </div>
                `
                                    : ""
                                }
                                <div class="heart-icon">
                                    <i class="far fa-heart like-btn"></i>
                                </div>
                                <a class="product-card-link" href="../frontend/pages/detail-products/detail-product.html">
                                    <img class="cart-image" src="http://localhost/web-assignment-main/backend/api/image/${
                                      product.pro_img
                                    }" alt="${product.pro_name}" />
                                    <h3>${product.pro_name}</h3>
                                    <p>${product.pro_cal} Calories</p>
                                    <h4>${product.pro_price}$</h4>
                                </a>
                                <div class="add-to-cart">
                                    <i class="icon fa-solid fa-cart-shopping"></i>
                                </div>
                            </div>
                        </div>
                    `;
      // Append the product card HTML to the container
      productContainer1.innerHTML += productCard;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

fetch("http://localhost/web-assignment-main/backend/api/product/read.php")
  .then((response) => response.json())
  .then((data) => {
    const products = data.product; // Assuming the API response contains a 'product' array

    // Reference to the container where product cards will be added
    const productContainer2 = document.getElementById("productContainer2");

    // Loop through each product and create HTML for product cards
    products.forEach((product) => {
      const productCard = `
                        <div class="col-sm-12 col-md-4 col-lg-3" style="padding-top: 30px">
                            <div class="product-card">
                                ${
                                  product.pro_dis > 0
                                    ? `
                    <div class="discount">
                        <p class="discount-text">${product.pro_dis}%</p>
                    </div>
                `
                                    : ""
                                }
                                <div class="heart-icon">
                                    <i class="far fa-heart like-btn"></i>
                                </div>
                                <a class="product-card-link" href="../frontend/pages/detail-products/detail-product.html">
                                    <img class="cart-image" src="http://localhost/web-assignment-main/backend/api/image/${
                                      product.pro_img
                                    }" alt="${product.pro_name}" />
                                    <h3>${product.pro_name}</h3>
                                    <p>${product.pro_cal} Calories</p>
                                    <h4>${product.pro_price}$</h4>
                                </a>
                                <div class="add-to-cart">
                                    <i class="icon fa-solid fa-cart-shopping"></i>
                                </div>
                            </div>
                        </div>
                    `;
      // Append the product card HTML to the container
      // productContainer2.innerHTML += productCard;
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const dotsContainer = document.querySelector(".slider-dots");

  fetch(
    "http://localhost/web-assignment-main/backend/api/product/fetch_slider.php"
  )
    .then((response) => response.json())
    .then((data) => {
      const products = data.product;

      products.forEach((product) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `
                            <div class="text-main-home-page">
                                <h1>${product.pro_name}</h1>
                                <h6>${product.pro_cal} Calories</h6>
                                <p>${product.pro_des}</p>
                                <a href="./pages/detail-products/detail-product.html" class="btn-buy-now-slide">Buy Now</a>
                            </div>
                            <div class="img-main-home-page">
                                <img src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="${product.pro_name}" />
                            </div>
                        `;
        slider.appendChild(slide);

        // Create a dot for each slide
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });

      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");

      dots[0].classList.add("active");

      // Event listeners for navigation buttons
      prevBtn.addEventListener("click", () => goToSlide(index - 1));
      nextBtn.addEventListener("click", () => goToSlide(index + 1));

      // Autoplay functionality
      setInterval(() => {
        goToSlide(index + 1);
      }, 8000); // Adjust the interval (in milliseconds) as needed

      let index = 0;

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
    })
    .catch((error) => console.error("Error fetching data:", error));
});

fetch("http://localhost/web-assignment-main/backend/api/product/fetch_main_pro.php")
  .then((response) => response.json())
  .then((data) => {
    const products = data.product; // Assuming the API response contains a 'product' array

    // Reference to the container where product cards will be added
    const showmainpro = document.getElementById("showmainpro");

    // Loop through each product and create HTML for product cards
    products.forEach((product) => {
      // Calculate the discounted price
      const discountedPrice = product.pro_price - (product.pro_price * product.pro_dis) / 100;

      // Format product prices to two decimal places
      const formattedPrice = parseFloat(product.pro_price).toFixed(2);
      const formattedDiscountedPrice = discountedPrice.toFixed(2);

      const productCard = `
        <section>
          <div class="container" style="overflow: hidden">
            <div class="greenTeaDetail">
              <div class="green-tea-img">
                <img src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="${product.pro_name}" />
              </div>
              <div class="text-green-tea">
                <div class="text-title">
                  <h1>${product.pro_name}</h1>
                  <div class="text-price">
                    <h3 class="underline-price">${formattedPrice}$</h3>
                    <h3>${formattedDiscountedPrice}$</h3> <!-- Display the discounted price -->
                  </div>
                </div>
                <p class="green-tea-text-p">${product.pro_des}</p>
                <div class="custom-btn-buy-now">
                  <a href="./pages/detail-products/detail-product.html" class="btn-buy-now-text"> Buy&nbsp;&nbsp;Now </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;

      // Append the product card HTML to the container
      showmainpro.innerHTML += productCard;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));


  fetch("http://localhost/web-assignment-main/backend/api/product/fetch_main_pro1.php")
  .then((response) => response.json())
  .then((data) => {
    const products = data.product; // Assuming the API response contains a 'product' array

    // Reference to the container where product cards will be added
    const showmainpro1 = document.getElementById("showmainpro1");

    // Loop through each product and create HTML for product cards
    products.forEach((product, index) => {
      // Parse product price as a float
      const productPrice = parseFloat(product.pro_price);

      // Calculate the discounted price
      const discountedPrice = productPrice - (productPrice * product.pro_dis) / 100;

      // Format the product price to two decimal places
      const formattedPrice = productPrice.toFixed(2);

      // Determine if the layout should be reverted based on the index
      const isReverted = index % 2 !== 0;
      const revertClass = isReverted ? 'revert-green-tea2' : '';

      const productCard = `
        <section>
          <section>
            <div class="container">
              <div class="greenTeaDetail ${revertClass}">
                <div class="text-green-tea">
                  <div class="text-title">
                    <h1>${product.pro_name}</h1>
                    <div class="text-price">
                      <h3 class="underline-price">${formattedPrice}$</h3>
                      <h3>${discountedPrice.toFixed(2)}$</h3> <!-- Display the discounted price -->
                    </div>
                  </div>
                  <p class="green-tea-text-p">${product.pro_des}</p>
                  <div class="custom-btn-buy-now">
                    <a href="./pages/detail-products/detail-product.html" class="btn-buy-now-text"> Buy&nbsp;&nbsp;Now </a>
                  </div>
                </div>
                <div class="green-tea-img">
                  <img src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="${product.pro_name}" />
                </div>
              </div>
            </div>
          </section>
        </section>
      `;

      // Append the product card HTML to the container
      showmainpro1.innerHTML += productCard;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

  // .catch((error) => console.error("Error fetching products:", error));
