// function fetchCategories() {
//     fetch("http://localhost/web-assignment-main/backend/api/category/read.php")
//       .then((response) => response.json())
//       .then((data) => {
//         const categoriesTable = document.getElementById("categoriesTable");
//         const tbody = categoriesTable.getElementsByTagName("tbody")[0];
//         tbody.innerHTML = ""; // Clear existing table rows

//         // Filter categories to only include the category with the name "Slider"
//         const sliderCategory = data.categories.find(category => category.cat_name === 'Slider');

//         if (sliderCategory) {
//           const row = document.createElement("tr");
//           row.innerHTML = `
//             <td>${sliderCategory.cat_id}</td>
//             <td>${sliderCategory.cat_name}</td>
//             <td>
//               <button onclick="openModal(${sliderCategory.cat_id}, '${sliderCategory.cat_name}')" class="edit-button">Edit</button>
//               <button onclick="deleteCategory(${sliderCategory.cat_id})" class="delete-button">Delete</button>
//             </td>
//           `;
//           tbody.appendChild(row);
//         } else {
//           const row = document.createElement("tr");
//           row.innerHTML = `<td colspan="3">No category found with the name "Slider"</td>`;
//           tbody.appendChild(row);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }
//   fetchCategories();

document.addEventListener("DOMContentLoaded", function () {
    fetchCategory();
    // Add event listeners to all delete buttons
    var deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Show the delete confirmation modal
        var modal = document.getElementById("popup-modal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });
    });
  
    var createButton = document.getElementById("createButton");
    var popup = document.getElementById("popup");
    var submitButton = document.getElementById("submitButton");
    var newProductNameInput = document.getElementById("newProNameInput");
    var newProductCatSelect = document.getElementById("newProCatSelect"); // Changed to select element
    var newProductPriceInput = document.getElementById("newProPriceInput");
    var newProductCalInput = document.getElementById("newProCalInput");
    var newProductDesInput = document.getElementById("newProDesInput");
    var newProductDisInput = document.getElementById("newProDisInput");
    var newProductImgInput = document.getElementById("newProImgInput");
  
    createButton.addEventListener("click", function () {
      popup.style.display = "block";
    });
  
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      var newProductName = newProductNameInput.value.trim();
      var newProductCat = newProductCatSelect.value.trim(); // Changed to use select value
      var newProductPrice = newProductPriceInput.value.trim();
      var newProductCal = newProductCalInput.value.trim();
      var newProductDes = newProductDesInput.value.trim();
      var newProductDis = newProductDisInput.value.trim();
      var newProductImg = newProductImgInput.files[0];
  
      if (newProductName !== "" && newProductPrice !== "") {
        var formData = new FormData();
        formData.append("pro_name", newProductName);
        formData.append("cat_id", newProductCat);
        formData.append("pro_price", newProductPrice);
        formData.append("pro_cal", newProductCal);
        formData.append("pro_des", newProductDes);
        formData.append("pro_dis", newProductDis);
        formData.append("pro_img", newProductImg);
  
        fetch(
          "http://localhost/web-assignment-main/backend/api/product/create.php",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response from server:", data);
            fetchProducts();
            popup.style.display = "none"; // Close the popup after submitting
          })
          .catch((error) => {
            console.error("Error inserting product:", error);
            alert("Error inserting product. Please try again later.");
          });
  
        // Reset form inputs
        newProductNameInput.value = "";
        newProductPriceInput.value = "";
        newProductCalInput.value = "";
        newProductDesInput.value = "";
        newProductDisInput.value = "";
        newProductImgInput.value = "";
      } else {
        alert("Product name and price are required.");
        console.log("Empty product name or price!");
      }
    });
  
    fetchProducts();
  });
  
  function fetchCategory() {
      fetch("http://localhost/web-assignment-main/backend/api/category/read.php")
        .then((response) => response.json())
        .then((data) => {
          const newProductCatSelect = document.getElementById("newProCatSelect");
          newProductCatSelect.innerHTML = ""; // Clear existing options
    
          if (data.categories && data.categories.length > 0) {
            const sliderCategory = data.categories.find((category) => category.cat_name === "Popular Slider");
            if (sliderCategory) {
              const option = document.createElement("option");
              option.value = sliderCategory.cat_id;
              option.text = sliderCategory.cat_name;
              newProductCatSelect.appendChild(option);
            } else {
              // Add a default option if the "Slider" category is not found
              const option = document.createElement("option");
              option.text = "Slider category not found";
              newProductCatSelect.appendChild(option);
            }
          } else {
            // Add a default option if no categories are available
            const option = document.createElement("option");
            option.text = "No categories available";
            newProductCatSelect.appendChild(option);
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
    
  
  // Fetch categories and products when the page loads
  window.onload = function () {
    fetchProducts(); // Fetch and display products
  };
  
  function fetchProducts() {
      fetch("http://localhost/web-assignment-main/backend/api/product/read.php")
        .then((response) => response.json())
        .then((data) => {
          if (data.product && data.product.length > 0) {
            const sortedProducts = data.product.sort((a, b) => b.pro_id - a.pro_id);
            const categoryPromises = [];
    
            sortedProducts.forEach((product) => {
              categoryPromises.push(
                fetch(
                  `http://localhost/web-assignment-main/backend/api/category/read_single.php?cat_id=${product.cat_id}`
                )
                  .then((response) => response.json())
                  .then((categoryData) => {
                    if (categoryData.category) {
                      // Check if categoryData exists
                      const categoryName = categoryData.category.cat_name;
                      if (categoryName === "Popular Slider") {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                          <td>${product.pro_id}</td>
                          <td>${product.pro_name}</td>
                          <td>${categoryName}</td>
                          <td>${product.pro_price}</td>
                          <td>${product.pro_cal}</td>
                          <td>${product.pro_des}</td>
                          <td>${product.pro_dis}</td>
                          <td><img src="http://localhost/web-assignment-main/backend/api/image/${product.pro_img}" alt="Product Image" style="max-width: 100px;"></td>
                          <td>
                            <button onclick="openAddProductModal(${product.pro_id}, '${product.pro_name}', ${product.pro_price}, ${product.pro_cal}, '${product.pro_des}', ${product.pro_dis})" class="edit-button">Edit</button>
                            <button onclick="deleteProduct(${product.pro_id})" class="delete-button">Delete</button>
                          </td>
                        `;
                        return row;
                      } else {
                        return null; // Return null for rows where category name is not "Slider"
                      }
                    } else {
                      console.error(
                        "Category data not found for product ID:",
                        product.pro_id
                      );
                      return null; // Return null for rows where category data is missing
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching category data:", error);
                    return null; // Return null in case of error
                  })
              );
            });
    
            Promise.all(categoryPromises).then((rows) => {
              const productsTable = document.getElementById("productsTable");
              const tbody = productsTable.getElementsByTagName("tbody")[0];
              tbody.innerHTML = ""; // Clear existing rows
              rows.forEach((row) => {
                if (row) {
                  // Check if row is not null
                  tbody.appendChild(row);
                }
              });
            });
          } else {
            const productsTable = document.getElementById("productsTable");
            const tbody = productsTable.getElementsByTagName("tbody")[0];
            tbody.innerHTML = `<tr><td colspan="8">${data.message}</td></tr>`;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    
  
  function deleteProduct(proId) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      fetch(
        `http://localhost/web-assignment-main/backend/api/product/delete.php?pro_id=${proId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          fetchProducts();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  }
  
  function openAddProductModal(proId, proName, proPrice, proCal, proDes, proDis) {
    const editProIdInput = document.getElementById("editProIdInput");
    const editProNameInput = document.getElementById("editProNameInput");
    const editProPriceInput = document.getElementById("editProPriceInput");
    const editProCalInput = document.getElementById("editProCalInput");
    const editProDesInput = document.getElementById("editProDesInput");
    const editProDisInput = document.getElementById("editProDisInput");
  
    // editProIdInput.value = proId; // Set the value for pro_id input field
    editProIdInput.value = proId;
    editProNameInput.value = proName;
    editProPriceInput.value = proPrice;
    editProCalInput.value = proCal;
    editProDesInput.value = proDes;
    editProDisInput.value = proDis;
  
    document.getElementById("editPopup").style.display = "block"; // Show the add product modal
  }
  
  // Event listener for submitting the add product form
  document
    .getElementById("editProductForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Retrieve values from the edit product for4
      const proId = document.getElementById("editProIdInput").value;
      const proName = document.getElementById("editProNameInput").value;
      const proPrice = document.getElementById("editProPriceInput").value;
      const proCal = document.getElementById("editProCalInput").value;
      const proDes = document.getElementById("editProDesInput").value;
      const proDis = document.getElementById("editProDisInput").value;
  
      // Create FormData object to send data to the server
      const formData = new FormData();
      formData.append("pro_id", proId);
      formData.append("pro_name", proName);
      formData.append("pro_price", proPrice);
      formData.append("pro_cal", proCal);
      formData.append("pro_des", proDes);
      formData.append("pro_dis", proDis);
  
      // Send the update request to the server
      fetch(
        "http://localhost/web-assignment-main/backend/api/product/update.php",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.message); // Show success message
          fetchProducts(); // Refresh product list after updating
          closeAddProductModal(); // Close the edit product popup
          window.location.reload();
        });
    });
  
  document
    .getElementById("closeEditProduct")
    .addEventListener("click", function () {
      document.getElementById("editPopup").style.display = "none";
    });
  document
    .getElementById("closeEditProduct1")
    .addEventListener("click", function () {
      document.getElementById("popup").style.display = "none";
    });
  
  // Function to close the add product modal
  function closeAddProductModal() {
    document.getElementById("editPopup").style.display = "none"; // Hide the add product modal
  }
  