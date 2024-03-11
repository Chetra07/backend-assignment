// Get pagination elements
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageNumbersElement = document.getElementById("pageNumbers");

// Set the initial page number and users per page
let currentPage = 1;
let totalPages = 1; // Define totalPages variable
let usersPerPage = 5;

// Add event listeners to pagination buttons
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchUsers(currentPage, usersPerPage); // Always fetch users from page 1 when clicking previous button
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchUsers(currentPage, usersPerPage);
  } else if (currentPage === totalPages) {
    // Allow going from page 1 to page 2 directly
    currentPage++;
    fetchUsers(currentPage, usersPerPage); // Fetch users from page 1 when going from page 1 to page 2 directly
  }
});

// Fetch users for the initial page
fetchUsers(currentPage, usersPerPage);

// Function to fetch users based on page number
// Function to fetch users based on page number
function fetchUsers(page, limit) {
    fetch(`http://localhost/web-assignment-main/backend/api/user/fetch_user.php?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        // Check if data is available and has users
        if (data.users && data.users.length > 0) {
          const usersTableBody = document.getElementById("usersTableBody");
  
          // Clear existing rows
          usersTableBody.innerHTML = "";
  
          // Iterate over the fetched users and create table rows
          data.sortedUser.forEach((user) => {
            // Create a table row with user details
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.username}</td>
              <td>${user.password}</td>
              <td>
                <button onclick="openUpdateModal('${user.id}','${user.name}','${user.username}','${user.password}')" class="edit-button">Edit</button>
                <button onclick="deleteUser(${user.id})" class="delete-button">Delete</button>
              </td>
            `;
            usersTableBody.appendChild(row); // Append the row to the table body
          });
  
          // Update pagination UI
          totalPages = data.totalPages; // Update totalPages
          updatePaginationUI();
        } else {
          // No users found, display a message
          const usersTableBody = document.getElementById("usersTableBody");
          usersTableBody.innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
  
  
  
// Update pagination UI
function updatePaginationUI() {
  let pageNumbersHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      pageNumbersHTML += `<button onclick="goToPage(${i})">${i}</button>`;
    } else {
      pageNumbersHTML += `<span>${i}</span>`;
    }
  }

  pageNumbersElement.innerHTML = pageNumbersHTML;

  // Disable previous and next buttons based on current page
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

// Function to navigate to a specific page
function goToPage(page) {
  currentPage = page;
  fetchUsers(currentPage, usersPerPage);
}

function createUser() {
  const form = document.getElementById("userForm");
  const formData = new FormData(form);

  fetch("http://localhost/web-assignment-main/backend/api/user/register.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message); // Display the response message
      closeModal(); // Close the modal
      fetchUsers(currentPage, usersPerPage);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
}

// Function to display the modal
function openModal() {
  document.getElementById("userModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("userModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("userModal");
  if (event.target == modal) {
    closeModal();
  }
};

function deleteUser(userId) {
  const confirmation = confirm("Are you sure you want to delete this user?");
  if (confirmation) {
    fetch(
      `http://localhost/web-assignment-main/backend/api/user/delete.php?user_id=${userId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchUsers(); // Assuming you have a function named fetchUsers() to refresh the user list
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
}

// Function to open the update user modal
// Function to open the update user modal
function openUpdateModal(id, name, username, password) {
  const updateUserId = document.getElementById("updateUserId");
  const updateName = document.getElementById("updateName");
  const updateUsername = document.getElementById("updateUsername");
  const updatePassword = document.getElementById("updatePassword");

  if (updateUserId && updateName && updateUsername && updatePassword) {
    updateUserId.value = id;
    updateName.value = name;
    updateUsername.value = username;
    updatePassword.value = password;
    document.getElementById("userUpdateModal").style.display = "block"; // Corrected this line
  } else {
    console.error("One or more elements not found.");
  }
}

document
  .getElementById("updateUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const id = document.getElementById("updateUserId").value;
    const name = document.getElementById("updateName").value;
    const username = document.getElementById("updateUsername").value;
    const password = document.getElementById("updatePassword").value;

    const formData = new FormData();
    formData.append("id", id); // Changed this line to match the key in your PHP script
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://localhost/web-assignment-main/backend/api/user/update.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchUsers(currentPage, usersPerPage); // Refresh user list after updating
        closeUpdateModal(); // Close the update modal after updating
      });
    // .catch((error) => {
    //     console.error("Error updating user:", error);
    // });
  });

// Function to close the update user modal
function closeUpdateModal() {
  document.getElementById("userUpdateModal").style.display = "none";
}
