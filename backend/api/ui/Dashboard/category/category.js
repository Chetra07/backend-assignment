document.addEventListener("DOMContentLoaded", function () {
  var createButton = document.getElementById("createButton");
  var popup = document.getElementById("popup");
  var submitButton = document.getElementById("submitButton");
  var newCatNameInput = document.getElementById("newCatNameInput");

  // Show the popup when the Create New Category button is clicked
  createButton.addEventListener("click", function () {
    popup.style.display = "block";
  });

  // Handle the form submission when the Submit button is clicked
  submitButton.addEventListener("click", function () {
    // Retrieve the category name from the input field
    var newCatName = newCatNameInput.value.trim();

    // Check if the category name is not empty
    if (newCatName !== "") {
      // Create a new FormData object to send data to the server
      var formData = new FormData();
      formData.append("cat_name", newCatName);

      // Send an HTTP POST request to the server
      fetch(
        "http://localhost/web-assignment-main/backend/api/category/create.php",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log("Response from server:", data);
          // Refresh the category list after inserting a new category
          fetchCategories();
          // You can add further actions here, such as displaying a success message
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
          console.error("Error inserting category:", error);
        });

      // Reset the input field
      newCatNameInput.value = "";

      // Hide the popup after submission
      popup.style.display = "none";
    } else {
      // If the category name is empty, show an error message
      alert("Category name is required.");
      console.log("Empty category name!");
    }
  });

  // Function to fetch categories from the server and populate the table
  function fetchCategories() {
    fetch("http://localhost/web-assignment-main/backend/api/category/read.php")
      .then((response) => response.json())
      .then((data) => {
        const categoriesTable = document.getElementById("categoriesTable");
        const tbody = categoriesTable.getElementsByTagName("tbody")[0];
        tbody.innerHTML = ""; // Clear existing table rows

        if (data.categories && data.categories.length > 0) {
          data.categories.forEach((category) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>${category.cat_id}</td>
                        <td>${category.cat_name}</td>
                        <td>
                          <button onclick="openModal(${category.cat_id}, '${category.cat_name}')" class="edit-button">Edit</button>
                          <button onclick="deleteCategory(${category.cat_id})" class="delete-button">Delete</button>
                        </td>
                    `;
            tbody.appendChild(row);
          });
        } else {
          const row = document.createElement("tr");
          row.innerHTML = `<td colspan="3">${data.message}</td>`;
          tbody.appendChild(row);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Fetch categories when the page loads initially
  fetchCategories();
});
// Close create category popup
document.getElementById("closeCreateCategory").addEventListener("click", function() {
  document.getElementById("popup").style.display = "none";
});

// Close edit category popup
document.getElementById("closeEditCategory").addEventListener("click", function() {
  document.getElementById("editPopup").style.display = "none";
});

function insertCategory() {
  const newCatName = document.getElementById("newCatName").value;

  const formData = new FormData();
  formData.append("cat_name", newCatName);

  fetch(
    "http://localhost/web-assignment-main/backend/api/category/create.php",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      fetchCategories(); // Refresh category list after insertion
      closeNewCategoryModal(); // Close the modal after insertion
    })
    .catch((error) => {
      console.error("Error inserting category:", error);
    });
}

function fetchCategories() {
  fetch("http://localhost/web-assignment-main/backend/api/category/read.php")
    .then((response) => response.json())
    .then((data) => {
      const categoriesTable = document.getElementById("categoriesTable");
      const tbody = categoriesTable.getElementsByTagName("tbody")[0];
      tbody.innerHTML = ""; // Clear existing table rows

      if (data.categories && data.categories.length > 0) {
        // Sort categories based on their IDs in descending order
        const sortedCategories = data.categories.sort((a, b) => b.cat_id - a.cat_id);

        sortedCategories.forEach((category) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${category.cat_id}</td>
            <td>${category.cat_name}</td>
            <td>
              <button onclick="openModal(${category.cat_id}, '${category.cat_name}')" class="edit-button">Edit</button>
              <button onclick="deleteCategory(${category.cat_id})" class="delete-button">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">${data.message}</td>`;
        tbody.appendChild(row);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}


function deleteCategory(catId) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://localhost/web-assignment-main/backend/api/category/delete.php?cat_id=${catId}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success",
            });
            fetchCategories(); // Refresh category list after deletion
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your category is safe :)",
          icon: "error",
        });
      }
    });
}
// Define the openModal function
function openModal(cat_id, cat_name) {
  const editCatNameInput = document.getElementById("editCatNameInput");
  const editCatIdInput = document.getElementById("editCatIdInput");

  editCatNameInput.value = cat_name;
  editCatIdInput.value = cat_id;

  document.getElementById("editPopup").style.display = "block"; // Show the edit popup
}

// Event listener for submitting the edit category form
document.getElementById("editCategoryForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  const catId = document.getElementById("editCatIdInput").value;
  const newCatName = document.getElementById("editCatNameInput").value;

  const formData = new FormData();
  formData.append("cat_id", catId);
  formData.append("cat_name", newCatName);

  fetch("http://localhost/web-assignment-main/backend/api/category/update.php", {
      method: "POST",
      body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
      alert(data.message);
      fetchCategories(); // Refresh category list after updating
      closeEditCategoryModal(); // Close the edit modal after updating
  })
  .catch((error) => {
      console.error("Error updating category:", error);
  });
});

// Function to close the edit category modal
function closeEditCategoryModal() {
  document.getElementById("editPopup").style.display = "none"; // Hide the edit modal
}
