function increment() {
  var quantityInput = document.getElementById("quantity");
  var currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
}

function decrement() {
  var quantityInput = document.getElementById("quantity");
  var currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
}

function changeColor(element) {
  // Remove 'selected' class from all elements
  var elements = document.querySelectorAll(".img-size-small");
  elements.forEach(function (el) {
    el.classList.remove("selected");
  });

  // Add 'selected' class to the clicked element
  element.classList.add("selected");
}
